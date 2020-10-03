const mongoose = require('mongoose');
const db = 'mongodb://localhost/mall-db';
const option = { useUnifiedTopology: true, useNewUrlParser: true };

//最大连接次数
const maxConnectTime = 3;

function connect() {
  return new Promise((resolver, reject) => {
    //当前连接次数
    let currentTime = 0;

    //连接数据库
    function connectDatabase() {
      if (currentTime < maxConnectTime) {
        mongoose.connect(db, option);
      } else {
        reject();
        throw new Error('数据库出现问题，程序无法搞定，请人为修理......');
      }
      currentTime++;
    }

    connectDatabase();

    //数据库连接断开时
    mongoose.connection.on('disconnected', () => {
      console.log('数据库断开');
      //进行重连
      connectDatabase();
    });

    //数据库出现错误时
    mongoose.connection.on('error', (err) => {
      console.log('数据库错误', err);
      //进行重连
      connectDatabase();
    });

    //数据库连接打开时(成功)
    mongoose.connection.on('open', () => {
      console.log('MongoDB connected successfully');
      resolver();
    });
  });
}

module.exports = {
  connect
};
