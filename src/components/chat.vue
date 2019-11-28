<template>
  <div>
    <div class="title">
      <span>实时主题互动</span>
      <div class="line"></div>
    </div>
    <div class="content">
      <div class="item item__controller">{{content && content.title.content}}</div>
      <div class="item item__user" v-for="(item, index) in content.leaving" :key="index">{{item.content}}</div>
    </div>
    <div class="comment">
      <div>
        <van-field
          v-model="message"
          rows="2"
          type="textarea"
          placeholder="请在这里输入想对我们说的话，输入完后请点击发送，我们就能收到您的建议！"
        />
      </div>
      <div @click="submit">发送</div>
    </div>
  </div>
</template>

<script>

import http from '../utils/request'

export default {
  data () {
    return {
      message: '',
      content: ''
    }
  },
  inject: ['hideTabbar', 'showTabbar'],
  methods: {
    submit () {
      http({
        url: 'https://cx.xianghunet.com/admin.html?s=forward/api.data/leaving_add',
        data: {
          street_id: this.$route.params.village_id,
          content: this.message,
          in_id: this.content.title.id
        },
        method: 'POST'
      }).then(res => {
        this.$toast('发送成功');
        this.message = ''
        this.getChat()
      })
    },
    getChat () {
      http({
        url: 'https://cx.xianghunet.com/admin.html?s=forward/api.data/leaving',
        data: {
          street_id: this.$route.params.village_id
        },
        headers: {
          token: localStorage.token
        },
        method: 'POST'
      }).then(res => {
        this.content = res.data
      })
    }
  },
  mounted () {
    document.title = '实时主题互动'
    this.getChat()
    this.hideTabbar()
  },
  beforeDestroy () {
    this.showTabbar()
  }
}
</script>

<style lang="scss" scoped>
.title {
  position: relative;
  height: 0.8rem;
  span {
    color: #24253D;
    font-size: 0.56rem;
    font-family: 'PingFangSC-SemiBold';
    line-height: 0.8rem;
    font-weight: bold;
  }
  .line {
    position: absolute;
    bottom: 0.12rem;
    left: 0;
    width: 3.36rem;
    height: 0.14rem;
    background: #F18C7A;
    opacity:0.47;
  }
}
.content {
  margin-top: 0.84rem;
  display: flex;
  flex-direction: column;
  &::after {
    display: block;
    content: '';
    height: 1.5rem;
  }
  .item__controller {
    max-width: 5.6rem;
    display: flex;
    padding: 0.24rem 0.32rem;
    background: #F5F5F5;
    border-radius: 0.16rem 0.16rem 0 0;
    box-sizing: border-box;
    line-height: 0.42rem;
    font-size: 0.3rem;
    color: #24253D;
    text-align: justify;
  }
  div {
    margin-top: 0.3rem;
  }
  div:first-child {
    margin-top: 0;
  }
  .item__user {
    max-width: 5.38rem;
    display: flex;
    padding: 0.24rem 0.32rem;
    color: #FFFFFF;
    font-size: 0.32rem;
    font-family: 'PingFangSC-SemiBold';
    font-weight: bold;
    background: #F18C7A;
    align-self: flex-end;
    border-radius:0.16rem 0.16rem 0 0.16rem;
  }
}
.comment {
  width: 7.22rem;
  height: 1.54rem;
  position: fixed;
  bottom: 0.8rem;
  left: 0rem;
  right: 0;
  margin: auto;
  background: #F4F4F4;
  border-radius: 0.8rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 0.16rem 0 0.48rem;
  box-sizing: border-box;
  & > div:last-child {
    width: 1.12rem;
    height: 1.12rem;
    background: #F18C7A;
    border-radius: 50%;
    text-align: center;
    line-height: 1.12rem;
    color: #FFFFFF;
    font-size: 0.36rem;
  }
  & > div:first-child {
    width: 5.2rem;
    line-height: .4rem;
    display: flex;
    align-items: center;
  }
  & /deep/ div {
    padding: 0;
    background: none;
  }
  & /deep/ .van-field--min-height .van-field__control {
    min-height: 0;
  }
  & /deep/ textarea {
    font-size: 0.28rem;
  }
}
</style>
