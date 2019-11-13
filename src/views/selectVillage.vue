<template>
  <div class="container">
    <section class="container__search">
      <div class="search">
        <input class="input__search" type="text" v-model="address" placeholder="在此输入您的村社">
        <div class="icon__search">
          <img src="../assets/img/icon-search.png" alt="">
        </div>
      </div>
    </section>
    <section class="container__list">
      <div class="list">
        <div class="item" v-for="(item, index) in addressList" :key="index" @click="selectAddress(item.id)">{{item.username}}</div>
      </div>
    </section>
  </div>
</template>

<script>

import { getVillageList } from '../api/index'

export default {
  data () {
    return {
      address: '',
      addressList: [],
      addressListAll: []
    }
  },
  methods: {
    hideTabbar () {
      this.$emit('hideTabbar')
    },
    selectAddress (id) {
      this.$router.push({ name: 'index', params: { village_id: id } })
      this.$emit('showTabbar')
    },
    getVillageList () {
      getVillageList().then(res => {
        this.addressListAll = res.data.list
        this.addressList = res.data.list
      })
    },
    share () {
      this.$request({
        url: 'http://h5.xianghunet.com/wx/wx_Signature.php',
        data: this.$qs.stringify({
          href: window.location.href
        }),
        method: 'post'
      }).then(res => {
        res['jsApiList'] = ['onMenuShareAppMessage', 'onMenuShareTimeline']
        
        this.$wx.config(res)
        this.$wx.ready(() => {
          this.$wx.onMenuShareAppMessage({
            title: '清廉村社',
            desc: document.title || '清廉村社',
            link: window.location.href
          })
          this.$wx.onMenuShareTimeline({
            title: '清廉村社',
            link: window.location.href,
            desc: document.title || '清廉村社'
          })
        })
      })
    }
  },
  mounted () {
    document.title = '清廉村社列表'
    this.hideTabbar()
    this.getVillageList()
    this.share()
  },
  watch: {
    address (newVal) {
      if (newVal === '') {
        this.addressList = this.addressListAll
      } else {
        this.addressList = this.addressListAll.filter(item => item.username.includes(newVal))
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  background: #E5E5E5;
}
.container__search {
  padding: 0.3rem 0.44rem 0.36rem;
  background: #E5E5E5;
}
.search {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #FFFFFF;
  height: 1rem;
  padding: 0 0.65rem 0 0.7rem;
}
.icon__search {
  width: 0.35rem;
}
.input__search {
  font-size: 0.28rem;
  outline: none;
  border: none;
}
.container__list {
  padding: 0 0.44rem 0.6rem;
  background: #E5E5E5;
  height: calc(100vh - 1.66rem);
  box-sizing: border-box;
}
.list {
  background: #FFFFFF;
  width: 100%;
  height: 100%;
  overflow-y: scroll;
}
.item {
  height: 1rem;
  text-align: center;
  line-height: 1rem;
  font-size: 0.32rem;
  font-family:'MicrosoftYaHei-light';
  border-bottom: 1px solid #DCDCDC;
}
</style>
