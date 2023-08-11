import { _decorator, Component, Node, screen, macro, view, director, game, profiler } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('FullScreenCtrl')
export class FullScreenCtrl extends Component {

    @property(Node)
    btnEnterFullScreen: Node;

    @property(Node)
    btnExitFullScreen: Node;

    start(){
        game.frameRate = 59;
    }

    onToggleStats(){
        if(profiler.isShowingStats()){
            profiler.hideStats();
        }
        else{
            profiler.showStats();
        }
    }

    onEnterFullScreen() {
        view.setOrientation(macro.ORIENTATION_LANDSCAPE);
        screen.requestFullScreen();
    }

    onExitFullScreen() {
        screen.exitFullScreen();
    }

    update() {
        let isFullScreen = screen.fullScreen();
        this.btnEnterFullScreen.active = !isFullScreen;
        this.btnExitFullScreen.active = isFullScreen;
    }
}

