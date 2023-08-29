import { _decorator, assetManager, AudioClip, Component, Node } from 'cc';
import { tgxAudioMgr } from '../core_tgx/tgx';
import { ModuleDef } from '../scripts/ModuleDef';

const BundleName = ModuleDef.DEMO_TANK;

export class TankGameAudioMgr {
    /**
  * @en
  * play short audio, such as strikes,explosions
  * @zh
  * 播放短音频,比如 打击音效，爆炸音效等
  * @param sound clip or url for the audio
  * @param volume 
  */
    public static playOneShot(sound: AudioClip | string, volume: number = 1.0) {
        tgxAudioMgr.inst.playOneShot(sound, volume, BundleName);
    }

    /**
     * @en
     * play long audio, such as the bg music
     * @zh
     * 播放长音频，比如 背景音乐
     * @param sound clip or url for the sound
     * @param volume 
     */
    public static play(sound: AudioClip | string, volume: number = 1.0,) {
        tgxAudioMgr.inst.play(sound, volume, BundleName);
    }

    /**
 * stop the audio play
 */
    public static stop() {
        tgxAudioMgr.inst.stop();
    }

    /**
     * pause the audio play
     */
    public static pause() {
        tgxAudioMgr.inst.pause();
    }

    /**
     * resume the audio play
     */
    public static resume() {
        tgxAudioMgr.inst.audioSource.play();
    }
}

