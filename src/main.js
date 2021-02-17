import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import './plugins/element.js'
import '@/styles/index.css'

// Markdown编辑器
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import katex from '@iktakahiro/markdown-it-katex'

// axios
// import axios from 'axios'
// axios.defaults.baseURL = 'http://localhost:3000'
// Vue.prototype.$axios = axios

Vue.use(mavonEditor)
Vue.prototype.$markdownIt = mavonEditor.markdownIt.use(katex)

Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
