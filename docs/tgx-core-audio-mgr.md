# AudioMgr

In Cocos Creator 3.x, to play audio, you indeed need to use the AudioSource component.

Typically, a dedicated node with an AudioSource component is required to play audio.

`tgx.AudioMgr` takes care of this detail, allowing you to easily play sound effects from any code.

```ts
//play music (long time audio)
tgxAudioMgr.inst.play('sounds/bgm');

//play sound ( short time audio)
tgxAudioMgr.inst.playOneShot('sounds/hit');
```

The second and third parameters for `play` and `playOneShot` are as follows:

- `volume`: the volume level, with default value of 1.0。
- `bundleName`: the bundle where the audio file is located, with the default being `resources`。

For more details, please refer to: [tgx.AudioMgr](https://github.com/qilinshuyuan/OpenTGX/blob/main/tgx-core-cocos/assets/core_tgx/base/AudioMgr.ts)。
