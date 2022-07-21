<template>
  <view class="width-full heichi210 boradiu24 background-cover relative"
    style="background-color: #0077AA;"
    @click="clickVideo"
  >
    <view class="absolute right0 top0 babotton heichi60 white fon24 widchi75 line-heichi60 text-center " style="border-radius: 0rpx 24rpx 0rpx 24rpx;" >
      集体视频
    </view>
    <view class="absolute left20 bottom80 heichi60 widchi150 text-center line-heichi60 bayello boradiu50">
      #{{" " +"物种"}}
    </view>
    <view class="absolute left0 bottom0 heichi60 width-full flex line-heichi60 bapruple white"
    style="border-radius: 0rpx 0rpx 24rpx 24rpx;">
      <view class="margleft10">
        mingzi
      </view>
      <view class="margleft10">
        shijian
      </view>
    </view>
  </view>
</template>

<script>
  import { mapMutations,mapState } from "vuex"
  export default {
    name:"videoData",
    props: {
      videoAll: {
        type: Object,
        default:null
      },
    },
    data() {
      return {
        
      }
    },
    methods: {
      // 跳转剪辑视频页面
      clickVideo() {
        uni.navigateTo({
          url: "../../pages/clip-video/index"
        })
      }
    }
  }
</script>

<style lang="scss">
  
</style>

