import { PrefixLogger } from "tsrpc";
import { roomServer } from "../../roomServer";
import { MsgUpdateRoomState } from "../../shared/protocols/roomServer/admin/MsgUpdateRoomState";
import { ServiceType } from "../../shared/protocols/serviceProto_roomServer";
import { RoomData } from "../../shared/types/RoomData";
import { RoomUserState } from "../../shared/types/RoomUserState";
import { RoomServerConn } from "../RoomServer";

export class Room {

    data: RoomData;
    conns: RoomServerConn[] = [];
    userStates: {
        [uid: string]: RoomUserState
    } = {};
    logger: PrefixLogger;

    constructor(data: RoomData) {
        this.data = data;

        this.logger = new PrefixLogger({
            logger: roomServer.logger,
            prefixs: [`[Room ${data.id}]`],
        });

        // 每 100ms 同步一次 UserState
        this._setInterval(() => {
            this.broadcastMsg('serverMsg/UserStates', {
                userStates: this.userStates
            })
        }, 100);
    }

    get state(): MsgUpdateRoomState['rooms'][number] {
        return {
            id: this.data.id,
            name: this.data.name,
            userNum: this.conns.length,
            maxUserNum: this.data.maxUser,
            /** 为 undefined 代表不在匹配中 */
            startMatchTime: this.data.startMatchTime,
            // 房间信息的最后更新时间
            updateTime: this.data.updateTime
        }
    }

    /** 房间内广播 */
    broadcastMsg<T extends keyof ServiceType['msg']>(msgName: T, msg: ServiceType['msg'][T]) {
        return roomServer.server.broadcastMsg(msgName, msg, this.conns);
    }

    listenMsgs(conn: RoomServerConn) {
        conn.listenMsg('clientMsg/UserState', call => {
            const conn = call.conn as RoomServerConn;
            this.userStates[conn.currentUser.id] = {
                uid: conn.currentUser.id,
                ...call.msg
            }
        })
    }
    unlistenMsgs(conn: RoomServerConn) {
        conn.unlistenMsgAll('clientMsg/UserState');
    }

    leave(conn: RoomServerConn) {
        const currentUser = conn.currentUser;
        this.logger.log('[UserLeave]', currentUser?.id);

        this.conns.removeOne(v => v === conn);
        this.data.users.removeOne(v => v.id === currentUser.id);
        delete this.userStates[currentUser.id]
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

        roomServer.rooms.removeOne(v => v === this);
        roomServer.id2Room.delete(this.data.id);
    }

    private _intervals: ReturnType<typeof setInterval>[] = [];
    private _setInterval(func: () => void, interval: number) {
        this._intervals.push(setInterval(func, interval))
    }

}