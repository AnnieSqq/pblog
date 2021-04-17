<template>
  <div>
    <el-card class="login_card">
      <div slot="header">管理员登录</div>
      <div>
        <el-form ref="loginFormRef" :model="loginForm" label-width="80px">
          <el-form-item label="用户名">
            <el-input v-model="loginForm.username"></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input v-model="loginForm.password"></el-input>
          </el-form-item>
        </el-form>
        <el-row>
            <el-col :span="4" :offset="16">
                <el-button type="info" @click="$router.push('/')">返回</el-button>
            </el-col>
          <el-col :span="4">
            <el-button type="primary" @click="loginCheck">登录</el-button>

          </el-col>
        </el-row>

      </div>
    </el-card>
  </div>
</template>

<script>
import { loginGuard, setAdminToken } from '@/utils'
import { login } from '@/api/admin/all.js'
export default {
  data() {
    return {
      loginForm: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    async loginCheck() {
      const res = await login(this.loginForm)
      if (res.code === '200') {
        this.$message.success(res.msg)
        setAdminToken(res.data.token)
        this.$store.commit('setAdminInfo', res.data)
        this.$router.push('/admin')
      }
    }
  },
  async created() {
    // 如果已经验证通过，就重定向到后台
    if (await loginGuard()) {
      this.$router.push('/admin')
    }
  }
}
</script>
<style scoped>
.login_card {
  width: 600px;
  margin: 100px auto 0 auto;
}
</style>
