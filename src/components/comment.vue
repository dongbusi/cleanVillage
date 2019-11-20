<template>
  <div>
    <div class="input">
      <van-field v-model="name" placeholder="请输入姓名" required />
    </div>
    <div class="input">
      <van-field v-model="address" placeholder="请输入住址" required />
    </div>
    <div class="input">
      <van-field v-model="phone" placeholder="请输入电话" required type="tel" />
    </div>
    <div class="input">
      <van-field v-model="title" placeholder="请输入标题" required />
    </div>
    <div class="textarea">
      <van-field
      v-model="message"
      rows="8"
      autosize
      type="textarea"
      maxlength="500"
      placeholder="请在此输入文字"
      show-word-limit
      required
    />
    </div>
    <section class="uploader">
      <div class="header__uploader">添加照片</div>
      <van-uploader
        v-model="fileList"
        multiple
        :max-count="8"
        preview-size="2rem"
        :after-read="imageUpload"
      />
    </section>
    <button class="sumbit" @click="upload">上传</button>
  </div>
</template>
<script>

import { imageUpload, comment } from '../api/index'

export default {
  data () {
    return {
      message: '',
      fileList: [],
      title: '',
      name: '',
      phone: '',
      address: '',
      imagesUrl: []
    }
  },
  methods: {
    imageUpload (file) {
      let files
      if (Array.isArray(file)) {
        files = file
      } else {
        files = [file]
      }
      files.forEach(item => {
        let image = new FormData()
        image.append('file', item.file)
        imageUpload(image).then(res => {
          this.imagesUrl.push(res.url)
        })
      })
    },
    upload () {
      if (this.address && this.name && this.message && this.phone && this.title) {
        comment({
          street_id: this.$route.params.village_id,
          content: this.message,
          username: this.name,
          address: this.address,
          telphone: this.phone,
          title: this.title,
          image: this.imagesUrl.length > 1 ? this.imagesUrl.join('|') : this.imagesUrl[0]
        }).then(res => {
          this.$dialog.alert({
            title: '提示',
            message: '上传成功'
          }).then(() => {
            this.message = ''
            this.address = ''
            this.name = ''
            this.phone = ''
            this.fileList = []
            this.title = ''
          })
        })
      } else {
        this.$dialog.alert({
          title: '提示',
          message: '请填写完整'
        })
      }
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
    setTimeout(() => {
      this.share()
    }, 300);
  }
}
</script>

<style lang="scss" scoped>
.textarea {
  border-bottom: 0.01rem solid #eeeeee;
  .van-cell {
    background: #ffffff;
    padding: 0.1rem 0 0.4rem;
  }
  /deep/ .van-cell__value {
    background: #eeeeee;
    padding: 0.3rem;
    box-sizing: border-box;
  }
  /deep/ div {
    background: #eeeeee;
  }
}
.uploader {
  padding: 0.1rem 0 0.3rem;
  border-bottom: 0.01rem solid #eeeeee;
  .header__uploader {
    padding: 0.24rem 0 0.34rem;
    font-size: 0.26rem;
    color: #333;
  }
}
.sumbit {
  display: block;
  width: 6.6rem;
  margin: 1rem auto 2rem;
  height: 0.9rem;
  text-align: center;
  line-height: 0.9rem;
  color: #FEFEFE;
  background:#f18c79;
  border:1px solid #bfbfbf;
  font-size: 0.36rem;
}
/deep/ textarea {
  font-size: 0.26rem !important;
}
/deep/ input {
  font-size: 0.26rem !important;
}

</style>

<style lang="css">
.van-dialog__header {
  font-size: 0.36rem;
}
.van-dialog__message.van-dialog__message--has-title {
  font-size: 0.28rem;
}
.van-button__text {
  font-size: 0.28rem;
}
</style>
