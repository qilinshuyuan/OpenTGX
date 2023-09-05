import { ServiceProto } from 'tsrpc-proto';
import { MsgUpdateRoomState } from './roomServer/admin/MsgUpdateRoomState';
import { ReqAuth, ResAuth } from './roomServer/admin/PtlAuth';
import { ReqCreateRoom, ResCreateRoom } from './roomServer/admin/PtlCreateRoom';
import { MsgUserState } from './roomServer/clientMsg/MsgUserState';
import { ReqExitRoom, ResExitRoom } from './roomServer/PtlExitRoom';
import { ReqJoinRoom, ResJoinRoom } from './roomServer/PtlJoinRoom';
import { ReqSendChat, ResSendChat } from './roomServer/PtlSendChat';
import { MsgChat } from './roomServer/serverMsg/MsgChat';
import { MsgUserExit } from './roomServer/serverMsg/MsgUserExit';
import { MsgUserJoin } from './roomServer/serverMsg/MsgUserJoin';
import { MsgUserStates } from './roomServer/serverMsg/MsgUserStates';

export interface ServiceType {
    api: {
        "admin/Auth": {
            req: ReqAuth,
            res: ResAuth
        },
        "admin/CreateRoom": {
            req: ReqCreateRoom,
            res: ResCreateRoom
        },
        "ExitRoom": {
            req: ReqExitRoom,
            res: ResExitRoom
        },
        "JoinRoom": {
            req: ReqJoinRoom,
            res: ResJoinRoom
        },
        "SendChat": {
            req: ReqSendChat,
            res: ResSendChat
        }
    },
    msg: {
        "admin/UpdateRoomState": MsgUpdateRoomState,
        "clientMsg/UserState": MsgUserState,
        "serverMsg/Chat": MsgChat,
        "serverMsg/UserExit": MsgUserExit,
        "serverMsg/UserJoin": MsgUserJoin,
        "serverMsg/UserStates": MsgUserStates
    }
}

