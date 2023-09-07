import { ApiCall } from "tsrpc";
import { masterServer } from "../../MasterServerMain";
import { ReqListSubWorlds, ResListSubWorlds } from "../../shared/protocols/masterServer/PtlListSubWorlds";

export async function ApiListSubWorlds(call: ApiCall<ReqListSubWorlds, ResListSubWorlds>) {
    let subWorlds = masterServer.worldServers.reduce((prev, next) => {
        if (next.state) {
            prev = prev.concat(next.state.subWorlds.map(v => ({
                name: v.name,
                userNum: v.userNum,
                maxUserNum: v.maxUserNum,
                serverUrl: next.url,
                subWorldId: v.id,
                updateTime: v.updateTime
            })))
        }
        return prev;
    }, [] as (ResListSubWorlds['subWorlds'][0] & { updateTime: number })[])

    call.succ({
        subWorlds: subWorlds.orderByDesc(v => v.updateTime).filter(v => v.userNum > 0).slice(0, 100)
    });
}