<template>
  <view class="container" style="background-image: url(https://static.qiniuyun.highvenue.cn/image/hibascourt_images/bgi.png);">
    <!-- 导航栏 -->
        <nvg-bar>
          <template v-slot:text><text>个人中心</text></template>
        </nvg-bar>
    
    <!-- 没信息 -->
    <view  class="login-container" :style="none">
      <view class="login-in">
        <button type="primary" class="btn-login" @click="getUserinfo" >一键登录</button>
        <view class="tips-text">登录需同意<text style="color: red;" @click="go">《用户协议及隐私政策》</text></view>
      </view>
    </view>
   
   <!-- 有信息 -->
   <view class="box" :style="block">
     <!-- 头像 -->
       <view class="userInfo" >
           <view class="flex">
             <image class="avatar flex" :src="userinfo.avatarUrl">
             </image>
             <text class="id" style="color: #fff;">ID:{{userinfo.nickName}}</text>
           </view>
           
           <view class="right">
             <button type="default" open-type="contact" style="background: transparent; border: none!important;"><view class="iconfont icon-kefu"></view></button>
             <view class="setting">
               <image
               @click="settings"
               src="https://static.qiniuyun.highvenue.cn/image/hibascourt_images/settings.png" 
               style="width: 100%; height: 100%;"></image>
             </view>
           </view>
       </view>
         
         <!-- 我的下载 -->
       <long-button>
         <template v-slot:icon>
           <image src="https://static.qiniuyun.highvenue.cn/image/hibascourt_images/download.png"  style="width: 60%; height: 60%;"></image>
         </template>
         <template v-slot:first-text>
           <text>我的下载</text>
         </template>
         <template v-slot:second-text>
           <text>已下载{{videoDownloadNum}}个视频</text>
         </template>
         <template v-slot:i-choose>
           <view class="iconfont icon-jiantou" @click="toDownLoad">
           </view>
         </template>
       </long-button>
          <!-- 优惠券 -->
       <view class="coupons">
         <long-button>
           <template v-slot:icon>
             <image src="https://static.qiniuyun.highvenue.cn/image/hibascourt_images/coupons.png"  style="width: 60%; height: 55%;"></image>
          </template>
          <template v-slot:first-text>
            <text style="padding-right: 90rpx;">优惠券</text>
          </template>
          <template v-slot:second-text>
            <text>0张优惠券</text>
          </template>
          <template v-slot:i-choose>
            <view class="iconfont icon-jiantou"></view>
          </template>
         </long-button>
       </view>
       <!-- 购物车 -->
         
           <shoppingCar></shoppingCar>
    </view>
  </view>
</template>

<script>
import { mapMutations,mapState } from 'vuex'
 import nvgBar from '@/components/nvgBar/nvgBar.vue'
 import shoppingCar from '@/components/shopping-car/shopping-car.vue'
  export default {
    data() {
      return {
        timer: null,
        videoDownload : '',
      };
    },
    components: {
      nvgBar,
      shoppingCar
    },
    computed: {
      ...mapState('m_user',['userinfo','isShow','videoDownloadNum']),
      block() {
        return this.isShow == false ? 'display: block' : 'display: none'
      },
      none() {
        return this.isShow == true ? 'display: block' : 'display: none'
      }
    },
    methods: {
      ...mapMutations('m_user',['updateUserInfo','updateToken','updateIsShow','updateVideoDownloadNum']),
      settings() {
        wx.openSetting({
          success (res) {
          }
        })
      },
      go() {
        wx.navigateTo({
          url: '../privacy/privacy'
        })
      },
      last() {
        uni.navigateBack({
          delta: 3
        })
      },
   async getUserinfo() {
         wx.getUserProfile({
           lang: 'zh_CN',
           desc: '用于完善用户资料',
           success: res => {
               if(res.errMsg === 'getUserProfile:fail auth deny'){
                 uni.$showMsg('您取消了授权')
               } else {
                 // 将用户信息存在vuex
                 this.updateUserInfo(res.userInfo)
                 this.updateIsShow()
                 // 获取登录成功的Token
                 // this.getToken()
               }
           }
         })
         const {data} = await uni.$http.get(`/users/hibas/21772/info`)
         this.updateVideoDownloadNum(data.data.download_video_count)
         
       },
       toDownLoad() {
         uni.navigateTo({
           url: '../downLoad/downLoad'
         })
       }
    }
  }
</script>

<style lang="scss">
  @import '@/style/my'
</style>
