<template>
  <div>
    <section class="container__navbar">
      <div class="wrap__navbar">
        <van-tabs sticky v-model="navbar" color="#F18C79" line-height="0.07rem" :ellipsis="false">
          <van-tab v-for="(item, index) in navbarList" :key="index" :title="item.title" class="tabs" :to="{name: 'tab', params: {tab_index: index}}">
            <div class="container__tab">
              <div>
                <router-view v-if="showDetails || showNews" :id="navbarList[navbar].id"></router-view>
                <div v-else-if="navbarList[navbar].tag === ''">暂无内容！</div>
                <component ref="list" v-else :is="navbarList[navbar].tag" :id="navbarList[navbar].id" :name="navbarList[navbar].title"></component>
              </div>
            </div>
          </van-tab>
        </van-tabs>
      </div>
    </section>
  </div>
</template>

<script>
import { getTab } from '../api/index'
export default {
  data () {
    return {
      navbar: Number(this.$route.params.tab_index) || 0,
      navbarList: [],
      showDetails: this.$route.name === 'details',
      showNews: this.$route.name === 'newsList' || this.$route.name === 'newsDetails' || this.$route.name === 'labelDetails'
    }
  },
  methods: {
    getTab () {
      getTab({
        pid: this.$route.params.menu_id,
        street_id: this.$route.params.village_id
      }).then(res => {
        this.navbarList = res.data.list
        document.title = res.data.one_level
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
    this.getTab()
    this.share()
  },
  watch: {
    $route (newVal, oldVal) {
      if (newVal.name === 'details') {
        this.showDetails = true
      } else {
        this.showDetails = false
      }
      if (newVal.name === 'newsList' || newVal.name === 'newsDetails' || newVal.name === 'labelDetails') {
        this.showNews = true
      } else {
        this.showNews = false
      }
      if (Number(newVal.params.tab_index) !== this.navbar) {
        this.navbar = Number(newVal.params.tab_index)
      }
      if (newVal.params.menu_id !== oldVal.params.menu_id) {
        this.getTab()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.wrap__navbar {
  background: #FFFFFF;
  & /deep/ .van-tabs__wrap {
    height: 1.04rem;
    padding: 0 0.3rem;
    background: #FFFFFF;
  }
  & /deep/ .van-tab span {
    font-size: 0.26rem;
  }
  & /deep/ .van-tab {
    line-height: 1.04rem;
    padding: 0 0.15rem;
  }
}
.container__tab {
  background: #ffffff;
  padding: 0.5rem 0.44rem;
  line-height: 1.5;
}
.container__tab::after {
  display: block;
  content: '';
  height: 1.6rem;
}

</style>
