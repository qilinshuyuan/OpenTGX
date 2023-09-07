import { ApiCall } from "tsrpc";
import * as uuid from 'uuid';
import { ReqJoinSubWorld, ResJoinSubWorld } from "../../shared/protocols/worldServer/PtlJoinSubWorld";
import { UserInfo } from "../../shared/types/UserInfo";
import { WorldServerConn } from "../WorldServer";
import { TokenUtils } from "../../TokenUtils";
import { worldServer } from "../../WorldServerMain";

let defaultUserInfo: UserInfo = {
    uid: '',
    name: '',
    visualId: 0,
}

export async function ApiJoinSubWorld(call: ApiCall<ReqJoinSubWorld, ResJoinSubWorld>) {

    let req = call.req;
    let serverToken = TokenUtils.genWorldServerLoginToken(req.uid,worldServer.options.thisServerUrl,req.time);
    if(serverToken != req.token){
        return call.error('AUTH_FAILED');
    }
    // Login
    const currentUser = await worldServer.getUserInfoFromMaster(call.req.uid) || defaultUserInfo;

    const userColor = {
        r: Math.random() * 256 | 0,
        g: Math.random() * 256 | 0,
        b: Math.random() * 256 | 0,
    };
    const conn = call.conn as WorldServerConn;
    conn.currentUser = currentUser;

    let subWorld = worldServer.id2SubWorld.get(call.req.subWorldId);
    if (!subWorld) {
        return call.error('子世界不存在', { code: 'SUB_WORLD_NOT_EXISTS' });
    }

    if (subWorld.data.users.length >= subWorld.data.maxUser) {
        return call.error('子世界已满员');
    }

    // 用户已经在本子世界中，可能是通过其它设备登录，踢出旧连接
    let existedConns = subWorld.conns.filter(v => v.currentUser!.uid === currentUser.uid);
    existedConns.forEach(v => {
        subWorld!.leave(v)
    });
    // 用户正在其它子世界中，从之前的子世界中退出
    if (conn.currentSubWorld) {
        conn.currentSubWorld.leave(conn);
    }

    subWorld.conns.push(conn);
    subWorld.data.users.push({
        ...currentUser,
    });
    subWorld.userStates[currentUser.uid] = {
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
    conn.currentSubWorld = subWorld;
    subWorld.listenMsgs(conn);
    subWorld.data.lastEmptyTime = undefined;
    subWorld.data.updateTime = Date.now();

    call.succ({
        subWorldData: subWorld.data,
        currentUser: currentUser
    });

    subWorld.broadcastMsg('serverMsg/UserJoin', {
        time: new Date,
        user: currentUser,
        color: userColor
    })
}