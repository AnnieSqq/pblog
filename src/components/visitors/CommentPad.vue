<template>
  <div>
    <div class="comment_show">
      <!-- 评论展示板 -->
      <el-card shadow="never" v-for="(item, index) in comments.data" :key="index">
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
        </div>
      </el-card>
      <h1 v-if="comments.data.length<=0" style="color:#ccc;text-align:center">暂无内容</h1>
    </div>
    <!-- 分页与提交 -->
    <el-row style="padding: 10px">
      <el-col :span="12">
        <el-pagination layout="prev, pager, next" :total="50"> </el-pagination>
      </el-col>
      <el-col :span="12" style="text-align: right">
        <el-button type="primary" @click="commentVisible = false">
          发表
        </el-button>
      </el-col>
    </el-row>
    <!-- 评论输入框 -->
    <el-input
      v-model="commentInput"
      type="textarea"
      :autosize="{ minRows: 2, maxRows: 3 }"
      placeholder="对这篇文章发表一些看法吧！"
    ></el-input>
  </div>
</template>
<script>
export default {
  data () {
    return {
      commentInput: ''
    }
  },
  props: ['comments']
}
</script>

<style scoped>
/* 评论展示板 */
.comment_show {
  height: 320px;
  overflow: auto;
}
/* 回复区域 */
.comment_show .reply_show {
  background-color: #ddd;
}
</style>
