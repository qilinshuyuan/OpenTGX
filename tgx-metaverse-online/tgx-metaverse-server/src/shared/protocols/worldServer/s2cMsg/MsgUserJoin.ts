import { uint } from "tsrpc-proto"
import { UserInfo } from "../../../types/UserInfo"

/** 系统消息 */
export interface MsgUserJoin {
    time: Date,
    user: UserInfo,
    color: { r: uint, g: uint, b: uint }
}

// export const conf = {}