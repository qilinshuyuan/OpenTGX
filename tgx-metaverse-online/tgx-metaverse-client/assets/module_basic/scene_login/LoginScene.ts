import { _decorator, Component, Node } from 'cc';
import { tgxUIAlert, tgxUIMgr } from '../../core_tgx/tgx';
import { UILogin } from '../ui_login/UILogin';
import { NetUtil } from '../../module_metaverse/scripts/models/NetUtil';
import { SceneUtil2, SceneDef } from '../../scripts/SceneDef';
const { ccclass, property } = _decorator;

@ccclass('LoginScene')
export class LoginScene extends Component {
    start() {
        tgxUIMgr.inst.hideAll();
        tgxUIMgr.inst.showUI(UILogin);

        NetUtil.addErrorFilter('INVALID_TOKEN',()=>{
            tgxUIAlert.show('TOKEN 过期，请重新登录').onClick(() => {
                SceneUtil2.loadScene(SceneDef.LOGIN);
            });
        });
    }

    update(deltaTime: number) {
        
    }
}