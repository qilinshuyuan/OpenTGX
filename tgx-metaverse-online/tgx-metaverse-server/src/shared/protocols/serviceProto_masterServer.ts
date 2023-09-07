import { ServiceProto } from 'tsrpc-proto';
import { ReqRequestUserInfo, ResRequestUserInfo } from './masterServer/admin/PtlRequestUserInfo';
import { ReqWorldServerJoin, ResWorldServerJoin } from './masterServer/admin/PtlWorldServerJoin';
import { ReqCreateRole, ResCreateRole } from './masterServer/PtlCreateRole';
import { ReqCreateSubWorld, ResCreateSubWorld } from './masterServer/PtlCreateSubWorld';
import { ReqEnterSubWorld, ResEnterSubWorld } from './masterServer/PtlEnterSubWorld';
import { ReqListSubWorlds, ResListSubWorlds } from './masterServer/PtlListSubWorlds';
import { ReqLogin, ResLogin } from './masterServer/PtlLogin';
import { ReqRegister, ResRegister } from './masterServer/PtlRegister';
import { ReqStartMatch, ResStartMatch } from './masterServer/PtlStartMatch';

export interface ServiceType {
    api: {
        "admin/RequestUserInfo": {
            req: ReqRequestUserInfo,
            res: ResRequestUserInfo
        },
        "admin/WorldServerJoin": {
            req: ReqWorldServerJoin,
            res: ResWorldServerJoin
        },
        "CreateRole": {
            req: ReqCreateRole,
            res: ResCreateRole
        },
        "CreateSubWorld": {
            req: ReqCreateSubWorld,
            res: ResCreateSubWorld
        },
        "EnterSubWorld": {
            req: ReqEnterSubWorld,
            res: ResEnterSubWorld
        },
        "ListSubWorlds": {
            req: ReqListSubWorlds,
            res: ResListSubWorlds
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
    "version": 4,
    "services": [
        {
            "id": 4,
            "name": "admin/RequestUserInfo",
            "type": "api"
        },
        {
            "id": 0,
            "name": "admin/WorldServerJoin",
            "type": "api"
        },
        {
            "id": 5,
            "name": "CreateRole",
            "type": "api"
        },
        {
            "id": 9,
            "name": "CreateSubWorld",
            "type": "api"
        },
        {
            "id": 6,
            "name": "EnterSubWorld",
            "type": "api"
        },
        {
            "id": 10,
            "name": "ListSubWorlds",
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
        "admin/PtlWorldServerJoin/ReqWorldServerJoin": {
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
        "admin/PtlWorldServerJoin/ResWorldServerJoin": {
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
        "PtlCreateSubWorld/ReqCreateSubWorld": {
            "type": "Interface",
            "properties": [
                {
                    "id": 1,
                    "name": "subWorldName",
                    "type": {
                        "type": "String"
                    }
                }
            ]
        },
        "PtlCreateSubWorld/ResCreateSubWorld": {
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
                    "id": 2,
                    "name": "subWorldId",
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
        "PtlListSubWorlds/ReqListSubWorlds": {
            "type": "Interface"
        },
        "PtlListSubWorlds/ResListSubWorlds": {
            "type": "Interface",
            "properties": [
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
                                    "name": "subWorldId",
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
                    "id": 2,
                    "name": "subWorldId",
                    "type": {
                        "type": "String"
                    }
                }
            ]
        }
    }
};