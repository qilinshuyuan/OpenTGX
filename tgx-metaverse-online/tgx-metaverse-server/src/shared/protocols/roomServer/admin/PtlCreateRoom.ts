import { BaseConf } from "../../base"

export interface ReqCreateRoom {
    adminToken: string,
    roomId:string,
    roomName: string,
    levelId:string,
}

export interface ResCreateRoom {
    roomId: string
}

export const conf: BaseConf = {
    allowGuest: true
}