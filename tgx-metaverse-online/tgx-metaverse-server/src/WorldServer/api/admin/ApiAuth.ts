import { ApiCall } from "tsrpc";
import { BackConfig } from "../../../models/BackConfig";
import { ReqAuth, ResAuth } from "../../../shared/protocols/worldServer/admin/PtlAuth";
import { worldServer } from "../../../WorldServerMain";
import { WorldServerConn } from "../../WorldServer";

export async function ApiAuth(call: ApiCall<ReqAuth, ResAuth>) {
    if (call.req.type === 'MasterServer') {
        let conn = call.conn as WorldServerConn;
        worldServer.masterServerConn = conn;

        conn.masterServer = {
            // 定时 Send State
            intervalSendState: setInterval(() => {
                conn.sendMsg('admin/UpdateSubWorldState', {
                    connNum: worldServer.server.connections.length,
                    subWorlds: worldServer.subWorlds.map(v => v.state)
                })
            }, BackConfig.worldServer.intervalSendState)
        };
    }

    call.succ({});
}