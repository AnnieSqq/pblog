import Vue from 'vue'
import VueRouter from 'vue-router'

import Visitors from '../pages/visitors/common/Visitors.vue'
import Admin from '../pages/admin/common/Admin.vue'
import Login from '../pages/admin/common/Login.vue'
Vue.use(VueRouter)

const routes = [
  // {
  // path: '/about',
  // name: 'About'
  // route level code-splitting
  // this generates a separate chunk (about.[hash].js) for this route
  // which is lazy-loaded when the route is visited.
  // component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // },
  // 前台
  {
    path: '/',
    component: Visitors,
    redirect: '/browse_articles',
    children: [
      {
        path: 'browse_articles',
        component: () => import('../pages/visitors/BrowseArticles.vue')
      },
      {
        path: 'read_articles',
        component: () => import('../pages/visitors/ReadArticle.vue')
      }
    ]
  },
  // 后台
  {
    path: '/admin',
    component: Admin,
    redirect: '/admin/admin_home',
    children: [
      {
        path: 'admin_home',
        component: () => import('../pages/admin/AdminHome.vue')
      },
      // 文章管理
      {
        path: 'article_list',
        component: () => import('../pages/admin/articlesManager/ArticlesList.vue')
      },
      {
        path: 'article_edit',
        component: () => import('../pages/admin/articlesManager/ArticleEdit.vue')
      },
      {
        path: 'article_info',
        component: () => import('../pages/admin/articlesManager/AriticleInfo.vue')
      },
      {
        path: 'article_statistics',
        component: () => import('../pages/admin/articlesManager/ArticleStatistics.vue')
      },
      // 游客管理
      {
        path: 'visitor_list',
        component: () => import('../pages/admin/visitorsManager/VisitorsList.vue')
      },
      {
        path: 'visitor_info',
        component: () => import('../pages/admin/visitorsManager/VisitorInfo.vue')
      },
      {
        path: 'visitor_statistics',
        component: () => import('../pages/admin/visitorsManager/VisitorsStatistics.vue')
      },
      // 配置管理
      {
        path: 'my_config',
        component: () => import('../pages/admin/configManager/MyConfig.vue')
      },
      {
        path: 'admin_config',
        component: () => import('../pages/admin/configManager/AdminConfig.vue')
      },
      {
        path: 'visitors_config',
        component: () => import('../pages/admin/configManager/VisitorsConfig.vue')
      }
    ]
  },
  // 登录
  {
    path: '/admin/login',
    component: Login
  }
]

const router = new VueRouter({
  routes
})

export default router
