import { ApiCall } from "tsrpc";
import { ReqEnterSubWorld, ResEnterSubWorld } from "../../shared/protocols/masterServer/PtlEnterSubWorld";
import { UserDB } from "../UserDB";
import { masterServer } from "../../MasterServerMain";
import { TokenUtils } from "../../TokenUtils";
import { MasterServerConn } from "../MasterServer";

export async function ApiEnterSubWorld(call: ApiCall<ReqEnterSubWorld, ResEnterSubWorld>) {
    let req = call.req;
    let info = (call.conn as MasterServerConn).userInfo;


    let worldServers = masterServer.getPublicSubWorldServers(req.subWorldId);
    if (!worldServers || !worldServers.length) {
        call.error('OUT_OF_SERVICE');
        return;
    }

    let worldServer = worldServers[0];

    let uid = info.uid || '0';
    let usrToken = info.token || '';
    let url = worldServer.url;
    let time = Math.floor(Date.now() / 1000);

    let token = TokenUtils.genWorldServerLoginToken(uid, url, req.subWorldId, time);

    UserDB.updateUserData(usrToken, { subWorldId: req.subWorldId });

    let subWorldConfigId = worldServer.subWorldMap.get(req.subWorldId)?.subWorldConfigId || '';
    
    call.succ({ subWorldId: req.subWorldId, subWorldConfigId: subWorldConfigId, worldServerUrl: url, token: token, time: time });
}