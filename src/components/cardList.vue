<template>
  <div>
    <div class="tab-header">
      所谓纪检监察调研是指纪检监察机关及其工作人员对党风廉政建设和反腐败工作以及与此相关的社会现象等客观情况，有目的、有计划、有组织地运用一定的方式、方法及各种技术手段，收集有关信息资料，进行整理、加工和分析，予以全面、准确的概括、阐释，提出有针对性的具体方案和建议的实践活动。
    </div>
    <div class="card-list">
      <div class="card-item">
        <div>xxx支部</div>
        <div>目前党员人数：20人</div>
        <div>支部书记：XXX</div>
        <div>支部委员：XXX</div>
        <div>支部党员：XXX、XXX、XX、XXX</div>
        <div class="photo">
          <img src="http://static.runoob.com/images/demo/demo2.jpg" alt="">
          <img src="http://static.runoob.com/images/demo/demo2.jpg" alt="">
          <img src="http://static.runoob.com/images/demo/demo2.jpg" alt="">
          <img src="http://static.runoob.com/images/demo/demo2.jpg" alt="">
          <img src="http://static.runoob.com/images/demo/demo2.jpg" alt="">
          <img src="http://static.runoob.com/images/demo/demo2.jpg" alt="">
        </div>
      </div>
      <div class="card-item">
        <div>xxx支部</div>
        <div>目前党员人数：20人</div>
        <div>支部书记：XXX</div>
         <div>支部委员：XXX</div>
        <div>支部党员：XXX、XXX、XX、XXX</div>
      </div>
      <div class="card-item">
        <div>xxx支部</div>
        <div>目前党员人数：20人</div>
        <div>支部书记：XXX</div>
         <div>支部委员：XXX</div>
        <div>支部党员：XXX、XXX、XX、XXX</div>
      </div>
      <div class="card-item">
        <div>xxx支部</div>
        <div>目前党员人数：20人</div>
        <div>支部书记：XXX</div>
         <div>支部委员：XXX</div>
        <div>支部党员：XXX、XXX、XX、XXX</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  
}
</script>

<style lang="scss" scoped>
.tab-header {
  font-size: 0.26rem;
  line-height: 2;
  text-align: justify;
  font-family: 'MicrosoftYaHei-Light';
  box-shadow:0 0.08rem 0.17rem 0 rgba(151,151,151,0.16);
  padding: 0.4rem;
  text-indent: 2em;
  margin-bottom: 0.3rem;
}
.card-item {
  box-shadow: 0 0.08rem 0.4rem 0 rgba(151,151,151,0.3);
  height: 8rem;
  padding: 0 0.44rem;
  box-sizing: border-box;
  margin-bottom: 0.3rem;
  div {
    height: 1rem;
    border-bottom: 0.01rem solid #E5E5E5;
    line-height: 1rem;
    font-weight: 300;
    font-family: 'MicrosoftYaHei-Regular';
  }
  div:first-child {
    border-bottom: 0.01rem solid #F18C79;
    font-weight: bold;
    font-family: 'MicrosoftYaHei-Bold';
  }
  div:last-child {
    border-bottom: none;
  }
  .photo {
    height: 2.4rem;
    padding: 0.2rem 0;
    overflow-x: scroll;
    display: flex;
    align-items: center;
    -webkit-overflow-scrolling: touch;
    img {
      width: 1.8rem;
      object-fit: cover;
      margin-left: 0.2rem;
      flex: none;
    }
    img:first-child {
      margin-left: 0;
    }
  }
}
</style>
