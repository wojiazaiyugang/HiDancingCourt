<template>
  <view class="choose-father">
    <view class="icon">
      <slot name="icon"></slot>
    </view>
    <view class="center-text">
      <slot name="center-text"></slot>
    </view>
    <view class="i-choose ">
        <slot name="i-choose"></slot>
    </view>
  </view>
</template>

<script>
  export default {
    name:"long-button",
    data() {
      return {
        
      };
    }
  }
</script>

<style lang="scss">
  .choose-father {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 110rpx;
    font-family: 微软雅黑;
    background-color: #fff;
    border-radius: 60rpx;
    border-radius: 300rpx;
    background: linear-gradient(to right, #2de6f8 , #f76fed);
    .icon {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 70rpx;
      height: 70rpx;
      border-radius: 40rpx;
      margin-left: 20rpx;
    }
    .i-choose{
      display: flex;
      justify-content: center;
      align-items: center;
      width: 70rpx;
      height: 70rpx;
      border-radius: 40rpx;
      margin-right: 20rpx;
    }
  }
</style>
