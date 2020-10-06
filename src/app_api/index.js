//路由
const Router = require('koa-router');
const glob = require('glob');
const { resolve } = require('path');

exports.initAppRouters = (app) => {
  let routers = [];

  //加载路由
  glob.sync(resolve(__dirname, './routers/', '**/*.js')).forEach((file) => {
    let router = require(file);

    routers.push(router);
  });

  let mainRouter = new Router();

  //注册路由
  routers.forEach(({ router, path }) => {
    mainRouter.use('/app/' + path + '/', router.routes());
  });

  app.use(mainRouter.routes(), mainRouter.allowedMethods());
};
