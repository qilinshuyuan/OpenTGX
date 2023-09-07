import { ApiCall } from "tsrpc";
import { ReqRequestUserInfo, ResRequestUserInfo } from "../../../shared/protocols/masterServer/admin/PtlRequestUserInfo";
import { UserDB } from "../../UserDB";

export async function ApiRequestUserInfo(call: ApiCall<ReqRequestUserInfo, ResRequestUserInfo>) {
    let uid = call.req.uid;
    if(uid){
        let info = UserDB.getUserInfoByUid(uid);
        if(info){
            call.succ({info:{uid:uid,name:info.name,visualId:info.visualId}});
        }
    }
}