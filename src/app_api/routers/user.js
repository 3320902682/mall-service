const Router = require('koa-router');
const router = new Router();
const mongoose = require('mongoose');

const User = mongoose.model('User');

//注册
router.post('register', async (ctx) => {
  let newUser = new User(ctx.request.body);

  await newUser
    .save()
    .then(() => {
      ctx.body = {
        result: true,
        message: '注册成功'
      };
    })
    .catch((error) => {
      ctx.body = {
        result: false,
        message: '该用户名已经存在',
        error: error
      };
    });
});

//登录
router.post('login', async (ctx) => {
  let { userName, password } = ctx.request.body;
  let user = await User.findOne({ userName: userName });

  if (user) {
    await user
      .comparePassword(password)
      .then((isMatch) => {
        if (isMatch) {
          ctx.body = { result: true, message: '登录成功' };
        } else {
          ctx.body = { result: false, message: '用户名或者密码不正确' };
        }
      })
      .catch((error) => {
        ctx.body = { result: false, message: '登录失败', error };
      });
  } else {
    ctx.body = { result: false, message: '用户不存在' };
  }
});

module.exports = {path:'user',router};
