import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant from 'vant';
import 'vant/lib/index.css';
import './assets/css/reset.css'
import './assets/js/rem'
import globalComponents from './utils/globalComponent'

Vue.use(Vant);
Vue.use(globalComponents)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
