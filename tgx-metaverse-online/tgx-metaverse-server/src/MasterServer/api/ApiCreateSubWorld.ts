import { ApiCall } from "tsrpc";
import { masterServer } from "../../MasterServerMain";
import { ReqCreateSubWorld, ResCreateSubWorld } from "../../shared/protocols/masterServer/PtlCreateSubWorld";

export async function ApiCreateSubWorld(call: ApiCall<ReqCreateSubWorld, ResCreateSubWorld>) {
    // 参数校验
    if (!call.req.subWorldName) {
        return call.error('请输入一个名称');
    }

    let ret = await masterServer.createSubWorld(call.req.subWorldName, call.req.subWorldConfigId);
    ret.isSucc ? call.succ(ret.res) : call.error(ret.err);
}