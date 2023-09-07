import { SubWorldData } from "../../types/SubWorldData";
import { UserInfo } from "../../types/UserInfo";
import { BaseConf, BaseRequest, BaseResponse } from "../base";

export interface ReqJoinSubWorld extends BaseRequest {
    token:string,
    uid:string,
    time:number,
    subWorldId:string,
}

export interface ResJoinSubWorld extends BaseResponse {
    currentUser: UserInfo,
    subWorldData: SubWorldData
}

export const conf: BaseConf = {

}