//请求成功
function succeed(response) {
  return { code: 200, response };
}

//请求异常
function error(error) {
  return { code: 500, error };
}

module.exports={succeed,error}