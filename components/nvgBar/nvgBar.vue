<template>
  <view>
    <!-- 导航栏 -->
    <view class="navigationBar">
      <!-- 状态栏占位 -->
      <view :style="{height: statuBarHeight  +'px'}"></view>
      <view class="navbar-context" >
        <text @click="last" class="iconfont icon-fanhui" style="font-size: 45rpx; padding-left: 20rpx;color: #000000;">
          </text>
        <text class="text" :style="{'padding-left': paddingLeft / 2.3 + 'px'}"><slot name="text"></slot></text>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        statuBarHeight: 44 ,// 状态栏高度
        paddingLeft: 45 // 导航栏高度
      };
    },
    created() {
      const info = uni.getSystemInfoSync()
      // 设置状态栏高度
      this.statuBarHeight = info.statusBarHeight
      // 获取胶囊位置
      const menuButton = uni.getMenuButtonBoundingClientRect()
      this.paddingLeft = menuButton.left
    },
    methods: {
      last() {
        uni.navigateBack({
          delta: 1
        })
      },
    }
    
    
  }
</script>

<style lang="scss" scoped>
  .navigationBar{
    color: #fff;
  }
.iconfont{
    font-size: 44rpx;
    padding-top: 3rpx;
    text-align: center;
    line-height: 69rpx;
  }
</style>
