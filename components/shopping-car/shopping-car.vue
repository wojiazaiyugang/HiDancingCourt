<template>
  <view>
    <view class="bottom"></view>
    <image class="shopping-car" src="https://static.qiniuyun.highvenue.cn/image/shopping-car.png" mode="aspectFit"></image>
    <view class="shopping-num" v-if="true">
      <text>{{cart.length}}</text>
    </view>
  </view>
</template>

<script>
  import {mapState} from 'vuex'
  export default {
    name:"shopping-car",
    data() {
      return {
        
      };
    },
    computed: {
      ...mapState('m_cart',['cart'])
    },
  }
</script>

<style lang="scss">
  .bottom {
    z-index: 99;
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 10vh;
    border-radius:  26rpx 26rpx 0 0;
    background-color: #fff;
  }
  .shopping-car {
    z-index: 100;
      width: 20%; 
      height: 10%;
      position: absolute;
      bottom: 0;
      transform: translateY(-45%);
      margin-left: 20rpx;
    }
    .shopping-num {
      z-index: 101;
      position: absolute;
      bottom: 0;
      transform: translateY(-364%);
      margin-left: 119rpx;
      width: 50rpx;
      height: 50rpx;
      text-align: center;
      line-height: 50rpx;
      border-radius: 30rpx;
      background-color: red;
      font-size: 24rpx;
      color: #fff;
    }
    
</style>
