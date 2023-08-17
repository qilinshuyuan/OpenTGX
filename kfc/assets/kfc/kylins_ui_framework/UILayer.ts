/****
 * @en ui layers.each project can modify it based on needs.
 * @zh UI层级划分,
 * */
enum UILayer {
    GAME,
    JOY_STICK,
    HUD,
    POPUP,
    POPUP1,
    POPUP2,
    ALERT,
    NOTICE,
    LOADING,
    OVERLAY,
    NUM
}

const UILayerNames = [
    'game',
    'joy_stick',
    'hud',
    'popup',
    'popup1',
    'popup2',
    'alert',
    'notice',
    'loading',
    'overlay'
];

export { UILayer, UILayerNames };