const Koa = require('koa');
const app = new Koa();
const { connect } = require('./database/init.js');

app.use(async (ctx) => {
  ctx.body = 'Hello World';
});

//立即执行数据库连接函数
connect().then(() => {
  app.listen(3000, () => {
    console.log('[service] starting prot 3000');
  });
});
