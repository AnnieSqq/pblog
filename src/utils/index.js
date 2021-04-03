// 公共调用的工具函数
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
  return window.sessionStorage.getItem('visitortoken')
}
/**
 * 保存游客token
 */
export function setVisitorToken(token) {
  window.sessionStorage.setItem('visitortoken', token)
}
