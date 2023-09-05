import { ModuleDef } from "./ModuleDef";

export interface ISceneInfo{
    name:string;
    bundle?:string;
}

export class SceneDef {
    public static START = { name: 'start' };
    public static LOGIN = { name: 'login', bundle: ModuleDef.BASIC };
    public static LOBBY = { name: 'MatchScene', bundle: ModuleDef.METAVERSE };
    public static WORLD = { name: 'RoomScene', bundle: ModuleDef.METAVERSE };
}