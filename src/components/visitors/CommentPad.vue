<template>
  <div>
    <div class="comment_show">
      <!-- 评论展示板 -->
      <el-card shadow="never" v-for="(item, index) in comments" :key="index">
        <div v-if="item.reply" class="reply_show">
          回复 {{ item.reply.visitor_name }} {{ item.reply.release_time }}：
          <br />
          <span style="padding-left: 2em">
            {{ item.reply.content }}
          </span>
        </div>
        <div>
          <font style="color: #a1c323">
            {{ item.visitor_name }} {{ item.release_time }}
          </font>
          <br />
          <span style="padding-left: 2em">
            {{ item.content }}
          </span>
          <br />
          <span
            @click="handleReplyChange(index, item.id)"
            style="cursor: pointer"
            >回复
          </span>
          <span
            @click="removeComment(item.id, item.visitor_id)"
            style="cursor: pointer"
            >删除</span
          >
        </div>
      </el-card>
      <h1 v-if="comments.length <= 0" style="color: #ccc; text-align: center">
        暂无内容
      </h1>
    </div>
    <!-- 分页与提交 -->
    <el-row style="padding: 10px">
      <el-col :span="12">
        <el-pagination
          layout="prev, pager, next"
          :current-page.sync="pagination.page"
          :page-size="pagination.size"
          :total="pagination.total"
          @current-change="getComments"
        >
        </el-pagination>
      </el-col>
      <el-col :span="12" style="text-align: right">
        <el-button type="primary" @click="commitComment"> 发表 </el-button>
      </el-col>
    </el-row>
    <!-- 评论输入框 -->
    <el-input
      v-model="commentInfo.content"
      type="textarea"
      :autosize="{ minRows: 2, maxRows: 3 }"
      :placeholder="
        this.articleId === '_1'
          ? '留下你的足迹吧！'
          : '对这篇文章发表一些看法吧！'
      "
    ></el-input>
    <div v-if="commentInfo.reply" class="reply_show">
      回复 {{ comments[commentInfo.reply_index].visitor_name }}
      {{ comments[commentInfo.reply_index].release_time }}：
      <br />
      <span style="padding-left: 2em">
        {{ comments[commentInfo.reply_index].content }}
      </span>
      <br />
      <span @click="handleReplyChange(-1, undefined)" style="cursor: pointer"
        >取消</span
      >
    </div>
  </div>
</template>
<script>
import {
  comment,
  commentDelete,
  getComments
} from '@/api/visitors/readArticle.js'
import { getLeavewords } from '@/api/visitors/browseArticles.js'
export default {
  data() {
    return {
      // 评论
      comments: [],
      pagination: {
        page: 1
      },
      commentInfo: {
        content: '',
        reply_index: -1,
        reply: undefined
      }
    }
  },
  props: ['articleId'],
  methods: {
    // 获取对应文章的评论
    async getComments() {
      let res
      // 如果id匹配，那就是获取评论
      if (this.articleId === '_1') {
        res = await getLeavewords()
      } else if (this.articleId.match(/^[0-9a-fA-F]{24}$/)) {
        res = await getComments(this.articleId, this.pagination.page)
      } else {
        return
      }
      if (res.code !== '200') return
      this.comments = res.data.comments
      // 获取分页信息
      this.pagination = {
        page: res.data.page,
        size: res.data.size,
        total: res.data.total,
        pages: res.data.pages,
        display: res.data.display
      }
    },
    // 发表评论
    async commitComment() {
      if (this.commentInfo.content.trim() === '') {
        return this.$message.info('评论内容不能为空')
      }
      const commentObj = {
        visitor: this.$store.state.visitorInfo
          ? this.$store.state.visitorInfo.id
          : null,
        article: this.articleId === '_1' ? undefined : this.articleId,
        content: this.commentInfo.content,
        action: this.articleId === '_1' ? 'leaveword' : 'comment',
        reply: this.commentInfo.reply
      }
      const res = await comment(commentObj)
      if (res.code !== '200') return
      this.$message.success(res.msg)
      // 评论提交信息清空
      this.commentInfo = {
        content: '',
        reply_index: -1,
        reply: undefined
      }
      this.getComments()
    },
    // 点击回复按钮
    handleReplyChange(index, reply) {
      this.commentInfo.reply_index = index
      this.commentInfo.reply = reply
    },
    // 删除评论
    async removeComment(id, owner) {
      const res = await commentDelete({
        id: id,
        visitor: this.$store.state.visitorInfo
          ? this.$store.state.visitorInfo.id
          : null,
        owner,
        article: this.articleId
      })
      if (res.code !== '200') return
      this.getComments()
      this.$message.success(res.msg)
    }
  },
  mounted() {
    this.getComments()
  },
  watch: {
    // 当文章id 更新时再获取评论信息，否则获取到的是旧的信息
    articleId(val) {
      this.getComments()
    }
  }
}
</script>

<style scoped>
/* 评论展示板 */
.comment_show {
  height: 320px;
  overflow: auto;
}
/* 回复区域 */
.reply_show {
  background-color: #ddd;
}
</style>
