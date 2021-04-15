import Vue from 'vue'
import Vuex from 'vuex'
import { getCategoryList } from '@/api/admin/articleManager'
import { getVisitor } from '@/api/visitors/all.js'
import { getAdminInfo } from '@/api/admin/all.js'
Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    // 游客信息
    visitorInfo: {},
    // 游客端侧边栏的导航数据
    guildData: {},
    // 当前正在编辑的文章id
    editingArticle: '',

    // 文章分类
    categoryData: [],
    // 管理员用户信息
    adminInfo: {}
  },
  mutations: {
    setGuildData(state, data) {
      state.guildData = data
    },
    setEdtingArticle(state, data) {
      state.editingArticle = data
    },
    setCategoryData(state, data) {
      state.categoryData = data
    },
    setVisitorInfo(state, data) {
      state.visitorInfo = data
    },
    setAdminInfo(state, data) {
      state.adminInfo = data
    }
  },
  actions: {
    setGuildDataAsync(context, data) {
      context.commit('setGuildData', data)
    },
    async setCategoryDataAsync(context, data) {
      const res = await getCategoryList()
      context.commit('setCategoryData', res.data)
    },
    async setVisitorInfoAsync(context, data) {
      const res = await getVisitor()
      context.commit('setVisitorInfo', res.data)
    },
    async setAdminInfoAsync(context, data) {
      const res = await getAdminInfo()
      context.commit('setAdminInfo', res.data)
    }
  },
  getters: {
    getGuildData(state) {
      return state.guildData
    },
    getEditingArticle: (state) => state.editingArticle,
    getcategoryData: (state) => state.categoryData
  }
})
