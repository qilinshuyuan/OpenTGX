import { WsServer } from "tsrpc";
import { roomServer } from "../../../roomServer";
import { RoomServerConn } from "../../RoomServer";

/** MatchServer 断开后清理 */
export function useCleanConn(server: WsServer<any>) {
    server.flows.postDisconnectFlow.push(v => {
        let conn = v.conn as RoomServerConn;

        // 退出已加入的房间
        if (conn.currentRoom) {
            conn.currentRoom.leave(conn);
        }

        // MatchServer 清空定时器
        if (conn.matchServer) {
            clearInterval(conn.matchServer.intervalSendState)
            if (roomServer.matchServerConn === conn) {
                roomServer.matchServerConn = undefined;
            }
        }

        return v;
    })
}