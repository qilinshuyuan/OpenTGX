import { RoomUserState } from "../../../types/RoomUserState";

export type MsgUserState = Omit<RoomUserState, 'uid'>