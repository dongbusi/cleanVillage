<template>
  <div>
    <section class="container__inspector">
      <img src="" alt="" class="inspector-avatur">
      <div class="inspector-info">
        <div>王小明</div>
        <div>职务：监察联络员<br>电话：12930948734</div>
        <div>一句话承诺：<br>一切为人民服务</div>
      </div>
    </section>
    <section class="gap"></section>
    <section class="container__commentlist">
      <div class="item__commentlist" @click="goDetails">
        <div class="item__thumb">
          <img src="" alt="">
        </div>
        <div class="item__info">
          <div>反馈意见标题反馈意见标题反馈意见 反馈意见标题反馈意见标题标题</div>
          <div>09-10</div>
        </div>
      </div>
      <div class="item__commentlist">
        <div class="item__thumb">
          <img src="" alt="">
        </div>
        <div class="item__info">
          <div>反馈意见标题反馈意见标题反馈意见 反馈意见标题反馈意见标题标题</div>
          <div>09-10</div>
        </div>
      </div>
      <div class="item__commentlist">
        <div class="item__thumb">
          <img src="" alt="">
        </div>
        <div class="item__info">
          <div>反馈意见标题反馈意见标题反馈意见 反馈意见标题反馈意见标题标题</div>
          <div>09-10</div>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
export default {
  data () {
    return {
      
    }
  },
  methods: {
    goDetails () {
      this.$router.push({ name: 'commentDetails', params: { details_id: 2 } })
    }
  },
  mounted () {

  }
}
</script>
<style lang="scss" scoped>
.container__inspector {
  padding: 0.5rem 0;
  display: flex;
  height: 3rem;
}
.inspector-avatur {
  width: 2.5rem;
  height: 3rem;
  background: #F18C79;
  flex: none;
}
.inspector-info {
  margin-left: 1rem;
  flex: none;
}
.inspector-info div:first-child {
  font-family:'MicrosoftYaHei-bold';
  font-weight:bold;
  color:#000000;
  font-size: 0.36rem;
}
.inspector-info div:nth-child(2) {
  margin-top: 0.38rem;
  font-weight:400;
  font-size: 0.26rem;
  line-height: 1.5;
}
.inspector-info div:nth-child(3) {
  margin-top: 0.4rem;
  font-weight:400;
  font-size: 0.26rem;
  line-height: 1.5;
}
.gap {
  height: 0.2rem;
  background: #EAEAEA;
  position: relative;
  left: -0.44rem;
  right: 0;
  width: 7.5rem;
}
.container__commentlist {
  padding: 0 0 1rem;
  margin-bottom: 1.48rem;
}
.item__commentlist {
  height: 1.3rem;
  padding: 0.46rem 0;
  border-bottom: 0.01rem solid #E5E5E5;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.item__thumb {
  width: 1.62rem;
  height: 1.3rem;
  background: #F18C79;
  flex: none;
}
.item__info {
  width: 4.4rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 1.3rem;
}
.item__info div {
  font-size: 0.26rem;
  font-family: 'MicrosoftYaHei-light';
  line-height: 1.5;
}
.item__info div:first-child {
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2;
}
</style>
