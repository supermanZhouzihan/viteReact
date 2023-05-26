import request from '@/utils/request'


export function getCode() {
    // axios.get('/api/users')
    //     .then(response => {
    //         console.log(response.data);
    //     })
    //     .catch(error => {
    //         console.error(error);
    //     });
    return request({
      url: '/code',
      method: 'get'
    })
}

export function getCodeImg() {
    return request({
      url: '/code',
      method: 'get'
    })
  }