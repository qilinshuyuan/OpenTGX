import { WsServer } from "tsrpc";
/**
 * 登录态校验，WebSocket 与 HTTP 不同，登录态直接存在 Connection 上
 */
export function useSsoWs(server: WsServer) {
    server.flows.preApiCallFlow.push(async call => {
        const conn = call.conn as ;
        // 部分接口需要登录和加入子世界后才可使用
        if (!call.service.name.startsWith('admin/') && call.service.name !== 'Login' || ) {
            if (!conn.currentUser) {
                call.error('你还未登录', { code: 'NEED_LOGIN' });
                return undefined;
            }

            if (!conn.currentSubWorld) {
                call.error('尚未加入子世界', { code: 'NO_SUB_WORLD' });
                return undefined;
            }
        }

        return call;
    });
}