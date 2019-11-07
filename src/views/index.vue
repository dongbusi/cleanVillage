<template>
  <div>
    <section class="swiper__container">
      <van-swipe :autoplay="3000" class="swiper__list" :show-indicators="false">
        <van-swipe-item><img class="swiper__item" src="http://static.runoob.com/images/demo/demo2.jpg" alt=""></van-swipe-item>
        <van-swipe-item><img class="swiper__item" src="https://pic4.zhimg.com/v2-3be05963f5f3753a8cb75b6692154d4a_1200x500.jpg" alt=""></van-swipe-item>
        <van-swipe-item><img class="swiper__item" src="https://review.chinabrands.cn/chinabrands_cn/seo/image/20190218/%E8%B0%B7%E6%AD%8C%20-%20%E5%9B%BE%E7%89%87%E6%90%9C%E7%B4%A2%E5%BC%95%E6%93%8E.jpg" alt=""></van-swipe-item>
      </van-swipe>
    </section>
    <section class="container__nav">
      <div class="body__nav">
        <div class="item__nav" v-for="(item, index) in navList" :key="index" @click="goTabList(item.id)">
          <div class="item-icon"><img :src="item.logo" :alt="item.title"></div>
          <div class="item-name">{{item.title}}</div>
        </div>
      </div>
    </section>
    <section class="container__survey">
      <div class="header__survey">村社概况</div>
      <div class="body__survey">
        <router-link :to="{name: 'tab', params: {menu_id: 1, tab_index: 0}}">
          <div class="item__survey first" >
            <div class="item__survey__thumb">
              <img src="http://static.runoob.com/images/demo/demo2.jpg" alt="">
            </div>
            <div class="item__survey__text">村社基本情况</div>
          </div>
        </router-link>
        <router-link to="/villagesurvey/1">
          <div class="item__survey">
            <div class="item__survey__thumb">
              <img src="http://static.runoob.com/images/demo/demo2.jpg" alt="">
            </div>
            <div class="item__survey__text">干部队伍情况</div>
          </div>
        </router-link>
        <router-link to="/villagesurvey/2">
          <div class="item__survey">
            <div class="item__survey__thumb">
              <img src="http://static.runoob.com/images/demo/demo2.jpg" alt="">
            </div>
            <div class="item__survey__text">党员队伍</div>
          </div>
        </router-link>
        <router-link to="/villagesurvey/3">
          <div class="item__survey">
            <div class="item__survey__thumb">
              <img src="http://static.runoob.com/images/demo/demo2.jpg" alt="">
            </div>
            <div class="item__survey__text">居民代表</div>
          </div>
        </router-link>
      </div>
    </section>
    <section class="container__news">
      <div class="header__news">重大事项公开</div>
      <div class="body__news">
        <div class="item__news" @click="goNewsDetails">
          <div>聚焦民生实事，城厢街道既有住宅加装电梯最新进展</div>
          <div>09-10</div>
        </div>
        <div class="item__news">
          <div>聚焦民生实事，城厢街道既有住宅加装电梯最新进展</div>
          <div>09-10</div>
        </div>
        <div class="item__news">
          <div>聚焦民生实事，城厢街道既有住宅加装电梯最新进展</div>
          <div>09-10</div>
        </div>
        <div class="item__news">
          <div>聚焦民生实事，城厢街道既有住宅加装电梯最新进展</div>
          <div>09-10</div>
        </div>
        <div class="item__news">
          <div>聚焦民生实事，城厢街道既有住宅加装电梯最新进展</div>
          <div>09-10</div>
        </div>
        <div class="item__news">
          <div>聚焦民生实事，城厢街道既有住宅加装电梯最新进展</div>
          <div>09-10</div>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
import { getMenu } from '../api/index'
export default {
  data () {
    return {
      navList: []
    }
  },
  methods: {
    goTabList (id) {
      this.$router.push({ name: 'tab', params: { menu_id: id, tab_index: 0 } })
    },
    goNewsDetails () {
      this.$router.push({ name: 'details', params: { menu_id: 1, tab_index: 1, details_id: 1 } })
    },
    getMenuList () {
      getMenu({
        street_id: this.$route.params.village_id
      }).then(res => {
        this.navList = res.data.list
      })
    }
  },
  mounted () {
    this.getMenuList()
  }
}
</script>

<style lang="scss" scoped>
.swiper__item {
  width: 7.5rem;
  height: 3.5rem;
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
}
.item__survey {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  height: 1.76rem;
  flex: none;
  margin-left: 0.2rem;
  -webkit-overflow-scrolling: touch;
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
}
.item__news div:first-child {
  width: 5.4rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
