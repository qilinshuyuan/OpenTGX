import { AssetManager, assetManager, director } from "cc";
import { tgxUIMgr } from "../core_tgx/tgx";
import { ModuleDef } from "./ModuleDef";

export interface ISceneInfo {
    name: string;
    bundle?: string;
}

export class SceneDef {
    public static START = { name: 'start' };
    public static LOGIN = { name: 'login', bundle: ModuleDef.BASIC };
    public static CREATE_ROLE = { name: 'create_role', bundle: ModuleDef.METAVERSE };
    public static WORLD = { name: 'world', bundle: ModuleDef.METAVERSE };
}

export class SceneUtil {
    static sceneParams: any;
    static loadScene(scene: ISceneInfo, params?:any) {
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