import { ApiCall } from "tsrpc";
import { matchServer } from "../../matchServer";
import { ReqCreateRoom, ResCreateRoom } from "../../shared/protocols/matchServer/PtlCreateRoom";

export async function ApiCreateRoom(call: ApiCall<ReqCreateRoom, ResCreateRoom>) {
    // 参数校验
    if (!call.req.roomName) {
        return call.error('请输入房间名称');
    }

    let ret = await matchServer.createRoom(call.req.roomName);
    ret.isSucc ? call.succ(ret.res) : call.error(ret.err)
}