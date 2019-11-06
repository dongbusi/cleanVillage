<template>
  <div class="container__tabbar">
    <router-link class="item__tabbar"  to="/village/1/index">
      <div class="item__tabbar__icon">
        <img src="@/assets/img/tab-1.png" alt="">
      </div>
      <div class="item__tabbar__name">返回首页</div>
    </router-link>
    <router-link class="item__tabbar" :to="{ name: 'tab', params: { tab_id: 0}}" >
      <div class="item__tabbar__icon">
        <img src="@/assets/img/tab-2.png" alt="">
      </div>
      <div class="item__tabbar__name">清廉制度</div>
    </router-link>
    <router-link :to="{ name: 'tab', params: { tab_id: 0 }}" class="item__tabbar" >
      <div class="item__tabbar__icon">
        <img src="@/assets/img/tab-3.png" alt="">
      </div>
      <div class="item__tabbar__name">三小公开</div>
    </router-link>
    <router-link :to="{ name: 'commentList', params: { tab_id: 0 }}" class="item__tabbar">
      <div class="item__tabbar__icon">
        <img src="@/assets/img/tab-4.png" alt="">
      </div>
      <div class="item__tabbar__name">啄木鸟平台</div>
    </router-link>
  </div>
</template>

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
