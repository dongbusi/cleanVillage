<template>
  <div>
    <section class="container__navbar">
      <div class="wrap__navbar">
        <van-tabs sticky v-model="navbar" color="#F18C79" line-height="0.07rem" :ellipsis="false">
          <van-tab :title="navbarList[0]" class="tabs" :to="{ name: 'commentList' }">
            <div class="container__tab">
              <router-view :tab="navbar"></router-view>
            </div>
          </van-tab>
          <van-tab :title="navbarList[1]" class="tabs" :to="{ name: 'comment' }">
            <div class="container__tab">
              <router-view :tab="navbar"></router-view>
            </div>
          </van-tab>
        </van-tabs>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  data () {
    return {
      navbar: Number(this.$route.params.id) || 0,
      navbarList: ['监察联络员信息', '我有话说']
    }
  },
  methods: {
    setTitle () {
      document.title = '啄木鸟平台'
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
    this.setTitle()
    if (this.$route.name === 'commentList') {
      this.navbar = 0
    } else if (this.$route.name === 'comment') {
      this.navbar = 1
    }
    this.share()
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
