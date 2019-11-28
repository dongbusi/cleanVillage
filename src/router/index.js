import Vue from 'vue'
import VueRouter from 'vue-router'
import index from '../views/index.vue'
import layout from '../views/layout'
import { Dialog } from 'vant'
import { goLogin } from '../api/index'

Vue.use(VueRouter)

const routes = [
  {
    path: '/village/:village_id',
    component: layout,
    children: [
      {
        path: 'index',
        component: index,
        name: 'index'
      },
      {
        path: 'menu/:menu_id/tab/:tab_index',
        name: 'tab',
        component: () => import('../views/menu.vue'),
        children: [
          {
            path: 'details/:details_id',
            name: 'details',
            component: () => import('../views/details.vue')
          },
          {
            path: 'news/:newlist_id',
            name: 'newsList',
            component: () => import('../components/newsList.vue')
          },
          {
            path: 'newsdetails/:details_id',
            name: 'newsDetails',
            component: () => import('../views/details.vue')
          },
          {
            path: 'labeldetails/:details_id',
            name: 'labelDetails',
            component: () => import('../views/details.vue')
          }
        ]
      },
      {
        path: 'platform',
        name: 'platform',
        component: () => import('../views/platform.vue'),
        children: [
          {
            path: 'commentList',
            name: 'commentList',
            component: () => import('../components/commentList.vue')
          },
          {
            path: 'comment',
            name: 'comment',
            component: () => import('../components/comment.vue')
          },
          {
            path: 'chat',
            name: 'chat',
            component: () => import('../components/chat.vue')
          },
          {
            path: 'details/:comment_id',
            name: 'commentDetails',
            component: () => import('../components/commentDetails.vue')
          }
        ]
      }
    ]
  },
  {
    path: '/selectvillage',
    name: 'selectvillage',
    component: () => import('../views/selectVillage.vue')
  }
]

const router = new VueRouter({
  routes,
  base: process.env.VUE_APP_SRC,
  mode: 'history'
})

function getQueryString (name) {
  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
  var r = window.location.search.substr(1).match(reg);
  if (r != null) return unescape(r[2]); return null;
}

router.beforeEach((to, from, next) => {
  if (/micromessenger/.test(navigator.userAgent.toLowerCase())) {
    if (to.name === 'selectvillage' || to.name === 'index') {
      next()
      return
    }
    if (!localStorage.token) {
      if (!getQueryString('code')) {
        // window.location.href = 'http://168.100.188.50/?s=forward/api.Login/code'
        window.location.href = 'https://cx.xianghunet.com/?s=forward/api.Login/code'
      } else {
        goLogin({
          code: getQueryString('code'),
          street_id: to.params.village_id
        }).then(res => {
          localStorage.token = res.data
          next()
        }).catch(err => {
          console.log(err)
          // window.location.href = 'http://168.100.188.50/?s=forward/api.Login/code'
          window.location.href = 'https://cx.xianghunet.com/?s=forward/api.Login/code'
        })
      }
    } else next()
  } else {
    Dialog.alert({
      title: '提示',
      message: '请在微信中打开'
    })
  }
})

export default router
