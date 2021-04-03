import http from '@/utils/http'
/**
 * 根据文章id获取评论
 */
export async function getComments(id) {
  return await http.get('/visitor/read/comments/' + id)
}
/**
 * 评论
 */
export async function comment(comment) {
  return await http.post('/visitor/interact/comment', comment)
}
/**
 * 根据评论id删除评论
 */
export async function commentDelete(id) {
  return await http({
    method: 'DELETE',
    url: '/visitor/interact/comment',
    data: { id }
  })
}
