<template>
  <div>
    <i>首页/文章管理/文章编辑</i>
    <el-form
      :model="articleForm"
      :rules="articleFormRules"
      ref="articleFormRef"
      label-width="80px"
    >
      <el-form-item
        label="文章标题"
        prop="title"
      >
        <el-input v-model="articleForm.title"></el-input>
      </el-form-item>
      <el-form-item label="文章分类">
        <el-select v-model="articleForm.category">
          <el-option
            v-for="(item, index) in categoryData"
            :key="index"
            :label="item.label"
            :value="item.id"
          ></el-option>
        </el-select>
        <el-button
          type="primary"
          @click="categoryVisible = true"
        >
          管理分类
        </el-button>
      </el-form-item>
      <mavon-editor
        v-model="articleForm.content"
        @save="saveArticle"
      />
    </el-form>
    <!-- 文章分类板 -->
    <el-dialog
      title="文章分类"
      :visible.sync="categoryVisible"
      width="600px"
    >
      <div>
        <v-article-category></v-article-category>
      </div>
      <div slot="footer">
        <el-button @click="categoryVisible = false">返回</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import vArticleCategory from '@/components/admin/ArticleCategory.vue'
import { updateArticle, createArticle } from '@/api/admin/articleManager'
import { getArticleById } from '@/api/common'
import { mapState } from 'vuex'
export default {
  data() {
    return {
      // 文章表单
      articleForm: {
        id: '',
        title: '',
        category: '0',
        content: ''
      },
      // 文章表单验证
      articleFormRules: {
        title: [
          { required: true, message: '文章标题不能为空', trigger: 'blur' }
        ]
      },
      // 分类板是否显示
      categoryVisible: false
    }
  },
  computed: {
    ...mapState(['categoryData'])
  },
  components: { vArticleCategory },
  methods: {
    // 保存文章
    saveArticle() {
      this.$refs.articleFormRef.validate(async valid => {
        if (valid) {
          if (this.articleForm.id) {
            // 如果id存在，走更新api
            const res = await updateArticle(this.articleForm)
            if (res.code !== '200') return
          } else {
            // 否则走新建api
            const res = await createArticle(this.articleForm)
            if (res.code !== '200') return
            // 将生成的文章对象替换到store和表单对象
            this.articleForm = res.data
            this.$store.commit('setEdtingArticle', res.data.id)
          }
          this.$message.success('保存文章成功')
        }
      })
    },
    // 通过id获取文章
    async getArticle(id) {
      const res = await getArticleById(id)
      if (res.code !== '200') return
      this.articleForm = res.data
    }
  },
  mounted() {
    // 如果store中的文章id存在则拉取这个文章
    if (this.$store.state.editingArticle !== '') {
      this.getArticle(this.$store.state.editingArticle)
    } else {
      // 如果不存在，表明是新建，因此只初始化部分
      this.articleForm.category = 'default'
    }
  },
  beforeDestroy() {
    this.$store.commit('setEdtingArticle', '')
  }
}
</script>
