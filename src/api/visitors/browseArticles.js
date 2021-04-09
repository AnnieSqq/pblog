import http from '@/utils/http'
/**
 * 获取文章列表
 */
export async function getCateArtiList(query) {
  return await http.get('/visitor/browse/articles')
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
 */
export async function leaveword(leaveword) {
  return await http.post('/visitor/interact/comment', leaveword)
}
