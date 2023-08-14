import { _decorator, Component, Node, v3, Vec3, Vec2, v2, Prefab, instantiate } from 'cc';
import { EasyController, EasyControllerEvent } from '../../KFramework/kylins_easy_controller/EasyController';
const { ccclass, property } = _decorator;

const tempV2 = v2();

@ccclass('TankController')
export class TankController extends Component {
    @property(Prefab)
    bullet:Prefab;

    @property(Node)
    firePoint:Node;

    start() {
        EasyController.on(EasyControllerEvent.MOVEMENT, this.onMovement, this);
        EasyController.on(EasyControllerEvent.MOVEMENT_STOP, this.onMovementStop, this);
        EasyController.on(EasyControllerEvent.BUTTON, this.onButtonHit, this);
    }

    private _moveSpeed: number = 5;
    private _moveFactor: number = 0;
    private _moveDir: Vec2 = v2();

    onMovement(degree, strengthen) {
        let angle = degree / 180 * Math.PI;
        this.node.setRotationFromEuler(0, 0, degree);
        this._moveDir.set(Math.cos(angle), -Math.sin(angle));
        this._moveDir.normalize();
        console.log(this._moveDir.x,this._moveDir.y);
        this._moveFactor = strengthen;
    }

    onMovementStop() {
        this._moveFactor = 0;
    }

    onButtonHit(btnSlot:string){
        if(btnSlot == 'btn_slot_0'){
            let bullet = instantiate(this.bullet);
            this.node.parent.addChild(bullet);
            bullet.setWorldPosition(this.firePoint.worldPosition);
            bullet.setWorldRotation(this.node.worldRotation);
        }
    }

    onDestroy() {
        EasyController.off(EasyControllerEvent.MOVEMENT, this.onMovement, this);
        EasyController.off(EasyControllerEvent.MOVEMENT_STOP, this.onMovementStop, this);
        EasyController.off(EasyControllerEvent.BUTTON, this.onButtonHit, this);
    }



    update(deltaTime: number) {
        if (this._moveFactor) {
            Vec2.multiplyScalar(tempV2, this._moveDir, this._moveFactor * this._moveSpeed);
            let pos = this.node.position;
            this.node.setPosition(pos.x + tempV2.x, pos.y - tempV2.y, pos.z);
        }
    }
}


