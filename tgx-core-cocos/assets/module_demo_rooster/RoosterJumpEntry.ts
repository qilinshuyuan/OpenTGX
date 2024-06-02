import { _decorator, Component } from 'cc';
import { UI_HUD } from '../module_basic/ui_hud/UI_HUD';
const { ccclass, property } = _decorator;

@ccclass('RoosterJumpEntry')
export class RoosterJumpEntry extends Component {
    start() {
        tgx.UIJoystick.inst.setButtonVisible('btn_slot_1', false);
        tgx.UIJoystick.inst.setButtonVisible('btn_slot_2', false);
        tgx.UIJoystick.inst.setButtonVisible('btn_slot_3', false);
        tgx.UIJoystick.inst.setButtonVisible('btn_slot_4', false);

        tgx.UIMgr.inst.showUI(UI_HUD);
    }

    update(deltaTime: number) {

    }
}

