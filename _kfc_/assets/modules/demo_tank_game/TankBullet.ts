import { _decorator, Component, instantiate, Node, Prefab, Quat, v2 } from 'cc';
import { TankGameAudioMgr } from './TankGameAudioMgr';
const { ccclass, property } = _decorator;

@ccclass('TankBullet')
export class TankBullet extends Component {

    @property
    moveSpeed: number = 200;

    @property
    lifeTime: number = 3000;

    @property(Prefab)
    efx: Prefab;

    private _lifeStart = 0;
    private _moveDir = v2();
    public set moveDir(v) {
        this._moveDir.set(v);
    }
    start() {
        this._lifeStart = Date.now();
    }

    update(deltaTime: number) {
        if (this._lifeStart + this.lifeTime < Date.now()) {
            let efx = instantiate(this.efx);
            this.node.parent.addChild(efx);
            efx.setWorldPosition(this.node.worldPosition);
            efx.setWorldRotation(this.node.worldRotation);
            TankGameAudioMgr.playOneShot('sounds/sfx_boom', 1.0);
            this.node.destroy();
            return;
        }
        let dist = this.moveSpeed * deltaTime;
        let dx = this._moveDir.x * dist;
        let dy = this._moveDir.y * dist;
        let pos = this.node.position;
        this.node.setPosition(pos.x + dx, pos.y + dy, pos.z);
    }
}


