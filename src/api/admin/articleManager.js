import http from '@/utils/http'
/**
 * 获取文章列表
 *  */
export async function getArticleList(query) {
  return await http.get('/admin/article')
}
/**
 * 新建文章
 */
export async function createArticle(article) {
  return await http.post('/admin/article', article)
}
/**
 * 更新文章
 */
export async function updateArticle(article) {
  return await http.put('/admin/article', article)
}
/**
 * 根据id集合删除文章
 */
export async function deleteArticles(ids) {
  return await http({
    url: '/admin/article',
    method: 'delete',
    data: { ids }
  })
}
/**
 * 分类列表
 */
export async function getCategoryList(query) {
  return await http.get('/admin/category')
}
/**
 * 添加分类
 */
export async function createCategory(category) {
  return await http.post('/admin/category', category)
}
/**
 * 修改分类
 */
export async function updateCategory(category) {
  return await http.put('/admin/category', category)
}
/**
 * 根据id集合删除分类
 */
export async function deleteCategories(ids) {
  return await http({
    url: '/admin/category',
    method: 'delete',
    data: { ids }
  })
}
