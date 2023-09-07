
export interface ReqRoomServerJoin {
    /** RoomServer 的连接地址 */
    serverUrl: string,
    /** Token 用于鉴权 */
    adminToken: string,
    //
    publicSubWorldList:string[]
}

export interface ResRoomServerJoin {

}