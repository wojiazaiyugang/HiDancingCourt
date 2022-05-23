<template>
  <view class="container">
    <view style="padding: 26rpx 26rpx 0 26rpx; margin: 0 auto;display: flex; flex-direction: column; align-items: center;">
      <video class="video" :src="videoInfo.download_src" controls direction="90" autoplay="true"></video>
       <view style="width: 100%;">
         <view class="CourName" @click="list"><text style="font-size: 26rpx;padding-right: 32rpx;">{{videoInfo.venue_name}}</text> <text style="font-size: 24rpx; color: #666;">{{videoInfo.site_name}}</text> <text class="ballType" v-if="ballTypeShow">{{videoInfo.goal_label[0]}}</text></view>
  
         <view class=" public">{{this.videoInfo.goal_time.slice(0,11)}} <text style="padding-left: 20rpx;">{{this.videoInfo.goal_time.slice(11,19)}}</text></view>
         
         <view class="feedback" @click="clickFeedBack">
           <view class="iconfont icon-yijianfankui-tianchong"></view>
           <view class="feedbackText" @click="clickFeedBack">遗漏反馈</view>
         </view>
       </view>
    </view>
    <!-- 视频列表 -->
    <view class="videoList">
      <view class="">视频列表</view>
      <view class="videoPlay"></view>
    </view>
    <view class="" style="padding: 0 26rpx; width: 100%; height: 300rpx; background-size: cover;">
      <image src="https://static.qiniuyun.highvenue.cn/image%2Fbanner.png" style="width: 93%; height: 100%;"></image>
    </view>
    <shopping-car></shopping-car> 
    
  </view>
</template>

<script>
  import {mapState} from 'vuex'
  import { shoppingCar } from '@/components/shopping-car/shopping-car.vue'
  export default {
    data() {
      return {
        orange: false,
        timer: null ,
        ballTypeShow: false
      };
    },
    created() {
      console.log('videoinfo')
      console.log(this.videoInfo)
      if(this.videoInfo.goal_label.length != 0) {
        this.ballTypeShow = true
      }
    },
    computed: {
      ...mapState('m_video',['videoInfo'])
    },
    components: {
      shoppingCar
    },
    methods: {
      list() {
        console.log(this.videoInfo)
      },
      isShow() {
        this.orange = !this.orange
        console.log(this.orange)
      },
      toCart() {
        uni.navigateTo({
          url:'../cart/cart'
        })
      },
       clickFeedBack() {
        if(this.timer) clearTimeout(this.timer)
        this.timer =  setTimeout( async () => {
          const {data} = await uni.$http.post('/feedback/hibas/',
          {
            video_id: this.videoInfo.id,
            venue_id: this.videoInfo.venue_id,
            site_id: this.videoInfo.site_id,
            goal_time: `20${this.videoInfo.goal_time}`
          })
          if(data.data === "反馈成功"){
            Toast.success('反馈成功');
          }
        },300)
      }
    }
  }
</script>

<style lang="scss">
  .public {
    color: #666;
    margin-top: 36rpx;
    font-size: 26rpx;
    
  }
  .container {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    .video {
      width: 100%;
      border-radius: 35rpx;
      margin-bottom: 26rpx;
    }
    .videoList {
      padding: 26rpx 26rpx 0 26rpx;
    }
    .CourName{
      .ballType{
        display: inline-block;
        width: 120rpx;
        height: 43rpx;
        background-color: #5784fe;
        border-radius: 37rpx;
        font-family: -webkit-body;
        margin-left: 30rpx;
        text-align: center;
        line-height: 45rpx;
        color: #fff;
        font-size: 20rpx;
      }
    }
    .feedback {
     position: absolute;
     top: 34%;
     right: 5%;
     text-align: center;
      .icon-fankuitianbao {
        font-size: 60rpx;
      }
      .feedbackText {
        font-size: 25rpx;
        color: #b8b8b8;
      }
    }
    .btn {
      width: 35%;
      height: 79rpx;
      background-image: linear-gradient(to bottom, #f7a216, #fe6205);
      font-size: 31rpx;
      text-align: center;
      border-radius: 50rpx;
      line-height: 79rpx;
      color: #fff;
    }
  }
</style>
