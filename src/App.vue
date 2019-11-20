<template>
  <div id="app" >
    <router-view v-if="isLogin" />
  </div>
</template>

<script>

import { Dialog } from 'vant'
import { getVillageList } from './api/index'

export default {
  data () {
    return {
      isLogin: true
    }
  },
  methods: {
    login () {
      if (/micromessenger/.test(navigator.userAgent.toLowerCase())) {
        if (!this.$route.query.code) {
          window.location.href = 'http://www.community.com?s=forward/api.login/oauth'
        }
      } else {
        this.login = false
        Dialog.alert({
          title: '提示',
          message: '请在微信中打开'
        })
      }
    },
    getVillageName () {
      if (!sessionStorage.villageName) {
        let id
        if (this.$route.params.village_id) {
          id = Number(this.$route.params.village_id)
        }
        getVillageList().then(res => {
          let list = res.data.list
          let village = list.find(item => item.id === id)
          sessionStorage.villageName = village.username
        })
      }
    }
  },
  created () {
    // this.login()
    this.getVillageName()
  }
}
</script>
