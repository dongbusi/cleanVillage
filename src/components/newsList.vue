<template>
  <div>
    <div class="list">
      <div class="item" v-for="(item, index) in list" :key="index" @click="goDetails(item.id)">
        <div>{{item.title}}</div>
        <div>{{item.create_at}}</div>
      </div>
    </div>
  </div>
</template>

<script>

import { getNewsList } from '../api/index'

export default {
  data () {
    return {
      list: [],
      loading: false,
      page: 0,
      limit: 6
    }
  },
  props: {
    id: {
      required: true,
      type: Number,
      default: 0
    }
  },
  methods: {
    goDetails (id) {
      this.$router.push({ name: 'details', params: { details_id: id }, query: { tab_id: this.id } })
    },
    getList () {
      this.loading = true
      getNewsList({
        pid: this.id,
        street_id: this.$route.params.village_id,
        limit: this.limit,
        page: this.page + 1,
        type: 1
      }).then(res => {
        res.data.list.list.forEach(item => {
          item.create_at = item.create_at.slice(0, 10)
        })
        this.list = [...this.list, ...res.data.list.list]
        this.loading = false
        this.page = res.data.list.page.current
      })
    },
    scroll () {
      let height = document.documentElement.clientHeight || document.body.clientHeight;
      let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      let scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
      if (scrollHeight - height - scrollTop <= 0 && this.loading === false) {
        this.getList()
      }
    },
    watchScroll () {
      window.addEventListener('scroll', this.scroll)
      this.$once('hook:beforeDestroy', function () {
        window.removeEventListener('scroll', this.scroll)
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
    this.getList()
    this.watchScroll()
    this.share()
  }
}
</script>

<style lang="scss" scoped>
.list {
  overflow-y: scroll;
  margin-top: -0.34rem;
}
.item {
  height: 1.04rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #E5E5E5;
}
.item > div:first-child {
  width: 4.6rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.item div {
  font-size: 0.26rem;
  font-family: 'MicrosoftYaHei-light'
}
</style>
