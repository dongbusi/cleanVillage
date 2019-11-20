<template>
  <div id="app" >
    <router-view v-if="isLogin" />
  </div>
</template>

<script>

import { Dialog } from 'vant'
import { getVillageList, goLogin } from './api/index'

export default {
  data () {
    return {
      isLogin: true
    }
  },
  methods: {
    login () {
      if (/micromessenger/.test(navigator.userAgent.toLowerCase())) {
        if (window.location.href.includes('selectvillage')) return
        if (!localStorage.token) {
          if (!this.getQueryString('code')) {
            window.location.href = 'http://168.100.188.50/?s=forward/api.Login/code'
          } else {
            goLogin({
              code: this.getQueryString('code'),
              street_id: window.location.pathname.split('/')[2]
            }).then(res => {
              localStorage.token = res.data
            }).catch(err => {
              console.log(err)
              window.location.href = 'http://168.100.188.50/?s=forward/api.Login/code'
            })
          }
        }
      } else {
        // this.isLogin = false
        Dialog.alert({
          title: '提示',
          message: '请在微信中打开'
        })
      }
    },
    getQueryString (name) {
      var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
      var r = window.location.search.substr(1).match(reg);
      if (r != null) return unescape(r[2]); return null;
    }
  },
  mounted () {
    this.login()
  }
}
</script>
