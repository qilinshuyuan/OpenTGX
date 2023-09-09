import { ApiCall } from "tsrpc";
import { ReqSendChat, ResSendChat } from "../../shared/protocols/worldServer/PtlSendChat";
import { WorldServerConn } from "../WorldServer";

export async function ApiSendChat(call: ApiCall<ReqSendChat, ResSendChat>) {
    const conn = call.conn as WorldServerConn;
    const subWorld = conn.currentSubWorld;
    const currentUser = conn.currentUser;

    let msg = {
        time: new Date,
        content: call.req.content,
        user: currentUser
    };

    let len = subWorld.data.messages.push(msg);
    if(len > 20){
        subWorld.data.messages.shift();
    }

    subWorld.broadcastMsg('s2cMsg/Chat', msg);

    call.succ({});
}