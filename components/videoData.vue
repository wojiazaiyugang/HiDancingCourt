<template>
  <view>
    <view class="widchi110 heichifan150 relative" style="margin: 20rpx 8rpx 0rpx 8rpx;">
      <view 
      class="width-full boradiu24 height-full background-cover"
      :style="{backgroundImage:video.human_src?`url(${video.human_src})`:`url(${video.download_src}?vframe/png/offset/3/w/1280/h/720)`}"
      @click="clickVideo"
      >
        <view class="flex flex-direction flex-center absolute left0 bottom0 width-full heichi50 fon20 white z-inde10 "
        style="border-radius: 0rpx 0rpx 25rpx 25rpx;background-color: rgba(0,0,0,.5);">
          <view>{{video.goal_time}}</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  import { mapMutations,mapState } from "vuex"
  export default {
    name:"videoData",
    props: {
      video: {
        type: Object,
        required: true
      },
    },
    data() {
      return {
        
      }
    },
    methods: {
      ...mapMutations("m_video",["setCurrentVideo"]),
      // 跳转视频详情
      clickVideo() {
        // 存储当前的视频对象，进入视频播放页面不需要再拉取组件了
        this.setCurrentVideo(this.video)
        uni.navigateTo({
          url: "../../pages/video-detail/index?all=false"
        })
      }
    }
  }
</script>

<style lang="scss">

  
</style>
