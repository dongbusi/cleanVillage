<template>
  <div>
    <section class="container__navbar">
      <div class="wrap__navbar">
        <van-tabs sticky v-model="navbar" color="#F18C79" line-height="0.07rem" :ellipsis="false">
          <van-tab v-for="(item, index) in navbarList" :key="index" :title="item.name" class="tabs" :to="{name: 'tab', params: {tab_id: index}}">
            <div class="container__tab">
              <div>
                <router-view v-if="showDetails"></router-view>
                <component v-else :is="navbarList[navbar].type"></component>
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
      navbar: Number(this.$route.params.tab_id) || 0,
      navbarList: [
        {
          name: '村社基本情况',
          type: 'contents'
        },
        {
          name: '村社干部队伍情况',
          type: 'infoList'
        },
        {
          name: '党员队伍',
          type: 'cardList'
        },
        {
          name: '居民代表',
          type: 'lineList'
        },
        {
          name: '小微权力',
          type: 'newsList'
        },
        {
          name: '我们在行动',
          type: 'introduceList'
        },
        {
          name: '社区监委',
          type: 'inspectorDetais'
        }
      ],
      showDetails: this.$route.name === 'details'
    }
  },
  methods: {
    init () {
      document.title = '村社概况'
    }
  },
  mounted () {
    this.init()
  },
  watch: {
    $route (newVal) {
      if (newVal.name === 'details') {
        this.showDetails = true
      } else {
        this.showDetails = false
      }
      if (Number(newVal.params.tab_id) !== this.navbar) {
        this.navbar = Number(newVal.params.tab_id)
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
