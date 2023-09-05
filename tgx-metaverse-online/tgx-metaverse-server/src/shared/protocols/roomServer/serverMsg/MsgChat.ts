import { UserInfo } from "../../../types/UserInfo";

export interface MsgChat {
    time: Date,
    user: UserInfo,
    content: string
}