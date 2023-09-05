import chalk from "chalk";
import path from "path";
import { ApiCallHttp, ApiReturn, ConnectionStatus, HttpServer, PrefixLogger, TsrpcError, WsClient } from "tsrpc";
import { BackConfig } from "../models/BackConfig";
import { useAdminToken } from "../models/flows/useAdminToken";
import { ResCreateRoom } from "../shared/protocols/matchServer/PtlCreateRoom";
import { ReqStartMatch, ResStartMatch } from "../shared/protocols/matchServer/PtlStartMatch";
import { MsgUpdateRoomState } from "../shared/protocols/roomServer/admin/MsgUpdateRoomState";
import { serviceProto } from "../shared/protocols/serviceProto_matchServer";
import { serviceProto as serviceProto_roomServer, ServiceType as ServiceType_Room } from "../shared/protocols/serviceProto_roomServer";

export interface MatchServerOptions {
    port: number
}
export class MatchServer {
    readonly server = new HttpServer(serviceProto, {
        port: this.options.port,
        // Remove this to use binary mode (remove from the client too)
        json: true
    });
    readonly logger = this.server.logger;

    /** 已注册的 RoomServer */
    readonly roomServers: {
        url: string,
        client: WsClient<ServiceType_Room>,
        state?: MsgUpdateRoomState
    }[] = [];

    private _nextRoomIndex = 1;

    constructor(public readonly options: MatchServerOptions) {
        // Flows
        useAdminToken(this.server);
    }

    async init() {
        await this.server.autoImplementApi(path.resolve(__dirname, './api'));
    }

    async start() {
        await this.server.start();

        // 定时 log 播报房间状态
        setInterval(() => {
            this.logger.log(`
[MatchServer 状态播报]
  - 已连接 RoomServer=${this.roomServers.count(v => !!v.state)}
  - 连接中 RoomServer=${this.roomServers.count(v => !v.state)}
  - 房间总数=${this.roomServers.sum(v => v.state?.rooms.length ?? 0)}
  - 房内用户数=${this.roomServers.sum(v => v.state?.rooms.sum(v => v.userNum) ?? 0)}
`);
        }, 5000);

        // 定时执行匹配
        this.startMatch();
    }

    async joinRoomServer(serverUrl: string): Promise<void> {
        // 已经注册过
        if (this.roomServers.some(v => v.url === serverUrl)) {
            return;
        }

        // Create
        let client = new WsClient(serviceProto_roomServer, {
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

        // Push
        let roomServer: MatchServer['roomServers'][number] = {
            url: serverUrl,
            client: client
        }
        this.roomServers.push(roomServer);

        // Flows
        client.flows.postDisconnectFlow.push(v => {
            this.roomServers.remove(v1 => v1.client === client);
            return v;
        });
        client.listenMsg('admin/UpdateRoomState', msg => {
            roomServer.state = msg;
        });

        try {
            // Connect
            let op = await client.connect();
            if (!op.isSucc) {
                throw new TsrpcError(op.errMsg);
            }

            // Auth as MatchServer
            let op2 = await client.callApi('admin/Auth', {
                adminToken: BackConfig.adminToken,
                type: 'MatchServer'
            });
            if (!op2.isSucc) {
                client.disconnect();
                throw op2.err;
            }
        }
        catch (e: unknown) {
            this.roomServers.remove(v => v.url === serverUrl);
            throw e;
        }

        this.logger.log(chalk.green(`Room server joined: ${serverUrl}, roomServers.length=${this.roomServers.length}`))
    }

    // #region 匹配相关
    /** 待匹配队列 */
    matchQueue = new Set<ApiCallHttp<ReqStartMatch, ResStartMatch>>();

    async startMatch() {
        await this._doMatch().catch(e => {
            this.server.logger.error('[MatchError]', e);
        })

        setTimeout(() => { this.startMatch() }, BackConfig.matchServer.intervalMatch)
    }


    /**
     * 执行一次匹配
     */
    private async _doMatch() {
        this.logger.log(`匹配开始，匹配人数=${this.matchQueue.size}`);
        let succNum = 0;

        // 优先匹配更早开始匹配的房间
        let matchingRooms = this.roomServers.map(v => {
            let rooms = v.state?.rooms ?? [];
            return rooms.map(v1 => ({
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
            // 这里简单起见，优先匹配人多的房间
            let room = matchingRooms.filter(v => v.userNum < BackConfig.roomServer.maxRoomUserNum).orderByDesc(v => v.userNum)[0];
            // 匹配成功
            if (room) {
                this.matchQueue.delete(call);
                ++room.userNum;
                if (room.userNum >= BackConfig.roomServer.maxRoomUserNum) {
                    matchingRooms.removeOne(v => v === room);
                }
                call.succ({
                    serverUrl: room.serverUrl,
                    roomId: room.id
                })
                ++succNum;
            }
            // 没有合适的房间，那么创建一个房间
            else {
                let retCreateRoom = await this.createRoom('系统房间 ' + (this._nextRoomIndex++));
                if (retCreateRoom.isSucc) {
                    matchingRooms.push({
                        id: retCreateRoom.res.roomId,
                        serverUrl: retCreateRoom.res.serverUrl,
                        userNum: 1
                    })

                    this.matchQueue.delete(call);
                    call.succ({
                        roomId: retCreateRoom.res.roomId,
                        serverUrl: retCreateRoom.res.serverUrl,
                    })
                }
            }
        }

        this.logger.log(`匹配结束，成功匹配人数=${succNum}`)
    }
    // #endregion

    async createRoom(roomName: string): Promise<ApiReturn<ResCreateRoom>> {
        // 挑选一个人数最少的 RoomServer
        let roomServer = this.roomServers.filter(v => v.state).orderBy(v => v.state!.connNum)[0];
        if (!roomServer) {
            return { isSucc: false, err: new TsrpcError('没有可用的房间服务器') };
        }

        // RPC -> RoomServer
        let op = await roomServer.client.callApi('admin/CreateRoom', {
            adminToken: BackConfig.adminToken,
            roomName: roomName
        })
        if (!op.isSucc) {
            return { isSucc: false, err: new TsrpcError(op.err) };
        }

        // Return
        return {
            isSucc: true,
            res: {
                roomId: op.res.roomId,
                serverUrl: roomServer.url
            }
        }
    }
}