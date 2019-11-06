<template>
  <div class="container">
    <section class="container__search">
      <div class="search">
        <input class="input__search" type="text" v-model="value" placeholder="在此输入您的村社">
        <div class="icon__search">
          <img src="../assets/img/icon-search.png" alt="">
        </div>
      </div>
    </section>
    <section class="container__list">
      <div class="list">
        <div class="item" v-for="(item, index) in addressList" :key="index" @click="selectAddress(index)">{{item}}</div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  data () {
    return {
      value: '',
      address: '',
      addressList: ['江寺', '百尺溇', '燕子河', '丁家庄', '南市', '藕湖浜', '陈公桥', '东阳桥']
    }
  },
  methods: {
    hideTabbar () {
      this.$emit('hideTabbar')
    },
    selectAddress (index) {
      let address = this.addressList[index]
      this.address = address
      sessionStorage.address = address
      this.$store.dispatch('setAddress', address).then(res => {
        this.$router.push({ path: '/' })
        this.$emit('showTabbar')
      })
    }
  },
  mounted () {
    this.hideTabbar()
  }
}
</script>

<style lang="scss" scoped>
.container {
  background: #E5E5E5;
}
.container__search {
  padding: 0.3rem 0.44rem 0.36rem;
  background: #E5E5E5;
}
.search {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #FFFFFF;
  height: 1rem;
  padding: 0 0.65rem 0 0.7rem;
}
.icon__search {
  width: 0.35rem;
}
.input__search {
  font-size: 0.28rem;
  outline: none;
  border: none;
}
.container__list {
  padding: 0 0.44rem 0.6rem;
  background: #E5E5E5;
  height: calc(100vh - 1.66rem);
  box-sizing: border-box;
}
.list {
  background: #FFFFFF;
  width: 100%;
  height: 100%;
  overflow-y: scroll;
}
.item {
  height: 1rem;
  text-align: center;
  line-height: 1rem;
  font-size: 0.32rem;
  font-family:'MicrosoftYaHei-light';
  border-bottom: 1px solid #DCDCDC;
}
</style>
