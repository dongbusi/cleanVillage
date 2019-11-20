import axios from 'axios'
// import {Message} from 'element-ui'

let baseURL = process.env.VUE_APP_BASE_URL

// 创建axios实例
const service = axios.create({
  baseURL: baseURL,
  timeout: 15000
})

// request拦截器
service.interceptors.request.use(config => {
  if (localStorage.getItem('token')) {
    config.headers['token'] = localStorage.getItem('token')
  }
  return config
}, error => {
  console.log(error)
  Promise.reject(error)
})

// response拦截器
service.interceptors.response.use(response => {
  // const res = response.data
  if (response.status !== 200) {
    // Message({
    //   message: res.message,
    //   type: 'error',
    //   duration: 5 * 1000
    // })
  } else {
    return response.data
  }
}, error => {
  // console.log('error', error)
  return Promise.reject(error)
})

export default service
