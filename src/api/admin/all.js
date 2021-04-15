import http from '@/utils/http'
import { getAdminToken } from '@/utils'
/**
 * 管理员登录
 * @param {Object} form 登录表单的内容
 * @returns
 */
export async function login(form) {
  return await http.post('/admin/login', form)
}
/**
 * 根据token获取管理员信息
 * @returns
 */
export async function getAdminInfo() {
  return await http({
    methods: 'get',
    url: '/admin/info',
    headers: { admintoken: getAdminToken() }
  })
}
