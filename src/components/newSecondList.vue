<template>
  <div v-if="list && list.length">
    <div class="list">
      <div class="item" v-for="(item, index) in list" :key="index" @click="goNewsList(item.id)">
        <div>{{item.title}}</div>
      </div>
    </div>
  </div>
  <div v-else-if="!list.length && loading === false" >暂无内容！</div>
</template>

<script>

import { getNormalList } from '../api/index'

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
    goNewsList (id) {
      this.$router.push({ name: 'newsList', params: { newlist_id: id } })
    },
    getList () {
      this.loading = true
      getNormalList({
        pid: this.id,
        street_id: this.$route.params.village_id,
        limit: this.limit,
        page: this.page + 1,
        type: 1,
        new_pid: 0
      }).then(res => {
        res.data.list.list.forEach(item => {
          item.create_at = item.create_at.slice(0, 10)
        })
        this.list = [...this.list, ...res.data.list.list]
        this.loading = false
        this.page = res.data.list.page.current
      }).catch(() => {
        this.loading = false
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
    this.watchScroll()
    setTimeout(() => {
      this.share()
    }, 300);
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
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
