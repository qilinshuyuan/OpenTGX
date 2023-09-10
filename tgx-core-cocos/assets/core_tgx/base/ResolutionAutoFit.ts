import { _decorator, Component, view, screen, Size, size, ResolutionPolicy } from 'cc';
const { ccclass, property } = _decorator;

const CHECK_INTERVAL = 0.1;

@ccclass('tgxResolutionAutoFit')
export class ResolutionAutoFit extends Component {
    private _oldSize:Size = size();
    start() {
        this.adjustResolutionPolicy();
    }

    private lastCheckTime = 0;
    update(deltaTime: number) {
        this.lastCheckTime+=deltaTime;
        if(this.lastCheckTime < CHECK_INTERVAL){
            return;
        }
        this.lastCheckTime = 0;

        this.adjustResolutionPolicy();
    }

    adjustResolutionPolicy(){
        let winSize = screen.windowSize;
        if(!this._oldSize.equals(winSize)){
            let ratio = winSize.width / winSize.height;
            let drs = view.getDesignResolutionSize();
            let drsRatio = drs.width / drs.height;

            if(ratio > drsRatio){
                //wider than desgin. fixed height
                view.setResolutionPolicy(ResolutionPolicy.FIXED_HEIGHT);
            }
            else{
                //
                view.setResolutionPolicy(ResolutionPolicy.FIXED_WIDTH);
            }
            this._oldSize.set(winSize);
        }
    }
}

