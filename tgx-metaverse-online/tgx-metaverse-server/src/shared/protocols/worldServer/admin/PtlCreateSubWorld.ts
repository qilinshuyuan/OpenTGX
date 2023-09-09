import { BaseConf } from "../../base"

export interface ReqCreateSubWorld {
    adminToken: string,
    subWorldId:string,
    subWorldName: string,
    subWorldConfigId:string,
}

export interface ResCreateSubWorld {
    subWorldId: string
}

export const conf: BaseConf = {
    allowGuest: true
}