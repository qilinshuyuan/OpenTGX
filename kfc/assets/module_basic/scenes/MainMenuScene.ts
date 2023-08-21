import { _decorator, Component, Node } from 'cc';
import { kfcUIMgr } from '../../kfc/kfc';
import { UI_DemoList } from '../ui_demo_list/UI_DemoList';
const { ccclass, property } = _decorator;

@ccclass('MainMenuScene')
export class MainMenuScene extends Component {
    start() {
        kfcUIMgr.inst.showUI(UI_DemoList);
    }

    update(deltaTime: number) {
        
    }
}

