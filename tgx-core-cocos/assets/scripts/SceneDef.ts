import { AssetManager, assetManager, director } from "cc";
import { tgxUIMgr } from "../core_tgx/tgx";
import { ModuleDef } from "./ModuleDef";

export interface ISceneInfo {
    name: string;
    bundle?: string;
}

export class SceneDef {
    public static START = { name: 'start' };
    public static MAIN_MENU = { name: 'main_menu', bundle: ModuleDef.BASIC };
    public static TANK_GAME = { name: 'tank_game', bundle: ModuleDef.DEMO_TANK };
    public static ROOSTER_JUMP = { name: 'rooster_jump', bundle: ModuleDef.DEMO_ROOSTER };
}


export class SceneUtil {
    static sceneParams: any;
    static loadScene(scene: ISceneInfo, params?: any) {
        this.sceneParams = params;
        let bundle = assetManager.getBundle(scene.bundle);
        if (bundle) {
            director.loadScene(scene.name, () => {
                tgxUIMgr.inst.hideAll();
            });
        }
        else {
            assetManager.loadBundle(scene.bundle, (err, bundle: AssetManager.Bundle) => {
                if (bundle) {
                    director.loadScene(scene.name, () => {
                        tgxUIMgr.inst.hideAll();
                    });
                }
            })
        }
    }
}