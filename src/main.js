import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant from 'vant';
import 'vant/lib/index.css';
import './assets/css/reset.css'
import './assets/js/rem'
import globalComponents from './utils/globalComponent'
import wx from 'weixin-js-sdk'
import request from './utils/request'
import qs from 'qs'

Vue.use(Vant);
Vue.use(globalComponents)

Vue.config.productionTip = false
Vue.prototype.$qs = qs
Vue.prototype.$request = request
Vue.prototype.$wx = wx

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
