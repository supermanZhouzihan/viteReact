import re from './requestBase'

// 请求容器
const con = re(process.env.VUE_APP_BASE_API_PURCHASE);

// 通用下载方法
export function download(url:string, params:any, filename:string) {
  return con.download(url, params, filename)
}

// 请求实例
export default con.service