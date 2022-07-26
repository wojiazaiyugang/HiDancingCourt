<template>
  <view class="width-full heichi210 boradiu24 background-cover relative marginbottom10"
  :style="{backgroundImage:`url(${videoAll.download_src}?vframe/jpg/offset/8/w/300/h/210)`}"
    @click="clickVideo"
  >
    <view class="absolute right0 top0 babotton heichi60 white fon24 widchi75 line-heichi60 text-center " style="border-radius: 0rpx 24rpx 0rpx 24rpx;" >
      集体视频
    </view>
    <view class="absolute left20 bottom80 heichi60 paddingx12 line-heichi60 bayello boradiu50 fon24">
      #{{" " +videoAll.data.label}}
    </view>
    <view class="absolute left0 bottom0 heichi60 width-full flex line-heichi60 bapruple white fon20"
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

