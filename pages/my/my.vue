<template>
  <view class="container" style="background-image: url(https://static.qiniuyun.highvenue.cn/image/DanceBgi1.jpg);">
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
      <view class="bannerInfo">
        
      </view>
    </view>
  </view>
</template>

<script>
  import { mapMutations,mapState } from 'vuex'
  import nvgBar from '@/components/nvgBar/nvgBar.vue'
  export default {
    data() {
      return {
        timer: null,
        videoDownload : '',
        isShow:false,
      };
    },
    components: {
      nvgBar,
    },
    computed: {
      ...mapState('m_user',['userinfo',]),
      block() {
        return this.isShow == false ? 'display: block' : 'display: none'
      },
      none() {
        return this.isShow == true ? 'display: block' : 'display: none'
      }
    },
    methods: {
      ...mapMutations('m_user',['updateUserInfo','updateToken','updateIsShow',]),
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
             }
           }
         })
       },
    }
  }
</script>

<style lang="scss">
  @import '@/style/my'
</style>
