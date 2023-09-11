import { ApiCall } from "tsrpc";
import { ReqCreateRole, ResCreateRole } from "../../shared/protocols/masterServer/PtlCreateRole";
import { UserDB } from "../UserDB";

export async function ApiCreateRole(call: ApiCall<ReqCreateRole, ResCreateRole>) {
    let req = call.req;
    let subWorldId = 'world-001';
    UserDB.updateUserDataByToken(req.token, { name: req.name, visualId: req.visualId, subWorldId: subWorldId });
    call.succ({ name: req.name, visualId: req.visualId, subWorldId:subWorldId });
}