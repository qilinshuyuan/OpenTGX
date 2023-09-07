import { ApiCall } from "tsrpc";
import { ReqExitSubWorld, ResExitSubWorld } from "../../shared/protocols/worldServer/PtlExitSubWorld";
import { WorldServerConn } from "../WorldServer";

export async function ApiExitSubWorld(call: ApiCall<ReqExitSubWorld, ResExitSubWorld>) {
    const conn = call.conn as WorldServerConn;
    if (conn.currentSubWorld) {
        conn.currentSubWorld.leave(conn);
    }

    call.succ({});
}