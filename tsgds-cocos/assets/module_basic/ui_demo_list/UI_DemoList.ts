import { Button, assetManager, AssetManager, director } from "cc";
import { GameUILayers } from "../../scripts/GameUILayers";
import { Layout_DemoList } from "./Layout_DemoList";
import { ModuleDef } from "../../scripts/ModuleDef";
import { UI_HUD } from "../ui_hud/UI_HUD";
import { tgUIController, tgUIMgr, tgUIWaiting } from "../../core_tsgds/tsgds";

const DemoList = [
    { bundle: ModuleDef.DEMO_TANK, entryScene: 'tank_game' },
    { bundle: ModuleDef.DEMO_ROOSTER, entryScene: 'rooster_jump' },
];

export class UI_DemoList extends tgUIController {
    constructor() {
        super('ui_demo_list/UI_DemoList', GameUILayers.POPUP, Layout_DemoList);
    }

    public getRes(): [] {
        return [];
    }

    protected onCreated(): void {
        let layout = this.layout as Layout_DemoList;
        layout.btnClose.node.active = false;
        this.onButtonEvent(layout.btnClose, () => {
            this.hide();
        });

        for (let i = 0; i < layout.contentRoot.children.length; ++i) {
            let item = layout.contentRoot.children[i];
            let btn = item.getComponent(Button);
            this.onButtonEvent(btn, (currentTarget, info: { bundle: string, entryScene: string }) => {
                if (!info) {
                    return;
                }
                let wt = tgUIWaiting.show();
                assetManager.loadBundle(info.bundle, (err, bundle: AssetManager.Bundle) => {
                    if (bundle) {
                        director.loadScene(info.entryScene, () => {
                            tgUIMgr.inst.hideAll();
                            tgUIMgr.inst.showUI(UI_HUD);
                        });
                    }
                });
            }, this, DemoList[i]);
        }
    }

    showCloseBtn() {
        let layout = this.layout as Layout_DemoList;
        layout.btnClose.node.active = true;
    }
}