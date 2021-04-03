import http from '@/utils/http'
import { getVisitorToken, setVisitorToken } from '@/utils'
import store from '@/store'
/**
 * 游客注册
 */
export async function register() {
  const res = await http.post('/visitor/user/register')
  // 注册后将token存到浏览器
  setVisitorToken(res.data.token)
  // 注册存好token后将游客信息获取到store中
  store.dispatch('setVisitorInfoAsync')
  return res
}
/**
 * 根据token获取游客信息
 */
export async function getVisitor() {
  return http({
    url: '/visitor/user/info',
    method: 'GET',
    headers: {
      visitortoken: getVisitorToken()
    }
  })
}
