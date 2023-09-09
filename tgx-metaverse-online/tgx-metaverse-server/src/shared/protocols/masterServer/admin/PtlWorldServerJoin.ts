
export interface ReqWorldServerJoin {
    /** Token 用于鉴权 */
    adminToken: string,

    /** WorldServer 的连接地址 */
    serverUrl: string,
    //
    subWorldList: { subWorldId: string, subWorldConfigId: string }[]
}

export interface ResWorldServerJoin {

}