<template>
  <div>
    <div class="list">
      <div class="item" v-for="(item, index) in list" :key="index" @click="goDetails">
        <div>{{item.title}}</div>
        <div>{{item.time}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      list: [
        {
          title: '聚焦民生实事，城厢街道既有住宅加装电梯最新进展',
          time: '09-10'
        },
        {
          title: '聚焦民生实事，城厢街道既有住宅加装电梯最新进展',
          time: '09-10'
        },
        {
          title: '聚焦民生实事，城厢街道既有住宅加装电梯最新进展',
          time: '09-10'
        },
        {
          title: '聚焦民生实事，城厢街道既有住宅加装电梯最新进展',
          time: '09-12'
        }
      ]
    }
  },
  methods: {
    goDetails () {
      this.$router.push({ name: 'details', params: { details_id: 2 } })
    }
  }
}
</script>

<style lang="scss" scoped>
.list {
  overflow-y: scroll;
  margin-top: -0.34rem;
}
.item {
  height: 1.04rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #E5E5E5;
}
.item > div:first-child {
  width: 4.6rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.item div {
  font-size: 0.26rem;
  font-family: 'MicrosoftYaHei-light'
}
</style>
