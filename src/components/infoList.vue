<template>
  <div v-if="list && list.length">
    <div class="container__inspector" v-for="(item, index) in list" :key="index">
      <img :src="item.photo_img" alt="" class="inspector-avatur" @click="showImage(item.photo_img)">
      <div class="inspector-info">
        <div>{{item.realname}}</div>
        <div>职务：{{item.job}}<br>电话：{{item.telphone}}</div>
        <div class="line-three">一句话承诺：<br>{{item.motto}}</div>
      </div>
    </div>
  </div>
  <div v-else-if="!list.length && loading === false" >暂无内容！</div>
</template>

<script>

import { getInfoList } from '../api/index'
import { ImagePreview } from 'vant'

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
      required: true,
      type: Number,
      default: 0
    }
  },
  methods: {
    getList () {
      this.loading = true
      getInfoList({
        pid: this.id,
        street_id: this.$route.params.village_id,
        limit: this.limit,
        page: this.page + 1
      }).then(res => {
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
    },
    showImage (img) {
      ImagePreview({
        images: [
          img
        ],
        startPosition: 0,
      })
    }
  },
  mounted () {
    this.getList()
    this.watchScroll()
    setTimeout(() => {
      this.share()
    }, 300);
  }
}
</script>

<style lang="scss" scoped>
.container__inspector {
  padding: 0 0 0.5rem;
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
  // flex: none;
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
  font-family:'MicrosoftYaHei-regular';
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
</style>
<style lang="css">
  .van-loading__spinner.van-loading__spinner--circular, .van-loading__spinner.van-loading__spinner--circular, .van-toast__text, .van-toast__loading {
    background: none;
  }
  .van-loading__spinner.van-loading__spinner--circular::-webkit-scrollbar-track-piece {
    background: none ;
  }
  .van-image-preview__index, .van-image__img {
    background: #000;
  }
</style>
