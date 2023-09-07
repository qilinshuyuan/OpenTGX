import { ApiCall } from "tsrpc";
import { ReqCreateSubWorld, ResCreateSubWorld } from "../../../shared/protocols/worldServer/admin/PtlCreateSubWorld";
import { worldServer } from "../../../WorldServerMain";

export async function ApiCreateSubWorld(call: ApiCall<ReqCreateSubWorld, ResCreateSubWorld>) {
    let subWorld = worldServer.createSubWorld(call.req.subWorldName,call.req.subWorldId,call.req.levelId);

    call.succ({
        subWorldId: subWorld.data.id
    });
}