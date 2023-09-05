import { RoomData } from "../../types/RoomData";
import { UserInfo } from "../../types/UserInfo";
import { BaseConf, BaseRequest, BaseResponse } from "./../base";

export interface ReqJoinRoom extends BaseRequest {
    nickname: string,
    roomId: string
}

export interface ResJoinRoom extends BaseResponse {
    currentUser: UserInfo,
    roomData: RoomData
}

export const conf: BaseConf = {

}