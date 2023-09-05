import { RoomUserState } from "../../../types/RoomUserState";

/** 同步玩家状态 */
export interface MsgUserStates {
    userStates: {
        [uid: string]: RoomUserState
    }
}