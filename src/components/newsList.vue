<template>
  <div v-if="list && list.length">
    <div class="list">
      <div class="item" v-for="(item, index) in list" :key="index" @click="goDetails(item.id)">
        <div class="item__header">
          <div>{{item.title}}</div>
          <div>{{item.create_at}}</div>
        </div>
      </div>
    </div>
  </div>
  <div v-else-if="!list.length && loading === false" >暂无内容！</div>
</template>

<script>

import { getNewsList, getNormalList } from '../api/index'

export default {
  data () {
    return {
      list: [],
      loading: false,
      page: 0,
      limit: 15
    }
  },
  props: {
    id: {
      type: Number,
      default: 0
    }
  },
  methods: {
    goDetails (id) {
      if (this.$route.params.newlist_id) {
        this.$router.push({ name: 'newsDetails', params: { details_id: id }, query: { tab_id: this.id } })
      } else {
        this.$router.push({ name: 'details', params: { details_id: id }, query: { tab_id: this.id } })
      }
    },
    getList () {
      this.loading = true
      if (this.$route.params.newlist_id) {
        getNormalList({
          pid: this.id,
          street_id: this.$route.params.village_id,
          limit: this.limit,
          page: this.page + 1,
          type: 1,
          new_pid: this.$route.params.newlist_id
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
      } else {
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
      }
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
    this.share()
  },
  watch: {
    id (newVal, oldVal) {
      if (newVal !== oldVal) {
        this.page = 0
        this.getList()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.list {
  overflow-y: scroll;
  margin-top: -0.34rem;
}
.item {
  border-bottom: 1px solid #E5E5E5;
}
.item__header {
  height: 1.04rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.item__header > div:first-child {
  width: 4.6rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.item__header div {
  font-size: 0.26rem;
  font-family: 'MicrosoftYaHei-light'
}
</style>
