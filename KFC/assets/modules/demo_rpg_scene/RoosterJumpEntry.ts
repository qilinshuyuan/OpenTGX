import { _decorator, assetManager, Component, game, Node } from 'cc';
import { UI_HUD } from '../../scripts/UIDef';
import { kfcUI_Joystick, kfcUIMgr } from '../../kfc/kfc';
const { ccclass, property } = _decorator;

@ccclass('RoosterJumpEntry')
export class RoosterJumpEntry extends Component {
    start() {
        kfcUI_Joystick.inst.setButtonVisible('btn_slot_1',false);
        kfcUI_Joystick.inst.setButtonVisible('btn_slot_2',false);
        kfcUI_Joystick.inst.setButtonVisible('btn_slot_3',false);
        kfcUI_Joystick.inst.setButtonVisible('btn_slot_4',false);
        
        kfcUIMgr.inst.showUI(UI_HUD);
    }

    update(deltaTime: number) {
        
    }
}

