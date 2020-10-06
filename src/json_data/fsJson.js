const fs = require('fs');
const {resolve}=require('path');

fs.readFile(resolve(__dirname,'./goods.json'), 'utf8', (err, data) => {
  let newData = JSON.parse(data).RECORDS;

  let pushData = newData.filter((value) => {
    return Boolean(value.IMAGE1);
  });

  fs.writeFile(resolve(__dirname,'./newGoods.json'), JSON.stringify(pushData), (err) => {
    if (err) console.log('写入 newGoods 失败');
    else console.log('写入 newGoods 成功');
  });
});
