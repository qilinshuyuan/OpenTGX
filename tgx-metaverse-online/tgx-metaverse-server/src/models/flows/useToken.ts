import { BaseServer } from "tsrpc";
import { UserDB } from "../../MasterServer/UserDB";
import { MasterServerConn } from "../../MasterServer/MasterServer";
/**
 * 登录态校验，WebSocket 与 HTTP 不同，登录态直接存在 Connection 上
 */
export function useSsoWs(server: BaseServer<any>) {
    server.flows.preApiCallFlow.push(async call => {
        const conn = call.conn as MasterServerConn;
        // 部分接口需要登录和加入子世界后才可使用
        if (!call.service.name.startsWith('admin/') && (call.service.name !== 'Login' && call.service.name !== 'Register')) {
            let token = call.req.token;
            if (!token) {
                call.error('INVALID_TOKEN');
                return undefined;
            }

            let userInfo = UserDB.getUserInfoByToken(token);
            if (!userInfo) {
                call.error('INVALID_TOKEN');
                return undefined;
            }

            conn.userInfo = userInfo;
        }

        return call;
    });
}