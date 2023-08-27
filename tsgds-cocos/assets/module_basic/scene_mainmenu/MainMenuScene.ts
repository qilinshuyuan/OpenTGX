import { _decorator, Component, Node } from 'cc';
import { tgUIMgr } from '../../core_tsgds/tsgds';
import { UI_DemoList } from '../ui_demo_list/UI_DemoList';
const { ccclass, property } = _decorator;

@ccclass('MainMenuScene')
export class MainMenuScene extends Component {
    start() {
        tgUIMgr.inst.showUI(UI_DemoList);
    }

    update(deltaTime: number) {
        
    }
}

