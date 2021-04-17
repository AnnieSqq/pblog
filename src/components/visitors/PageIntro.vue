<template>
  <div class="child_borderd_div">
    <div class="author_intro">
      <el-avatar :src="authorIntro.avatar" :size="80"></el-avatar>
      <div><strong>爱好：</strong>{{ authorIntro.hobby }}</div>
      <div><strong>个签：</strong>{{ authorIntro.motto }}</div>
    </div>
    <div class="article_archive beauty_btn1" @click="archiveVisible = true">
      查看归档
    </div>
    <div class="leave_msg beauty_btn1" @click="leaveMsgVisible = true">
      留言板
    </div>
    <!-- 隐藏区域 -->
    <!-- 查看归档 -->
    <el-drawer
      title="文章归档"
      :visible.sync="archiveVisible"
      direction="rtl"
      size="500px"
    >
      <div>
        <el-timeline>
          <el-timeline-item
            v-for="(item, index) in articleArchive"
            :key="index"
            :timestamp="item.release_time"
          >
            <el-button type="primary" @click="handleArchiveClick(item.id)">{{
              item.title
            }}</el-button>
          </el-timeline-item>
        </el-timeline>
      </div>
    </el-drawer>
    <!-- 留言板 -->
    <el-dialog title="留言板" :visible.sync="leaveMsgVisible" width="60%">
      <v-comment-pad :articleId="'_1'"></v-comment-pad>
    </el-dialog>
  </div>
</template>

<script>
import vCommentPad from '@/components/visitors/CommentPad.vue'
import { getArchive } from '@/api/visitors/browseArticles.js'
export default {
  data() {
    return {
      // 归档是否可见
      archiveVisible: false,
      // 留言板是否可见
      leaveMsgVisible: false,
      // 作者简介
      authorIntro: {
        avatar: '/logo.png',
        hobby: '敲代码，和平精英，云顶之弈，乒乓球，吃，购物',
        motto: '水是生命之源'
      },
      // 留言内容
      leaveMsgs: {
        page: 1,
        data: []
      },
      // 文章归档
      articleArchive: []
    }
  },
  components: { vCommentPad },
  methods: {
    handleArchiveClick(id) {
      // console.log(id)
      this.$router.push({
        path: '/read_articles',
        query: { id }
      })
    },
    async getArticleArchive() {
      const res = await getArchive()
      if (res.code === '200') {
        this.articleArchive = res.data
      }
    }
  },
  created() {
    this.getArticleArchive()
  }
}
</script>

<style scoped>
/* 单个小模块 */
.child_borderd_div > div {
  border: 1px solid #eee;
}
/* 作者简介 */
.author_intro {
  height: 300px;
  text-align: center;
}
.author_intro .el-avatar {
  font-size: 60px;
  margin-top: 50px;
}
.author_intro > div {
  margin-top: 30px;
  color: #999;
  font-size: 13px;
  text-align: left;
  line-height: 20px;
  padding: 0 20px;
}
/* 查看归档 */
.beauty_btn1 {
  height: 40px;
  line-height: 40px;
  font-size: 18px;
  font-weight: bold;
  color: #91684a;
  background-color: #eee;
  box-shadow: 1px 1px;
  margin: 10px 0;
  text-align: center;
  cursor: pointer;
}
.beauty_btn1:hover {
  background-color: #ddd;
}
.beauty_btn1:active {
  box-shadow: 1px 1px inset;
}
/* 留言 */
.leave_msg {
  /* height: 400px; */
}
</style>
