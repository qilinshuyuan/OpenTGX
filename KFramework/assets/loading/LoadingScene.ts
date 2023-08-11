import { _decorator, assetManager, Component, director, game, Label, Node } from 'cc';
import { UIAlert } from '../KFramework/kylins_ui_framework/alert/UIAlert';
const { ccclass, property } = _decorator;

@ccclass('LoadingScene')
export class LoadingScene extends Component {
    @property(Label)
    txtLoading:Label;

    private _percent:string = '';
    private _preloadBundles = ['ui_base','scenes_rpg'];
    start() {
        let fnPreloadBundle = (idx)=>{
            assetManager.loadBundle(this._preloadBundles[idx],null,(err,bundle)=>{
                console.log(this._preloadBundles[idx] + 'loaded.');
                idx++;
                if(idx < this._preloadBundles.length){
                    fnPreloadBundle(idx);
                }
                else{
                    this.preloadScene();
                }
            });
        }
        
        fnPreloadBundle(0);
    }

    preloadScene(){
        const entryScene = 'rooster_jump';
        let now = Date.now();
        director.preloadScene(entryScene,(completedCount:number,totalCount:number)=>{
            this._percent = ~~(completedCount/totalCount*100) + '%';
        },()=>{
            console.log('preloadScene:' + (Date.now() - now) + ' ms');
            now = Date.now();
            director.loadScene(entryScene,()=>{
                console.log('loadScene:' + (Date.now() - now) + ' ms');
                UIAlert.show({content:'哈哈哈哈哈'});
            });
        });
    }

    private _loadingText = ['Loading.','Loading..','Loading...'];

    update(deltaTime: number) {
        if(this._percent){
            this.txtLoading.string = 'Loading...' + this._percent;
        }
        else{
            let idx = (~~(game.totalTime/1000))%3;
            this.txtLoading.string = this._loadingText[idx];
        }
    }
}


