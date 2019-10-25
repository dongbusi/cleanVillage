<template>
  <div>
    <section class="container__navbar">
      <div class="wrap__navbar">
        <van-tabs sticky v-model="navbar" color="#F18C79" line-height="0.07rem" :border="false" :ellipsis="false">
          <van-tab v-for="(item, index) in navbarList" :key="index" :title="item" class="tabs" :to="{ name: 'cleanrulestab', params: { id: index }}">
            <div class="container__tab">
              <div class="wrap__tab">
                <router-view :tab="navbar"></router-view>
              </div>
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
      navbarList: ['小微权力清单', '股份经济联合社章程', '居民公约', '财务管理制度', '其它']
    }
  },
  methods: {
    setTitle () {
      document.title = '清廉制度'
    }
  },
  mounted () {
    this.setTitle()
  },
  watch: {
    $route (newVal) {
      if (newVal.params.id !== this.navbar) {
        this.navbar = newVal.params.id
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.wrap__navbar {
  background: #FFFFFF;
  & /deep/ .van-tabs__wrap {
    box-shadow:0px 8px 17px 0px rgba(151,151,151,0.16);
    height: 1.04rem;
    padding: 0 0.44rem;
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
  height: calc(100vh - 2.5rem);
  background: #e5e5e5;
  padding: 0.5rem 0.44rem;
  box-sizing: border-box;
}
.wrap__tab {
  background: #FFFFFF;
  width: 100%;
  height: 100%;
  box-shadow:0 0.08rem 0.17rem 0 rgba(151,151,151,0.16);
}
</style>
