<template>
  <div>
    <section class="container__navbar">
      <div class="wrap__navbar">
        <van-tabs sticky v-model="navbar" color="#F18C79" line-height="0.07rem" :ellipsis="false">
          <van-tab v-for="(item, index) in navbarList" :key="index" :title="item.title" class="tabs" :to="{name: 'tab', params: {tab_index: index}}">
            <div class="container__tab">
              <div>
                <router-view v-if="showDetails" :id="navbarList[navbar].id"></router-view>
                <component v-else :is="navbarList[navbar].tag" :id="navbarList[navbar].id"></component>
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
      showDetails: this.$route.name === 'details'
    }
  },
  methods: {
    init () {
      document.title = '村社概况'
    },
    getTab () {
      getTab({
        pid: this.$route.params.menu_id,
        street_id: this.$route.params.village_id
      }).then(res => {
        this.navbarList = res.data.list
      })
    }
  },
  mounted () {
    this.init()
    this.getTab()
  },
  watch: {
    $route (newVal) {
      if (newVal.name === 'details') {
        this.showDetails = true
      } else {
        this.showDetails = false
      }
      if (Number(newVal.params.tab_index) !== this.navbar) {
        this.navbar = Number(newVal.params.tab_index)
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
  margin-bottom: 2rem;
}

</style>
