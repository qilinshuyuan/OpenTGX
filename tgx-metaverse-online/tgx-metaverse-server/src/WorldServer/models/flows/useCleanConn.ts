import { WsServer } from "tsrpc";
import { worldServer } from "../../../WorldServerMain";
import { WorldServerConn } from "../../WorldServer";

/** MasterServer 断开后清理 */
export function useCleanConn(server: WsServer<any>) {
    server.flows.postDisconnectFlow.push(v => {
        let conn = v.conn as WorldServerConn;

        // 退出已加入的子世界
        if (conn.currentSubWorld) {
            conn.currentSubWorld.leave(conn);
        }

        if(conn.currentUser){
            conn.currentUser = undefined;
        }

        // MasterServer 清空定时器
        if (conn.masterServer) {
            clearInterval(conn.masterServer.intervalSendState)
            if (worldServer.masterServerConn === conn) {
                worldServer.masterServerConn = undefined;
            }
        }

        return v;
    })
}