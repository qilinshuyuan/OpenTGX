import { AssetManager, Button, assetManager, director } from "cc";
import { GameUILayer } from "../../../scripts/GameUILayers";
import { SubModule, UI_DemoList, UI_HUD } from "../../../scripts/UIDef";
import { Layout_DemoList } from "./Layout_DemoList";
import { kfcUIMgr, kfcUIWaiting } from "../../../kfc/kfc";

const DemoList = [
    { bundle: 'demo_tank_game', entryScene: 'tank_game' },
    { bundle: 'demo_rpg_scene', entryScene: 'rooster_jump' },
];

export class UI_DemoList_Impl extends UI_DemoList {
    constructor() {
        super('ui_demo_list/UI_DemoList', GameUILayer.POPUP, Layout_DemoList);
    }

    public getRes(): [] {
        return [];
    }

    protected onCreated(): void {
        let layout = this.layout as Layout_DemoList;
       // layout.btnClose.node.active = false;
        this.onButtonEvent(layout.btnClose,()=>{
            this.hide();
        });
        
        for (let i = 0; i < layout.contentRoot.children.length; ++i) {
            let item = layout.contentRoot.children[i];
            let btn = item.getComponent(Button);
            this.onButtonEvent(btn, (currentTarget, info: { bundle: string, entryScene: string }) => {
                if(!info){
                    return;
                }
                let wt = kfcUIWaiting.show();
                assetManager.loadBundle(info.bundle,(err,bundle:AssetManager.Bundle)=>{
                    if(bundle){
                        director.loadScene(info.entryScene,()=>{
                            kfcUIMgr.inst.hideAll();
                            kfcUIMgr.inst.showUI(UI_HUD);
                        });
                    }
                });
            }, this, DemoList[i]);
        }
    }

    showCloseBtn(){
        let layout = this.layout as Layout_DemoList;
        layout.btnClose.node.active = true;
    }
}

SubModule.attachImplClass(UI_DemoList, UI_DemoList_Impl);