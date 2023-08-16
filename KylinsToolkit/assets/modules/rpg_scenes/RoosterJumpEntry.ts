import { _decorator, assetManager, Component, game, Node } from 'cc';
import { UI_HUD } from '../../scripts/UIDef';
import { kfc } from '../../KFC/KFC';
const { ccclass, property } = _decorator;

@ccclass('RoosterJumpEntry')
export class RoosterJumpEntry extends Component {
    start() {
        kfc.UI_Joystick.inst.setButtonVisible('btn_slot_1',false);
        kfc.UI_Joystick.inst.setButtonVisible('btn_slot_2',false);
        kfc.UI_Joystick.inst.setButtonVisible('btn_slot_3',false);
        kfc.UI_Joystick.inst.setButtonVisible('btn_slot_4',false);
        
        kfc.uiMgr.showUI(UI_HUD);
    }

    update(deltaTime: number) {
        
    }
}

