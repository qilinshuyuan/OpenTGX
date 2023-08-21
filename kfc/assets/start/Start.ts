import { _decorator, assetManager, Component, director, game, Label, Prefab } from 'cc';
import { GameUILayers, GameUILayerNames } from '../scripts/GameUILayers';
import { kfcUIMgr, kfcUIAlert, kfcUIWaiting, kfcSetDefaultModule } from '../kfc/kfc';
import { ModuleDef } from '../scripts/ModuleDef';
const { ccclass, property } = _decorator;

const _preloadBundles = [ModuleDef.BASIC];

const _preloadRes = [
    { bundle: ModuleDef.BASIC, url: 'ui_alert/UI_Alert', type: 'prefab' },
    { bundle: ModuleDef.BASIC, url: 'ui_waiting/UI_Waiting', type: 'prefab' },
    { bundle: ModuleDef.BASIC, url: 'ui_demo_list/UI_DemoList', type: 'prefab' },
];

@ccclass('Start')
export class Start extends Component {
    @property(Label)
    txtLoading: Label;

    @property(Prefab)
    uiCanvasPrefab: Prefab;


    private _percent: string = '';
    start() {

        kfcSetDefaultModule(ModuleDef.BASIC);

        game.frameRate = 61;
        kfcUIMgr.inst.setup(this.uiCanvasPrefab, GameUILayers.NUM, GameUILayerNames);

        this.preloadBundle(0);
    }

    preloadBundle(idx: number) {
        assetManager.loadBundle(_preloadBundles[idx], null, (err, bundle) => {
            console.log('module:<' + _preloadBundles[idx] + '>loaded.');
            idx++;
            if (idx < _preloadBundles.length) {
                this.preloadBundle(idx);
            }
            else {
                this.preloadRes(0);
            }
        });
    }

    preloadRes(idx: number) {
        let res = _preloadRes[idx];
        let bundle = assetManager.getBundle(res.bundle);

        let onComplete = () => {
            idx++;
            if (idx < _preloadRes.length) {
                this.preloadRes(idx);
            }
            else {
                this.onPreloadingComplete();
            }
        }
        if (bundle) {
            if (res.type == 'prefab') {
                bundle.preload(res.url, Prefab, onComplete);
            }
        }
    }

    onPreloadingComplete() {
        this.txtLoading.node.active = false;
        let bundle = assetManager.getBundle(ModuleDef.BASIC);
        bundle.preloadScene('main_menu',()=>{
            director.loadScene('main_menu');
        });
    }
    /*
        preloadScene() {
            const entryBundle = 'tank_game';
            const entryScene = 'tank_game';
            let bundle = assetManager.getBundle(entryBundle);
            if (!bundle) {
                kfcUIAlert.show('Can not find bundle:' + entryBundle);
                return;
            }
            let now = Date.now();
            bundle.preloadScene(entryScene, (completedCount: number, totalCount: number) => {
                this._percent = ~~(completedCount / totalCount * 100) + '%';
            }, () => {
                console.log('preloadScene costs ' + (Date.now() - now) + ' ms');
                kfcUIAlert.show('加载完成，进入游戏').onClick((isOK: boolean) => {
                    now = Date.now();
                    let uw = kfcUIWaiting.show();
                    director.loadScene(entryScene, () => {
                        console.log('loadScene costs ' + (Date.now() - now) + ' ms');
                        uw.hide();
                    });
                });
            });
        }
    */
    private _loadingText = ['Loading.', 'Loading..', 'Loading...'];

    update(deltaTime: number) {
        if (this._percent) {
            this.txtLoading.string = 'Loading...' + this._percent;
        }
        else {
            let idx = (~~(game.totalTime / 1000)) % 3;
            this.txtLoading.string = this._loadingText[idx];
        }
    }
}


