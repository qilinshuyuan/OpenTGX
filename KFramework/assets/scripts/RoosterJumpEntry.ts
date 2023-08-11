import { _decorator, assetManager, Component, game, Node } from 'cc';
import { UI_Joystick } from '../KFramework/kylins_easy_controller/UI_Joystick';
import { UIMgr } from '../KFramework/kylins_ui_framework/UIMgr';
import { UI_HUD } from './UIDef';
import { GameUILayer } from './GameUILayer';
const { ccclass, property } = _decorator;

@ccclass('RoosterJumpEntry')
export class RoosterJumpEntry extends Component {
    start() {
        UI_Joystick.inst.setButtonVisible('btn_slot_1',false);
        UI_Joystick.inst.setButtonVisible('btn_slot_2',false);
        UI_Joystick.inst.setButtonVisible('btn_slot_3',false);
        UI_Joystick.inst.setButtonVisible('btn_slot_4',false);

        game.frameRate = 61;

        UIMgr.inst.setup(GameUILayer.NUM);
        UIMgr.inst.showUI(UI_HUD);
    }

    update(deltaTime: number) {
        
    }
}

