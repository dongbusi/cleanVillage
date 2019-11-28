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
import { getVillageList } from './api/index'

Vue.use(Vant);
Vue.use(globalComponents);

Vue.prototype.$qs = qs;
Vue.prototype.$request = request;
Vue.prototype.$wx = wx;

Vue.config.productionTip = false;

const app = new Vue({
  router,
  store,
  render: h => h(App)
})

if (!window.location.href.includes('selectvillage') && !sessionStorage.villageName) {
  let id
  if (process.env.NODE_ENV === 'development') {
    id = Number(window.location.pathname.split('/')[2])
  } else {
    id = Number(window.location.pathname.split('/')[3])
  }
  getVillageList().then(res => {
    let list = res.data.list
    let village = list.find(item => item.id === id)
    sessionStorage.villageName = village.username || ''
    app.$mount('#app')
  })
} else {
  app.$mount('#app')
}
