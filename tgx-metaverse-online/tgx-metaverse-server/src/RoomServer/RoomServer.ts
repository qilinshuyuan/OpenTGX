import chalk from "chalk";
import path from "path";
import { ApiReturn, HttpClient, TransportOptions, WsConnection, WsServer } from "tsrpc";
import { BackConfig } from "../models/BackConfig";
import { useAdminToken } from "../models/flows/useAdminToken";
import { serviceProto as serviceProto_matchServer } from "../shared/protocols/serviceProto_matchServer";
import { serviceProto, ServiceType } from "../shared/protocols/serviceProto_roomServer";
import { UserInfo } from "../shared/types/UserInfo";
import { useCleanConn } from "./models/flows/useCleanConn";
import { useSsoWs } from "./models/flows/useSsoWs";
import { Room } from "./models/Room";

export interface RoomServerOptions {
    //端口号
    port: number,
    //服务ID
    roomServerId: number,
    //需要负责的共公关卡场景列表
    publicSubWorldList: string[],
    //本机地址
    thisServerUrl: string,
    //主服务器地址
    matchServerUrl: string
}

export class RoomServer {
    readonly server = new WsServer(serviceProto, {
        port: this.options.port,
        // Remove this to use binary mode (remove from the client too)
        json: true,
        logMsg: false
    });
    readonly logger = this.server.logger;

    id2Room = new Map<string, Room>();
    rooms: Room[] = [];

    private _master = new HttpClient(serviceProto_matchServer, {
        server: this.options.matchServerUrl
    });

    public async getUserInfoFromMaster(uid:string){
        let ret = await this._master.callApi('admin/RequestUserInfo',{uid:uid});
        if(ret.isSucc){
            return ret.res.info;
        }
    }

    constructor(public readonly options: RoomServerOptions) {
        // Flows
        useAdminToken(this.server);
        useSsoWs(this.server);
        useCleanConn(this.server);

        // 定时清除闲置的房间
        setInterval(() => {
            this._clearIdleRooms();
        }, 10000);
    }

    async init() {
        await this.server.autoImplementApi(path.resolve(__dirname, './api'));


        for (let i = 0; i < this.options.publicSubWorldList.length; ++i) {
            let subWorldId = this.options.publicSubWorldList[i];
            this.createRoom(subWorldId, subWorldId, subWorldId);
        }
    }

    async start() {
        await this.server.start();

        // 启动成功后，定时检测加入匹配服务
        setInterval(() => { this.joinMatchServer() }, 5000);
        this.joinMatchServer();
    }

    /**
     * 注册到 MatchServer
     */
    async joinMatchServer() {
        // 防止重复连接
        if (this.matchServerConn || this._isJoiningMatchServer) {
            return;
        }

        this.logger.log(chalk.cyan('正在加入 MatchServer: ' + this.options.matchServerUrl));

        let ret = await this._master.callApi('admin/RoomServerJoin', {
            adminToken: BackConfig.adminToken,
            serverUrl: this.options.thisServerUrl,
            publicSubWorldList: this.options.publicSubWorldList,
        });
        if (!ret.isSucc) {
            this.logger.error('MatchServer 加入失败', ret.err);
            return;
        }
        if (!this.matchServerConn) {
            this.logger.error('MatchServer 加入成功, 但缺少 matchServerConn');
            return;
        }
        this.logger.log(chalk.green('MatchServer 加入成功'));
    }
    private _isJoiningMatchServer?: boolean;
    matchServerConn?: RoomServerConn;
    //
    createRoom(roomName: string, roomId: string, levelId: string): Room {
        let room = new Room({
            id: roomId,
            levelId: levelId,
            maxUser: 50,
            name: roomName,
            users: [],
            messages: [],
            startMatchTime: Date.now(),
            updateTime: Date.now()
        });

        this.rooms.push(room);
        this.id2Room.set(room.data.id, room);

        return room;
    }

    private _clearIdleRooms() {
        const now = Date.now();
        // 清除超过 5 秒没有玩家的房间
        this.rooms.filter(v => v.data.lastEmptyTime && now - v.data.lastEmptyTime >= 10000).forEach(room => {
            room.destroy();
        })
    }
}

export type RoomServerConn = WsConnection<ServiceType> & {
    currentUser: UserInfo;
    currentRoom: Room;
    matchServer?: {
        intervalSendState: ReturnType<typeof setInterval>;
    }
};