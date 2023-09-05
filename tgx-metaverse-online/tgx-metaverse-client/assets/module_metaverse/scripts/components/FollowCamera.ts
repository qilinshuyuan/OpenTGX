import { Component, Node, Tween, Vec3, _decorator } from "cc";
import { MathUtil } from '../models/MathUtil';
const { ccclass, property } = _decorator;

const v3_1 = new Vec3;

/**
 * 自动跟随目标，并平滑移动的摄像机
 */
@ccclass
export class FollowCamera extends Component {

    @property(Node)
    focusTarget: Node = null as any;

    @property
    speedFactor: number = 0.05;

    @property
    private _distance: number = 15.0;
    @property
    public get distance(): number {
        return this._distance;
    }
    public set distance(v: number) {
        this._distance = v;
        this._updateTargetWorldPos();
    }

    // Limit range
    enableLimit: boolean = true;
    minX = -Infinity;
    maxX = Infinity;
    minZ = -Infinity;
    maxZ = Infinity;

    protected _tweenFollow?: Tween<any>;
    protected _targetWorldPos = new Vec3;
    protected _lastTargetPos = new Vec3;

    start() {
        this._lastTargetPos.set(this.focusTarget.worldPosition);
        this._updateTargetWorldPos();
        this.node.setWorldPosition(this._targetWorldPos);
    }

    protected _updateTargetWorldPos() {
        this._targetWorldPos.set(this.focusTarget.worldPosition);
        if (this.enableLimit) {
            this._targetWorldPos.x = MathUtil.limit(this._targetWorldPos.x, this.minX, this.maxX);
            this._targetWorldPos.z = MathUtil.limit(this._targetWorldPos.z, this.minZ, this.maxZ);
        }

        this._targetWorldPos.add(this.node.forward.multiplyScalar(this.distance * -1));
    }

    update() {
        if (!this._lastTargetPos.equals(this.focusTarget.worldPosition)) {
            this._lastTargetPos.set(this.focusTarget.worldPosition);
            this._updateTargetWorldPos();
        }

        // 向TargetWorldPos平滑逼近
        // Limit Range
        v3_1.set(this._targetWorldPos);
        let diff = v3_1.subtract(this.node.worldPosition);
        if (diff.lengthSqr() > 0.01) {
            this.node.worldPosition.add(diff.multiplyScalar(this.speedFactor));
            this.node.setWorldPosition(this.node.worldPosition);
        }
    }

    resetPos() {
        this._updateTargetWorldPos();
        this.node.setWorldPosition(this._targetWorldPos);
    }

    @property
    get preview() {
        return false;
    }
    set preview(v: boolean) {
        this.resetPos();
    }

    @property
    get autoSetDistance() {
        return false;
    }
    set autuSetDistance(v: boolean) {
        this.distance = this.node.worldPosition.clone().subtract(this.focusTarget.worldPosition).length();
    }

}
