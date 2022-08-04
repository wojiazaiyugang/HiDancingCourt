<template>
  <view class="heichifan120 marginxy10 bamyava boradiu12 relative flex" >
    <view class="width30 flex flex-direction flex-center">
      <view class="pruple fon50 heichi60 line-heichi60">
        免费
      </view>
      <view 
        @tap="useCoupons"
        :class="['margtop20 width70 heichi40 line-heichi40 fon28 white text-center boradiu8',isUse?'bacamerout':'bapruple']" >
        {{isUse?"已使用":"立即使用"}}
      </view>
    </view>
    <view class="width70 flex flex-direction justify-center " >
      <view class="white fon40 heichi60 line-heichi60" 
      style="margin: 0rpx 0rpx 20rpx 20rpx;">
        新场馆七天体验券
      </view>
      <view class="fon20 gray margleft10 heichi40 line-heichi40" >
        说明：上线7天内免费使用舞蹈直拍剪辑服务
      </view>
    </view>
    
    <view class="absolute top20 right20 heichi70 widchi35 background-cover boradiu12"
     style="background-image: url(https://static.qiniuyun.highvenue.cn/image/record_logo.png);">
      
    </view>
  </view>
</template>

<script>
  export default {
    props:{
      
    },
    data(){
      return {
        // 优惠券使用与否的标志
        isUse:false,
      }
    },
    computed:{
      
    },
    methods:{
      // 使用优惠券
      useCoupons(){
        this.isUse = !this.isUse
        console.log("使用优惠券")
      },
    },
  }
</script>

<style lang="less">
</style>
