const Router = require('koa-router');
const mongoose = require('mongoose');
const router = new Router();
const fs = require('fs');
const { resolve } = require('path');
const apiUtil = require('../../utils/apiUtil.js');

//数据库映射模型
const Goods = mongoose.model('Goods');
const Category = mongoose.model('Category');
const CategorySub = mongoose.model('CategorySub');

//插入所以Goods
router.get('insertAllGoodsInfo', async (ctx) => {
  fs.readFile(
    resolve(__dirname, '../../json_data/newGoods.json'),
    'utf8',
    (err, data) => {
      data = JSON.parse(data);

      data.forEach((value) => {
        let newGoods = new Goods(value);
        newGoods.save();
      });
    }
  );
  ctx.body = '开始导入Goods数据';
});

//插入所有Category
router.get('insertAllCategory', async (ctx) => {
  fs.readFile(
    resolve(__dirname, '../../json_data/category.json'),
    'utf8',
    (err, data) => {
      data = JSON.parse(data).RECORDS;

      data.forEach((value) => {
        let newCategory = new Category(value);

        newCategory.save();
      });
    }
  );

  ctx.body = '开始导入Category数据';
});

//插入所有CategorySub
router.get('insertAllCategorySub', async (ctx) => {
  fs.readFile(
    resolve(__dirname, '../../json_data/category_sub.json'),
    'utf8',
    (err, data) => {
      data = JSON.parse(data).RECORDS;

      data.forEach((value) => {
        let newCategorySub = new CategorySub(value);

        newCategorySub.save();
      });
    }
  );

  ctx.body = '开始导入CategorySub数据';
});

//获取商品详情
router.post('getGoodsDetail', async (ctx) => {
  try {
    let goodsId = ctx.request.body.goodsId;
    let goods = await Goods.findOne({ ID: goodsId });

    apiUtil.succeed({ goods });
  } catch (error) {
    apiUtil.succeed(error);
  }
});

module.exports = { path: 'goods', router };
