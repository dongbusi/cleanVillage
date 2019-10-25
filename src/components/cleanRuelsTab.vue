<template>
  <div>
    <div class="list" v-if="tab === 0 || tab === 3 ">
      <div class="item" v-for="(item, index) in list" :key="index">
        <div>{{item.title}}</div>
        <div>{{item.time}}</div>
      </div>
    </div>
    <div v-else class="content">
      <div>
        农村股份经济合作社股权证是股东享有股权收益分配的
依据。股东遵照股份经济合作社章程迅速腾空有关条款，享
有众多创造权利，承担义务。股权可以继承、转让和赠与，
但不得退股提现。股权证书不准作为其他证书使用空间，遗
失需及时报失，并申请补办手续。股份经济合作社在年终分
配时应兼顾国家、合作社和股东三者关系，编制财务决算，
搞好收益分配。

      股权证有什么用农村股份经济合作社股权证是股东享有
股权收益分配的依据。股东遵照股份经济合作社章程迅速腾
空有关条款，享有众多创造权利，承担义务。股权可以继承、
转让和赠与，但不得退股提现。股权证书不准作为其他证书
使用空间，遗失需及时报失，并申请补办手续。股份经济合
作社在年终分配时应兼顾国家、合作社和股东三者关系，编
制财务决算，搞好收益分配。如何分红村社区股份经济合作
社股权证是村经济合作社股份合作制改革后，由股份经济合
作社发放给集体经济组织成员，明确其在集体资产中所占份
额的证明，改革后的集体所有制性质不变、村级集体经济组
织功能不变。根据《章程》，股份经济合作社在有净收益的
前提下,按规定提取公积金、公益金和福利费用后，经股东代
表会议讨论通过，可实行按股分红。

股权执行标准情况1出嫁女：若嫁本市内，在三个月后取消口
粮和分红;若嫁外市，则仍然保留口粮和分红。2户口迁出的：</div>            
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      list: [
        {
          title: '聚焦民生实事，城厢街道既有住宅加装电梯最新进展',
          time: '09-10'
        },
        {
          title: '聚焦民生实事，城厢街道既有住宅加装电梯最新进展',
          time: '09-10'
        },
        {
          title: '聚焦民生实事，城厢街道既有住宅加装电梯最新进展',
          time: '09-10'
        },
        {
          title: '聚焦民生实事，城厢街道既有住宅加装电梯最新进展',
          time: '09-12'
        }
      ]
    }
  },
  props: {
    tab: {
      type: Number,
      required: true
    }
  },
  methods: {

  },
  mounted () {
    
  }
}
</script>

<style lang="scss" scoped>
.list {
  width: 100%;
  height: 9.82rem;
  overflow-y: scroll;
}
.item {
  height: 1.04rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 0.47rem;
  border-bottom: 1px solid #E5E5E5;
}
.item > div:first-child {
  width: 4.6rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.item div {
  font-size: 0.26rem;
  font-family: 'MicrosoftYaHeiLight'
}
.content {
  padding: 0.44rem 0.4rem;
  font-size: 0.26rem;
  line-height: 2;
  height: 9.82rem;
  overflow-y: scroll;
  box-sizing: border-box;
  text-align: justify;
  font-family: 'MicrosoftYaHeiLight'
}
</style>
