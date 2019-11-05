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
    <section class="address">
      <img src="http://static.runoob.com/images/demo/demo2.jpg" alt="">
      <div>地址：监察联络员 </div>
    </section>
  </div>
</template>

<script>
export default {
  data () {
    return {

    }
  }
}
</script>

<style lang="scss" scoped>
.container__inspector {
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
.address {
  margin-top: 0.8rem;
  img {
    width: 100%;
    object-fit: cover;
  }
  div {
    margin-top: 0.2rem;
    font-size: 0.26rem;
  }
}
</style>
