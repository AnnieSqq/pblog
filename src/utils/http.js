import axios from 'axios'
import { Message } from 'element-ui'
axios.defaults.baseURL = 'http://localhost:3000'
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
