import { uint } from "tsrpc-proto";
export interface ReqListRooms {

}

export interface ResListRooms {
    rooms: {
        name: string,
        userNum: uint,
        maxUserNum: uint,
        serverUrl: string,
        roomId: string
    }[]
}