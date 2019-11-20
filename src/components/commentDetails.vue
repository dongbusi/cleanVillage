<template>
  <div class="content">
    <div class="title ">{{content.title}}</div>
    <div class="info">
      <div>{{content.create_at}}</div>
    </div>
    <div class="text">{{content.content}}</div>
    <div class="img">
      <img :src="item" alt="" v-for="(item, index) in content.image" :key="index">
    </div>
    <div class="reply">
      <div class="reply-header">回复：</div>
      <div class="reply-content">{{content.reply}}</div>
    </div>
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
        res.data.list.create_at = res.data.list.create_at.slice(0, 10)
        res.data.list.image = res.data.list.image.split('|')
        this.content = res.data.list || {}
      })
    },
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
            title: sessionStorage.villageName + '·清廉村社',
            desc: document.title || sessionStorage.villageName + '·清廉村社',
            link: window.location.href
          })
          this.$wx.onMenuShareTimeline({
            title: sessionStorage.villageName + '·清廉村社',
            link: window.location.href,
            desc: document.title || sessionStorage.villageName + '·清廉村社'
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
.title {
  font-size: 0.4rem;
}
.info {
  padding: 0.1rem 0;
  display: flex;
  align-items: center;
  div {
    font-size: 0.24rem;
    color: #8c8a8a;
    margin-left: 0.3rem;
  }
  div:first-child {
    margin-left: 0;
  }
}
.text {
  margin-top: 0.5rem;
  // border-bottom: 0.01rem solid #cccccc;
  padding-bottom: 0.4rem;
  font-size: 0.26rem;
}
.img {
  padding-bottom: 0.4rem;
  border-bottom: 0.01rem solid #cccccc;
  img {
    max-width: 100%;
    object-fit: cover;
    margin-top: 0.4rem;
  }
}
.reply {
  padding: 0.5rem 0;
}
.reply-header {
  font-size: 0.32rem;
}
.reply-content {
  font-size: 0.26rem;
  margin-top: 0.4rem;
}
</style>
