<template>
  <div v-if="styleType == 1">
    <section class="swiper__container">
      <van-swipe :autoplay="3000" class="swiper__list" :show-indicators="false">
        <van-swipe-item v-for="(item, index) in swiper" :key="index"><img class="swiper__item" :src="item" alt=""></van-swipe-item>
      </van-swipe>
    </section>
    <section class="container__nav">
      <div class="body__nav">
        <div class="item__nav" v-for="(item, index) in navList" :key="index" @click="goTabList(item.id, item.url_name)">
          <div class="item-icon"><img :src="item.logo" :alt="item.title"></div>
          <div class="item-name">{{item.title}}</div>
        </div>
      </div>
    </section>
    <section class="container__survey">
      <div class="header__survey">{{infoList.title}}</div>
      <div class="body__survey">
        <router-link :to="{name: 'tab', params: {menu_id: infoList.id, tab_index: index}}" v-for="(item, index) in infoList.sub" :key="index">
          <div :class="['item__survey', index === 0 ? 'first' : '']" >
            <div class="item__survey__thumb">
              <img :src="require('../assets/img/index-' + index + '.jpg')" alt="">
            </div>
            <div class="item__survey__text">{{item.title}}</div>
          </div>
        </router-link>
      </div>
    </section>
    <section class="container__news">
      <div class="header__news">{{newsList.title}}</div>
      <div class="body__news">
        <div class="item__news" @click="goNewsDetails(newsList.id, item.key, item.id, item.pid)" v-for="(item, index) in newsList.data" :key="index">
          <div>{{item.title}}</div>
          <div>{{item.create_at}}</div>
        </div>
      </div>
    </section>
  </div>
  <div v-else-if="styleType == 2" class="style__two">
    <div class="navbar">
      <div class="item__navbar" v-for="(item, index) in navList" :key="index"  @click="goTabList(item.id, item.url_name)">
        <div class="item-icon"><img :src="item.logo" :alt="item.title"></div>
        <div class="item-name">{{item.title}}</div>
      </div>
    </div>
    <div class="survey">
      <div class="survey-aside">
        <router-link :to="{name: 'tab', params: {menu_id: infoList.id, tab_index: 0}}">
          <div><img :src="require('../assets/img/index-0.jpg')" alt=""></div>
          <div class="survey__name">{{infoList.sub && infoList.sub[0].title}}</div>
        </router-link >
      </div>
      <div class="survey-body">
        <div class="item__surveys" v-for="(item, index) in infolistStyleTwo" :key="index">
          <router-link :to="{name: 'tab', params: {menu_id: infoList.id, tab_index: index + 1}}">
            <div style="height: 1.25rem"><img :src="require('../assets/img/index-' + (index + 1) + '.jpg')" alt=""></div>
            <div class="survey__name" style="height: 0.45rem;line-height: 0.45rem;">{{item.title}}</div>
          </router-link >
        </div>
      </div>
    </div>
    <div class="banner">
      <img src="../assets/img/index-banner.jpg" alt="">
    </div>
    <div class="news">
      <div class="news__header">{{newsList.title}}</div>
      <div class="news__body">
        <div class="news__item" @click="goNewsDetails(newsList.id, item.key, item.id, item.pid)" v-for="(item, index) in newsList.data" :key="index">
          <div class="news__info">{{item.menu}} | {{item.create_at}}</div>
          <div class="news__title">{{item.title}} </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getMenu, getSwiper, getRecommendInfoList, getRecommendNewsList, getVillageList, goLogin, getStyle } from '../api/index'
