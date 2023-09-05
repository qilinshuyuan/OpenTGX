import { _decorator, Camera, Component, find, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('FaceCamera')
export class FaceCamera extends Component {
    private _mainCamera:Node;
    start() {
        this._mainCamera = find('Main Camera');
    }

    update(deltaTime: number) {
        this.node.setWorldRotationFromEuler(0, this._mainCamera.eulerAngles.y ,0);
    }
}


