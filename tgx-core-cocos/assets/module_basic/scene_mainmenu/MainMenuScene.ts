import { _decorator, Component, Node } from 'cc';
import { tgxUIMgr } from '../../core_tgx/tgx';
import { UI_DemoList } from '../ui_demo_list/UI_DemoList';
const { ccclass, property } = _decorator;

@ccclass('MainMenuScene')
export class MainMenuScene extends Component {
    start() {
        tgxUIMgr.inst.showUI(UI_DemoList);
    }

    update(deltaTime: number) {
        
    }
}

