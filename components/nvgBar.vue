<template>
  <view :class="baColor">
    <view class="width-full" :style="{height:deviceInfo.statusBarHeight +'px'}">
      
    </view>
    <view class="width-full flex flex-center" :style="{height:((deviceInfo.menuInfo.top-deviceInfo.statusBarHeight)*2 + deviceInfo.menuInfo.height) +'px'}">
      <view class="absolute fon32 white widchi60" :style="{ height:((deviceInfo.menuInfo.top-deviceInfo.statusBarHeight)*2 + deviceInfo.menuInfo.height) +'px',lineHeight: ((deviceInfo.menuInfo.top-deviceInfo.statusBarHeight)*2 + deviceInfo.menuInfo.height) +'px',left:(deviceInfo.screenWidth - deviceInfo.menuInfo.right)+'px'}" @click="navBack">
        <slot name="icon"></slot>
      </view>
      <view class="white">
        <slot name="text"></slot>
      </view>
    </view>
  </view>
</template>

<script>
  import { mapState } from "vuex"
  export default {
    props:{
      baColor:{
        type:String,
        default:"bg-trans"
      }
    },
    data() {
      return {

      };
    },
    computed:{
      ...mapState("m_device",["deviceInfo"])
    },
    methods: {
      navBack() {
        uni.navigateBack({
          delta: 1
        })
      },
    }
    
    
  }
</script>

<style lang="less">

</style>
