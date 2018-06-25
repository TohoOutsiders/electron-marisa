import Vue from 'vue'
import axios from 'axios'
import db from '../datastore'
import App from './App'
import router from './router'
import store from './store'
// import Segment from 'segment'
// const segment = new Segment()
// segment.useDefault()

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false
if (process.env.NODE_ENV !== 'production') Vue.config.debug = false // 开启debug模式

// 自定义全局指令
// 自动聚焦focus
Vue.directive('focus', {
  inserted: (el, binding) => {
    if (binding.value) {
      el.focus()
    } else {
      el.blur()
    }
  }
})

// 注册全局$db
Vue.prototype.$db = db
// 注册全局$dictionary 分词字典
// Vue.prototype.$dictionary = segment

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  render: h => h(App)
}).$mount('#app')
