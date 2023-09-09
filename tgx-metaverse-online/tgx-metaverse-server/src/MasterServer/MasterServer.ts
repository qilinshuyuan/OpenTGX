import chalk from "chalk";
import path from "path";
import { ApiCallHttp, ApiReturn, ConnectionStatus, HttpServer, PrefixLogger, TsrpcError, WsClient } from "tsrpc";
import { BackConfig } from "../models/BackConfig";
import { useAdminToken } from "../models/flows/useAdminToken";
import { ResCreateSubWorld } from "../shared/protocols/masterServer/PtlCreateSubWorld";
import { ReqStartMatch, ResStartMatch } from "../shared/protocols/masterServer/PtlStartMatch";
import { MsgUpdateSubWorldState } from "../shared/protocols/worldServer/admin/MsgUpdateSubWorldState";
import { serviceProto } from "../shared/protocols/serviceProto_masterServer";
import { serviceProto as serviceProto_worldServer, ServiceType as ServiceType_World } from "../shared/protocols/serviceProto_worldServer";

export interface MasterServerOptions {
    port: number
}
export class MasterServer {
    readonly server = new HttpServer(serviceProto, {
        port: this.options.port,
        // Remove this to use binary mode (remove from the client too)
        json: true
    });
    readonly logger = this.server.logger;

    /** 已注册的 WorldServer */
    readonly worldServers: {
        url: string,
        client: WsClient<ServiceType_World>,
        state?: MsgUpdateSubWorldState,
        subWorldMap: Map<string, { subWorldId: string, subWorldConfigId: string }>,
    }[] = [];

    constructor(public readonly options: MasterServerOptions) {
        // Flows
        useAdminToken(this.server);
    }

    async init() {
        await this.server.autoImplementApi(path.resolve(__dirname, './api'));
    }

    async start() {
        await this.server.start();

        // 定时 log 播报子世界状态
        setInterval(() => {
            this.logger.log(`
[MasterServer 状态播报]
  - 已连接 WorldServer=${this.worldServers.count(v => !!v.state)}
  - 连接中 WorldServer=${this.worldServers.count(v => !v.state)}
  - 子世界总数=${this.worldServers.sum(v => v.state?.subWorlds.length ?? 0)}
  - 子世界内用户数=${this.worldServers.sum(v => v.state?.subWorlds.sum(v => v.userNum) ?? 0)}
`);
        }, 15000);

        // 定时执行匹配
        this.startMatch();
    }

    //the world servers call this to register themselves.
    async joinWorldServer(serverUrl: string, subWorldList: { subWorldId: string, subWorldConfigId: string }[]): Promise<void> {
        // 已经注册过
        if (this.worldServers.some(v => v.url === serverUrl)) {
            return;
        }

        // Create
        let client = new WsClient(serviceProto_worldServer, {
            server: serverUrl,
            logger: new PrefixLogger({
                logger: this.logger,
                prefixs: [chalk.bgCyan.white(`RS|${serverUrl}`)]
            }),
            heartbeat: {
                interval: 5000,
                timeout: 5000
            },
            logMsg: false
        });

        let subWorldMap = new Map<string, { subWorldId: string, subWorldConfigId: string }>();
        for (let i = 0; i < subWorldList.length; ++i) {
            let subWorldInfo = subWorldList[i];
            subWorldMap.set(subWorldInfo.subWorldId, subWorldInfo);
        }

        //this.logger.log(`子世界列表:${subWorldInfo}`);

        // Push
        let worldServer: MasterServer['worldServers'][number] = {
            url: serverUrl,
            client: client,
            subWorldMap: subWorldMap
        }
        this.worldServers.push(worldServer);

        // Flows
        client.flows.postDisconnectFlow.push(v => {
            this.worldServers.remove(v1 => v1.client === client);
            return v;
        });
        client.listenMsg('admin/UpdateSubWorldState', msg => {
            worldServer.state = msg;
        });

        try {
            // Connect
            let op = await client.connect();
            if (!op.isSucc) {
                throw new TsrpcError(op.errMsg);
            }

            // Auth as MasterServer
            let op2 = await client.callApi('admin/Auth', {
                adminToken: BackConfig.adminToken,
                type: 'MasterServer'
            });
            if (!op2.isSucc) {
                client.disconnect();
                throw op2.err;
            }
        }
        catch (e: unknown) {
            this.worldServers.remove(v => v.url === serverUrl);
            throw e;
        }

        this.logger.log(chalk.green(`World server joined: ${serverUrl}, worldServers.length=${this.worldServers.length}`))
    }

