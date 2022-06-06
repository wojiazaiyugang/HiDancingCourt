<template>
  <view class="container">
    <!-- 上方选择框 -->
    <view class="TopView flex">
      <view class="icon flex" @click="allChoose">
        <view class="iconfont icon-duihao" v-if="allChooseShow"></view>
      </view>
      <view class="text">全选</view>
      <view class="text">购物车视频只保留7天，7天后自动清除哦~</view>
    </view>
    <!-- 视频 -->
    <view class="video">
      <scroll-view
      scroll-y="true" 
      style="width: 100%; height: 1200rpx; margin-top: 20rpx;" 
      >
      <view style="display: flex; gap: calc(16%/3) ; flex-wrap: wrap; padding: 0 32rpx;">
        <view class="white" v-for="(item,index) in cart.length != 0 && cart" :key="index">
         <videoData :video="item" :sonShow="allChooseShow" @changeCheck = "changeCheck($event)" :length="cart.length" :idx = "index" :fill="fill"></videoData>
        </view>
      </view>
        
        <view class="placeholder" style="width: 320rpx; height: 180rpx;"></view>
      </scroll-view>
    </view>
    <!-- 底部结算 -->
    <view class="bottom">
      <view style="margin-top: 4%;">
        <view class="payText"><text style="padding-right: 10rpx;">已选12个视频</text>合计:<text style="font-size: 35rpx;">￥99.9</text></view>
        <view class="downLoad flex" @click="pay">下载</view>
      </view>
    </view>
  </view>
</template>

<script>
  import {mapState} from 'vuex'
  import { videoDate } from '@/components/videoData/videoData.vue'
  export default {
    data() {
      return {
        allChooseShow: true,
        iconShow : true,
        fill : []
      };
    },
    created() {
      this.fill = Array.from(Array(this.siteIdVideo.length), () => {
        return this.allChooseShow
      })
      console.log(this.fill)
      console.log('fill')
    },
    computed: {
      ...mapState('m_venues',['siteIdVideo']),
      ...mapState('m_cart',['cart'])
    },
    components: {
      videoDate,
    },
    methods: {
      allChoose() {
        this.allChooseShow = !this.allChooseShow
        console.log(this.cart)
        // this.iconShow = !this.iconShow
      },
      changeCheck(event) {
        this.list = event
        // this.allChooseShow = event
      },
      pay() {
        console.log(this.siteIdVideo)
      }
    }
  }
</script>

<style lang="scss">
  @import "@/static/style/cart"
</style>
