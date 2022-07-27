<template>
  <view class="width-full heichi210 boradiu24 background-cover relative marginbottom10"
  :style="{backgroundImage:`url(${videoAll.download_src}?vframe/png/offset/8/w/1280/h/720)`}"
    @click="clickVideo"
  >
    <view class="absolute right0 top0 babotton heichi50 white fon24 widchi75 line-heichi50 text-center " style="border-radius: 0rpx 24rpx 0rpx 24rpx;" >
      集体视频
    </view>
    <view class="absolute left20 bottom60 heichi50 paddingx12 line-heichi50 bayello boradiu50 fon24 white">
      {{"#"+" " +videoAll.data.label}}
    </view>
    <view class="absolute left0 bottom0 heichi50 width-full flex line-heichi50 bapruple white fon20 opcity6"
    style="border-radius: 0rpx 0rpx 24rpx 24rpx;">
      <view class="margleft10 ">
        {{videoAll.data.label}}
      </view>
      <view class="margleft10">
        {{videoAll.goal_time}}
      </view>
    </view>
  </view>
</template>

<script>
  import { mapMutations,mapState } from "vuex"
  export default {
    name:"videoData",
    props: {
      // 当前播放的视频
      videoAll: {
        type: Object,
        default:null
      },
      // 点击全部视频是否播放
      isPlay:{
        type:Boolean,
        default:false
      }
    },
    data() {
      return {
        
      }
    },
    methods: {
      ...mapMutations("m_video",["setCurrentVideo"]),
      // 跳转剪辑视频页面
      clickVideo() {
        console.log("chakan",this.isPlay,typeof(this.isPlay))
        this.setCurrentVideo(this.videoAll)
        if(this.isPlay){
          uni.navigateTo({
            url: "../../pages/video-detail/index"
          })
        }
        else{
          uni.navigateTo({
            url: `../../pages/clip-video/index?name=${this.videoAll.data.record_name}`
          })
        }
      }
    }
  }
</script>

<style lang="scss">
  
</style>

