import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('FollowTarget')
export class FollowTarget extends Component {
    @property(Node) target:Node;

    start() {

    }

    lateUpdate(deltaTime: number) {
        if(this.target){
            let tp = this.target.worldPosition;
            let sp = this.node.worldPosition;
            this.node.setWorldPosition(tp.x,tp.y,sp.z);
        }    
    }
}

