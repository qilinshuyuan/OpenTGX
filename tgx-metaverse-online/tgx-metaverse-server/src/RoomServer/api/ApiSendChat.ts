import { ApiCall } from "tsrpc";
import { ReqSendChat, ResSendChat } from "../../shared/protocols/roomServer/PtlSendChat";
import { RoomServerConn } from "../RoomServer";

export async function ApiSendChat(call: ApiCall<ReqSendChat, ResSendChat>) {
    const conn = call.conn as RoomServerConn;
    const room = conn.currentRoom;
    const currentUser = conn.currentUser;

    room.broadcastMsg('serverMsg/Chat', {
        time: new Date,
        content: call.req.content,
        user: currentUser
    })

    call.succ({})
}