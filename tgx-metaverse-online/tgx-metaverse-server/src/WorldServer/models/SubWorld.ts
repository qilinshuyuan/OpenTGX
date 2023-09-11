import { PrefixLogger } from "tsrpc";
import { MsgUpdateSubWorldState } from "../../shared/protocols/worldServer/admin/MsgUpdateSubWorldState";
import { ServiceType } from "../../shared/protocols/serviceProto_worldServer";
import { SubWorldData } from "../../shared/types/SubWorldData";
import { SubWorldUserState } from "../../shared/types/SubWorldUserState";
import { worldServer } from "../../WorldServerMain";
import { WorldServerConn } from "../WorldServer";
import { SubWorldConfigItem } from "../../shared/SubWorldConfig";

export class SubWorld {

    data: SubWorldData;
    //配置ID
    config: SubWorldConfigItem;

    conns: WorldServerConn[] = [];
    userStates: {
        [uid: string]: SubWorldUserState
    } = {};
    logger: PrefixLogger;

    /**
     * 上一次空房的时间（undefined 代表房内有人）
     * 用于定时解散无人的子世界
     */
    lastEmptyTime?: number;

    /**
     * 开始匹配的时间，`undefined` 代表不在匹配中
     */
    startMatchTime?: number;

    /** 信息的最后更新时间 */
    updateTime: number;

    constructor(data: SubWorldData, config: SubWorldConfigItem) {
        this.data = data;
        this.config = config;
        this.updateTime = Date.now();
        this.startMatchTime = Date.now();
        this.updateTime = Date.now();
        this.logger = new PrefixLogger({
            logger: worldServer.logger,
            prefixs: [`[SubWorld ${data.id}]`],
        });

        // 每 100ms 同步一次 UserState
        this._setInterval(() => {
            this.broadcastMsg('s2cMsg/UserStates', {
                userStates: this.userStates
            })
        }, 100);
    }

    get state(): MsgUpdateSubWorldState['subWorlds'][number] {
        return {
            id: this.data.id,
            name: this.data.name,
            userNum: this.conns.length,
            maxUserNum: this.data.maxUser,
            /** 为 undefined 代表不在匹配中 */
            startMatchTime: this.startMatchTime,
            // 信息的最后更新时间
            updateTime: this.updateTime
        }
    }

    /** 子世界内广播 */
    broadcastMsg<T extends keyof ServiceType['msg']>(msgName: T, msg: ServiceType['msg'][T]) {
        return worldServer.server.broadcastMsg(msgName, msg, this.conns);
    }

    listenMsgs(conn: WorldServerConn) {
        conn.listenMsg('c2sMsg/UserState', call => {
            const conn = call.conn as WorldServerConn;
            if(conn.currentUser){
                this.userStates[conn.currentUser.uid] = {
                    uid: conn.currentUser.uid,
                    ...call.msg
                }
            }
        })
    }
    unlistenMsgs(conn: WorldServerConn) {
        conn.unlistenMsgAll('c2sMsg/UserState');
    }

    leave(conn: WorldServerConn) {
        const currentUser = conn.currentUser;
        if(!currentUser){
            return;
        }
        this.logger.log('[UserLeave]', currentUser?.uid);

        this.conns.removeOne(v => v === conn);
        this.data.users.removeOne(v => v.uid === currentUser.uid);
        delete this.userStates[currentUser.uid]
        this.updateTime = Date.now();

        if (conn) {
            conn.close();
            this.unlistenMsgs(conn);
        }

        if (currentUser) {
            this.broadcastMsg('s2cMsg/UserExit', {
                time: new Date,
                user: currentUser!
            })
        }

        if (this.conns.length === 0) {
            this.lastEmptyTime = Date.now();
        }
    }

    destroy() {
        this.logger.log('[Destroy]');
        this._intervals.forEach(v => { clearInterval(v) });
        this._intervals = [];

        worldServer.subWorlds.removeOne(v => v === this);
        worldServer.id2SubWorld.delete(this.data.id);
    }

    private _intervals: ReturnType<typeof setInterval>[] = [];
    private _setInterval(func: () => void, interval: number) {
        this._intervals.push(setInterval(func, interval))
    }

}