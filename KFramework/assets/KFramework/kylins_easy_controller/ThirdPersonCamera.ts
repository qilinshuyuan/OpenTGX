import { _decorator, Component, Node, Vec3, v3 } from 'cc';
import { EasyController, EasyControllerEvent } from './EasyController';
const { ccclass, property } = _decorator;

const v3_1 = v3();
const v3_2 = v3();

const ROTATION_STRENGTH = 20.0;

@ccclass('ThirdPersonCamera')
export class ThirdPersonCamera extends Component {
    @property(Node)
    target: Node;

    @property
    lookAtOffset: Vec3 = v3();

    @property
    zoomSensitivity: number = 1.0;

    @property
    lenMin: number = 1.0;

    @property
    lenMax: number = 10.0;

    @property
    len: number = 5;

    @property
    rotateVHSeparately: boolean = false;

    @property
    tweenTime:number = 0.2;

    private _targetLen: number = 0;
    private _targetAngles: Vec3 = v3();


    start() {
        EasyController.on(EasyControllerEvent.CAMERA_ROTATE, this.onCameraRotate, this);
        EasyController.on(EasyControllerEvent.CAMERA_ZOOM, this.onCameraZoom, this);

        this._targetLen = this.len;
        this._targetAngles.set(this.node.eulerAngles);
    }

    onDestroy() {
        EasyController.off(EasyControllerEvent.CAMERA_ROTATE, this.onCameraRotate, this);
        EasyController.off(EasyControllerEvent.CAMERA_ZOOM, this.onCameraZoom, this);
    }

    lateUpdate(deltaTime: number) {
        if (!this.target) {
            return;
        }
        const t = Math.min(deltaTime / this.tweenTime, 1.0);
        //rotation
        v3_1.set(this.node.eulerAngles);
        Vec3.lerp(v3_1, v3_1, this._targetAngles, t);
        this.node.setRotationFromEuler(v3_1);

        //lookat
        v3_1.set(this.target.worldPosition);
        v3_1.add(this.lookAtOffset);

        //len and position
        this.len = this.len * (1.0 - t) + this._targetLen * t;
        v3_2.set(this.node.forward);
        v3_2.multiplyScalar(this.len);

        v3_1.subtract(v3_2);
        this.node.setPosition(v3_1);
    }

    onCameraRotate(deltaX: number, deltaY: number) {
        let eulerAngles = this.node.eulerAngles;
        if (this.rotateVHSeparately) {
            if (Math.abs(deltaX) > Math.abs(deltaY)) {
                deltaY = 0;
            }
            else {
                deltaX = 0;
            }
        }
        this._targetAngles.set(eulerAngles.x + deltaX * ROTATION_STRENGTH, eulerAngles.y + deltaY * ROTATION_STRENGTH, eulerAngles.z);
    }

    onCameraZoom(delta: number) {
        this._targetLen += delta * this.zoomSensitivity;
        if (this._targetLen < this.lenMin) {
            this._targetLen = this.lenMin;
        }
        if (this._targetLen > this.lenMax) {
            this._targetLen = this.lenMax;
        }
    }
}

