/**
 * 通用js方法封装处理
 * Copyright (c) 2019 ruoyi
 */

// const baseURL = process.env.VUE_APP_BASE_API

// import {
//   Notification,
//   MessageBox,
//   Message,
//   Loading
// } from 'element-ui'

// import { Spin ,message } from 'antd';

// const [messageApi, contextHolder] = message.useMessage();

// 日期格式化
export function parseTime(time:any, pattern:any) {
  if (arguments.length === 0 || !time) {
    return null
  }
  const format = pattern || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if ((typeof time === 'string') && (/^[0-9]+$/.test(time))) {
      time = parseInt(time)
    } else if (typeof time === 'string') {
      time = time.replace(new RegExp(/-/gm), '/');
    }
    if ((typeof time === 'number') && (time.toString().length === 10)) {
      time = time * 1000
    }
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result:any, key:any) => {
    let value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') {
      return ['日', '一', '二', '三', '四', '五', '六'][value]
    }
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return time_str
}

// 表单重置
export function resetForm(refName:any) {
  // if (this.$refs[refName]) {
  //   this.$refs[refName].resetFields();
  // }
}

// 添加日期范围
export function addDateRange(params:any, dateRange:any, propName:any) {
  var search = params;
  search.params = {};
  if (null != dateRange && '' != dateRange) {
    if (typeof (propName) === "undefined") {
      search.params["beginTime"] = dateRange[0];
      search.params["endTime"] = dateRange[1];
    } else {
      search.params["begin" + propName] = dateRange[0];
      search.params["end" + propName] = dateRange[1];
    }
  }
  return search;
}

// 回显数据字典
export function selectDictLabel(datas:any, value:any) {
  // var actions = [];
  // Object.keys(datas).some((key) => {
  //   if (datas[key].dictValue == ('' + value)) {
  //     actions.push(datas[key].dictLabel);
  //     return true;
  //   }
  // })
  // return actions.join('');
}

// 回显数据字典（字符串数组）
// export function selectDictLabels(datas, value, separator) {
//   var actions = [];
//   var currentSeparator = undefined === separator ? "," : separator;
//   var temp = value.split(currentSeparator);
//   Object.keys(value.split(currentSeparator)).some((val) => {
//     Object.keys(datas).some((key) => {
//       if (datas[key].dictValue == ('' + temp[val])) {
//         actions.push(datas[key].dictLabel + currentSeparator);
//       }
//     })
//   })
//   return actions.join('').substring(0, actions.join('').length - 1);
// }

// 通用下载方法
export function download(fileName:any) {
  // window.location.href = baseURL + "/common/download?fileName=" + encodeURI(fileName) + "&delete=" + true;
}

// 字符串格式化(%s )
export function sprintf(str:any) {
  var args = arguments,
    flag = true,
    i = 1;
  str = str.replace(/%s/g, function () {
    var arg = args[i++];
    if (typeof arg === 'undefined') {
      flag = false;
      return '';
    }
    return arg;
  });
  return flag ? str : '';
}

// 转换字符串，undefined,null等转化为""
export function praseStrEmpty(str:any) {
  if (!str || str == "undefined" || str == "null") {
    return "";
  }
  return str;
}

/**
 * 构造树型结构数据
 * @param {*} data 数据源
 * @param {*} id id字段 默认 'id'
 * @param {*} parentId 父节点字段 默认 'parentId'
 * @param {*} children 孩子节点字段 默认 'children'
 */
// export function handleTree(data, id, parentId, children) {
//   let config = {
//     id: id || 'id',
//     parentId: parentId || 'parentId',
//     childrenList: children || 'children'
//   };

//   var childrenListMap = {};
//   var nodeIds = {};
//   var tree = [];

//   for (let d of data) {
//     let parentId = d[config.parentId];
//     if (childrenListMap[parentId] == null) {
//       childrenListMap[parentId] = [];
//     }
//     nodeIds[d[config.id]] = d;
//     childrenListMap[parentId].push(d);
//   }

//   for (let d of data) {
//     let parentId = d[config.parentId];
//     if (nodeIds[parentId] == null) {
//       tree.push(d);
//     }
//   }

//   for (let t of tree) {
//     adaptToChildrenList(t);
//   }

//   function adaptToChildrenList(o) {
//     if (childrenListMap[o[config.id]] !== null) {
//       o[config.childrenList] = childrenListMap[o[config.id]];
//     }
//     if (o[config.childrenList]) {
//       for (let c of o[config.childrenList]) {
//         adaptToChildrenList(c);
//       }
//     }
//   }
//   return tree;
// }

/**
 * 参数处理
 * @param {*} params  参数
 */
export function tansParams(params:any) {
  let result = ''
  for (const propName of Object.keys(params)) {
    const value = params[propName];
    var part = encodeURIComponent(propName) + "=";
    if (value !== null && typeof (value) !== "undefined") {
      if (typeof value === 'object') {
        for (const key of Object.keys(value)) {
          let params = propName + '[' + key + ']';
          var subPart = encodeURIComponent(params) + "=";
          result += subPart + encodeURIComponent(value[key]) + "&";
        }
      } else {
        result += part + encodeURIComponent(value) + "&";
      }
    }
  }
  return result
}

//下载文件处理 转换为JSON并提示
// export function handlerResponseError(data) {
//   const fileReader = new FileReader();
//   fileReader.onload = function () {
//     try {
//       const jsonData = JSON.parse(fileReader.result); // 说明是普通对象数据，后台转换失败
//       // Message({
//       //   message: jsonData.msg,
//       //   type: 'error'
//       // })
//       messageApi.open({
//         type: 'error',
//         content: jsonData.msg,
//       });
//     } catch (err) {
//       // 解析成对象失败，说明是正常的文件流
//       console.log(err, "success...");
//     }
//   };
//   fileReader.readAsText(data);
// }

// export function getExportFileName(data) {
//   let contentDisposition = data.headers["content-disposition"];
//   let fileName = "";
//   if (contentDisposition) {
//     // 正则获取filename的值
//     let filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
//     let matches = filenameRegex.exec(contentDisposition);
//     if (matches != null && matches[1]) {
//       fileName = matches[1].replace(/['"]/g, "");
//     }
//     // 通过 URLEncoder.encode(pFileName, StandardCharsets.UTF_8.name()) 加密编码的, 使用decodeURI(fileName) 解密
//     fileName = decodeURI(fileName);
//     // 通过 new String(pFileName.getBytes(), StandardCharsets.ISO_8859_1) 加密编码的, 使用decodeURI(escape(fileName)) 解密
//     // fileName = decodeURI(escape(fileName))
//     return fileName
//   }
// }
