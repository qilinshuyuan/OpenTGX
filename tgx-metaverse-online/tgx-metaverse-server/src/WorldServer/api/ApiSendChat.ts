import { ApiCall } from "tsrpc";
import { ReqSendChat, ResSendChat } from "../../shared/protocols/worldServer/PtlSendChat";
import { WorldServerConn } from "../WorldServer";

const MAX_CACHED_MESSAGES = 20;

export async function ApiSendChat(call: ApiCall<ReqSendChat, ResSendChat>) {
    const conn = call.conn as WorldServerConn;
    const subWorld = conn.currentSubWorld;
    const currentUser = conn.currentUser;

    if(!subWorld || !currentUser){
        return undefined;
    }

    let msg = {
        time: new Date,
        content: call.req.content,
        user: currentUser
    };

    let len = subWorld.data.messages.push(msg);
    if(len >= MAX_CACHED_MESSAGES){
        subWorld.data.messages.shift();
    }

    subWorld.broadcastMsg('s2cMsg/Chat', msg);

    call.succ({});
}