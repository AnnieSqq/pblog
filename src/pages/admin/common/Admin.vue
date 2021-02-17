<template>
  <div>
    <el-container style="height: 800px">
      <!-- 侧栏 -->
      <el-aside>
        <!-- 菜单 -->
        <el-menu :default-active="activeMenuItem" router>
          <el-menu-item index="/admin/admin_home">
            <i class="el-icon-location"></i>
            <span slot="title">首页</span>
          </el-menu-item>
          <el-submenu
            v-for="(items, indexes) in menuData"
            :key="indexes"
            :index="items.index"
          >
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>{{ items.title }}</span>
            </template>
            <el-menu-item
              v-for="(item, index) in items.children"
              :key="index"
              :index="'/admin/' + item.index"
            >
              <i class="el-icon-menu"></i>
              <span slot="title">{{ item.title }}</span>
            </el-menu-item>
          </el-submenu>
        </el-menu>
        <el-button type="primary" @click="$router.push('/')">返回</el-button>
      </el-aside>
      <!-- 主体 -->
      <el-main style="background-color: #eee">
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 菜单数据（首页除外）
      menuData: [
        {
          title: '文章管理',
          index: 'article',
          children: [
            {
              title: '文章列表',
              index: 'article_list'
            },
            {
              title: '文章编辑',
              index: 'article_edit'
            },
            {
              title: '文章信息',
              index: 'article_info'
            },
            {
              title: '文章统计',
              index: 'article_statistics'
            }
          ]
        },
        {
          title: '游客管理',
          index: 'visitor',
          children: [
            {
              title: '游客列表',
              index: 'visitor_list'
            },
            {
              title: '游客信息',
              index: 'visitor_info'
            },
            {
              title: '游客统计',
              index: 'visitor_statistics'
            }
          ]
        },
        {
          title: '配置管理',
          index: 'config',
          children: [
            {
              title: '个人配置',
              index: 'my_config'
            },
            {
              title: '前台配置',
              index: 'visitors_config'
            },
            {
              title: '后台配置',
              index: 'admin_config'
            }
          ]
        }
      ],
      // 菜单激活项
      activeMenuItem: ''
    }
  },
  methods: {
    // 获取分类列表
    async getCategories() {
      this.$store.dispatch('setCategoryDataAsync')
    }
  },
  mounted() {
    this.activeMenuItem = this.$route.path
    // 在admin组件挂载时拉取分类列表
    this.getCategories()
  },
  watch: {
    $route(to, from) {
      this.activeMenuItem = to.path
    }
  }
}
</script>
