// 公共调用的工具函数
import store from '@/store'
import { getAdminInfo } from '@/api/admin/all.js'
import { Message } from 'element-ui'
/**
 * 将storage也导出
 */
export const storage = window.localStorage

/**
 * 获取元素与页框顶的距离
 */
export function getTop(e) {
  var offset = e.offsetTop
  if (e.offsetParent != null) {
    offset += getTop(e.offsetParent)
  }
  return offset
}
/**
 * 获取游客token
 */
export function getVisitorToken() {
  return storage.getItem('visitortoken')
}
/**
 * 保存游客token
 */
export function setVisitorToken(token) {
  storage.setItem('visitortoken', token)
}
/**
 *获取管理员token
 * @returns {String} 管理员token
 */
export function getAdminToken() {
  return storage.getItem('admintoken')
}
/**
 * 保存管理员token
 * @param {String} token 管理员token字符串
 */
export function setAdminToken(token) {
  storage.setItem('admintoken', token)
}
/**
 * 管理员登录拦截函数
 */
export async function loginGuard() {
  const token = getAdminToken()
  if (token) {
    if (store.state.adminInfo.token !== token) {
      const res = await getAdminInfo()
      if (res.code === '200') {
        // 获取到了
        store.commit('setAdminInfo', res.data)
        return true
      } else if (res.code === '400') {
        // token不正确，清除
        store.commit('setAdminInfo', {})
        storage.removeItem('admintoken')
        return false
      } else {
        Message.success('服务器开小差了~~')
        return false
      }
    }
    return true
  } else {
    return false
  }
}
