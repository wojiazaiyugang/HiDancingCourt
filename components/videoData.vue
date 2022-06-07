<template>
  <view>
    <view class="video">
      <view 
      class="coverImage"
      :style="{backgroundImage: 'url(' + video.site_thumbnail + ')'}"
      @click="clickVideo"
      >
        <view class="leftBottom">
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
          url: "../../pages/video-detail/index"
        })
      }
    }
  }
</script>

<style lang="scss">
  .video {
    position: relative;
    width: 221rpx;
    height: 300rpx;
    margin-top: 20rpx;
    margin-left: 8rpx;
    margin-right: 8rpx;
    .coverImage{
      height: 100%;
      width: 100%;
      background-size: cover;
      border-radius: 25rpx;
    }
    .leftBottom {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      z-index: 3;
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 50rpx;
      border-radius: 0rpx 0rpx 25rpx 25rpx;
      font-size: 20rpx;
      background-color: rgba(0,0,0,.5);
      color: #fff;
    }
  }
</style>
