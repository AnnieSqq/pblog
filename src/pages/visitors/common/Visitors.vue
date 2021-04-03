<template>
  <div>
    <!-- 页头 -->
    <div id="header" class="fixed_header">
      <el-row>
        <el-col :span="3">LOGO</el-col>
        <el-col :span="3" :offset="18">
          <span @click="$router.push('/admin')">登录后台</span>
        </el-col>
      </el-row>
    </div>
    <!-- 页体 -->
    <el-container id="main">
      <!-- 侧栏 -->
      <el-aside width="300px" id="sideBar">
        <el-scrollbar style="height: 100%">
          <el-card shadow="never" class="side_card full_card_head">
            <!-- 按钮切换 -->
            <div slot="header">
              <el-row class="text_center">
                <el-col
                  :span="12"
                  :class="{ side_btn_active: sideBtnActive == 'nav' }"
                >
                  <p @click="sideBtnActive = 'nav'">导航</p>
                </el-col>
                <el-col
                  :span="12"
                  :class="{ side_btn_active: sideBtnActive == 'intro' }"
                >
                  <p @click="sideBtnActive = 'intro'">简介</p>
                </el-col>
              </el-row>
            </div>
            <!-- 侧栏主体 -->
            <div>
              <!-- 页面导航 -->
              <v-page-guild v-show="sideBtnActive == 'nav'"></v-page-guild>
              <!-- 网站简介 -->
              <v-page-intro v-show="sideBtnActive == 'intro'"></v-page-intro>
            </div>
          </el-card>
        </el-scrollbar>
      </el-aside>
      <!-- 主体 -->
      <el-main id="mainBody">
        <router-view></router-view>
      </el-main>
      <!-- 浮动按钮 -->
      <div id="fixed_btns">
        <el-button type="primary" circle @click="handleBackTop">👆</el-button>
      </div>
    </el-container>
    <!-- 页脚 -->
    <div id="footer" v-text="copyRight"></div>
  </div>
</template>

<script>
import vPageGuild from '@/components/visitors/PageGuild.vue'
import vPageIntro from '@/components/visitors/PageIntro.vue'
import { getVisitorToken } from '@/utils'
export default {
  data() {
    return {
      // 侧栏按钮
      sideBtnActive: 'intro',
      // 页头高度
      headerHeight: 50,
      // 页脚高度
      footerHeight: 50,
      // 页脚copyright
      copyRight: '小青子的私人博客'
    }
  },
  components: { vPageGuild, vPageIntro },
  methods: {
    // 初始化样式
    initStyle() {
      // 页头样式
      const header = document.querySelector('#header')
      header.style.height = this.headerHeight + 'px'
      header.style.lineHeight = header.style.height
      // 页脚样式
      const footer = document.querySelector('#footer')
      footer.style.height = this.footerHeight + 'px'
      footer.style.lineHeight = footer.style.height
      // 页体样式
      const main = document.querySelector('#main')
      main.style.paddingTop = this.headerHeight + 'px'
    },
    // 当滚动鼠标时的处理函数
    handleScroll() {
      // 首先获取滚动条与上端的巨鹿，也就是滚动区域滚动的距离
      const scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop
      // 获取各个相关元素
      const sideBar = document.querySelector('#sideBar')
      const fixedBtns = document.querySelector('#fixed_btns')
      // 动态控制侧栏位置
      sideBar.style.marginTop = scrollTop + 'px'
      // 浮动按钮位置
      fixedBtns.style.top =
        scrollTop + document.documentElement.clientHeight - 200 - 50 + 'px'
    },
    // 当窗口大小改变的处理函数
    handleResize() {
      const sideBar = document.querySelector('#sideBar')
      const fixedBtns = document.querySelector('#fixed_btns')
      sideBar.style.height =
        document.documentElement.clientHeight -
        this.headerHeight -
        20 -
        this.footerHeight +
        'px'
      // 浮动按钮位置
      fixedBtns.style.top =
        document.documentElement.scrollTop +
        document.documentElement.clientHeight -
        200 -
        50 +
        'px'
    },
    // 回到顶部
    handleBackTop() {
      window.scrollTo(0, 0)
    }
  },
  created() {},
  mounted() {
    // 获取游客信息
    if (getVisitorToken) {
      this.$store.dispatch('setVisitorInfoAsync')
    }
    // 初始化样式
    this.initStyle()
    // 初始化侧栏位置
    this.handleScroll()
    window.addEventListener('scroll', this.handleScroll) // Dom树加载完毕注册监听器
    // 初始化侧栏高度
    this.handleResize()
    window.addEventListener('resize', this.handleResize)
  },
  destroyed() {
    // 销毁页面时清除监听器
    window.removeEventListener('scroll', this.handleScroll)
    window.removeEventListener('resize', this.handleResize)
  }
}
</script>

<style>
.fixed_header {
  position: fixed;
  top: 0;
  z-index: 10;
}
#header {
  width: 100%;
  background-color: #fbe2b4;
  color: #c19445;
  font-weight: bold;
  font-size: 24px;
}
/* 侧栏整体样式 */
#sideBar {
  /* overflow-y: scroll; */
}
.beauty_scroll::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 10px; /*高宽分别对应横竖滚动条的尺寸*/
  height: 1px;
}
.beauty_scroll::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 10px;
  background-color: skyblue;
  background-image: -webkit-linear-gradient(
    45deg,
    rgba(255, 255, 255, 0.2) 25%,
    transparent 25%,
    transparent 50%,
    rgba(255, 255, 255, 0.2) 50%,
    rgba(255, 255, 255, 0.2) 75%,
    transparent 75%,
    transparent
  );
}
.beauty_scroll::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: #ededed;
  border-radius: 10px;
}
/* 侧栏头部按钮样式 */
.side_card {
  /* height: 100%; */
}
.side_card .el-col-12 {
  font-weight: bold;
  color: #999;
  line-height: 48px;
  cursor: pointer;
}
.side_card .el-col-12 > p {
  margin: 0;
}
.side_btn_active {
  background-color: #857565;
  color: #eee;
}
#main {
  width: 90%;
  min-width: 1100px;
  margin: 10px auto;
  position: relative;
}
#mainBody {
  padding: 0;
  min-height: 1200px;
  margin-left: 10px;
}
#footer {
  background-color: darkseagreen;
  text-align: center;
  color: #666;
}
/* 浮动按钮它是以#main为基准的定位 */
#fixed_btns {
  position: absolute;
  /* bottom: 30px; */
  top: 0px;
  right: -45px;
  width: 40px;
  height: 200px;
}
</style>
