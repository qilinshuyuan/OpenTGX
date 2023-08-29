import { _decorator, Component, Quat, Vec2, Vec3, Input, game, EventTouch, EventMouse, input, EventKeyboard, KeyCode, v2 } from 'cc';
const { ccclass, property } = _decorator;

const v2_1 = new Vec2();
const v2_2 = new Vec2();
const v3_1 = new Vec3();
const qt_1 = new Quat();
const forward = new Vec3();
const right = new Vec3();

@ccclass('tgxFreeCamera')
export class FreeCamera extends Component {

    @property
    public moveSpeed = 1;

    @property
    public moveSpeedShiftScale = 5;

    @property({ slide: true, range: [0.05, 0.5, 0.01] })
    public damp = 0.2;

    @property
    public rotateSpeed = 1;

    private _euler = new Vec3();
    private _velocity = new Vec3();
    private _position = new Vec3();
    private _speedScale = 1;
    private _eulerP = new Vec3();

    public onLoad () {
        input.on(Input.EventType.MOUSE_WHEEL, this.onMouseWheel, this);
        input.on(Input.EventType.TOUCH_START, this.onTouchStart, this);
        input.on(Input.EventType.TOUCH_MOVE, this.onTouchMove, this);
        input.on(Input.EventType.TOUCH_END, this.onTouchEnd, this);
        Vec3.copy(this._euler, this.node.eulerAngles);
        Vec3.copy(this._position, this.node.getPosition());
        Vec3.copy(this._eulerP, this.node.eulerAngles);

        input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);
        input.on(Input.EventType.KEY_UP, this.onKeyUp, this);
    }

    public onDestroy () {
        input.off(Input.EventType.MOUSE_WHEEL, this.onMouseWheel, this);
        input.off(Input.EventType.TOUCH_START, this.onTouchStart, this);
        input.off(Input.EventType.TOUCH_MOVE, this.onTouchMove, this);
        input.off(Input.EventType.TOUCH_END, this.onTouchEnd, this);

        input.off(Input.EventType.KEY_DOWN, this.onKeyDown, this);
        input.off(Input.EventType.KEY_UP, this.onKeyUp, this);
    }


    public update (dt: number) {
        const t = Math.min(dt / this.damp, 1);
        // position
        Vec3.transformQuat(v3_1, this._velocity, this.node.rotation);
        Vec3.scaleAndAdd(this._position, this._position, v3_1, this.moveSpeed * this._speedScale);
        Vec3.lerp(v3_1, this.node.getPosition(), this._position, t);
        this.node.setPosition(v3_1);

        if(this.moveDir.lengthSqr()){
            Vec3.transformQuat(forward, Vec3.FORWARD, this.node.rotation);
            forward.normalize();
            Vec3.cross(right, forward, Vec3.UP);
            right.normalize();

            Vec3.scaleAndAdd(this._position, this._position, forward, this.moveSpeed * this._speedScale * this.moveDir.z);
            Vec3.lerp(v3_1, this.node.getPosition(), this._position, t);
            this.node.setPosition(v3_1);

            Vec3.scaleAndAdd(this._position, this._position, right, this.moveSpeed * this._speedScale * this.moveDir.x);
            Vec3.lerp(v3_1, this.node.getPosition(), this._position, t);
            this.node.setPosition(v3_1);

            Vec3.scaleAndAdd(this._position, this._position, Vec3.UP, this.moveSpeed * this._speedScale * this.moveDir.y);
            Vec3.lerp(v3_1, this.node.getPosition(), this._position, t);
            this.node.setPosition(v3_1);
        }

        // rotation
        Quat.fromEuler(qt_1, this._eulerP.x, this._eulerP.y, this._eulerP.z);
        Quat.slerp(qt_1, this.node.rotation, qt_1, t);
        this.node.setWorldRotationFromEuler(this._eulerP.x, this._eulerP.y, this._eulerP.z);
    }

    public onMouseWheel (e: EventMouse) {
        const delta = -e.getScrollY() * this.moveSpeed * 0.1; // delta is positive when scroll down
        Vec3.transformQuat(v3_1, Vec3.UNIT_Z, this.node.rotation);
        Vec3.scaleAndAdd(this._position, this.node.position, v3_1, delta);
    }
    
    public onTouchStart (e: EventTouch) {
        if (game.canvas.requestPointerLock) { game.canvas.requestPointerLock(); }
    }

    public onTouchMove (e: EventTouch) {
        e.getStartLocation(v2_1);
        if (v2_1.x > game.canvas.width * 0.4) { // rotation
            e.getDelta(v2_2);
            this._eulerP.y -= v2_2.x * this.rotateSpeed * 0.1;
            this._eulerP.x += v2_2.y * this.rotateSpeed * 0.1;
        } else { // position
            e.getDelta(v2_2);
            this._eulerP.y -= v2_2.x * this.rotateSpeed * 0.1;
            this._eulerP.x += v2_2.y * this.rotateSpeed * 0.1;
        }
    }

    public onTouchEnd (e: EventTouch) {
        if (document.exitPointerLock) { document.exitPointerLock(); }
        e.getStartLocation(v2_1);
        if (v2_1.x < game.canvas.width * 0.4) { // position
            this._velocity.x = 0;
            this._velocity.z = 0;
        }
    }

    private keys = [];
    // x  -1 left, +1 right   y -1 backword, +1 forward
    private moveDir:Vec3 = new Vec3();
    onKeyDown(event:EventKeyboard){
        let keyCode = event.keyCode;
        if(keyCode == KeyCode.KEY_A || keyCode == KeyCode.KEY_S || keyCode == KeyCode.KEY_D || keyCode == KeyCode.KEY_W){
            if(this.keys.indexOf(keyCode) == -1){
                this.keys.push(keyCode);
                this.updateDirection();
            }
        }
        if(keyCode == KeyCode.KEY_Q){
            this.moveDir.y = -1;
        }
        else if(keyCode == KeyCode.KEY_E){
            this.moveDir.y = 1;
        }
    }

    onKeyUp(event:EventKeyboard){
        let keyCode = event.keyCode;
        if(keyCode == KeyCode.KEY_A || keyCode == KeyCode.KEY_S || keyCode == KeyCode.KEY_D || keyCode == KeyCode.KEY_W){
            let index = this.keys.indexOf(keyCode);
            if(index != -1){
                this.keys.splice(index,1);
                this.updateDirection();
            }
        }

        if(keyCode == KeyCode.KEY_Q || keyCode == KeyCode.KEY_E){
            this.moveDir.y = 0;
        }
    }

    private key2dirMap = null;

    updateDirection(){
        if(this.key2dirMap == null){
            this.key2dirMap = {};
            this.key2dirMap[0] = v2(0,0);
            this.key2dirMap[KeyCode.KEY_A] = v2(-1,0);
            this.key2dirMap[KeyCode.KEY_D] = v2(1,0);
            this.key2dirMap[KeyCode.KEY_W] = v2(0,1);
            this.key2dirMap[KeyCode.KEY_S] = v2(0,-1);

            this.key2dirMap[KeyCode.KEY_A * 1000 + KeyCode.KEY_W] = this.key2dirMap[KeyCode.KEY_W * 1000 + KeyCode.KEY_A] = v2(-1,1);
            this.key2dirMap[KeyCode.KEY_D * 1000 + KeyCode.KEY_W] = this.key2dirMap[KeyCode.KEY_W * 1000 + KeyCode.KEY_D] = v2(1,1);
            this.key2dirMap[KeyCode.KEY_A * 1000 + KeyCode.KEY_S] = this.key2dirMap[KeyCode.KEY_S * 1000 + KeyCode.KEY_A] = v2(-1,-1);
            this.key2dirMap[KeyCode.KEY_D * 1000 + KeyCode.KEY_S] = this.key2dirMap[KeyCode.KEY_S * 1000 + KeyCode.KEY_D] = v2(1,-1);

            this.key2dirMap[KeyCode.KEY_A * 1000 + KeyCode.KEY_D] = this.key2dirMap[KeyCode.KEY_D];
            this.key2dirMap[KeyCode.KEY_D * 1000 + KeyCode.KEY_A] = this.key2dirMap[KeyCode.KEY_A];
            this.key2dirMap[KeyCode.KEY_W * 1000 + KeyCode.KEY_S] = this.key2dirMap[KeyCode.KEY_S];
            this.key2dirMap[KeyCode.KEY_S * 1000 + KeyCode.KEY_W] = this.key2dirMap[KeyCode.KEY_W];
        }
        let keyCode0 = this.keys[this.keys.length - 1] || 0;
        let keyCode1 = this.keys[this.keys.length - 2] || 0;
        let dir = this.key2dirMap[keyCode1 * 1000 + keyCode0];
        this.moveDir.x = dir.x;
        this.moveDir.z = dir.y;
    }
}
