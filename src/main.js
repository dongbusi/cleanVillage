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

Vue.config.productionTip = false;
let initUrl = window.location.href
router.afterEach((to, from) => {
  if (window.__wxjs_is_wkwebview !== true) {
    request({
      url: 'https://cx.xianghunet.com/admin.html?s=forward/api.signature/getJsSign',
      data: qs.stringify({
        href: encodeURIComponent(window.location.href)
      }),
      method: 'post'
    }).then(res => {
      wx.config(res)
      wx.ready(() => {
        wx.onMenuShareAppMessage({
          title: sessionStorage.villageName + '·清廉村社',
          desc: sessionStorage.villageName + '·清廉村社',
          link: window.location.href
        })
        wx.onMenuShareTimeline({
          title: sessionStorage.villageName + '·清廉村社',
          link: window.location.href,
          desc: sessionStorage.villageName + '·清廉村社'
        })
      })
    })
  } else if (window.__wxjs_is_wkwebview === true) {
    request({
      url: 'https://cx.xianghunet.com/admin.html?s=forward/api.signature/getJsSign',
      data: qs.stringify({
        href: encodeURIComponent(initUrl)
      }),
      method: 'post'
    }).then(res => {
      wx.config(res)
      wx.ready(() => {
        wx.onMenuShareAppMessage({
          title: sessionStorage.villageName + '·清廉村社',
          desc: sessionStorage.villageName + '·清廉村社',
          link: window.location.href
        })
        wx.onMenuShareTimeline({
          title: sessionStorage.villageName + '·清廉村社',
          link: window.location.href,
          desc: sessionStorage.villageName + '·清廉村社'
        })
      })
    })
  }
})

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
