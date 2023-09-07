import { UserInfo } from "../../../types/UserInfo"

export interface ReqRequestUserInfo {
    uid:string,
    inDetail?:boolean
}

export interface ResRequestUserInfo {
    info:UserInfo
}
