export interface ReqEnterSubWorld {
    token:string,
    subWorldId:string,
}

export interface ResEnterSubWorld {
    subWorldId:string,
    subWorldConfigId:string,
    token:string,
    time:number,
    worldServerUrl:string,
}
