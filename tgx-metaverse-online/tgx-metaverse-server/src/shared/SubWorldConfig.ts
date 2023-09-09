export interface SubWorldConfigItem {
    //子世界ID
    id: string,
    //显示名称
    name: string,
    //子世界场景
    scene: string,
    //子世界关卡配置
    levelData: any,
    //是否为公共子世界
    isPublic: boolean,
}

const _subWorldMap = {} as any;

const _subWorldList = [
    //公共子世界
    { id: 'world-001', name: '北京', scene: 'world', isPublic: true, levelData: { prefab: 'levels/level-beijing', bundle: 'module_metaverse' } },
    { id: 'world-002', name: '上海', scene: 'world', isPublic: true, levelData: { prefab: 'levels/level-shanghai', bundle: 'module_metaverse' } },
    { id: 'world-003', name: '成都', scene: 'world', isPublic: true, levelData: { prefab: 'levels/level-chengdu', bundle: 'module_metaverse' } },
    { id: 'world-004', name: '深圳', scene: 'world', isPublic: true, levelData: { prefab: 'levels/level-shenzhen', bundle: 'module_metaverse' } },

    //私人子世界，用于副本，房间类玩法。可根据情况自行创建和销毁
    { id: 'battle-game', name: 'Battle Game', scene: 'world', isPublic: false, levelData: null },
    { id: 'card-game', name: 'Card Game', scene: 'world', isPublic: false, levelData: null },
    { id: 'rpg-game', name: 'RPG Game', scene: 'world', isPublic: false, levelData: null },
];


for (let i = 0; i < _subWorldList.length; ++i) {
    let subWorldItem = _subWorldList[i];
    _subWorldMap[subWorldItem.id] = subWorldItem;
}

export class SubWorldConfig {
    public static getSubWorldConfig(subWorldId: string): SubWorldConfigItem {
        return _subWorldMap[subWorldId];
    }
}

