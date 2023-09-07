import { WorldServer } from "./WorldServer/WorldServer";

// 环境变量配置
// 程序运行的端口 默认 3001
const port = parseInt(process.env['PORT'] || '3001');
// 要连接的 MasterServer 地址（可以是内网地址）
const masterServerUrl = process.env['MASTER_SERVER_URL'] || 'http://127.0.0.1:3000';
// 客户端可访问的本服务地址
const thisServerUrl = process.env['THIS_SERVER_URL'] || ('ws://127.0.0.1:' + port);

export const worldServer = new WorldServer({
    // 可改为通过环境变量调整配置参数
    port: port,
    worldServerId:1,
    publicSubWorldList:['world-001','world-002','world-003'],
    masterServerUrl: masterServerUrl,
    thisServerUrl: thisServerUrl
});

// Entry function
async function main() {
    await worldServer.init();
    await worldServer.start();
}
main();