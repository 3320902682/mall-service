const mongoose = require('mongoose');

const db = 'mongodb://localhost/mall-db';
const glob = require('glob');
const { resolve } = require('path');

const option = { useUnifiedTopology: true, useNewUrlParser: true };
// 最大连接次数
const MAX_CONNECT_TIME = 3;

mongoose.set('useCreateIndex', true);
function connect() {
  return new Promise((resolve, reject) => {
    // 当前连接次数
    let currentTime = 0;

    // 连接数据库
    function connectDatabase() {
      if (currentTime < MAX_CONNECT_TIME) {
        mongoose.connect(db, option);
      } else {
        reject(new Error('mongoose Error'));
        throw new Error('数据库出现问题，程序无法搞定，请人为修理......');
      }
      currentTime += 1;
    }

    connectDatabase();

    // 数据库连接断开时
    mongoose.connection.on('disconnected', () => {
      console.log('数据库断开');
      // 进行重连
      connectDatabase();
    });

    // 数据库出现错误时
    mongoose.connection.on('error', (err) => {
      console.log('数据库错误', err);
      // 进行重连
      connectDatabase();
    });

    // 数据库连接打开时(成功)
    mongoose.connection.on('open', () => {
      resolve();
    });
  });
}

function initSchemas() {
  glob.sync(resolve(__dirname, './schemas/', '**/*.js')).forEach(require);
}

exports.databaseInit = async () => {
  await connect();
  initSchemas();
};
