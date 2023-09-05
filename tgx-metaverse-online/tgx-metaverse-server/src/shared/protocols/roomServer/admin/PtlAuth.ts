import { BaseConf } from "../../base"

export interface ReqAuth {
    adminToken: string,
    type: 'MatchServer'
}

export interface ResAuth {

}

export const conf: BaseConf = {
    allowGuest: true
}