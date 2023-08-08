import axios from 'axios'

// url接口定义
const request = axios.create({
  baseURL: '/api',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
})

export default {
  post(url, data) {
    return new Promise((resolve, reject) => {
      request({
        method: 'post',
        url,
        data,
      })
        .then((res) => {
          resolve(res.data)
        })
        .catch((err) => {
          reject(err)
        })
    })
  },

  get(url, data) {
    return new Promise((resolve, reject) => {
      request({
        method: 'get',
        url,
        params: data,
      })
        .then((res) => {
          resolve(res.data)
        })
        .catch((err) => {
          reject(err)
        })
    })
  },
  request,
}
