import router from './router/index'
import store from './store'

router.beforeEach((to, from, next) => {
  if (store.getters.getAddress === '' && to.path !== '/selectvillage') {
    next({ path: '/selectvillage' })
  } else {
    next()
  }
})
