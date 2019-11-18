<template>
  <div class="content" v-html="content.content" @click="showImage($event)"></div>
</template>

<script>

import { getContents } from '../api/index'
import { ImagePreview } from 'vant'

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
    },
    // showImage (e) {
    //   if (e.target.nodeName === 'IMG') {
    //     ImagePreview({
    //       images: [e.target.currentSrc],
    //       startPosition: 0
    //     })
    //   }
    // },
    share () {
      this.$request({
        url: 'http://h5.xianghunet.com/wx/wx_Signature.php',
        data: this.$qs.stringify({
          href: window.location.href
        }),
        method: 'post'
      }).then(res => {
        res['jsApiList'] = ['onMenuShareAppMessage', 'onMenuShareTimeline']
        this.$wx.config(res)
        this.$wx.ready(() => {
          this.$wx.onMenuShareAppMessage({
            title: '清廉村社',
            desc: document.title || '清廉村社',
            link: window.location.href
          })
          this.$wx.onMenuShareTimeline({
            title: '清廉村社',
            link: window.location.href,
            desc: document.title || '清廉村社'
          })
        })
      })
    }
  },
  mounted () {
    this.getContent()
    this.share()
  }
}
</script>

<style lang="scss" scoped>
.content {
  /deep/ p {
    font-size: 0.26rem;
    line-height: 1.5;
    // text-indent: 2em;
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

</style>
