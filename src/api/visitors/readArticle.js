import http from '@/utils/http'
/**
 * 通过id获取文章
 */
export async function getArticleById(id) {
  return await http.get('/visitor/read/article/' + id)
}
/**
 * 根据文章id获取评论
 */
export async function getComments(id, page) {
  return await http.get('/visitor/read/comments/', {
    params: { article: id, action: 'comment', page: page }
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
export async function commentDelete(comment) {
  return await http({
    method: 'DELETE',
    url: '/visitor/interact/comment',
    data: comment
  })
}
/**
 * 点赞/取消赞
 */
export async function like(like) {
  return await http.post('/visitor/interact/like', like)
}
/**
 * 收藏/取消收藏
 */
export async function collect(collect) {
  return await http.post('/visitor/interact/collect', collect)
}
