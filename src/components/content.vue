<template>
  <div class="content" v-html="content.content"></div>
</template>

<script>

import { getContents } from '../api/index'

export default {
  data () {
    return {
      content: ''
    }
  },
  props: {
    id: {
      required: true,
      default: 0,
      type: Number
    }
  },
  methods: {
    getContent () {
      getContents({
        pid: this.id,
        street_id: this.$route.params.village_id
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
    img {
      max-width: 100%;
      object-fit: cover;
    }
  }
}

</style>
