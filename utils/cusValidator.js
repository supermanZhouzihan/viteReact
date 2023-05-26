export function testPhone(rule, value, callback) {
  if(value===''||value===undefined){
    callback(new Error('请输入手机号'));
  }
  if (RegExp(/^1[3456789]\d{9}$/).test(value)) {
    callback();
  } else {
    callback(new Error('请输入正确的手机号码'));
  }
};

// 大于等于0的正数 包括小数
export function testNum (rule, value, callback) {
  if(RegExp(/^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/).test(value)){
    callback()
  }
  else{
    callback(new Error('请输入非负数字'));
  }
};

//正数负数小数
export function testAllNum (rule, value, callback) {
  if(RegExp(/^(\-|\+)?\d+(\.\d+)?$/).test(value)){
    callback()
  }
  else{
    callback(new Error('请输入数字'));
  }
};

//邮箱
export function testEmail (rule, value, callback) {
  if(value===''||value===undefined){
    callback(new Error('请输入邮箱地址'));
  }
  if(RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/).test(value)){
    callback()
  }
  else{
    callback(new Error('请输入正确的邮箱地址'));
  }
};


//联系电话
export function testContactPhone (rule, value, callback) {
  if(value===''||value===undefined){
    // callback(new Error('请输入联系电话'));
    callback()
  }
  if(RegExp(/^(([0\+]\d{2,3}-)?(0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$/).test(value)||RegExp(/^1[3456789]\d{9}$/).test(value)){
    callback()
  }
  else{
    callback(new Error('请输入正确电话号码'));
  }
};

// 身份证
export function testIdCardNum (rule, value, callback) {
  if(value===''||value===undefined){
    callback(new Error('请输入身份证号'));
  }
  if(RegExp(/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/).test(value)){
    callback()
  }
  else{
    callback(new Error('请输入正确的身份证号'));
  }
};


//只允许中文，英文字母，数字
export function testZhEnNum (rule, value, callback) {
  if(value===''||value===undefined){
    callback(new Error('请输入'));
  }
  if(RegExp(/^[\u4e00-\u9fa5A-Za-z0-9]+$/).test(value)){
    callback()
  }
  else{
    callback(new Error('请输入中文，英文字母，数字'));
  }
};

//编码  数字 字母 5-10位
export function testCode (rule, value, callback) {
  if(value===''||value===undefined){
    callback(new Error('请输入编码'));
  }
  if(RegExp(/^[A-Za-z0-9]{5,10}$/).test(value)){
    callback()
  }
  else{
    callback(new Error('请输入5-10位，可包含数字字母'));
  }
};


export function testSixNumber(rule, value, callback){
  if(value===''||value===undefined){
    callback(new Error('请输入编码'));
  }
  if(RegExp(/^[0-9]{6}$/).test(value)){
    callback()
  }
  else{
    callback(new Error('请输入6位数字'));
  }
}



//url
export function validURL(rule, value, callback) {
  const reg = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
  if(value===''||value===undefined){
    callback(new Error('请输入URL'));
  }
  if(RegExp(reg).test(value)){
    callback()
  }
  else{
    callback(new Error('请输入正确的URL'));
  }
}