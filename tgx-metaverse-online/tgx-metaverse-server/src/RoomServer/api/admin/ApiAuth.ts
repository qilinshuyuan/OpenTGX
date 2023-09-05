import { ApiCall } from "tsrpc";
import { BackConfig } from "../../../models/BackConfig";
import { roomServer } from "../../../roomServer";
import { ReqAuth, ResAuth } from "../../../shared/protocols/roomServer/admin/PtlAuth";
import { RoomServerConn } from "../../RoomServer";

export async function ApiAuth(call: ApiCall<ReqAuth, ResAuth>) {
    if (call.req.type === 'MatchServer') {
        let conn = call.conn as RoomServerConn;
        roomServer.matchServerConn = conn;

        conn.matchServer = {
            // 定时 Send State
            intervalSendState: setInterval(() => {
                conn.sendMsg('admin/UpdateRoomState', {
                    connNum: roomServer.server.connections.length,
                    rooms: roomServer.rooms.map(v => v.state)
                })
            }, BackConfig.roomServer.intervalSendState)
        };
    }

    call.succ({});
}