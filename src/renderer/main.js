import Vue from 'vue'
import axios from 'axios'

import App from './App'
import router from './router'
import store from './store'

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false
if (process.env.NODE_ENV !== 'production') Vue.config.debug = false // 开启debug模式

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  render: h => h(App)
}).$mount('#app')
