<template>
  <div class="container__tabbar">
    <router-link class="item__tabbar"  :to="{name: 'index', params: {village_id: $route.params.village_id}}">
      <div class="item__tabbar__icon">
        <img src="@/assets/img/tab-1.png" alt="">
      </div>
      <div class="item__tabbar__name">返回首页</div>
    </router-link>
    <router-link class="item__tabbar" v-for="(item, index) in recommendTabbar" :key="index" :to="item.url_name === 'platform' ? { name: 'commentList'} :  { name: 'tab', params: { village_id: $route.params.village_id, menu_id: item.id, tab_index: 0}}" >
      <div class="item__tabbar__icon">
        <img src="@/assets/img/tab-2.png" alt="">
      </div>
      <div class="item__tabbar__name">{{item.title}}</div>
    </router-link>
  </div>
</template>

<script>

import { getRecommendTabbar } from '../api/index'

export default {
  data () {
    return {
      recommendTabbar: ''
    }
  },
  methods: {
    getTabbarRecommend () {
      getRecommendTabbar({
        street_id: this.$route.params.village_id
      }).then(res => {
        this.recommendTabbar = res.data.list
      })
    }
  },
  mounted () {
    this.getTabbarRecommend()
  }
}
</script>

<style lang="scss" scoped>
.container__tabbar {
  width: 100%;
  height: 1.47rem;
  position: fixed;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 0.55rem;
  border-top: 1px solid #F18C79;
  box-sizing: border-box;
  z-index: 100;
  background: #FFFFFF;
}
.item__tabbar__name {
  color: #000000;
  font-size: 0.26rem;
  font-weight: 400;
  margin-top: 0.18rem;
}
.item__tabbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
}
.item__tabbar__icon {
  width: 0.5rem;
  height: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
}
.item__tabbar__icon img {
  width: 0.46rem;
  height: auto;
}
.item__tabbar:nth-child(3) img {
  width: 0.4rem;
  height: auto;
}
</style>
