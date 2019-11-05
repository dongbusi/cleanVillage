<template>
  <div>
    <div class="input">
      <van-field v-model="name" placeholder="请输入姓名" />
    </div>
     <div class="input">
      <van-field v-model="address" placeholder="请输入住址" />
    </div>
     <div class="input">
      <van-field v-model="phone" placeholder="请输入电话" />
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
    />
    </div>
    <section class="uploader">
      <div class="header__uploader">添加照片或视频</div>
      <van-uploader
        v-model="fileList"
        multiple
        :max-count="8"
        preview-size="2rem"
      />
    </section>
    <button class="sumbit">上传</button>
  </div>
</template>
<script>
export default {
  data () {
    return {
      message: '',
      fileList: [],
      name: '',
      phone: '',
      address: ''
    }
  },
  methods: {

  },
  mounted () {
    
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
