import { ApiCallHttp } from "tsrpc";
import { matchServer } from "../../matchServer";
import { ReqStartMatch, ResStartMatch } from "../../shared/protocols/matchServer/PtlStartMatch";

export async function ApiStartMatch(call: ApiCallHttp<ReqStartMatch, ResStartMatch>) {
    // 加入匹配队列，待匹配
    matchServer.matchQueue.add(call);
}