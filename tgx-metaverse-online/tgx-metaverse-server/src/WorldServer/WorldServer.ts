import chalk from "chalk";
import path from "path";
import { HttpClient, WsConnection, WsServer } from "tsrpc";
import { BackConfig } from "../models/BackConfig";
import { useAdminToken } from "../models/flows/useAdminToken";
import { serviceProto as serviceProto_masterServer } from "../shared/protocols/serviceProto_masterServer";
import { serviceProto, ServiceType } from "../shared/protocols/serviceProto_worldServer";
import { SubWorldConfig } from "../shared/SubWorldConfig";
import { UserInfo } from "../shared/types/UserInfo";
import { useCleanConn } from "./models/flows/useCleanConn";
import { useSsoWs } from "./models/flows/useSsoWs";
import { SubWorld } from "./models/SubWorld";

export interface WorldServerOptions {
    //端口号
    port: number,
    //服务ID
    worldServerId: number,
    //需要负责的共公关卡场景列表
    publicSubWorldList: string[],
    //本机地址
    thisServerUrl: string,
    //主服务器地址
    masterServerUrl: string
}

export class WorldServer {
    readonly server = new WsServer(serviceProto, {
        port: this.options.port,
        // Remove this to use binary mode (remove from the client too)
        json: true,
        logMsg: false
    });
    readonly logger = this.server.logger;

    id2SubWorld = new Map<string, SubWorld>();
    subWorlds: SubWorld[] = [];

    private _master = new HttpClient(serviceProto_masterServer, {
        server: this.options.masterServerUrl
    });

    public async getUserInfoFromMaster(uid: string) {
        let ret = await this._master.callApi('admin/RequestUserInfo', {
            adminToken: BackConfig.adminToken,
            uid: uid,
        });
        if (ret.isSucc) {
            return ret.res.info;
        }
    }

    constructor(public readonly options: WorldServerOptions) {
        // Flows
        useAdminToken(this.server);
        useSsoWs(this.server);
        useCleanConn(this.server);

        // 定时清除闲置的子世界
        setInterval(() => {
            this._clearIdleSubWorlds();
        }, 10000);
    }

    async init() {
        await this.server.autoImplementApi(path.resolve(__dirname, './api'));


        for (let i = 0; i < this.options.publicSubWorldList.length; ++i) {
            let subWorldId = this.options.publicSubWorldList[i];
            //公共子世界的id直接使用配置里的ID，因为只有一份，可确保唯一
            this.createSubWorld(subWorldId, '', subWorldId);
        }
    }

    async start() {
        await this.server.start();

        // 启动成功后，定时检测加入匹配服务
        setInterval(() => { this.joinMasterServer() }, 5000);
        this.joinMasterServer();
    }

    /**
     * 注册到 MasterServer
     */
    async joinMasterServer() {
        // 防止重复连接
        if (this.masterServerConn || this._isJoiningMasterServer) {
            return;
        }

        this.logger.log(chalk.cyan('正在加入 MasterServer: ' + this.options.masterServerUrl));

        let subWorldList: { subWorldId: string, subWorldConfigId: string }[] = [];
        for (let i = 0; i < this.subWorlds.length; ++i) {
            let subWorld = this.subWorlds[i];
            subWorldList.push({ subWorldId: subWorld.data.id, subWorldConfigId: subWorld.config.id });
        }

        let ret = await this._master.callApi('admin/WorldServerJoin', {
            adminToken: BackConfig.adminToken,
            serverUrl: this.options.thisServerUrl,
            subWorldList: subWorldList,
        });

        if (!ret.isSucc) {
            this.logger.error('MasterServer 加入失败', ret.err);
            return;
        }
        if (!this.masterServerConn) {
            this.logger.error('MasterServer 加入成功, 但缺少 masterServerConn');
            return;
        }
        this.logger.log(chalk.green('MasterServer 加入成功'));
    }
    private _isJoiningMasterServer?: boolean;
    masterServerConn?: WorldServerConn;
    //
    createSubWorld(subWorldId: string, subWorldName: string, subWorldConfigId: string): SubWorld | null {
        let config = SubWorldConfig.getSubWorldConfig(subWorldConfigId);
        if (!config) {
            return null;
        }
        if (!subWorldName) {
            subWorldName = config.name;
        }
        let subWorld = new SubWorld({
            id: subWorldId,
            maxUser: 50,
            name: subWorldName,
            users: [],
            messages: [],
        }, config);

        this.subWorlds.push(subWorld);
        this.id2SubWorld.set(subWorld.data.id, subWorld);

        return subWorld;
    }

    private _clearIdleSubWorlds() {
        const now = Date.now();
        // 清除超过 5 秒没有玩家的子世界
        this.subWorlds.filter(v => (!v.config.isPublic) && v.lastEmptyTime && (now - v.lastEmptyTime >= 10000)).forEach(subWorld => {
            subWorld.destroy();
        });
    }
}

export type WorldServerConn = WsConnection<ServiceType> & {
    currentUser: UserInfo;
    currentSubWorld: SubWorld;
    masterServer?: {
        intervalSendState: ReturnType<typeof setInterval>;
    }
};