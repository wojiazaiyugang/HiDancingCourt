<template>
  <view>
    <view class="video">
      <view 
      class="coverImage"
      :style="{backgroundImage: 'url(' + video.site_thumbnail + ')'}"
      @click="clickVideo"
      >
        <view class="leftTop" >{{video.data.goal_labels[0]}}</view>
        <view class="leftBottom">
          <view>{{video.goal_time.slice(5,10)}}</view>
          <view>{{video.goal_time.substr(11,15)}}</view>
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
    .leftTop {
      z-index: 2;
      position: absolute;
      top: 0;
      left: 0;
      width: 107rpx;
      height: 40rpx;
      background-color: #fe5857;
      border-radius: 20rpx 0 ;
      font-size: 24rpx;
      line-height: 40rpx;
      text-align: center;
      color: #fff;
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
      width: 107rpx;
      height: 50rpx;
      border-radius: 0 20rpx;
      font-size: 20rpx;
      background-color: rgba(0,0,0,.5);
      color: #fff;
    }
  }
</style>
