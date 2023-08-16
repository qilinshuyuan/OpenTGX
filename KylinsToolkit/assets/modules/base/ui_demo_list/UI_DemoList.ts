import { AssetManager, Button, assetManager, director } from "cc";
import { GameUILayer } from "../../../scripts/GameUILayer";
import { SubModule, UI_DemoList, UI_HUD } from "../../../scripts/UIDef";
import { Layout_DemoList } from "./Layout_DemoList";
import { kfc } from "../../../KFC/KFC";

const DemoList = [
    { bundle: 'tank_game', entryScene: 'tank_game' },
    { bundle: 'rpg_scenes', entryScene: 'rooster_jump' },
];

export class UI_DemoList_Impl extends UI_DemoList {
    constructor() {
        super('ui_demo_list/UI_DemoList', GameUILayer.POPUP0, Layout_DemoList);
    }

    public getRes(): [] {
        return [];
    }

    protected onCreated(): void {
        let layout = this.layout as Layout_DemoList;
        layout.btnClose.node.active = false;
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
                let wt = kfc.UIWaiting.show();
                assetManager.loadBundle(info.bundle,(err,bundle:AssetManager.Bundle)=>{
                    if(bundle){
                        director.loadScene(info.entryScene,()=>{
                            kfc.uiMgr.hideAll();
                            kfc.uiMgr.showUI(UI_HUD);
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