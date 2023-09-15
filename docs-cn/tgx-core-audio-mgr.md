# 音频管理器

Cocos Creator 3.x 中，播放音频需要借助 AudioSource 组件。

通常需要一个专门的节点挂接 `AudioSource` 组件，来实现音频播放。

`tgxAudioMgr` 处理了这个细节。使你可以在任何代码中，都可以轻松简单地播放音效。

```ts
//播放背景音乐
tgxAudioMgr.inst.play('sounds/bgm');

//播放音效
tgxAudioMgr.inst.playOneShot('sounds/hit');
```

`play` 和 `playOneShot` 第二、第三个参数分别为：

- `volume`: 音量，默认为 1.0。
- `bundleName`: 音效文件所在的 bundle，默认为 `resources`。

详情请参考：[tgxAudioMgr](https://github.com/MrKylinGithub/OpenTGX/blob/main/tgx-core-cocos/assets/core_tgx/base/AudioMgr.ts)。
