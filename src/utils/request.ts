import re from './requestBase'
const process = {
  env: {
    NODE_ENV: 'development',
  },
};
// 请求容器
const con = re(process.env.VUE_APP_BASE_API);

// 通用下载方法
export function download(url:string, params:object, filename:string) {
  return con.download(url, params, filename)
}

// 请求实例
export default con.service