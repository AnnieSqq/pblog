import axios from 'axios'
import { Message } from 'element-ui'
import { register } from '@/api/visitors/all.js'
axios.defaults.baseURL = 'http://localhost:3000'
// 请求拦截器
axios.interceptors.request.use(
  async (config) => {
    const urls = config.url.split('/')
    // 如果是游客的行为路由，则在header加入token
    if (urls[1] === 'visitor' && urls[2] === 'interact') {
      // 如果是无账号状态则注册账号
      if (!window.sessionStorage.getItem('visitortoken')) {
        const res = await register()
        if (res.code !== '200') return config
        config.data.visitor = res.data.id
      }
      config.headers.visitortoken = window.sessionStorage.getItem(
        'visitortoken'
      )
    }
    return config
  },
  (error) => {
    console.log(error)
    return Promise.reject(error)
  }
)
// 响应拦截器
axios.interceptors.response.use(
  ({ data: res }) => {
    if (res.code !== '200') {
      Message.error(res.msg || '错误')
    }
    return res
  },
  (error) => {
    console.log(error)
    return Promise.reject(error)
  }
)
export default axios
