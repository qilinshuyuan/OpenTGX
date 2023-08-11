import { _decorator, assetManager, Component, director, game, Label, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('LoadingScene')
export class LoadingScene extends Component {
    @property(Label)
    txtLoading:Label;

    private _percent:string = '';
    start() {
        const entryScene = 'rooster_jump';
        assetManager.loadBundle('scenes_rpg',null,()=>{
            director.loadScene(entryScene);return;
            director.preloadScene(entryScene,(completedCount:number,totalCount:number)=>{
                this._percent = ~~(completedCount/totalCount*100) + '%';
            },()=>{
                director.loadScene(entryScene);
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


