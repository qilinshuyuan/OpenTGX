const chalk = require('chalk');

console.log(`
${chalk.bold.green('---------- 启动命令 ----------')}

启动 MasterServer: ${chalk.cyan('npm run dev:master')}
启动 WorldServer: ${chalk.cyan('npm run dev:world')}
分布式测试，再启动一个 WorldServer: ${chalk.cyan('npm run dev:world2')}
`);