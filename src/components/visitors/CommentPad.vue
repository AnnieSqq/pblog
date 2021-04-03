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
          <span @click="removeComment(item.id)" style="cursor: pointer"
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
        <el-pagination layout="prev, pager, next" :total="50"> </el-pagination>
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
      placeholder="对这篇文章发表一些看法吧！"
    ></el-input>
    <div v-if="commentInfo.reply" class="reply_show">
      回复 {{ comments[commentInfo.reply_index].visitor_name }}
      {{ comments[commentInfo.reply_index].release_time }}：
      <br />
      <span style="padding-left: 2em">
        {{ comments[commentInfo.reply_index].content }}
      </span>
      <br />
      <span @click="handleReplyChange(-1, null)" style="cursor: pointer"
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
export default {
  data() {
    return {
      // 评论
      comments: [
        {
          id: '31324',
          visitor_name: '小魔仙8号',
          content: '好棒啊加油',
          release_time: '2021-1-25',
          reply: null
        },
        {
          id: '6582',
          visitor_name: '喜羊羊5号',
          content: '我觉得这篇文章写得不好',
          release_time: '2021-1-28',
          reply: null
        },
        {
          id: '15346',
          visitor_name: '猪猪侠3号',
          content: '瞎说，这篇文章写得很详细，不错的',
          release_time: '2021-2-1',
          reply: {
            id: '6582',
            visitor_name: '喜羊羊5号',
            content: '我觉得这篇文章写得不好',
            release_time: '2021-2-1'
          }
        }
      ],
      commentInfo: {
        content: '',
        reply_index: -1,
        reply: null
      }
    }
  },
  props: ['articleId'],
  methods: {
    // 获取对应文章的评论
    async getComments() {
      const res = await getComments(this.articleId)
      if (res.code !== '200') return
      this.comments = res.data
    },
    // 发表评论
    async commitComment() {
      if (this.commentInfo.content.trim() === '') {
        return this.$message.info('评论内容不能为空')
      }
      const res = await comment({
        visitor: this.$store.state.visitorInfo
          ? this.$store.state.visitorInfo.id
          : null,
        article: this.articleId,
        content: this.commentInfo.content,
        reply: this.commentInfo.reply
      })
      if (res.code !== '200') return
      this.$message.success(res.msg)
      // 评论提交信息清空
      this.commentInfo = {
        content: '',
        reply_index: -1,
        reply: null
      }
      this.getComments()
    },
    // 点击回复按钮
    handleReplyChange(index, reply) {
      this.commentInfo.reply_index = index
      this.commentInfo.reply = reply
    },
    // 删除评论
    async removeComment(id) {
      const res = await commentDelete(id)
      if (res.code !== '200') return
      this.getComments()
      this.$message.success(res.msg)
    }
  },
  mounted() {
    if (this.articleId.match(/^[0-9a-fA-F]{24}$/)) {
      this.getComments()
    }
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
