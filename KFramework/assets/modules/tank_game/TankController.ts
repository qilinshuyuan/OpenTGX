import { _decorator, Component, Node, v3, Vec3, Vec2, v2, Prefab, instantiate, tween } from 'cc';
import { EasyController, EasyControllerEvent } from '../../KFramework/kylins_easy_controller/EasyController';
import { TankBullet } from './TankBullet';
import { AudioMgr } from '../../KFramework/kylins_base/AudioMgr';
const { ccclass, property } = _decorator;

const tempV2 = v2();

@ccclass('TankController')
export class TankController extends Component {
    @property(Prefab)
    bullet: Prefab;

    @property(Node)
    firePoint: Node;

    @property(Node)
    barrel: Node;

    @property
    moveSpeed: number = 100;

    start() {
        EasyController.on(EasyControllerEvent.MOVEMENT, this.onMovement, this);
        EasyController.on(EasyControllerEvent.MOVEMENT_STOP, this.onMovementStop, this);
        EasyController.on(EasyControllerEvent.BUTTON, this.onButtonHit, this);
    }

    private _moveFactor: number = 0;
    private _moveDir: Vec2 = v2(1, 0);

    private _fireCD = 1;
    private _isFiring = false;

    onMovement(degree, strengthen) {
        let angle = degree / 180 * Math.PI;
        this.node.setRotationFromEuler(0, 0, degree);
        this._moveDir.set(Math.cos(angle), Math.sin(angle));
        this._moveDir.normalize();
        this._moveFactor = strengthen;
    }

    onMovementStop() {
        this._moveFactor = 0;
    }

    onButtonHit(btnSlot: string) {
        if (btnSlot == 'btn_slot_0') {
            if (this._isFiring) {
                return;
            }
            this._isFiring = true;
            let bullet = instantiate(this.bullet);
            this.node.parent.addChild(bullet);
            bullet.setWorldPosition(this.firePoint.worldPosition);
            bullet.setWorldRotation(this.node.worldRotation);
            bullet.getComponent(TankBullet).moveDir = this._moveDir;

            AudioMgr.inst.playOneShot('sounds/sfx_shoot',1.0,'tank_game');

            //animation
            let oldPosX = this.barrel.position.x;
            tween(this.barrel).to(0.05, { position: v3(oldPosX - 10, 0, 0) })
                .then(tween(this.barrel).to(0.2, { position: v3(oldPosX, 0, 0) })).call(() => {
                    this._isFiring = false;
                })
                .start();
        }
    }

    onDestroy() {
        EasyController.off(EasyControllerEvent.MOVEMENT, this.onMovement, this);
        EasyController.off(EasyControllerEvent.MOVEMENT_STOP, this.onMovementStop, this);
        EasyController.off(EasyControllerEvent.BUTTON, this.onButtonHit, this);
    }



    update(deltaTime: number) {
        if (this._moveFactor) {
            Vec2.multiplyScalar(tempV2, this._moveDir, this._moveFactor * this.moveSpeed * deltaTime);
            let pos = this.node.position;
            this.node.setPosition(pos.x + tempV2.x, pos.y + tempV2.y, pos.z);
        }
    }
}


