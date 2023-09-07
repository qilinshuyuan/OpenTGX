import { ApiCallHttp } from "tsrpc";
import { masterServer } from "../../MasterServerMain";
import { ReqStartMatch, ResStartMatch } from "../../shared/protocols/masterServer/PtlStartMatch";

export async function ApiStartMatch(call: ApiCallHttp<ReqStartMatch, ResStartMatch>) {
    // 加入匹配队列，待匹配
    masterServer.matchQueue.add(call);
}