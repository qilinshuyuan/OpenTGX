import { _decorator, Component } from 'cc';
import { tgUI_Joystick, tgUIMgr } from '../core_tsgds/tsgds';
import { UI_HUD } from '../module_basic/ui_hud/UI_HUD';
const { ccclass, property } = _decorator;

@ccclass('RoosterJumpEntry')
export class RoosterJumpEntry extends Component {
    start() {
        tgUI_Joystick.inst.setButtonVisible('btn_slot_1', false);
        tgUI_Joystick.inst.setButtonVisible('btn_slot_2', false);
        tgUI_Joystick.inst.setButtonVisible('btn_slot_3', false);
        tgUI_Joystick.inst.setButtonVisible('btn_slot_4', false);

        tgUIMgr.inst.showUI(UI_HUD);
    }

    update(deltaTime: number) {

    }
}

