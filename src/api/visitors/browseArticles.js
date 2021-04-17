import http from '@/utils/http'
/**
 * 获取文章列表
 * @param {Object} query 要搜索的条件
 * @returns
 */
export async function getCateArtiList(query) {
  return await http.get('/visitor/browse/articles')
}
export async function getArchive() {
  return await http.get('/visitor/browse/timeline')
}
/**
 * 获取网站留言
 */
export async function getLeavewords() {
  return await http.get('visitor/read/comments', {
    params: { action: 'leaveword' }
  })
}
/**
 * 留言
 * @param {Object} leaveword 留言对象
 * @returns
 */
export async function leaveword(leaveword) {
  return await http.post('/visitor/interact/comment', leaveword)
}
