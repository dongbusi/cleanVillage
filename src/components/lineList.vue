<template>
  <div v-if="list && list.length">
    <div class="resident-list">
      <div class="resident-item">{{name}}</div>
      <div class="resident-item" v-for="(item, index) in list" :key="index">{{item}}</div>
    </div>
  </div>
  <div v-else-if="!list.length && loading === false" >暂无内容！</div>
</template>

<script>

import { getLineList } from '../api/index'

export default {
  data () {
    return {
      list: [],
      loading: false
    }
  },
  props: {
    id: {
      required: true,
      type: Number,
      default: 0
    },
    name: {
      required: true,
      type: String,
      default: ''
    }
  },
  methods: {
    getList () {
      this.loading = true
      getLineList({
        pid: this.id,
        street_id: this.$route.params.village_id,
      }).then(res => {
        this.list = res.data.list
        this.$nextTick(() => {
          this.loading = false
        })
      }).catch(() => {
        this.loading = false
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
            title: sessionStorage.villageName + '·清廉村社',
            desc: document.title || sessionStorage.villageName + '·清廉村社',
            link: window.location.href
          })
          this.$wx.onMenuShareTimeline({
            title: sessionStorage.villageName + '·清廉村社',
            link: window.location.href,
            desc: document.title || sessionStorage.villageName + '·清廉村社'
          })
        })
      })
    }
  },
  mounted () {
    this.getList()
    this.share()
  }
}
</script>

<style lang="scss" scoped>
.resident-list {
  box-shadow:0 0.08rem 0.17rem 0 rgba(151,151,151,0.16);
  div {
    font-size: 0.28rem;
  }
}
.resident-item {
  height: 1rem;
  border-bottom: 0.01rem solid #E5E5E5;
  line-height: 1rem;
  text-align: center;
  font-family: 'MicrosoftYaHei-Regular';
  font-weight: 300;
}
.resident-item:first-child {
  font-family: 'MicrosoftYaHei-Bold';
  border-bottom: 0.01rem solid #F18C79;
  font-weight: bold;
}
</style>