import { Dialog } from 'vant'
export default {
  data () {
    return {
      navList: [],
      villageSurveyList: [],
      villageSurveyId: '',
      swiper: [],
      newsList: [],
      infoList: [],
      styleType: 0,
      infolistStyleTwo: []
    }
  },
  methods: {
    goTabList (id, urlName) {
      if (urlName === 'platform') {
        this.$router.push({ name: 'commentList' })
        return
      }
      this.$router.push({ name: 'tab', params: { menu_id: id, tab_index: 0 } })
    },
    goNewsDetails (menuId, index, detailsId, tabId) {
      this.$router.push({ name: 'details', params: { menu_id: menuId, tab_index: index, details_id: detailsId }, query: { tab_id: tabId } })
    },
    getMenuList () {
      getMenu({
        street_id: this.$route.params.village_id
      }).then(res => {
        this.navList = res.data.list
      })
    },
    getInfoList () {
      getRecommendInfoList({
        street_id: this.$route.params.village_id
      }).then(res => {
        this.infoList = res.data.list
        this.infolistStyleTwo = JSON.parse(JSON.stringify(res.data.list.sub))
        this.infolistStyleTwo.splice(0, 1)
      })
    },
    getSwiper () {
      getSwiper({
        street_id: this.$route.params.village_id
      }).then(res => {
        this.swiper = res.data
      })
    },
    getNewsList () {
      getRecommendNewsList({
        street_id: this.$route.params.village_id
      }).then(res => {
        res.data.list.data.forEach(item => {
          item.create_at = item.create_at.slice(0, 10)
        })
        this.newsList = res.data.list
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
            desc: sessionStorage.villageName + '·清廉村社',
            link: window.location.href
          })
          this.$wx.onMenuShareTimeline({
            title: sessionStorage.villageName + '·清廉村社',
            link: window.location.href,
            desc: sessionStorage.villageName + '·清廉村社'
          })
        })
      })
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
          document.title = village.username + '·清廉村社'
        })
      }
    },
    getQueryString (name) {
      var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
      var r = window.location.search.substr(1).match(reg);
      if (r != null) return unescape(r[2]); return null;
    },
    login () {
      if (/micromessenger/.test(navigator.userAgent.toLowerCase())) {
        if (!localStorage.token) {
          if (!this.getQueryString('code')) {
            // window.location.href = 'http://168.100.188.50/?s=forward/api.Login/code'
            window.location.href = 'https://cx.xianghunet.com/?s=forward/api.Login/code'
          } else {
            goLogin({
              code: this.getQueryString('code'),
              street_id: window.location.pathname.split('/')[2]
            }).then(res => {
              localStorage.token = res.data
            })
            // .catch(err => {
            //   console.log(err)
            //   // window.location.href = 'http://168.100.188.50/?s=forward/api.Login/code'
            // })
          }
        }
      } else {
        Dialog.alert({
          title: '提示',
          message: '请在微信中打开'
        })
      }
    },
    getStyle () {
      getStyle({
        street_id: this.$route.params.village_id
      }).then(res => {
        this.styleType = res.data.list.style_type
      })
    }
  },
  created () {
    this.login()
    this.getStyle()
  },
  mounted () {
    this.getMenuList()
    this.getSwiper()
    this.getInfoList()
    this.getNewsList()
    setTimeout(() => {
      if (sessionStorage.villageName) document.title = sessionStorage.villageName + '·' + '清廉村社'
      this.share()
    }, 300);
  }
}
</script>

