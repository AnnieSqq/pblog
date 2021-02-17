<template>
  <!-- 文章分类的增删改 -->
  <div>
    <!-- 分类目录树 -->
    <el-tree
      :data="categoryData"
      ref="CategoryTreeRef"
      show-checkbox
      node-key="id"
    >
      <span slot-scope="{ node, data }">
        <div v-if="editing.id != data.id">
          <span>{{ node.label }}</span>
          <!-- 编辑与删除按钮 -->
          <span>
            <el-button type="text" size="mini" @click="handleEdit(data)">
              <i class="el-icon-edit"></i>
            </el-button>
            <el-button
              type="text"
              size="mini"
              @click="removeCategory([data.id])"
            >
              <i class="el-icon-delete"></i>
            </el-button>
          </span>
        </div>
        <el-input v-else v-model="editing.label" size="mini">
          <!-- 编辑的确认与取消按钮 -->
          <span slot="append">
            <el-button size="mini" @click="editCategory(data)">
              <i class="el-icon-check"></i>
            </el-button>
            <el-button size="mini" @click="editing = {}">
              <i class="el-icon-close"></i>
            </el-button>
          </span>
        </el-input>
      </span>
    </el-tree>
    <!-- 添加分类行 -->
    <div v-if="adding.isAdding">
      <el-input v-model="adding.label" size="mini">
        <span slot="append">
          <el-button size="mini" @click="addCategory">
            <i class="el-icon-check"></i>
          </el-button>
          <el-button size="mini" @click="adding = {}">
            <i class="el-icon-close"></i>
          </el-button>
        </span>
      </el-input>
    </div>
    <!-- 整体操作行 -->
    <el-checkbox v-model="checkAll" label="全选"></el-checkbox>
    <el-button type="primary" size="mini" @click="handleRemoveAll">
      删除选中
    </el-button>
    <el-button type="primary" size="mini" @click="handleAdd">
      添加分类
    </el-button>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import {
  createCategory,
  updateCategory,
  deleteCategories
} from '@/api/admin/articleManager'
export default {
  data() {
    return {
      // 当前正在编辑的分类项
      editing: {},
      // 当前要添加的分类
      adding: {
        isAdding: false,
        label: ''
      },
      checkAll: false
    }
  },
  computed: {
    ...mapState(['categoryData'])
  },
  methods: {
    // 更新分类数据
    ...mapActions(['setCategoryDataAsync']),
    // 添加按钮
    handleAdd() {
      this.adding = { isAdding: true, label: '' }
    },
    // 提交添加
    async addCategory() {
      if (this.adding.label.trim().length <= 0) {
        this.$message.info('分类名称不能为空')
      } else {
        // 添加请求
        const res = await createCategory(this.adding)
        if (res.code !== '200') return
        this.$message.success(res.msg)
        // 刷新分类数据
        this.setCategoryDataAsync()
        this.adding = {}
      }
    },
    // 编辑按钮
    handleEdit(data) {
      // 注意刷新视图
      this.editing = (({ id, label }) => ({ id, label }))(data)
    },
    // 提交编辑
    async editCategory(data) {
      if (this.editing.label.trim().length <= 0) {
        this.$message.info('分类名称不能为空')
      } else {
        // 更新请求
        const res = await updateCategory(this.editing)
        if (res.code !== '200') return
        this.$message.success(res.msg)
        // 更新分类列表
        this.setCategoryDataAsync()
        this.editing = {}
      }
    },
    // 删除选中按钮
    handleRemoveAll() {
      const checkedKeys = this.$refs.CategoryTreeRef.getCheckedKeys()
      this.removeCategory(checkedKeys)
    },
    // 提交删除
    async removeCategory(ids) {
      if (ids.length <= 0) {
        this.$message.info('没有要删除的分类')
      } else {
        // 删除请求
        const res = await deleteCategories(ids)
        if (res.code !== '200') return
        this.$message.success(res.msg)
        // 刷新分类列表
        this.setCategoryDataAsync()
      }
    }
  }
}
</script>
