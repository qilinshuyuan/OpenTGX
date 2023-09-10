import { _decorator, Component, Node, Vec3, v3, Camera } from 'cc';
const { ccclass, property } = _decorator;

const tmpV3 = v3();

@ccclass('tgxFollowCamera2D')
export class FollowCamera2D extends Component {
    @property(Node)
    target:Node;

    @property
    offset:Vec3 = v3();

    protected _camera:Camera;

    start() {
        this._camera = this.node.getComponent(Camera);
    }

    lateUpdate(deltaTime: number) {
        this.target.getWorldPosition(tmpV3);
        tmpV3.add(this.offset);
        this.node.worldPosition = tmpV3;   
    }
}


