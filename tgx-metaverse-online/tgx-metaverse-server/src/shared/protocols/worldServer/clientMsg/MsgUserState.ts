import { SubWorldUserState } from "../../../types/SubWorldUserState";

export type MsgUserState = Omit<SubWorldUserState, 'uid'>