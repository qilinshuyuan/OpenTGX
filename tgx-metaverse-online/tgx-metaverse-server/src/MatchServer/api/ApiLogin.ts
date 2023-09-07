import { ApiCall, TsrpcError } from "tsrpc";
import { ReqLogin, ResLogin } from "../../shared/protocols/matchServer/PtlLogin";
import { UserDB } from "../UserDB";

export async function ApiLogin(call: ApiCall<ReqLogin, ResLogin>) {

    let userInfo = UserDB.getUserInfoWithPassword(call.req.account, call.req.password);

    if (!userInfo) {
        call.error('USER_NOT_EXISTS');
        return;
    }

    let token = UserDB.generateToken(call.req.account + call.req.password + Date.now().toString());

    UserDB.updateUserData(call.req.account, { token: token });

    call.succ({ token: token, name: userInfo.name, visualId: userInfo.visualId, uid: userInfo.uid, subWorldId: userInfo.subWorldId });
}