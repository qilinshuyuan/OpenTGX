import { ApiCall } from "tsrpc";
import { roomServer } from "../../../roomServer";
import { ReqCreateRoom, ResCreateRoom } from "../../../shared/protocols/roomServer/admin/PtlCreateRoom";

export async function ApiCreateRoom(call: ApiCall<ReqCreateRoom, ResCreateRoom>) {
    let room = roomServer.createRoom(call.req.roomName);

    call.succ({
        roomId: room.data.id
    })
}