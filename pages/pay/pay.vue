<template>
  <view class="container">
    <view class="computePrice">合计金额</view>
    <view class="price">￥99.9</view>
    <view class="TopView flex flexs">
      <view class="icon flex flexs" @click="allChoose">
        <image src="https://static.qiniuyun.highvenue.cn/image/hibascourt_images/video.png" mode="aspectFit" style="width: 60%; height: 50%;"></image>
      </view>
      <view class="text">视频个数</view>
      <view class="text">15个视频</view>
      <view class="icon flex" @click="allChoose" style="color: #f9860c;">
        <view class="iconfont icon-jiantou"></view>
      </view>
    </view>
    
    <view class="TopView flex flexs" style="    background-image: linear-gradient(to bottom, #666, #666);">
      <view class="icon flex" @click="allChoose">
        <view class="iconfont icon-youhuiquan"></view>
      </view>
      <view class="text">优惠券</view>
      <view class="text">暂无优惠券</view>
      <view class="icon flex" @click="allChoose">
        <view class="iconfont icon-jiantou"></view>
      </view>
    </view>
    
    <view class="TopView flex flexs">
      <view class="icon flex" @click="allChoose">
        <image src="https://static.qiniuyun.highvenue.cn/image/hibascourt_images/wechat.png" mode="aspectFit" style="width: 60%; height: 60%;"></image>
      </view>
      <view class="text">微信支付</view>
      <view class="text">支付方式</view>
      <view class="icon flex" @click="allChoose">
        <view class="iconfont icon-duihao"></view>
      </view>
    </view>
    
    <!-- 底部结算 -->
    <view class="bottom">
      <view style="margin-top: 4%;">
        <view class="payText">合计:<text style="font-size: 35rpx;">￥99.9</text></view>
        <view class="downLoad flex" @click="pay">支付</view>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        
      };
    }
  }
</script>

<style lang="scss">
  @import "@/static/style/pay"
</style>
