<template>
  <view class="choose-father">
    <view class="choose">
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
    justify-content: center;
    align-items: center;
    height: 120rpx;
    font-family: 微软雅黑;
    background-color: #fff;
    border-radius: 60rpx;
    .choose {
      flex: 1;
      margin: 6rpx 6rpx;
      display: flex;
      justify-content:space-between;
      align-items: center;
      height: 108rpx;
      color: #fff;
      border-radius: 300rpx;
      // background-color: red;
      background: linear-gradient(to bottom, #FB9D6A, #F6397E);
    }
    .icon {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 70rpx;
      height: 70rpx;
      border-radius: 40rpx;
      background-color: #fff;
      margin-left: 20rpx;
    }
    .i-choose{
      display: flex;
      justify-content: center;
      align-items: center;
      width: 70rpx;
      height: 70rpx;
      color: white;
      border-radius: 40rpx;
      margin-right: 20rpx;
    }
  }
</style>