export const serviceProto: ServiceProto<ServiceType> = {
    "version": 1,
    "services": [
        {
            "id": 0,
            "name": "admin/UpdateRoomState",
            "type": "msg"
        },
        {
            "id": 1,
            "name": "admin/Auth",
            "type": "api",
            "conf": {
                "allowGuest": true
            }
        },
        {
            "id": 2,
            "name": "admin/CreateRoom",
            "type": "api",
            "conf": {
                "allowGuest": true
            }
        },
        {
            "id": 3,
            "name": "clientMsg/UserState",
            "type": "msg"
        },
        {
            "id": 4,
            "name": "ExitRoom",
            "type": "api",
            "conf": {}
        },
        {
            "id": 5,
            "name": "JoinRoom",
            "type": "api",
            "conf": {}
        },
        {
            "id": 6,
            "name": "SendChat",
            "type": "api",
            "conf": {}
        },
        {
            "id": 7,
            "name": "serverMsg/Chat",
            "type": "msg"
        },
        {
            "id": 8,
            "name": "serverMsg/UserExit",
            "type": "msg"
        },
        {
            "id": 9,
            "name": "serverMsg/UserJoin",
            "type": "msg"
        },
        {
            "id": 10,
            "name": "serverMsg/UserStates",
            "type": "msg"
        }
    ],
    "types": {
        "admin/MsgUpdateRoomState/MsgUpdateRoomState": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "connNum",
                    "type": {
                        "type": "Number",
                        "scalarType": "uint"
                    }
                },
                {
                    "id": 1,
                    "name": "rooms",
                    "type": {
                        "type": "Array",
                        "elementType": {
                            "type": "Interface",
                            "properties": [
                                {
                                    "id": 0,
                                    "name": "id",
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
                                    "name": "userNum",
                                    "type": {
                                        "type": "Number",
                                        "scalarType": "uint"
                                    }
                                },
                                {
                                    "id": 3,
                                    "name": "maxUserNum",
                                    "type": {
                                        "type": "Number",
                                        "scalarType": "uint"
                                    }
                                },
                                {
                                    "id": 4,
                                    "name": "startMatchTime",
                                    "type": {
                                        "type": "Number",
                                        "scalarType": "uint"
                                    },
                                    "optional": true
                                },
                                {
                                    "id": 5,
                                    "name": "updateTime",
                                    "type": {
                                        "type": "Number",
                                        "scalarType": "uint"
                                    }
                                }
                            ]
                        }
                    }
                }
            ]
        },
        "admin/PtlAuth/ReqAuth": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "adminToken",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 1,
                    "name": "type",
                    "type": {
                        "type": "Literal",
                        "literal": "MatchServer"
                    }
                }
            ]
        },
        "admin/PtlAuth/ResAuth": {
            "type": "Interface"
        },
        "admin/PtlCreateRoom/ReqCreateRoom": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "adminToken",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 1,
                    "name": "roomName",
                    "type": {
                        "type": "String"
                    }
                }
            ]
        },
        "admin/PtlCreateRoom/ResCreateRoom": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "roomId",
                    "type": {
                        "type": "String"
                    }
                }
            ]
        },
        "clientMsg/MsgUserState/MsgUserState": {
            "target": {
                "type": "Reference",
                "target": "../../types/RoomUserState/RoomUserState"
            },
            "keys": [
                "uid"
            ],
            "type": "Omit"
        },
        "../../types/RoomUserState/RoomUserState": {
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
                    "name": "pos",
                    "type": {
                        "type": "Interface",
                        "properties": [
                            {
                                "id": 0,
                                "name": "x",
                                "type": {
                                    "type": "Number"
                                }
                            },
                            {
                                "id": 1,
                                "name": "y",
                                "type": {
                                    "type": "Number"
                                }
                            },
                            {
                                "id": 2,
                                "name": "z",
                                "type": {
                                    "type": "Number"
                                }
                            }
                        ]
                    }
                },
                {
                    "id": 2,
                    "name": "rotation",
                    "type": {
                        "type": "Interface",
                        "properties": [
                            {
                                "id": 0,
                                "name": "x",
                                "type": {
                                    "type": "Number"
                                }
                            },
                            {
                                "id": 1,
                                "name": "y",
                                "type": {
                                    "type": "Number"
                                }
                            },
                            {
                                "id": 2,
                                "name": "z",
                                "type": {
                                    "type": "Number"
                                }
                            },
                            {
                                "id": 3,
                                "name": "w",
                                "type": {
                                    "type": "Number"
                                }
                            }
                        ]
                    }
                },
                {
                    "id": 3,
                    "name": "aniState",
                    "type": {
                        "type": "Reference",
                        "target": "../../types/RoomUserState/PlayerAniState"
                    }
                }
            ]
        },
        "../../types/RoomUserState/PlayerAniState": {
            "type": "Union",
            "members": [
                {
                    "id": 0,
                    "type": {
                        "type": "Literal",
                        "literal": "idle"
                    }
                },
                {
                    "id": 1,
                    "type": {
                        "type": "Literal",
                        "literal": "walking"
                    }
                },
                {
                    "id": 2,
                    "type": {
                        "type": "Literal",
                        "literal": "wave"
                    }
                },
                {
                    "id": 3,
                    "type": {
                        "type": "Literal",
                        "literal": "punch"
                    }
                },
                {
                    "id": 4,
                    "type": {
                        "type": "Literal",
                        "literal": "dance"
                    }
                }
            ]
        },
        "PtlExitRoom/ReqExitRoom": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "../base/BaseRequest"
                    }
                }
            ]
        },
        "../base/BaseRequest": {
            "type": "Interface"
        },
        "PtlExitRoom/ResExitRoom": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "../base/BaseResponse"
                    }
                }
            ]
        },
        "../base/BaseResponse": {
            "type": "Interface"
        },
        "PtlJoinRoom/ReqJoinRoom": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "../base/BaseRequest"
                    }
                }
            ],
            "properties": [
                {
                    "id": 0,
                    "name": "nickname",
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
        "PtlJoinRoom/ResJoinRoom": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "../base/BaseResponse"
                    }
                }
            ],
            "properties": [
                {
                    "id": 0,
                    "name": "currentUser",
                    "type": {
                        "type": "Reference",
                        "target": "../../types/UserInfo/UserInfo"
                    }
                },
                {
                    "id": 1,
                    "name": "roomData",
                    "type": {
                        "type": "Reference",
                        "target": "../../types/RoomData/RoomData"
                    }
                }
            ]
        },
        "../../types/UserInfo/UserInfo": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "id",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 1,
                    "name": "nickname",
                    "type": {
                        "type": "String"
                    }
                }
            ]
        },
        "../../types/RoomData/RoomData": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "id",
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
                    "name": "maxUser",
                    "type": {
                        "type": "Number",
                        "scalarType": "uint"
                    }
                },
                {
                    "id": 3,
                    "name": "users",
                    "type": {
                        "type": "Array",
                        "elementType": {
                            "type": "Intersection",
                            "members": [
                                {
                                    "id": 0,
                                    "type": {
                                        "type": "Reference",
                                        "target": "../../types/UserInfo/UserInfo"
                                    }
                                },
                                {
                                    "id": 1,
                                    "type": {
                                        "type": "Interface",
                                        "properties": [
                                            {
                                                "id": 0,
                                                "name": "color",
                                                "type": {
                                                    "type": "Interface",
                                                    "properties": [
                                                        {
                                                            "id": 0,
                                                            "name": "r",
                                                            "type": {
                                                                "type": "Number",
                                                                "scalarType": "uint"
                                                            }
                                                        },
                                                        {
                                                            "id": 1,
                                                            "name": "g",
                                                            "type": {
                                                                "type": "Number",
                                                                "scalarType": "uint"
                                                            }
                                                        },
                                                        {
                                                            "id": 2,
                                                            "name": "b",
                                                            "type": {
                                                                "type": "Number",
                                                                "scalarType": "uint"
                                                            }
                                                        }
                                                    ]
                                                }
                                            }
                                        ]
                                    }
                                }
                            ]
                        }
                    }
                },
                {
                    "id": 4,
                    "name": "messages",
                    "type": {
                        "type": "Array",
                        "elementType": {
                            "type": "Interface",
                            "properties": [
                                {
                                    "id": 0,
                                    "name": "user",
                                    "type": {
                                        "type": "Reference",
                                        "target": "../../types/UserInfo/UserInfo"
                                    }
                                },
                                {
                                    "id": 1,
                                    "name": "time",
                                    "type": {
                                        "type": "Date"
                                    }
                                },
                                {
                                    "id": 2,
                                    "name": "content",
                                    "type": {
                                        "type": "String"
                                    }
                                }
                            ]
                        }
                    }
                },
                {
                    "id": 5,
                    "name": "lastEmptyTime",
                    "type": {
                        "type": "Number"
                    },
                    "optional": true
                },
                {
                    "id": 6,
                    "name": "startMatchTime",
                    "type": {
                        "type": "Number"
                    },
                    "optional": true
                },
                {
                    "id": 7,
                    "name": "updateTime",
                    "type": {
                        "type": "Number"
                    }
                }
            ]
        },
        "PtlSendChat/ReqSendChat": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "../base/BaseRequest"
                    }
                }
            ],
            "properties": [
                {
                    "id": 0,
                    "name": "content",
                    "type": {
                        "type": "String"
                    }
                }
            ]
        },
        "PtlSendChat/ResSendChat": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "../base/BaseResponse"
                    }
                }
            ]
        },
        "serverMsg/MsgChat/MsgChat": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "time",
                    "type": {
                        "type": "Date"
                    }
                },
                {
                    "id": 1,
                    "name": "user",
                    "type": {
                        "type": "Reference",
                        "target": "../../types/UserInfo/UserInfo"
                    }
                },
                {
                    "id": 2,
                    "name": "content",
                    "type": {
                        "type": "String"
                    }
                }
            ]
        },
        "serverMsg/MsgUserExit/MsgUserExit": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "time",
                    "type": {
                        "type": "Date"
                    }
                },
                {
                    "id": 1,
                    "name": "user",
                    "type": {
                        "type": "Reference",
                        "target": "../../types/UserInfo/UserInfo"
                    }
                }
            ]
        },
        "serverMsg/MsgUserJoin/MsgUserJoin": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "time",
                    "type": {
                        "type": "Date"
                    }
                },
                {
                    "id": 1,
                    "name": "user",
                    "type": {
                        "type": "Reference",
                        "target": "../../types/UserInfo/UserInfo"
                    }
                },
                {
                    "id": 2,
                    "name": "color",
                    "type": {
                        "type": "Interface",
                        "properties": [
                            {
                                "id": 0,
                                "name": "r",
                                "type": {
                                    "type": "Number",
                                    "scalarType": "uint"
                                }
                            },
                            {
                                "id": 1,
                                "name": "g",
                                "type": {
                                    "type": "Number",
                                    "scalarType": "uint"
                                }
                            },
                            {
                                "id": 2,
                                "name": "b",
                                "type": {
                                    "type": "Number",
                                    "scalarType": "uint"
                                }
                            }
                        ]
                    }
                }
            ]
        },
        "serverMsg/MsgUserStates/MsgUserStates": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "userStates",
                    "type": {
                        "type": "Interface",
                        "indexSignature": {
                            "keyType": "String",
                            "type": {
                                "type": "Reference",
                                "target": "../../types/RoomUserState/RoomUserState"
                            }
                        }
                    }
                }
            ]
        }
    }
};