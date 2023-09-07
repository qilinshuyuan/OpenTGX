import { ApiCall } from "tsrpc";
import { ReqCreateRole, ResCreateRole } from "../../shared/protocols/masterServer/PtlCreateRole";
import { UserDB } from "../UserDB";

export async function ApiCreateRole(call: ApiCall<ReqCreateRole, ResCreateRole>) {
    let req = call.req;
    let info = UserDB.getUserInfoByToken(req.token);
    if (!info) {
        call.error('INVALID_TOKEN');
        return;
    }

    UserDB.updateUserDataByToken(req.token, { name: req.name, visualId: req.visualId, subWorldId: 'level-001' });
    call.succ({ name: req.name, visualId: req.visualId });
}