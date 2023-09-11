import { _decorator, Component, Node } from 'cc';
import { tgxUIAlert, tgxUIMgr } from '../../core_tgx/tgx';
import { UILogin } from '../ui_login/UILogin';
import { SceneUtil, SceneDef } from '../../scripts/SceneDef';
import { NetUtil } from '../scripts/NetUtil';
const { ccclass, property } = _decorator;

@ccclass('LoginScene')
export class LoginScene extends Component {
    start() {
        tgxUIMgr.inst.hideAll();
        tgxUIMgr.inst.showUI(UILogin);

        NetUtil.addErrorFilter('INVALID_TOKEN',()=>{
            tgxUIAlert.show('TOKEN 过期，请重新登录').onClick(() => {
                SceneUtil.loadScene(SceneDef.LOGIN);
            });
        });
    }

    update(deltaTime: number) {
        
    }
}