<style lang="scss" scoped>
.swiper__item {
  width: 7.5rem;
  height: 3.5rem;
  object-fit: cover;
}
.container__nav {
  padding: 0.4rem 0.24rem 0;
  box-sizing: border-box;
  border-bottom: 1px solid #E5E5E5;
}
.body__nav {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}
.item__nav {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 1.54rem;
  margin-bottom: 0.6rem;
  flex: none;
  // margin-left: 0.9rem;
  width: 1.75rem;
  flex: none;
}
.item-name {
  color: #000000;
  font-size: 0.24rem;
  font-weight:400;
  font-family:'MicrosoftYaHei-regular';
  white-space: nowrap;
}
.item__nav:nth-child(4n+1) {
  margin-left: 0;
}
.item-icon {
  width: 0.97rem;
  height: 0.97rem;
  border-radius: 50%;
  overflow: hidden;
}
.item-icon img {
  width: 100%;
  height: 100%;
}
.container__survey {
  height: 3.04rem;
  padding: 0.37rem 0.43rem;
  box-sizing: border-box;
  border-bottom: 1px solid #E5E5E5;
}
.header__survey {
  font-size: 0.34rem;
  color: #000000;
  font-weight: 400;
  font-family:'MicrosoftYaHei-regular';
}
.body__survey {
  display: flex;
  align-items: center;
  margin-top: 0.3rem;
  overflow-x: scroll;
  overflow-y: hidden;
}
.item__survey {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  height: 1.76rem;
  flex: none;
  margin-left: 0.2rem;
  // -webkit-overflow-scrolling: touch;
}
.item__survey.first{
  margin-left: 0;
}
.item__survey__text {
  width: 100%;
  white-space: nowrap;
  font-size: 0.24rem;
  text-align: center;
  font-family:'MicrosoftYaHei-regular';
  color: #000000;
}
.item__survey__thumb {
  width: 1.51rem;
  height: 1.35rem;
}
.item__survey__thumb img {
  object-fit: cover;
}
.container__news {
  padding: 0.38rem 0.44rem 2rem;
}
.header__news {
  font-size: 0.34rem;
  color: #000000;
  font-family:'MicrosoftYaHei-regular';
  font-weight: 400;
}
.body__news {
  margin-top: 0.25rem;
}
.item__news {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.item__news div{
  color: #333333;
  font-size: 0.26rem;
  font-weight: 300;
  line-height: 0.5rem;
  font-family:'MicrosoftYaHei-regular';
  white-space: nowrap;
}
.item__news div:first-child {
  width: 5rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

</style>
<style lang="scss" scoped>
.style__two {
  .navbar {
    display: flex;
    overflow-x: auto;
    height: 2rem;
    padding: 0.3rem 0.6rem 0;
    background: #F3F3F3;
  }
  .item__navbar {
    margin-left: 0.67rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 1.15rem;
    align-items: center;
    background: #F3F3F3;
  }
  .item__navbar:first-child {
    margin-left: 0;
  }
  .item__navbar:last-child {
    padding-right: 0.6rem;
  }
  .item-icon {
    width: 0.73rem;
    height: 0.73rem;
  }
  .survey {
    padding: 0.5rem 0.44rem 0.25rem;
    display: flex;
    justify-content: space-between;
    background: #E5E5E5;
  }
  .survey-aside {
    height: 5.2rem;
    width: 4.7rem;
  }
  .survey-body {
    display: flex;
    align-items: center;
    flex-direction: column;
    height: 5.2rem;
    overflow-y: auto;
  }
  .item__surveys {
    width: 1.7rem;
  }
  .item__survey img {
    width: 1.7rem;
    height: 1.25rem;
  }
  .survey__name {
    width: 100%;
    height: 0.9rem;
    line-height: 0.9rem;
    text-align: center;
    color: #000000;
  }
  .banner {
    padding: 0 0.44rem 0.3rem;
    background: #E5E5E5;
    img {
      height: 1.4rem;
    }
  }
  .news {
    min-height: 4.66rem;
    background: #E5E5E5;
    padding: 0 0.44rem 0rem;
  }
  .news__header {
    height: 0.86rem;
    border-bottom: 0.01rem solid #DCDCDC;
    line-height: 0.86rem;
    font-size: 0.28rem;
    padding-left: 0.7rem;
  }
  .news__body {
    padding: 0.4rem 0.7rem;
  }
  .news__info, .news__title {
    font-weight: 300;
    font-size: 0.26rem;
    line-height: 1.5;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
  .news__item {
    margin-top: 0.2rem;
  }
  .news__item:first-child {
    margin-top: 0rem;
  }
}
.style__two::after {
  display: block;
  content: '';
  height: 2rem;
  background: #E5E5E5;
}
</style>
