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
