import { ApiCall } from "tsrpc";
import * as uuid from 'uuid';
import { roomServer } from "../../roomServer";
import { ReqJoinRoom, ResJoinRoom } from "../../shared/protocols/roomServer/PtlJoinRoom";
import { UserInfo } from "../../shared/types/UserInfo";
import { RoomServerConn } from "../RoomServer";
import { TokenUtils } from "../../TokenUtils";

let defaultUserInfo: UserInfo = {
    uid: '',
    name: '',
    visualId: 0,
}

export async function ApiJoinRoom(call: ApiCall<ReqJoinRoom, ResJoinRoom>) {

    let req = call.req;
    let serverToken = TokenUtils.genWorldServerLoginToken(req.uid,roomServer.options.thisServerUrl,req.time);
    if(serverToken != req.token){
        return call.error('AUTH_FAILED');
    }
    // Login
    const currentUser = await roomServer.getUserInfoFromMaster(call.req.uid) || defaultUserInfo;

    const userColor = {
        r: Math.random() * 256 | 0,
        g: Math.random() * 256 | 0,
        b: Math.random() * 256 | 0,
    };
    const conn = call.conn as RoomServerConn;
    conn.currentUser = currentUser;

    let room = roomServer.id2Room.get(call.req.subWorldId);
    if (!room) {
        return call.error('房间不存在', { code: 'ROOM_NOT_EXISTS' });
    }

    if (room.data.users.length >= room.data.maxUser) {
        return call.error('该房间已满员');
    }

    // 用户已经在本房间中，可能是通过其它设备登录，踢出旧连接
    let existedConns = room.conns.filter(v => v.currentUser!.uid === currentUser.uid);
    existedConns.forEach(v => {
        room!.leave(v)
    });
    // 用户正在其它房间中，从已有房间中退出
    if (conn.currentRoom) {
        conn.currentRoom.leave(conn);
    }

    room.conns.push(conn);
    room.data.users.push({
        ...currentUser,
    });
    room.userStates[currentUser.uid] = {
        uid: currentUser.uid,
        pos: {
            x: Math.random() * 10,
            y: 0,
            z: Math.random() * 10
        },
        rotation: {
            x: 0,
            y: 0,
            z: 0,
            w: 1
        },
        aniState: 'idle'
    }
    conn.currentRoom = room;
    room.listenMsgs(conn);
    room.data.lastEmptyTime = undefined;
    room.data.updateTime = Date.now();

    call.succ({
        roomData: room.data,
        currentUser: currentUser
    });

    room.broadcastMsg('serverMsg/UserJoin', {
        time: new Date,
        user: currentUser,
        color: userColor
    })
}