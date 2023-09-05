import { BaseConf } from "../../base"

export interface ReqCreateRoom {
    adminToken: string,
    roomName: string
}

export interface ResCreateRoom {
    roomId: string
}

export const conf: BaseConf = {
    allowGuest: true
}