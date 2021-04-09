import http from '@/utils/http'
/**
 * 根据文章id获取评论
 */
export async function getComments(id) {
  return await http.get('/visitor/read/comments/', {
    params: { article: id, action: 'comment' }
  })
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
export async function commentDelete({ id, visitor, owner }) {
  return await http({
    method: 'DELETE',
    url: '/visitor/interact/comment',
    data: { id, visitor, owner }
  })
}
/**
 * 点赞/取消赞
 */
export async function like(like) {
  return await http.post('/visitor/interact/like', like)
}
