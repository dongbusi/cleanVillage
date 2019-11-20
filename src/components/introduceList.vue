<template>
  <div v-if="list && list.length" class="tab-3">
     <div class="tab-header">
        {{introduce}}
      </div>
      <div class="tab-list">
        <div class="tab-item">{{name}}</div>
        <div class="tab-item" v-for="(item, index) in list" :key="index">{{item.title}}</div>
      </div>
  </div>
  <div v-else-if="!list.length && loading === false" >暂无内容！</div>
</template>

<script>

import { getNewsList } from '../api/index'

export default {
  data () {
    return {
      list: [],
      loading: false,
      page: 0,
      limit: 6,
      introduce: ''
    }
  },
  props: {
    id: {
      required: true,
      type: Number,
      default: 0
    },
    name: {
      default: '',
      type: String,
      required: true
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
        type: 7
      }).then(res => {
        res.data.list.list.forEach(item => {
          item.create_at = item.create_at.slice(0, 10)
        })
        this.list = [...this.list, ...res.data.list.list]
        this.loading = false
        this.introduce = res.data.list.text
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
.tab-3 {
  .tab-header {
    font-size: 0.26rem;
    line-height: 2;
    text-align: justify;
    font-family: 'MicrosoftYaHei-Light';
    box-shadow:0 0.08rem 0.17rem 0 rgba(151,151,151,0.16);
    padding: 0.4rem;
    text-indent: 2em;
  }
}
.tab-list {
  margin-top: 0.5rem;
  box-shadow:0 0.08rem 0.4rem 0 rgba(151,151,151,0.4);
  .tab-item {
    height: 1rem;
    text-align: left;
    line-height: 1rem;
    box-sizing: border-box;
    border-bottom: 0.01rem solid #E5E5E5;
    font-size: 0.26rem;
    padding: 0 0.44rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .tab-item:first-child {
    border-bottom: 0.01rem solid #F18C79;
    text-align: center;
  }
}
</style>
