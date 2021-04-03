<template>
  <div>
    <el-card :body-style="bodyStyle" class="full_card_head">
      <div slot="header" class="article_head">
        <el-row>
          <el-col :span="18">{{ article.title }}</el-col>
          <el-col :span="6" style="text-align: right">
            <a href="#" @click="$router.go(-1)">返回＞</a>
          </el-col>
        </el-row>
      </div>
      <div v-html="contentRendered" ref="articleContentRef"></div>
    </el-card>
    <el-card shadow="never">
      <h3>评论</h3>
      <v-comment-pad :article-id="article.id"></v-comment-pad>
    </el-card>
    <!-- 评论板弹出按钮 -->
    <el-button
      type="primary"
      circle
      icon="el-icon-s-comment"
      @click="commentVisible = true"
      class="fixed_btn"
    ></el-button>
    <!-- 隐藏区域 -->
    <el-dialog title="评论板" :visible.sync="commentVisible" width="60%">
      <v-comment-pad :article-id="article.id"></v-comment-pad>
    </el-dialog>
  </div>
</template>

<script>
import vCommentPad from '@/components/visitors/CommentPad.vue'
import { getTop } from '@/utils'
import { getArticleById } from '@/api/common'
export default {
  data() {
    return {
      // 文章
      article: {
        id: '4564',
        title: '测试文章',
        release_time: '2021-01-15',
        reader_num: '15',
        like_num: '8',
        comment_num: '2',
        collect_num: '5',
        content: ''
      },
      commentInput: '',
      // 文章内容渲染后
      contentRendered: '',
      // 文章内容区域样式
      bodyStyle: {
        backgroundColor: '#f7f5f1'
      },
      // 文章大纲
      guild: [],
      // 文章评论对话框
      commentVisible: false
    }
  },
  components: { vCommentPad },
  mounted() {
    this.getMd()
  },
  updated() {
    this.getGuild()
    this.$store.dispatch('setGuildDataAsync', this.guild)
  },
  methods: {
    // 获取md内容
    async getMd() {
      const res = await getArticleById(this.$route.query.id)
      if (res.code !== '200') return
      this.article = res.data
      // 渲染
      this.contentRendered = this.$markdownIt.render(this.article.content)
    },
    // 获取渲染后markdown的guild，只能在updated生命周期中执行，否则获取不到元素
    getGuild() {
      this.guild = []
      const nodes = this.$refs.articleContentRef.children
      nodes.forEach(item => {
        const tag = item.nodeName
        let level = 0
        if (tag.slice(0, 1) === 'H' && (level = parseInt(tag.slice(1, 2)))) {
          this.guild.push({
            level,
            site: getTop(item) - 50 - 10 /* 减去固定页头的高度 */,
            text: item.innerText
          })
        }
      })
    }
  }
}
</script>

<style scoped>
/* 文章大标题 */
.article_head {
  padding: 20px;
  background-color: #f6e7d2;
}
/* 右边浮动小按钮 */
.fixed_btn {
  position: fixed;
  left: 10px;
  bottom: 60px;
}
</style>
