module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps : [
    {
      name      : 'master-server',
      script    : 'MasterServerMain.js',
      env: {
        PORT: '3200'
      }
    },
    {
      name      : 'world-server-1',
      script    : 'WorldServerMain.js',
      env: {
        PORT: '3201',
        MASTER_SERVER_URL: 'http://127.0.0.1:3200',
        THIS_SERVER_URL: 'wss://你的域名:3201'
      }
    },
    {
      name      : 'world-server-2',
      script    : 'WorldServerMain.js',
      env: {
        PORT: '3202',
        MASTER_SERVER_URL: 'http://127.0.0.1:3200',
        THIS_SERVER_URL: 'wss://你的域名:3202'
      }
    },
  ]
};
