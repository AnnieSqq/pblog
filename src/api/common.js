import http from '@/utils/http'
/**
 * 通过id获取文章
 */
export async function getArticleById(id) {
  return await http.get('/admin/article/' + id)
}
