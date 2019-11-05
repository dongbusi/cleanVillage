<template lang="">
  <div>
    <div class="resident-list">
      <div class="resident-item">居民代表</div>
      <div class="resident-item">xxx</div>
      <div class="resident-item">xxx</div>
      <div class="resident-item">xxx</div>
      <div class="resident-item">xxx</div>
      <div class="resident-item">xxx</div>
      <div class="resident-item">xxx</div>
      <div class="resident-item">xxx</div>
      <div class="resident-item">xxx</div>
      <div class="resident-item">xxx</div>
      <div class="resident-item">xxx</div>
      <div class="resident-item">xxx</div>
      <div class="resident-item">xxx</div>
      <div class="resident-item">xxx</div>
      <div class="resident-item">xxx</div>
    </div>
  </div>
</template>

<script>
export default {
  
}
</script>

<style lang="scss" scoped>
.resident-list {
  box-shadow:0 0.08rem 0.17rem 0 rgba(151,151,151,0.16);
  div {
    font-size: 0.28rem;
  }
}
.resident-item {
  height: 1rem;
  border-bottom: 0.01rem solid #E5E5E5;
  line-height: 1rem;
  text-align: center;
  font-family: 'MicrosoftYaHei-Regular';
  font-weight: 300;
}
.resident-item:first-child {
  font-family: 'MicrosoftYaHei-Bold';
  border-bottom: 0.01rem solid #F18C79;
  font-weight: bold;
}
</style>
