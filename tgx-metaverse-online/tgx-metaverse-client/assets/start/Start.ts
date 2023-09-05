import { _decorator, assetManager, Component, director, game, Label, Prefab, Node, AssetManager } from 'cc';
import { tgxModuleContext, tgxUIMgr } from '../core_tgx/tgx';
import { GameUILayers, GameUILayerNames } from '../scripts/GameUILayers';

import { ModuleDef } from '../scripts/ModuleDef';
import { SceneDef } from '../scripts/SceneDef';
const { ccclass, property } = _decorator;

const _preloadBundles = [ModuleDef.BASIC];
const _preloadScenes = [SceneDef.LOBBY];

const _preloadRes = [
    { bundle: ModuleDef.BASIC, url: 'ui_alert/UI_Alert', type: 'prefab' },
    { bundle: ModuleDef.BASIC, url: 'ui_waiting/UI_Waiting', type: 'prefab' },
];

for (let i = 0; i < _preloadScenes.length; ++i) {
    let sceneInfo = _preloadScenes[i];
    let idx = _preloadBundles.indexOf(sceneInfo.bundle);
    if (idx == -1) {
        _preloadBundles.push(sceneInfo.bundle);
    }
    _preloadRes.push({ bundle: sceneInfo.bundle, url: sceneInfo.name, type: 'scene' });
}

const _loadingText = ['Loading.', 'Loading..', 'Loading...'];
const _totalNum = _preloadBundles.length + _preloadRes.length;

@ccclass('Start')
export class Start extends Component {
    @property(Label)
    txtLoading: Label;

    @property(Prefab)
    uiCanvasPrefab: Prefab;

    @property(Node)
    loadingBar: Node;

    private _percent: string = '';
    private _numCurrentLoaded = 0;
    start() {
        tgxModuleContext.setDefaultModule(ModuleDef.BASIC);

        game.frameRate = 61;
        tgxUIMgr.inst.setup(this.uiCanvasPrefab, GameUILayers.NUM, GameUILayerNames);

        this.preloadBundle(0);
    }

    onResLoaded() {
        this._numCurrentLoaded++;
        this._percent = ~~(this._numCurrentLoaded / _totalNum * 100) + '%';
    }

    preloadBundle(idx: number) {
        assetManager.loadBundle(_preloadBundles[idx], null, (err, bundle) => {
            console.log('module:<' + _preloadBundles[idx] + '>loaded.');
            idx++;
            this.onResLoaded();
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
            this.onResLoaded();
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
            else if (res.type == 'scene') {
                bundle.preloadScene(res.url, onComplete);
            }
        }
    }

    onPreloadingComplete() {
        let sceneInfo = SceneDef.LOBBY;
        director.loadScene(sceneInfo.name);
    }

    update(deltaTime: number) {
        if (this._percent) {
            this.txtLoading.string = 'Loading...' + this._percent;
        }
        else {
            let idx = Math.floor(game.totalTime / 1000) % 3;
            this.txtLoading.string = _loadingText[idx];
        }
        this.loadingBar.setScale(this._numCurrentLoaded / _totalNum, 1, 1);
    }
}


