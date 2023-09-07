import { BaseConf } from "../../base"

export interface ReqCreateSubWorld {
    adminToken: string,
    subWorldId:string,
    subWorldName: string,
    levelId:string,
}

export interface ResCreateSubWorld {
    subWorldId: string
}

export const conf: BaseConf = {
    allowGuest: true
}