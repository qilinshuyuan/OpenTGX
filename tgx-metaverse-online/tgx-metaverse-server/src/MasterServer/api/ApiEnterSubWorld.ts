import { ApiCall } from "tsrpc";
import { ReqEnterSubWorld, ResEnterSubWorld } from "../../shared/protocols/masterServer/PtlEnterSubWorld";
import { UserDB } from "../UserDB";
import { masterServer } from "../../MasterServerMain";
import { TokenUtils } from "../../TokenUtils";

export async function ApiEnterSubWorld(call: ApiCall<ReqEnterSubWorld, ResEnterSubWorld>) {
    let req = call.req;
    let info = UserDB.getUserInfoByToken(req.token);
    if (!info) {
        call.error('INVALID_TOKEN');
        return;
    }

    let worldServers = masterServer.getPublicSubWorldServers(req.subWorldId);
    if (!worldServers || !worldServers.length) {
        call.error('OUT_OF_SERVICE');
        return;
    }

    let worldServer = worldServers[0];

    let uid = info.uid;
    let url = worldServer.url;
    let time = Math.floor(Date.now() / 1000);

    let token = TokenUtils.genWorldServerLoginToken(uid, url, req.subWorldId, time);

    UserDB.updateUserData(info.token, { subWorldId: req.subWorldId });

    let subWorldConfigId = worldServer.subWorldMap.get(req.subWorldId)?.subWorldConfigId || '';
    
    call.succ({ subWorldId: req.subWorldId, subWorldConfigId: subWorldConfigId, worldServerUrl: url, token: token, time: time });
}