import { BaseConf } from "../../base"

export interface ReqAuth {
    adminToken: string,
    type: 'MasterServer'
}

export interface ResAuth {

}

export const conf: BaseConf = {
    allowGuest: true
}