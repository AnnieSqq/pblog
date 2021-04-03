import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import './plugins/element.js'
import '@/styles/index.css'

// Markdown编辑器
import getMarkdownIt from 'markdown-it'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import katex from '@iktakahiro/markdown-it-katex'
import hljs from 'highlight.js'
import 'highlight.js/styles/paraiso-light.css'
// import 'highlight.js/styles/gradient-light.css'
const markdownIt = getMarkdownIt({
  highlight: function(str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return (
          '<pre class="hljs"><code>' +
          hljs.highlight(lang, str, true).value +
          '</code></pre>'
        )
      } catch (__) {}
    }
    return (
      '<pre class="hljs"><code>' +
      markdownIt.utils.escapeHtml(str) +
      '</code></pre>'
    )
  }
})
Vue.use(mavonEditor)
Vue.prototype.$markdownIt = markdownIt.use(katex)

Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
