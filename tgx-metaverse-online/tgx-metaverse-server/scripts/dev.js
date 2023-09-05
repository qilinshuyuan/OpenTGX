const chalk = require('chalk');

console.log(`
${chalk.bold.green('---------- 启动命令 ----------')}

启动 MatchServer: ${chalk.cyan('npm run dev:match')}
启动 RoomServer: ${chalk.cyan('npm run dev:room')}
分布式测试，再启动一个 RoomServer: ${chalk.cyan('npm run dev:room2')}
`);