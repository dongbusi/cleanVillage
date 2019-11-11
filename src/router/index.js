import Vue from 'vue'
import VueRouter from 'vue-router'
import index from '../views/index.vue'
import layout from '../views/layout'

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
  base: '/street/',
  mode: 'history'
})

export default router
