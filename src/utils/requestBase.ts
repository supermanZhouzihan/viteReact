import axios from 'axios'
// import {
//   Notification,
//   MessageBox,
//   Message,
//   Loading
// } from 'element-ui'
import React from 'react';
import { Spin ,message,Modal } from 'antd';
import { ExclamationCircleFilled } from '@ant-design/icons';
// import store from '@/store'
import {
  getToken
} from '@/utils/auth'
import errorCode from '@/utils/errorCode'
import {
  tansParams,
} from "@/utils/ruoyi";

const [messageApi, contextHolder] = message.useMessage();
const { confirm } = Modal;



/**
 * 基于axios创建网络请求对象
 * @param process.env env 环境变量配置
 * @return 
 */
let loading:boolean
export default function (env:any) {
  axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8'
  // 创建axios实例
  var service = axios.create({
    // axios中请求配置有baseURL选项，表示请求URL公共部分
    baseURL: env,
    // 超时
    timeout: 20000
  })

  /**
   * request拦截器
   * @see 规则参考： https://www.yuque.com/zxbowm/rog32y/devgo6
   */
  service.interceptors.request.use(config => {
    for (let key in config.data) {
      // 排除以下key 为空的时候删除key
      if (config.data[key] === '' || config.data[key] === null || config.data[key] === undefined) {
        if (key !== 'logo' && key !== 'image' && key !== 'img' && key !== 'belongCompany' && key !== 'belongEnterprise' && key !== 'deliveryTime' && key !== 'location_no' && key !== 'subsidiary_unit' && key !== 'attr1' && key !== 'intro'&&key!=='forbidRegionsType'&&key!=='mailType'&&key!=='noticeEndTime'&&key!=='noticeStartTime') {
          delete config.data[key]
        }
      }
    }
    // 是否需要设置 token
    const isToken = (config.headers || {}).isToken === false
    if (getToken() && !isToken) {
      config.headers['Authorization'] = 'Bearer ' + getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
      config.headers['Login-Type'] = 'login_tokens:'
    }

    // get请求映射params参数
    if (config.method === 'get' && config.params) {
      for (let key in config.params) {
        // 排除以下key 为空的时候删除key
        if (config.params[key] === '' || config.params[key] === null || config.params[key] === undefined) {
          if (key !== 'logo' && key !== 'image' && key !== 'img' && key !== 'belongCompany' && key !== 'belongEnterprise' && key !== "deliveryTime" && key !== "location_no" && key !== 'subsidiary_unit' && key !== 'attr1' && key !== 'intro'&&key!=='forbidRegionsType'&&key!=='mailType'&&key!=='noticeEndTime'&&key!=='noticeStartTime') {
            delete config.params[key]
          }
        }
      }
      let url = config.url + '?' + tansParams(config.params);
      url = url.slice(0, -1);
      config.params = {};
      config.url = url;
    }
    showFullScreenLoading()
    return config
  }, error => {
    Promise.reject(error)
  })

  /**
   * 响应拦截器
   * 
   * @see 状态码说明：https://www.yuque.com/zxbowm/rog32y/se33f3
   * 
   * @desc 
   1 参数错误
   2 未登录
   3 无权限
   4 服务(接口)不存在
   5 请求方法不支持： 如-服务器只支持
   */
  service.interceptors.response.use(res => {

      /////////////////////// http状态码判断 ///////////////////////////
      const httpStatus = res.status;
      if (httpStatus != 200) {
        messageApi.open({
          type: 'error',
          content: res.statusText,
        });
        return Promise.reject(new Error(res.statusText));
      }

      /////////////////////// 接口数据返回判断 /////////////////////////
      // 未设置状态码则默认成功状态
      const code = ((typeof res.data.code) == 'undefined') ? 200 : res.data.code;
      // 获取错误信息
      const msg = errorCode[code] || res.data.msg || errorCode['default']
      // 成功，无异常
      if (code == 0) {
        tryHideFullScreenLoading();
        return res.data;
      }
      // 未登录
      if (code == 2) {
        // MessageBox.confirm('登录状态已过期，您可以继续留在该页面，或者重新登录', '系统提示', {
        //   confirmButtonText: '重新登录',
        //   cancelButtonText: '取消',
        //   type: 'warning'
        // }).then(() => {
        //   // store.dispatch('LogOut').then(() => {
        //   //   location.href = '/index';
        //   // })
        // }).catch(() => {});

        // confirm({
        //   title: '系统提示',
        //   icon: <ExclamationCircleFilled />,
        //   content: '登录状态已过期，您可以继续留在该页面，或者重新登录',
        //   onOk() {
        //     store.dispatch('LogOut').then(() => {
        //      location.href = '/index';
        //    })
        //   },
        //   onCancel() {
        //     console.log('Cancel');
        //   },
        // });



        tryHideFullScreenLoading();
        return Promise.reject(new Error(msg));
      } else if (code == 200) { //控制下载文件
        tryHideFullScreenLoading();
        if (res.data.type == 'application/json') {
           getResponseError(res.data).then((response) => {
            messageApi.open({
              type: 'error',
              content:response
            });
            
          });
          return Promise.reject(new Error(response))
        }
        return res;
      }
      // 通用的警告
      else if (code == 201) {
        tryHideFullScreenLoading();
        messageApi.open({
          type: 'warning',
          content:msg,
        });
        return Promise.reject(new Error(msg))
      }
      tryHideFullScreenLoading();
      // 其它异常
      // Notification.error({ title: msg });
      messageApi.open({
        type: 'error',
        content:msg
      });
      return Promise.reject(new Error(msg));
    },
    error => {
      let {
        message
      } = error;
      if (message == "Network Error") {
        message = "后端接口连接异常";
      } else if (message.includes("timeout")) {
        message = "系统接口请求超时";
      } else if (message.includes("Request failed with status code")) {
        message = "系统接口" + message.substr(message.length - 3) + "异常";
      }
      tryHideFullScreenLoading();
      // Message({
      //   message: message,
      //   type: 'error',
      //   duration: 5 * 1000
      // })
      messageApi.open({
        type: 'error',
        content:message
      });
      return Promise.reject(error)
    });

  /**
   * 通用下载方法
   * @param {*} url 
   * @param {*} params 
   * @param {*} filename 
   * @return
   */
  function download(url:string, params:any, filename:string) {
    return service.post(url, params, {
      // transformRequest: [(params) => {
      //   return tansParams(params)
      // }],
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      responseType: 'blob'
    }).then((data:any) => {
      const content = data
      const blob = new Blob([content])
      if ('download' in document.createElement('a')) {
        const elink = document.createElement('a')
        elink.download = filename
        elink.style.display = 'none'
        elink.href = URL.createObjectURL(blob)
        document.body.appendChild(elink)
        elink.click()
        URL.revokeObjectURL(elink.href)
        document.body.removeChild(elink)
      } else {
        navigator.msSaveBlob(blob, filename)
      }
    }).catch((r) => {
      console.error(r)
    })
  }


  //element loading
  function startLoading() { //使用Element loading-start 方法
    // loading = Loading.service({
    //   lock: false,
    //   text: '加载中.....',
    //   background: 'rgba(0, 0, 0, 0.7)',
    //   spinner: 'el-icon-loading'
    //   // target:'.app-main'
    // })
    return <Spin />
  }

  function endLoading() { //使用Element loading-close 方法
    loading.close()
  }
  //当前正在请求接口的个数
  let needLoadingRequestCount = 0;

  //显示loading
  function showFullScreenLoading() {
    if (needLoadingRequestCount === 0) {
      startLoading()
    }
    needLoadingRequestCount++
  }
  //隐藏loading
  function tryHideFullScreenLoading() {
    if (needLoadingRequestCount <= 0) return
    needLoadingRequestCount--
    if (needLoadingRequestCount === 0) {
      setTimeout(() => {
        endLoading()
      }, 100);
    }
  }

  //文件流下载时异常处理，获取错误的msg
  function getResponseError(data:any) {
    const fileReader = new FileReader();
    fileReader.readAsText(data);
    return new Promise((resolve, reject) => {
      fileReader.onload = function () {
        try {
          const jsonData = JSON.parse(fileReader.result); // 说明是普通对象数据，后台转换失败
          resolve(jsonData.msg)
        } catch (err) {
          // 解析成对象失败，说明是正常的文件流
          reject(err)
          console.log(err, "success...");
        }
      };
    })
  }


  return {
    service,
    download
  }
}
