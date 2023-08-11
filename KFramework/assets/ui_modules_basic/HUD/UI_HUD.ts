import { profiler, view, macro, screen } from "cc";
import { UIController } from "../../KFramework/kylins_ui_framework/UIController";
import { Layout_UI_HUD } from "./Layout_HUD";
import { GameUILayer } from "../GameUILayer";
import { UIMgr } from "../../KFramework/kylins_ui_framework/UIMgr";
import { UIDef, UIModule } from "../../scripts/UIDef";
export class UI_HUD extends UIController {
    constructor() {
        super('HUD/UI_HUD', GameUILayer.HUD, Layout_UI_HUD, UIModule.UI_Module_Basic);
    }

    public getRes(): [] {
        return [];
    }

    //子类的所有操作，需要在这个函数之后。
    protected onCreated() {
        let layout = this.layout as Layout_UI_HUD;
        this.onButtonEvent(layout.btnEnterFullScreen, this.onEnterFullScreen, this);

        this.onButtonEvent(layout.btnExitFullScreen, this.onExitFullScreen, this);

        this.onButtonEvent(layout.btnToggleStats, this.onToggleStats, this);

        this.onButtonEvent(layout.btnAbout, () => {
            //UIMgr.inst.showUI(UI_AboutMe, null, null);
        });
    }

    onToggleStats() {
        if (profiler.isShowingStats()) {
            profiler.hideStats();
        }
        else {
            profiler.showStats();
        }
    }

    onEnterFullScreen() {
        view.setOrientation(macro.ORIENTATION_LANDSCAPE);
        screen.requestFullScreen();
        let isFullScreen = screen.fullScreen();
        let layout = this.layout as Layout_UI_HUD;
        layout.btnEnterFullScreen.active = !isFullScreen;
        layout.btnExitFullScreen.active = isFullScreen;
    }

    onExitFullScreen() {
        screen.exitFullScreen();
        let isFullScreen = screen.fullScreen();
        let layout = this.layout as Layout_UI_HUD;
        layout.btnEnterFullScreen.active = !isFullScreen;
        layout.btnExitFullScreen.active = isFullScreen;
    }

    //销毁
    protected onDispose() {

    }
    //
    protected onUpdate() {

    }
}

UIModule.addUIClass(UIDef.UI_HUD, UI_HUD);