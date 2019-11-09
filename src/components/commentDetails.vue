<template>
  <div class="content">
    <div class="title"></div>
    <div class="info"></div>
    <div class="text"></div>
    <div class="img"></div>
  </div>
</template>

<script>

import { getCommentDetails } from '../api/index'

export default {
  data () {
    return {
      content: ''
    }
  },
  methods: {
    getContent () {
      getCommentDetails({
        id: this.$route.params.comment_id,
        street_id: this.$route.params.village_id,
      }).then(res => {
        this.content = res.data.list || {}
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
