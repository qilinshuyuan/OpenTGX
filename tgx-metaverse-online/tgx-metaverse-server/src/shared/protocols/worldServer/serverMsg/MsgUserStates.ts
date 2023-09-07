import { SubWorldUserState } from "../../../types/SubWorldUserState";

/** 同步玩家状态 */
export interface MsgUserStates {
    userStates: {
        [uid: string]: SubWorldUserState
    }
}