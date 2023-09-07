import { UserInfo } from "../../../types/UserInfo"

export interface ReqRequestUserInfo {
    /** Token 用于鉴权 */
    adminToken: string,
    //
    uid:string,
    inDetail?:boolean
}

export interface ResRequestUserInfo {
    info:UserInfo
}
