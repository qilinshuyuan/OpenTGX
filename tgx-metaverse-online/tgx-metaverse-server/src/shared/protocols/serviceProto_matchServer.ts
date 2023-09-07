import { ServiceProto } from 'tsrpc-proto';
import { ReqRequestUserInfo, ResRequestUserInfo } from './matchServer/admin/PtlRequestUserInfo';
import { ReqRoomServerJoin, ResRoomServerJoin } from './matchServer/admin/PtlRoomServerJoin';
import { ReqCreateRole, ResCreateRole } from './matchServer/PtlCreateRole';
import { ReqCreateRoom, ResCreateRoom } from './matchServer/PtlCreateRoom';
import { ReqEnterSubWorld, ResEnterSubWorld } from './matchServer/PtlEnterSubWorld';
import { ReqListRooms, ResListRooms } from './matchServer/PtlListRooms';
import { ReqLogin, ResLogin } from './matchServer/PtlLogin';
import { ReqRegister, ResRegister } from './matchServer/PtlRegister';
import { ReqStartMatch, ResStartMatch } from './matchServer/PtlStartMatch';

export interface ServiceType {
    api: {
        "admin/RequestUserInfo": {
            req: ReqRequestUserInfo,
            res: ResRequestUserInfo
        },
        "admin/RoomServerJoin": {
            req: ReqRoomServerJoin,
            res: ResRoomServerJoin
        },
        "CreateRole": {
            req: ReqCreateRole,
            res: ResCreateRole
        },
        "CreateRoom": {
            req: ReqCreateRoom,
            res: ResCreateRoom
        },
        "EnterSubWorld": {
            req: ReqEnterSubWorld,
            res: ResEnterSubWorld
        },
        "ListRooms": {
            req: ReqListRooms,
            res: ResListRooms
        },
        "Login": {
            req: ReqLogin,
            res: ResLogin
        },
        "Register": {
            req: ReqRegister,
            res: ResRegister
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
    "version": 1,
    "services": [
        {
            "id": 4,
            "name": "admin/RequestUserInfo",
            "type": "api"
        },
        {
            "id": 0,
            "name": "admin/RoomServerJoin",
            "type": "api"
        },
        {
            "id": 5,
            "name": "CreateRole",
            "type": "api"
        },
        {
            "id": 1,
            "name": "CreateRoom",
            "type": "api"
        },
        {
            "id": 6,
            "name": "EnterSubWorld",
            "type": "api"
        },
        {
            "id": 2,
            "name": "ListRooms",
            "type": "api"
        },
        {
            "id": 7,
            "name": "Login",
            "type": "api"
        },
        {
            "id": 8,
            "name": "Register",
            "type": "api"
        },
        {
            "id": 3,
            "name": "StartMatch",
            "type": "api"
        }
    ],
    "types": {
        "admin/PtlRequestUserInfo/ReqRequestUserInfo": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "uid",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 1,
                    "name": "inDetail",
                    "type": {
                        "type": "Boolean"
                    },
                    "optional": true
                }
            ]
        },
        "admin/PtlRequestUserInfo/ResRequestUserInfo": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "info",
                    "type": {
                        "type": "Reference",
                        "target": "../../types/UserInfo/UserInfo"
                    }
                }
            ]
        },
        "../../types/UserInfo/UserInfo": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "uid",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 1,
                    "name": "name",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 2,
                    "name": "visualId",
                    "type": {
                        "type": "Number"
                    }
                }
            ]
        },
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
                },
                {
                    "id": 2,
                    "name": "publicSubWorldList",
                    "type": {
                        "type": "Array",
                        "elementType": {
                            "type": "String"
                        }
                    }
                }
            ]
        },
        "admin/PtlRoomServerJoin/ResRoomServerJoin": {
            "type": "Interface"
        },
        "PtlCreateRole/ReqCreateRole": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "token",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 1,
                    "name": "name",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 2,
                    "name": "visualId",
                    "type": {
                        "type": "Number"
                    }
                }
            ]
        },
        "PtlCreateRole/ResCreateRole": {
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
                    "name": "visualId",
                    "type": {
                        "type": "Number"
                    }
                }
            ]
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
        "PtlEnterSubWorld/ReqEnterSubWorld": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "token",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 1,
                    "name": "subWorldId",
                    "type": {
                        "type": "String"
                    }
                }
            ]
        },
        "PtlEnterSubWorld/ResEnterSubWorld": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "token",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 1,
                    "name": "time",
                    "type": {
                        "type": "Number"
                    }
                },
                {
                    "id": 2,
                    "name": "worldServerUrl",
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
        "PtlLogin/ReqLogin": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "account",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 1,
                    "name": "password",
                    "type": {
                        "type": "String"
                    }
                }
            ]
        },
        "PtlLogin/ResLogin": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "token",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 1,
                    "name": "uid",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 2,
                    "name": "name",
                    "type": {
                        "type": "String"
                    },
                    "optional": true
                },
                {
                    "id": 3,
                    "name": "visualId",
                    "type": {
                        "type": "Number"
                    },
                    "optional": true
                },
                {
                    "id": 4,
                    "name": "subWorldId",
                    "type": {
                        "type": "String"
                    }
                }
            ]
        },
        "PtlRegister/ReqRegister": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "account",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 1,
                    "name": "password",
                    "type": {
                        "type": "String"
                    }
                }
            ]
        },
        "PtlRegister/ResRegister": {
            "type": "Interface"
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