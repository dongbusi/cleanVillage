<template>
  <div>
    <section class="container__inspector">
      <img :src="content.photo_img" alt="" class="inspector-avatur">
      <div class="inspector-info">
        <div>{{content.realname}}</div>
        <div>职务：{{content.job}}<br>电话：{{content.telphone}}</div>
        <div>一句话承诺：<br>{{content.motto}}</div>
      </div>
    </section>
    <section class="address" v-html="content.content">
    </section>
  </div>
</template>

<script>

import { getInspectorDetails } from '../api/index'

export default {
  data () {
    return {
      content: ''
    }
  },
  props: {
    id: {
      default: 0,
      type: Number,
      required: true
    }
  },
  methods: {
    getContent () {
      getInspectorDetails({
        pid: this.id,
        street_id: this.$route.params.village_id
      }).then(res => {
        this.content = res.data
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
.container__inspector {
  display: flex;
  height: 3rem;
}
.inspector-avatur {
  width: 2.5rem;
  height: 3rem;
  flex: none;
  object-fit: cover;
}
.inspector-info {
  margin-left: 0.5rem;
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
  margin-top: 0.26rem;
  font-weight:400;
  font-size: 0.26rem;
  line-height: 1.5;
  font-family:'MicrosoftYaHei-regular';
  width: 2.8rem;
  text-align: justify;
}
.address {
  margin-top: 0.8rem;
  /deep/ img {
    width: 100%;
    object-fit: cover;
  }
  /deep/ p {
    margin-top: 0.2rem;
    font-size: 0.26rem;
  }
}
</style>
