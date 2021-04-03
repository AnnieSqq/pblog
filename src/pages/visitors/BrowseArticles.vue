<template>
  <div>
    <el-card class="full_card_head">
      <!-- 卡片头 -->
      <div
        slot="header"
        class="browse_head"
      >
        <el-row
          type="flex"
          align="middle"
        >
          <el-col :span="6">浏览文章</el-col>
          <!-- <el-col :span="6"></el-col> -->
          <el-col
            :span="6"
            :offset="12"
          >
            <el-input
              placeholder="请输入搜索内容"
              v-model="queryInfo.content"
              size="mini"
              clearable
            >
              <el-button
                slot="append"
                icon="el-icon-search"
              ></el-button>
            </el-input>
          </el-col>
        </el-row>
      </div>
      <!-- 卡片体 -->
      <div ref="articleCategoryRef">
        <div
          v-for="(items, indexs) in articles"
          :key="indexs"
        >
          <div class="category_tags">{{ items.category }}</div>
          <p v-if="items.data.length == 0">暂无</p>
          <div
            v-for="(item, index) in items.data"
            :key="index"
            class="article_tags"
          >
            <span @click="handleArticleClick(item.id)">
              {{ item.title }}
            </span>

            <div class="article_info">
              <span>{{ item.reader_num }}人看过</span>
              <span>{{ item.like_num }}人点赞</span>
              <span>{{ item.comment_num }}条评论</span>
              <span>{{ item.collect_num }}人收藏</span>
              <span>{{ item.word_count }}字</span>
              <span>{{ item.release_time }}</span>
            </div>
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>
<script>
import { getTop } from '@/utils'
import { getCateArtiList } from '@/api/visitors/browseArticles'
export default {
  data() {
    return {
      // 文章（分类）列表
      articles: [],
      // 查询条件
      queryInfo: {
        content: ''
      },
      // 页面大纲
      guild: []
    }
  },
  computed: {},
  mounted() {
    this.getArticles()
  },
  methods: {
    // 获取文章数据
    async getArticles() {
      const res = await getCateArtiList()
      if (res.code !== '200') return
      this.articles = res.data
    },
    // 获取页面导航
    getGuild() {
      this.guild = []
      const nodes = this.$refs.articleCategoryRef.children
      nodes.forEach((item) => {
        this.guild.push({
          level: 1,
          site: getTop(item.children[0]) - 50 - 10,
          text: item.children[0].innerText
        })
      })
    },
    // 点击文章
    handleArticleClick(id) {
      this.$router.push({
        path: '/read_articles',
        query: { id }
      })
    }
  },
  updated() {
    this.getGuild()
    this.$store.dispatch('setGuildDataAsync', this.guild)
  }
}
</script>
<style scoped>
/* 页面标头 */
.browse_head {
  padding: 20px;
  background-color: #f6e7d2;
}
/* 分类标签 */
.category_tags {
  font-size: 24px;
  font-weight: bold;
  color: #999;
}
/* 文章标签 */
.article_tags {
  margin: 10px;
  padding: 10px;
  background-color: #e3e3d971;
}
.article_tags:hover {
  background-color: #e3e3d9c5;
}
.article_tags > span:hover {
  text-decoration: underline;
  cursor: pointer;
}
/* 文章属性展示 */
.article_info {
  margin-top: 10px;
  color: #aaa;
  font-size: 13px;
}
.article_info > span {
  margin-right: 1em;
}
</style>
