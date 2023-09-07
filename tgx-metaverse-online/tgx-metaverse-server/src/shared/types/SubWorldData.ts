import { uint } from "tsrpc-proto"
import { UserInfo } from "./UserInfo"

export interface SubWorldData {
    id: string,
    name: string,
    //分区
    levelId:string,
    /** 可容纳的最大人数 */
    maxUser: uint,
    /** 当前用户信息 */
    users: UserInfo[],
    /** 历史消息（只保留最近的 N 条） */
    messages: {
        user: UserInfo,
        time: Date,
        content: string
    }[],

    /**
     * 上一次空房的时间（undefined 代表房内有人）
     * 用于定时解散无人的子世界
     */
    lastEmptyTime?: number,

    /**
     * 开始匹配的时间，`undefined` 代表不在匹配中
     */
    startMatchTime?: number,

    /** 信息的最后更新时间 */
    updateTime: number
}