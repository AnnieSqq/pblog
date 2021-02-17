<template>
  <div>
    <i>首页/文章管理/文章列表</i>
    <!-- 表格 -->
    <el-table :data="articleData" style="width: 100%">
      <el-table-column type="selection"> </el-table-column>
      <el-table-column type="index" label="序号"> </el-table-column>
      <el-table-column prop="release_time" label="发布时间"></el-table-column>
      <el-table-column prop="title" label="标题"> </el-table-column>
      <el-table-column label="操作" width="100">
        <template slot-scope="scope">
          <el-button
            type="primary"
            circle
            icon="el-icon-edit"
            size="mini"
            @click="handleEdit(scope.row.id)"
          ></el-button>
          <el-button
            type="danger"
            circle
            icon="el-icon-delete"
            size="mini"
            @click="removeArticles([scope.row.id])"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 表格下方行 -->
    <el-row type="flex" align="middle">
      <!-- 分页 -->
      <el-col :span="12">
        <el-pagination layout="prev, pager, next, total" :total="50">
        </el-pagination>
      </el-col>
      <!-- 删除选中 -->
      <el-col :span="12" style="text-align: right">
        <el-button type="primary" size="mini">删除选中</el-button>
        <el-button
          type="primary"
          size="mini"
          @click="$router.push('article_edit')"
          >新建文章</el-button
        >
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getArticleList, deleteArticles } from '@/api/admin/articleManager'
export default {
  data() {
    return {
      articleData: [
        {
          id: '456',
          title: '测试文章555',
          release_time: '2021-2-9'
        }
      ]
    }
  },
  created() {
    this.getAriticles()
  },
  methods: {
    // 获取文章数据
    async getAriticles() {
      const res = await getArticleList()
      if (res.code !== '200') return
      this.articleData = res.data
    },
    // 编辑按钮
    handleEdit(id) {
      this.$store.commit('setEdtingArticle', id)
      this.$router.push('article_edit')
    },
    // 删除文章
    async removeArticles(ids) {
      const res = await deleteArticles(ids)
      this.getAriticles()
      if (res.code !== '200') return
      this.$message.success(res.msg)
    }
  }
}
</script>
