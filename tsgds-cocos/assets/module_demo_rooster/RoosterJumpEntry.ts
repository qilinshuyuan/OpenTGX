import { _decorator, Component } from 'cc';
import { kfcUI_Joystick, kfcUIMgr } from '../kfc/kfc';
import { UI_HUD } from '../module_basic/ui_hud/UI_HUD';
const { ccclass, property } = _decorator;

@ccclass('RoosterJumpEntry')
export class RoosterJumpEntry extends Component {
    start() {
        kfcUI_Joystick.inst.setButtonVisible('btn_slot_1', false);
        kfcUI_Joystick.inst.setButtonVisible('btn_slot_2', false);
        kfcUI_Joystick.inst.setButtonVisible('btn_slot_3', false);
        kfcUI_Joystick.inst.setButtonVisible('btn_slot_4', false);

        kfcUIMgr.inst.showUI(UI_HUD);
    }

    update(deltaTime: number) {

    }
}

