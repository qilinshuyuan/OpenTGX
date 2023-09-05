import { _decorator, Camera, Component, find, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('FaceCamera')
export class FaceCamera extends Component {
    private _mainCamera:Node;
    start() {
        this._mainCamera = find('Main Camera');
    }

    update(deltaTime: number) {
        let cameraEuler = this._mainCamera.eulerAngles;
        this.node.setWorldRotationFromEuler(cameraEuler.x, cameraEuler.y , 0);
    }
}


