import { _decorator, assetManager, Component, director, find, game, Label, Node, Prefab } from 'cc';
import { UIAlert } from '../KFramework/kylins_ui_framework/alert/UIAlert';
import { UIMgr } from '../KFramework/kylins_ui_framework/UIMgr';
import { GameUILayer } from '../scripts/GameUILayer';
import { UIWaiting } from '../KFramework/kylins_ui_framework/waiting/UIWaiting';
const { ccclass, property } = _decorator;

const _preloadBundles = ['base', 'rpg_scenes'];

const _preloadRes = [
    { bundle: 'base', url: 'ui_alert/UI_Alert', type: 'prefab' },
    { bundle: 'base', url: 'ui_waiting/UI_Waiting', type: 'prefab' },
];

@ccclass('PreLoadingScene')
export class LoadingScene extends Component {
    @property(Label)
    txtLoading: Label;

    private _percent: string = '';
    start() {
        game.frameRate = 61;
        UIMgr.inst.setup(find('UICanvas'), GameUILayer.NUM);

        this.preloadBundle(0);
    }

    preloadBundle(idx: number) {
        assetManager.loadBundle(_preloadBundles[idx], null, (err, bundle) => {
            console.log(_preloadBundles[idx] + 'loaded.');
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
        res.bundle
        let bundle = assetManager.getBundle(res.bundle);

        let onComplete = () => {
            idx++;
            if (idx < _preloadRes.length) {
                this.preloadRes(idx);
            }
            else {
                this.preloadScene();
            }
        }
        if (bundle) {
            if (res.type == 'prefab') {
                bundle.preload(res.url, Prefab, onComplete);
            }
        }
    }

    preloadScene() {
        const entryScene = 'rooster_jump';
        let bundle = assetManager.getBundle('rpg_scenes');
        let now = Date.now();
        bundle.preloadScene(entryScene, (completedCount: number, totalCount: number) => {
            this._percent = ~~(completedCount / totalCount * 100) + '%';
        }, () => {
            console.log('preloadScene costs ' + (Date.now() - now) + ' ms');
            UIAlert.show('加载完成，进入游戏').onClick((isOK: boolean) => {
                now = Date.now();
                let uw = UIWaiting.show();
                director.loadScene(entryScene, () => {
                    console.log('loadScene costs ' + (Date.now() - now) + ' ms');
                    uw.hide();
                });
            });
        });
    }

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


