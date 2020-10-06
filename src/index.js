//启动时间
const startTime = Date.now();

const Koa = require('koa');
const { databaseInit } = require('./database');
const { initAppRouters } = require('./app_api');
const bodyParser = require('koa-bodyparser');
const cors = require('koa2-cors');

const app = new Koa();

// 使用bodyParser解析post参数,在使用路由之前使用，否则不生效
app.use(bodyParser());

//使用koa2-cors支持跨域,在使用路由之前使用，否则不生效
app.use(cors());

(async () => {
  // 初始化数据库
  await databaseInit();
  // 初始化App路由
  initAppRouters(app);

  //运行端口
  const prot = 3000;

  app.listen(prot, () => {
    let runUpTime = Date.now() - startTime;

    console.log(
      '[service] starting prot ' + prot + ',run-up time: ' + runUpTime + ' ms'
    );
  });
})();
