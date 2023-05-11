import request from '@/utils/request'


export function getCode(data) {
    axios.get('/api/users')
        .then(response => {
            console.log(response.data);
        })
        .catch(error => {
            console.error(error);
        });
}

export function getCodeImg() {
    return request({
      url: '/code',
      method: 'get'
    })
  }