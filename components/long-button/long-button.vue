<template>
  <view>
    <view class="choose-father">
      <view class="choose">
       <view class="icon">
          <slot name="icon"></slot>
        </view>
        <view class="first-text">
          <slot name="first-text"></slot>
        </view>
        <view class="second-text">
          <slot name="second-text"></slot>
        </view>
        <view class="i-choose ">
            <slot name="i-choose"></slot>
        </view>
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
      font-family: 微软雅黑;
       background-color: #fff;
       border-radius: 60rpx;
       overflow: hidden;
       margin: 0 26rpx;
     }
    .choose {
       display: flex;
       justify-content:space-around;
       align-items: center;
       margin: 6rpx;
       height: 108rpx;
       color: #fff;
       border-radius: 300rpx;
       // background-color: red;
       background: linear-gradient(to bottom, #f7a216, #fe6205);
     }
     .icon {
       display: flex;
       justify-content: center;
       align-items: center;
       width: 70rpx;
       height: 70rpx;
       border-radius: 40rpx;
       background-color: #fff;
     }
     .i-choose{
       width: 70rpx;
       height: 70rpx;
     }
</style>
