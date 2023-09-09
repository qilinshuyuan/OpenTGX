export interface ReqCreateSubWorld {
    subWorldName: string,
    subWorldConfigId:string,
}

export interface ResCreateSubWorld {
    serverUrl: string,
    subWorldId: string
}