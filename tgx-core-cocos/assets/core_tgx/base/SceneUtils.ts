import { assetManager, director, AssetManager } from "cc";
export class ISceneInfo {
    name: string;
    bundle?: string;
}

export class SceneUtil {
    static async reloadScene(){
        return new Promise((resolve, reject) => {
            director.loadScene(director.getScene().name,()=>{
                resolve(true);
            });
        });
    }
    static async loadScene(scene: ISceneInfo) {
        return new Promise((resolve, reject) => {
            let bundle = assetManager.getBundle(scene.bundle);
            if (bundle) {
                director.loadScene(scene.name, () => {
                    resolve(true);
                });
            }
            else {
                assetManager.loadBundle(scene.bundle, (err, bundle: AssetManager.Bundle) => {
                    if (bundle) {
                        director.loadScene(scene.name, () => {
                            resolve(true);
                        });
                    }
                })
            }
        });
    }
}