    public getPublicSubWorldServers(subWorldId: string) {
        let worldServers = this.worldServers.filter(s => s.subWorldMap.has(subWorldId));
        return worldServers;
    }

    // #region 匹配相关
    /** 待匹配队列 */
    matchQueue = new Set<ApiCallHttp<ReqStartMatch, ResStartMatch>>();

    async startMatch() {
        await this._doMatch().catch(e => {
            this.server.logger.error('[MatchError]', e);
        })

        setTimeout(() => { this.startMatch() }, BackConfig.masterServer.intervalMatch)
    }


    /**
     * 执行一次匹配
     */
    private async _doMatch() {
        this.logger.log(`匹配开始，匹配人数=${this.matchQueue.size}`);
        let succNum = 0;

        // 优先匹配更早开始匹配的子世界
        let matchingSubWorlds = this.worldServers.map(v => {
            let subWorlds = v.state?.subWorlds ?? [];
            return subWorlds.map(v1 => ({
                ...v1,
                serverUrl: v.url
            }))
        }).flat().orderBy(v => v.startMatchTime).map(v => ({
            id: v.id,
            serverUrl: v.serverUrl,
            userNum: v.userNum
        }));

        for (let call of this.matchQueue) {
            // 连接已断开，不再匹配
            if (call.conn.status !== ConnectionStatus.Opened) {
                this.matchQueue.delete(call);
                return;
            }

            // 尝试匹配，你可以在此实现自己的匹配规则            
            // 这里简单起见，优先匹配人多的子世界
            let subWorld = matchingSubWorlds.filter(v => v.userNum < BackConfig.worldServer.maxSubWorldUserNum).orderByDesc(v => v.userNum)[0];
            // 匹配成功
            if (subWorld) {
                this.matchQueue.delete(call);
                ++subWorld.userNum;
                if (subWorld.userNum >= BackConfig.worldServer.maxSubWorldUserNum) {
                    matchingSubWorlds.removeOne(v => v === subWorld);
                }
                call.succ({
                    serverUrl: subWorld.serverUrl,
                    subWorldId: subWorld.id
                })
                ++succNum;
            }
            // 没有合适的子世界，那么创建一个子世界
            else {
                /*
                let retCreateSubWorld = await this.createSubWorld('','default');
                if (retCreateSubWorld.isSucc) {
                    matchingSubWorlds.push({
                        id: retCreateSubWorld.res.subWorldId,
                        serverUrl: retCreateSubWorld.res.serverUrl,
                        userNum: 1
                    })

                    this.matchQueue.delete(call);
                    call.succ({
                        subWorldId: retCreateSubWorld.res.subWorldId,
                        serverUrl: retCreateSubWorld.res.serverUrl,
                    })
                }
                */
            }
        }

        this.logger.log(`匹配结束，成功匹配人数=${succNum}`)
    }
    // #endregion

    // 10000 以下为系统保留.
    private _nextSubWorldId = 10000;

    async createSubWorld(subWorldName: string, subWorldConfigId: string): Promise<ApiReturn<ResCreateSubWorld>> {
        // 挑选一个人数最少的 WorldServer
        let worldServer = this.worldServers.filter(v => v.state).orderBy(v => v.state!.connNum)[0];
        if (!worldServer) {
            return { isSucc: false, err: new TsrpcError('没有可用的世界服务器') };
        }

        // RPC -> WorldServer
        let op = await worldServer.client.callApi('admin/CreateSubWorld', {
            adminToken: BackConfig.adminToken,
            subWorldName: subWorldName,
            subWorldId: '' + this._nextSubWorldId++,
            subWorldConfigId: ''
        })
        if (!op.isSucc) {
            return { isSucc: false, err: new TsrpcError(op.err) };
        }

        // Return
        return {
            isSucc: true,
            res: {
                subWorldId: op.res.subWorldId,
                serverUrl: worldServer.url
            }
        }
    }
}