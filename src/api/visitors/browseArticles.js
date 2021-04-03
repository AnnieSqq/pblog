import http from '@/utils/http'
/**
 * 获取文章列表
 */
export async function getCateArtiList(query) {
  return await http.get('/visitor/browse/articles')
}
