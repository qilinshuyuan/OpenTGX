import { uint } from "tsrpc-proto";

export interface MsgUpdateRoomState {
    connNum: uint,
    rooms: {
        id: string,
        name: string,
        userNum: uint,
        maxUserNum: uint,
        /** 为 undefined 代表不在匹配中 */
        startMatchTime?: uint,
        // 房间信息的最后更新时间
        updateTime: uint
    }[]
}

// export const conf = {}