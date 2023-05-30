import request from '@/utils/request'



export function getCodeImg() {
  return request({
    url: '/code',
    method: 'get'
  })
}

export function login(data:any) {
  return request({
    url: '/auth/login',
    method: 'post',
    data
  })
}