
import { Camera, Color, Component, Node, SkeletalAnimation, SkinnedMeshRenderer, Vec3, view, _decorator, Label, RigidBody, v3 } from 'cc';
import { PlayerName } from '../PlayerName/PlayerName';
import { PlayerAniState } from '../../../module_basic/shared/types/SubWorldUserState';
const { ccclass, property } = _decorator;

const v3_1 = new Vec3;

@ccclass('Player')
export class Player extends Component {

    @property(SkeletalAnimation)
    ani!: SkeletalAnimation;
    @property(SkinnedMeshRenderer)
    mesh!: SkinnedMeshRenderer;
    @property(Node)
    namePos!: Node;

    @property(Label)
    lblName:Label;

    @property(PlayerName)
    chatMsgBox:PlayerName;


    private _moveSpeed = 5;
    private _aniState: PlayerAniState = 'idle';
    public get aniState(): PlayerAniState {
        return this._aniState;
    }
    public set aniState(v: PlayerAniState) {
        if (this._aniState === v) {
            return;
        }
        this._aniState = v;

        this.unscheduleAllCallbacks();
        this.ani.crossFade(v, 0.5);

        if (v === 'wave') {
            this.scheduleOnce(() => {
                this.aniState = 'idle';
            }, 4.73)
        }

        if (v === 'punch') {
            this.scheduleOnce(() => {
                this.aniState = 'idle';
            }, 2.27)
        }

        if (v === 'dance') {
            this.scheduleOnce(() => {
                this.aniState = 'idle';
            }, 12.37)
        }
    }

    public get color(): Color {
        return this.mesh.material!.getProperty('mainColor') as Color;
    }
    public set color(v: Color) {
        this.mesh.material!.setProperty('mainColor', v);
    }

    protected update(dt: number): void {
        if (this._aniState == 'walking') {
            let forward = this.node.forward;
            let moveLen = this._moveSpeed * dt;
            this.node.position = this.node.position.add3f(-forward.x * moveLen, 0, -forward.z * moveLen);
        }
    }

}