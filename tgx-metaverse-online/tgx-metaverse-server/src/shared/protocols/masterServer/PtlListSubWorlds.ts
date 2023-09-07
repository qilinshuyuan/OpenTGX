import { uint } from "tsrpc-proto";
export interface ReqListSubWorlds {

}

export interface ResListSubWorlds {
    subWorlds: {
        name: string,
        userNum: uint,
        maxUserNum: uint,
        serverUrl: string,
        subWorldId: string
    }[]
}