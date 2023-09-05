export interface RoomUserState {
    uid: string,
    pos: {
        x: number,
        y: number,
        z: number
    },
    rotation: {
        x: number,
        y: number,
        z: number,
        w: number
    },
    aniState: PlayerAniState
}

export type PlayerAniState = 'idle' | 'walking' | 'wave' | 'punch' | 'dance';