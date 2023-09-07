import { ApiCall } from "tsrpc";
import { ReqSendChat, ResSendChat } from "../../shared/protocols/worldServer/PtlSendChat";
import { WorldServerConn } from "../WorldServer";

export async function ApiSendChat(call: ApiCall<ReqSendChat, ResSendChat>) {
    const conn = call.conn as WorldServerConn;
    const subWorld = conn.currentSubWorld;
    const currentUser = conn.currentUser;

    subWorld.broadcastMsg('serverMsg/Chat', {
        time: new Date,
        content: call.req.content,
        user: currentUser
    })

    call.succ({});
}