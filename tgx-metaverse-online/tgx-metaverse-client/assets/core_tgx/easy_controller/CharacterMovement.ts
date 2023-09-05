import { _decorator, Component, Node, v3, RigidBody, Vec3, find, Camera, SkeletalAnimation, AnimationClip, Collider, ICollisionEvent } from 'cc';
import { EasyController, EasyControllerEvent } from './EasyController';

const { ccclass, property } = _decorator;

const v3_1 = v3();

@ccclass('tgxCharacterMovement')
export class CharacterMovement extends Component {

    @property(Camera)
    mainCamera: Camera;

    @property
    velocity = 1.0;

    @property
    jumpVelocity = 1.0;

    @property
    maxJumpTimes: number = 0;
    private _curJumpTimes: number = 0;

    @property(AnimationClip)
    idleAnimClip: AnimationClip;

    @property(AnimationClip)
    moveAnimClip: AnimationClip;

    @property(AnimationClip)
    jumpBeginAnimClip: AnimationClip;

    @property(AnimationClip)
    jumpLoopAnimClip: AnimationClip;

    @property(AnimationClip)
    jumpLandAnimClip: AnimationClip;

    _rigidBody: RigidBody;
    _isMoving: boolean = false;
    _velocityScale: number = 1.0;

    _isInTheAir: boolean = false;
    _currentVerticalVelocity: number = 0.0;

    private _anim: SkeletalAnimation;

    start() {
        if (!this.mainCamera) {
            this.mainCamera = find('Main Camera')?.getComponent(Camera);
        }
        this._rigidBody = this.node.getComponent(RigidBody);
        this._anim = this.node.getComponent(SkeletalAnimation);
        if (this._anim) {
            let clipArr = [
                this.idleAnimClip,
                this.moveAnimClip,
                this.jumpBeginAnimClip,
                this.jumpLoopAnimClip,
                this.jumpLandAnimClip
            ];
            for (let i = 0; i < clipArr.length; ++i) {
                let clip = clipArr[i];
                if (clip) {
                    if (!this._anim.getState(clip.name)) {
                        this._anim.addClip(clip);
                    }
                }
            }
            if (this.idleAnimClip) {
                this._anim.play(this.idleAnimClip.name);
            }
        }

        EasyController.on(EasyControllerEvent.MOVEMENT, this.onMovement, this);
        EasyController.on(EasyControllerEvent.MOVEMENT_STOP, this.onMovementRelease, this);
        EasyController.on(EasyControllerEvent.BUTTON, this.onJump, this);

        let myCollider = this.getComponent(Collider);
        myCollider?.on('onCollisionEnter',(target:ICollisionEvent)=>{
            if(target.otherCollider != target.selfCollider){
                this.onLand();
            }
        });
    }

    onDestroy() {
        EasyController.off(EasyControllerEvent.MOVEMENT, this.onMovement, this);
        EasyController.off(EasyControllerEvent.MOVEMENT_STOP, this.onMovementRelease, this);
        EasyController.off(EasyControllerEvent.MOVEMENT_STOP, this.onJump, this);
    }

    update(deltaTime: number) {
        if (this._isMoving) {
            this._tmp.set(this.node.forward);
            this._tmp.multiplyScalar(-1.0);
            this._tmp.multiplyScalar(this.velocity * this._velocityScale);
            if (this._rigidBody) {
                this._rigidBody.getLinearVelocity(v3_1);
                this._tmp.y = v3_1.y;
                this._rigidBody.setLinearVelocity(this._tmp);
            }
            else {
                this._tmp.multiplyScalar(deltaTime);
                this._tmp.add(this.node.position);
                this.node.setPosition(this._tmp);
            }
        }

        if (this._isInTheAir) {
            if(this.jumpBeginAnimClip && this._anim){
                let state = this._anim.getState(this.jumpBeginAnimClip.name);
                if(state.isPlaying && state.current >= state.duration){
                    if(this.jumpLoopAnimClip){
                        this._anim.crossFade(this.jumpLoopAnimClip.name);
                    }
                }
            }

            if(!this._rigidBody){
                this._currentVerticalVelocity -= 9.8 * deltaTime;
            
                let oldPos = this.node.position;
                let nextY = oldPos.y + this._currentVerticalVelocity * deltaTime;
                if (nextY <= 0) {
                    this.onLand();
                    nextY = 0.0;
                }
                this.node.setPosition(oldPos.x, nextY, oldPos.z);
            }
        }
    }

    onLand(){
        this._isInTheAir = false;
        this._currentVerticalVelocity = 0.0;
        this._curJumpTimes = 0;
        if (this.moveAnimClip) {
            if(this._isMoving){
                this._anim.crossFade(this.moveAnimClip.name, 0.5);
            }
            else{
                this._anim.crossFade(this.idleAnimClip.name, 0.5);
            }
        }
    }

    private _tmp = v3();
    onMovement(degree: number, offset: number) {
        let cameraRotationY = 0;
        if (this.mainCamera) {
            cameraRotationY = this.mainCamera.node.eulerAngles.y;
        }
        this._velocityScale = offset;
        //2D界面是 正X 为 0， 3D场景是 正前方为0，所以需要 - 90 度。（顺时针转90度）
        this._tmp.set(0, cameraRotationY + degree - 90 + 180, 0);
        this.node.setRotationFromEuler(this._tmp);
        if (this._anim) {
            if (!this._isMoving && !this._isInTheAir) {
                if (this.moveAnimClip) {
                    this._anim.crossFade(this.moveAnimClip.name, 0.1);
                }
            }
            if (this.moveAnimClip) {
                this._anim.getState(this.moveAnimClip.name).speed = this._velocityScale;
            }
        }
        this._isMoving = true;

    }
    onMovementRelease() {
        if (!this._isInTheAir && this.idleAnimClip) {
            this._anim?.crossFade(this.idleAnimClip.name, 0.5);
        }
        this._isMoving = false;
        if (this._rigidBody) {
            this._rigidBody.setLinearVelocity(Vec3.ZERO);
        }
    }

    onJump(btnName:string) {
        console.log(btnName);
        if(btnName != 'btn_slot_0'){
            return;
        }
        if (this._curJumpTimes >= this.maxJumpTimes) {
            return;
        }
        if(this._curJumpTimes == 0 || true){
            if(this.jumpBeginAnimClip){
                this._anim?.crossFade(this.jumpBeginAnimClip.name);
            }
        }
        this._curJumpTimes++;
        if(this._rigidBody){
            this._rigidBody.getLinearVelocity(v3_1);
            v3_1.y = this.jumpVelocity;
            this._rigidBody.setLinearVelocity(v3_1);
        }
        else{
            this._currentVerticalVelocity = this.jumpVelocity;
        }
        
        this._isInTheAir = true;
    }
}

