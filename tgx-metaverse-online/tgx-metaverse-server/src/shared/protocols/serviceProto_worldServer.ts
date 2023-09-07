import { ServiceProto } from 'tsrpc-proto';
import { MsgUpdateSubWorldState } from './worldServer/admin/MsgUpdateSubWorldState';
import { ReqAuth, ResAuth } from './worldServer/admin/PtlAuth';
import { ReqCreateSubWorld, ResCreateSubWorld } from './worldServer/admin/PtlCreateSubWorld';
import { MsgUserState } from './worldServer/clientMsg/MsgUserState';
import { ReqExitSubWorld, ResExitSubWorld } from './worldServer/PtlExitSubWorld';
import { ReqJoinSubWorld, ResJoinSubWorld } from './worldServer/PtlJoinSubWorld';
import { ReqSendChat, ResSendChat } from './worldServer/PtlSendChat';
import { MsgChat } from './worldServer/serverMsg/MsgChat';
import { MsgUserExit } from './worldServer/serverMsg/MsgUserExit';
import { MsgUserJoin } from './worldServer/serverMsg/MsgUserJoin';
import { MsgUserStates } from './worldServer/serverMsg/MsgUserStates';

export interface ServiceType {
    api: {
        "admin/Auth": {
            req: ReqAuth,
            res: ResAuth
        },
        "admin/CreateSubWorld": {
            req: ReqCreateSubWorld,
            res: ResCreateSubWorld
        },
        "ExitSubWorld": {
            req: ReqExitSubWorld,
            res: ResExitSubWorld
        },
        "JoinSubWorld": {
            req: ReqJoinSubWorld,
            res: ResJoinSubWorld
        },
        "SendChat": {
            req: ReqSendChat,
            res: ResSendChat
        }
    },
    msg: {
        "admin/UpdateSubWorldState": MsgUpdateSubWorldState,
        "clientMsg/UserState": MsgUserState,
        "serverMsg/Chat": MsgChat,
        "serverMsg/UserExit": MsgUserExit,
        "serverMsg/UserJoin": MsgUserJoin,
        "serverMsg/UserStates": MsgUserStates
    }
}

export const serviceProto: ServiceProto<ServiceType> = {
    "version": 5,
    "services": [
        {
            "id": 13,
            "name": "admin/UpdateSubWorldState",
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
            "id": 12,
            "name": "admin/CreateSubWorld",
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
            "id": 14,
            "name": "ExitSubWorld",
            "type": "api",
            "conf": {}
        },
        {
            "id": 15,
            "name": "JoinSubWorld",
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
        "admin/MsgUpdateSubWorldState/MsgUpdateSubWorldState": {
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
                    "name": "subWorlds",
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
                        "literal": "MasterServer"
                    }
                }
            ]
        },
        "admin/PtlAuth/ResAuth": {
            "type": "Interface"
        },
        "admin/PtlCreateSubWorld/ReqCreateSubWorld": {
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
                    "id": 4,
                    "name": "subWorldId",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 5,
                    "name": "subWorldName",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 3,
                    "name": "levelId",
                    "type": {
                        "type": "String"
                    }
                }
            ]
        },
        "admin/PtlCreateSubWorld/ResCreateSubWorld": {
            "type": "Interface",
            "properties": [
                {
                    "id": 1,
                    "name": "subWorldId",
                    "type": {
                        "type": "String"
                    }
                }
            ]
        },
        "clientMsg/MsgUserState/MsgUserState": {
            "target": {
                "type": "Reference",
                "target": "../../types/SubWorldUserState/SubWorldUserState"
            },
            "keys": [
                "uid"
            ],
            "type": "Omit"
        },
        "../../types/SubWorldUserState/SubWorldUserState": {
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
                        "target": "../../types/SubWorldUserState/PlayerAniState"
                    }
                }
            ]
        },
        "../../types/SubWorldUserState/PlayerAniState": {
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
        "PtlExitSubWorld/ReqExitSubWorld": {
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
        "PtlExitSubWorld/ResExitSubWorld": {
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
        "PtlJoinSubWorld/ReqJoinSubWorld": {
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
                    "name": "time",
                    "type": {
                        "type": "Number"
                    }
                },
                {
                    "id": 3,
                    "name": "subWorldId",
                    "type": {
                        "type": "String"
                    }
                }
            ]
        },
        "PtlJoinSubWorld/ResJoinSubWorld": {
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
                    "name": "subWorldData",
                    "type": {
                        "type": "Reference",
                        "target": "../../types/SubWorldData/SubWorldData"
                    }
                }
            ]
        },
        "../../types/UserInfo/UserInfo": {
            "type": "Interface",
            "properties": [
                {
                    "id": 2,
                    "name": "uid",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 3,
                    "name": "name",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 4,
                    "name": "visualId",
                    "type": {
                        "type": "Number"
                    }
                }
            ]
        },
        "../../types/SubWorldData/SubWorldData": {
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
                    "name": "levelId",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 3,
                    "name": "maxUser",
                    "type": {
                        "type": "Number",
                        "scalarType": "uint"
                    }
                },
                {
                    "id": 4,
                    "name": "users",
                    "type": {
                        "type": "Array",
                        "elementType": {
                            "type": "Reference",
                            "target": "../../types/UserInfo/UserInfo"
                        }
                    }
                },
                {
                    "id": 5,
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
                    "id": 6,
                    "name": "lastEmptyTime",
                    "type": {
                        "type": "Number"
                    },
                    "optional": true
                },
                {
                    "id": 7,
                    "name": "startMatchTime",
                    "type": {
                        "type": "Number"
                    },
                    "optional": true
                },
                {
                    "id": 8,
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
                                "target": "../../types/SubWorldUserState/SubWorldUserState"
                            }
                        }
                    }
                }
            ]
        }
    }
};