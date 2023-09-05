import { ServiceProto } from 'tsrpc-proto';
import { ReqRoomServerJoin, ResRoomServerJoin } from './matchServer/admin/PtlRoomServerJoin';
import { ReqCreateRoom, ResCreateRoom } from './matchServer/PtlCreateRoom';
import { ReqListRooms, ResListRooms } from './matchServer/PtlListRooms';
import { ReqStartMatch, ResStartMatch } from './matchServer/PtlStartMatch';

export interface ServiceType {
    api: {
        "admin/RoomServerJoin": {
            req: ReqRoomServerJoin,
            res: ResRoomServerJoin
        },
        "CreateRoom": {
            req: ReqCreateRoom,
            res: ResCreateRoom
        },
        "ListRooms": {
            req: ReqListRooms,
            res: ResListRooms
        },
        "StartMatch": {
            req: ReqStartMatch,
            res: ResStartMatch
        }
    },
    msg: {

    }
}

export const serviceProto: ServiceProto<ServiceType> = {
    "services": [
        {
            "id": 0,
            "name": "admin/RoomServerJoin",
            "type": "api"
        },
        {
            "id": 1,
            "name": "CreateRoom",
            "type": "api"
        },
        {
            "id": 2,
            "name": "ListRooms",
            "type": "api"
        },
        {
            "id": 3,
            "name": "StartMatch",
            "type": "api"
        }
    ],
    "types": {
        "admin/PtlRoomServerJoin/ReqRoomServerJoin": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "serverUrl",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 1,
                    "name": "adminToken",
                    "type": {
                        "type": "String"
                    }
                }
            ]
        },
        "admin/PtlRoomServerJoin/ResRoomServerJoin": {
            "type": "Interface"
        },
        "PtlCreateRoom/ReqCreateRoom": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "roomName",
                    "type": {
                        "type": "String"
                    }
                }
            ]
        },
        "PtlCreateRoom/ResCreateRoom": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "serverUrl",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 1,
                    "name": "roomId",
                    "type": {
                        "type": "String"
                    }
                }
            ]
        },
        "PtlListRooms/ReqListRooms": {
            "type": "Interface"
        },
        "PtlListRooms/ResListRooms": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "rooms",
                    "type": {
                        "type": "Array",
                        "elementType": {
                            "type": "Interface",
                            "properties": [
                                {
                                    "id": 0,
                                    "name": "name",
                                    "type": {
                                        "type": "String"
                                    }
                                },
                                {
                                    "id": 1,
                                    "name": "userNum",
                                    "type": {
                                        "type": "Number",
                                        "scalarType": "uint"
                                    }
                                },
                                {
                                    "id": 2,
                                    "name": "maxUserNum",
                                    "type": {
                                        "type": "Number",
                                        "scalarType": "uint"
                                    }
                                },
                                {
                                    "id": 3,
                                    "name": "serverUrl",
                                    "type": {
                                        "type": "String"
                                    }
                                },
                                {
                                    "id": 4,
                                    "name": "roomId",
                                    "type": {
                                        "type": "String"
                                    }
                                }
                            ]
                        }
                    }
                }
            ]
        },
        "PtlStartMatch/ReqStartMatch": {
            "type": "Interface"
        },
        "PtlStartMatch/ResStartMatch": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "serverUrl",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 1,
                    "name": "roomId",
                    "type": {
                        "type": "String"
                    }
                }
            ]
        }
    }
};