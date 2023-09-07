import { PrefixLogger } from "tsrpc";
import { MsgUpdateSubWorldState } from "../../shared/protocols/worldServer/admin/MsgUpdateSubWorldState";
import { ServiceType } from "../../shared/protocols/serviceProto_worldServer";
import { SubWorldData } from "../../shared/types/SubWorldData";
import { SubWorldUserState } from "../../shared/types/SubWorldUserState";
import { worldServer } from "../../WorldServerMain";
import { WorldServerConn } from "../WorldServer";

export class SubWorld {

    data: SubWorldData;
    conns: WorldServerConn[] = [];
    userStates: {
        [uid: string]: SubWorldUserState
    } = {};
    logger: PrefixLogger;

    constructor(data: SubWorldData) {
        this.data = data;

        this.logger = new PrefixLogger({
            logger: worldServer.logger,
            prefixs: [`[SubWorld ${data.id}]`],
        });

        // 每 100ms 同步一次 UserState
        this._setInterval(() => {
            this.broadcastMsg('serverMsg/UserStates', {
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
            startMatchTime: this.data.startMatchTime,
            // 信息的最后更新时间
            updateTime: this.data.updateTime
        }
    }

    /** 子世界内广播 */
    broadcastMsg<T extends keyof ServiceType['msg']>(msgName: T, msg: ServiceType['msg'][T]) {
        return worldServer.server.broadcastMsg(msgName, msg, this.conns);
    }

    listenMsgs(conn: WorldServerConn) {
        conn.listenMsg('clientMsg/UserState', call => {
            const conn = call.conn as WorldServerConn;
            this.userStates[conn.currentUser.uid] = {
                uid: conn.currentUser.uid,
                ...call.msg
            }
        })
    }
    unlistenMsgs(conn: WorldServerConn) {
        conn.unlistenMsgAll('clientMsg/UserState');
    }

    leave(conn: WorldServerConn) {
        const currentUser = conn.currentUser;
        this.logger.log('[UserLeave]', currentUser?.uid);

        this.conns.removeOne(v => v === conn);
        this.data.users.removeOne(v => v.uid === currentUser.uid);
        delete this.userStates[currentUser.uid]
        this.data.updateTime = Date.now();

        if (conn) {
            conn.close();
            this.unlistenMsgs(conn);
        }

        if (currentUser) {
            this.broadcastMsg('serverMsg/UserExit', {
                time: new Date,
                user: currentUser!
            })
        }

        if (this.conns.length === 0) {
            this.data.lastEmptyTime = Date.now();
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