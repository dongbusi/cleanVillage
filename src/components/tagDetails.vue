<template>
  <div v-if="list && list.length">
    <div class="list">
      <div class="item" v-for="(item, index) in list" :key="index">
        <div class="item__header">
          <div>{{item.title}}</div>
          <div>{{item.create_at}}</div>
        </div>
        <div class="item__label">
          <div @click="goDetails(item.id, 1)">立项</div>
          <div @click="goDetails(item.id, 2)">招投标</div>
          <div @click="goDetails(item.id, 3)">合同</div>
          <div @click="goDetails(item.id, 4)">验收</div>
          <div @click="goDetails(item.id, 5)">决算</div>
        </div>
      </div>
    </div>
  </div>
  <div v-else-if="!list.length && loading === false" >暂无内容！</div>
</template>

<script>

import { getLabelList } from '../api/index'

export default {
  data () {
    return {
      list: [],
      loading: false,
      page: 0,
      limit: 6
    }
  },
  props: {
    id: {
      type: Number,
      default: 0
    }
  },
  methods: {
    goDetails (id, type) {
      this.$router.push({ name: 'labelDetails', params: { details_id: id }, query: { tab_id: this.id, type: type } })
    },
    getList () {
      this.loading = true
      getLabelList({
        pid: this.id,
        street_id: this.$route.params.village_id,
        limit: this.limit,
        page: this.page + 1
      }).then(res => {
        res.data.list.list.forEach(item => {
          item.create_at = item.create_at.slice(0, 10)
        })
        this.list = [...this.list, ...res.data.list.list]
        this.loading = false
        this.page = res.data.list.page.current
      }).catch(() => {
        this.loading = false
      })
    },
    scroll () {
      let height = document.documentElement.clientHeight || document.body.clientHeight;
      let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      let scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
      if (scrollHeight - height - scrollTop <= 0 && this.loading === false) {
        this.getList()
      }
    },
    watchScroll () {
      window.addEventListener('scroll', this.scroll)
      this.$once('hook:beforeDestroy', function () {
        window.removeEventListener('scroll', this.scroll)
      })
    }
  },
  mounted () {
    this.getList()
    this.watchScroll()
  }
}
</script>

<style lang="scss" scoped>
.list {
  overflow-y: scroll;
  margin-top: -0.34rem;
}
.item {
  border-bottom: 1px solid #E5E5E5;
}
.item__header {
  height: 1.04rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.item__header > div:first-child {
  width: 4.6rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.item__header div {
  font-size: 0.26rem;
  font-family: 'MicrosoftYaHei-light'
}
.item__label {
  display: flex;
  padding-bottom: 0.3rem;
}
.item__label div {
  padding: 0.1rem 0.2rem;
  background: #fad60e;
  margin-left: 0.25rem;
  border-radius: 0.4rem;
  font-size: 0.26rem;
}
.item__label div:first-child {
  margin-left: 0;
}
</style>
