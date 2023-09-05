import { _decorator, Component, Node } from 'cc';
import { tgxUIMgr } from '../../core_tgx/tgx';
import { UILogin } from '../ui_login/UILogin';
const { ccclass, property } = _decorator;

@ccclass('LoginScene')
export class LoginScene extends Component {
    start() {
        tgxUIMgr.inst.hideAll();
        tgxUIMgr.inst.showUI(UILogin);
    }

    update(deltaTime: number) {
        
    }
}


