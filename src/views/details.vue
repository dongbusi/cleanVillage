<template>
  <div class="content" v-html="content.content"></div>
</template>

<script>

import { getNewsContent } from '../api/index'

export default {
  data () {
    return {
      content: ''
    }
  },
  methods: {
    getContent () {
      getNewsContent({
        id: this.$route.params.details_id,
        pid: this.$route.query.tab_id,
        street_id: this.$route.params.village_id,
      }).then(res => {
        this.content = res.data || {}
      })
    }
  },
  mounted () {
    this.getContent()
  }
}
</script>

<style lang="scss" scoped>
.content {
  /deep/ p {
    font-size: 0.26rem;
    line-height: 1.5;
    text-indent: 2em;
    text-align: justify;
    margin-top: 0.2rem;
    img {
      max-width: 100%;
      object-fit: cover;
    }
  }
  /deep/ p:first-child {
    margin-top: 0;
  }
}
