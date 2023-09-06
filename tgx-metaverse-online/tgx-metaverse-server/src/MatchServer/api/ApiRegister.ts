import { ApiCall } from "tsrpc";
import { ReqRegister, ResRegister } from "../../shared/protocols/matchServer/PtlRegister";
import { UserDB } from "../UserDB";

export async function ApiRegister(call: ApiCall<ReqRegister, ResRegister>) {
    let hasUser = UserDB.hasUser(call.req.account);

    if (hasUser) {
        call.error('USER_HAS_BEEN_EXIST');
        return;
    }

    UserDB.insterNewUser(call.req.account, call.req.password);

    call.succ({});
}