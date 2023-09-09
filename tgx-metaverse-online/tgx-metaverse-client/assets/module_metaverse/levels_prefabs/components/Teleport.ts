import { _decorator, Component, Node, Collider, ITriggerEvent } from 'cc';
import { UserMgr } from '../../../module_basic/scripts/UserMgr';
const { ccclass, property } = _decorator;

@ccclass('Teleport')
export class Teleport extends Component {
    @property
    targetWorld = '';

    @property(Collider)
    collider: Collider;

    start() {
        this.collider.on('onTriggerEnter', (event: ITriggerEvent) => {
            if (event.otherCollider.node['_isMyPlayer_'] == true) {
                console.log('enter teleport');
                UserMgr.inst.doEnterSubWorld(this.targetWorld);
            }
        });
    }

    update(deltaTime: number) {

    }
}


