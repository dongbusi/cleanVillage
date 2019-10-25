import Vue from 'vue'
import VueRouter from 'vue-router'
import index from '../views/index.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'index',
    component: index
  },
  {
    path: '/selectvillage',
    name: 'selectvillage',
    component: () => import('../views/selectVillage.vue')
  },
  {
    path: '/cleanrules',
    name: 'cleanrules',
    component: () => import('@/views/cleanRules.vue'),
    children: [
      {
        path: 'tab/:id',
        name: 'cleanrulestab',
        component: () => import('../components/cleanRuelsTab.vue')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
