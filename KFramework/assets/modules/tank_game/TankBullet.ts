import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('TankBullet')
export class TankBullet extends Component {
    start() {

    }

    update(deltaTime: number) {
        let angle = this.node.eulerAngles.z / 180 * Math.PI;
        let dx = Math.cos(angle) * 5;
        let dy = Math.sin(angle) * 5;
        let pos = this.node.position;
        this.node.setPosition(pos.x + dx, pos.y + dy, pos.z);
    }
}


