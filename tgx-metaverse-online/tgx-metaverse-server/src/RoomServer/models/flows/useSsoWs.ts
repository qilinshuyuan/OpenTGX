import { WsServer } from "tsrpc";
import { RoomServerConn } from "../../RoomServer";

/**
 * 登录态校验，WebSocket 与 HTTP 不同，登录态直接存在 Connection 上
 */
export function useSsoWs(server: WsServer) {
    server.flows.preApiCallFlow.push(async call => {
        const conn = call.conn as RoomServerConn;
        // 部分接口需要登录和加入房间后才可使用
        if (!call.service.name.startsWith('admin/') && call.service.name !== 'JoinRoom') {
            if (!conn.currentUser) {
                call.error('你还未登录', { code: 'NEED_LOGIN' });
                return undefined;
            }

            if (!conn.currentRoom) {
                call.error('尚未加入房间', { code: 'NO_ROOM' });
                return undefined;
            }
        }

        return call;
    });
}