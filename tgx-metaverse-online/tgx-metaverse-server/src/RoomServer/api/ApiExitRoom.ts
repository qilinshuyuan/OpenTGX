import { ApiCall } from "tsrpc";
import { ReqExitRoom, ResExitRoom } from "../../shared/protocols/roomServer/PtlExitRoom";
import { RoomServerConn } from "../RoomServer";

export async function ApiExitRoom(call: ApiCall<ReqExitRoom, ResExitRoom>) {
    const conn = call.conn as RoomServerConn;
    if (conn.currentRoom) {
        conn.currentRoom.leave(conn);
    }

    call.succ({});
}