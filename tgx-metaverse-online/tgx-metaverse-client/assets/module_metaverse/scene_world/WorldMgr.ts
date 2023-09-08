import { WsClient } from "tsrpc-browser";
import { tgxUIAlert } from "../../core_tgx/tgx";
import { SceneDef, SceneUtil } from "../../scripts/SceneDef";
import { NetUtil } from "../scripts/models/NetUtil";
import { ServiceType } from "../../module_basic/shared/protocols/serviceProto_worldServer";

let _worldConn: WsClient<ServiceType> = null;
let _worldServerUrl = '';
let _playerNum:number = 0;

export class WorldMgr{
    public static createWorldConnection(worldServerUrl:string){
        _worldServerUrl = worldServerUrl;
        _worldConn = NetUtil.createWorldClient(worldServerUrl);

        _worldConn.flows.postDisconnectFlow.push(v => {
            if (!v.isManual) {
                this.backToLogin();
            }
            return v;
        });
    }

    public static backToLogin(){
        tgxUIAlert.show("链接已断开，请重新登录").onClick(() => {
            SceneUtil.loadScene(SceneDef.LOGIN);
        });
    }

    public static set playerNum(v:number){
        _playerNum = v;
    }

    public static get playerNum(){
        return _playerNum;
    }

    public static get worldConn(){
        return _worldConn;
    }

    public static get worldServerUrl(){
        return _worldServerUrl;
    }
}