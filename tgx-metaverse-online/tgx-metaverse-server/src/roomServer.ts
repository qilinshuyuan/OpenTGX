import { RoomServer } from "./RoomServer/RoomServer";

// 环境变量配置
// 程序运行的端口 默认 3001
const port = parseInt(process.env['PORT'] || '3001');
// 要连接的 MatchServer 地址（可以是内网地址）
const matchServerUrl = process.env['MATCH_SERVER_URL'] || 'http://127.0.0.1:3000';
// 客户端可访问的本服务地址
const thisServerUrl = process.env['THIS_SERVER_URL'] || ('ws://127.0.0.1:' + port);

export const roomServer = new RoomServer({
    // 可改为通过环境变量调整配置参数
    port: port,
    matchServerUrl: matchServerUrl,
    thisServerUrl: thisServerUrl
});

// Entry function
async function main() {
    await roomServer.init();
    await roomServer.start();
}
main();