
export interface ReqWorldServerJoin {
    /** Token 用于鉴权 */
    adminToken: string,
    
    /** WorldServer 的连接地址 */
    serverUrl: string,
    //
    publicSubWorldList:string[]
}

export interface ResWorldServerJoin {

}