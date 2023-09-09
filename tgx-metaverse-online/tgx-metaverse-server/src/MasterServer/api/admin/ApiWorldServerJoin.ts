import { ApiCall } from "tsrpc";
import { masterServer } from "../../../MasterServerMain";
import { BackConfig } from "../../../models/BackConfig";
import { ReqWorldServerJoin, ResWorldServerJoin } from "../../../shared/protocols/masterServer/admin/PtlWorldServerJoin";

export async function ApiWorldServerJoin(call: ApiCall<ReqWorldServerJoin, ResWorldServerJoin>) {
    // 鉴权
    if (call.req.adminToken !== BackConfig.adminToken) {
        return call.error('非法操作');
    }

    await masterServer.joinWorldServer(call.req.serverUrl,call.req.subWorldList);
    call.succ({});
}