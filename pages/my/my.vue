<template>
  <view class="container" style="background-image: url(https://static.qiniuyun.highvenue.cn/image/DanceBGi1.jpg);">
    <!-- 导航栏 -->
    <nvg-bar>
      <template v-slot:icon><text class="iconfont icon-fanhui" style="color: white;font-size: 30rpx;" ></text></template>
      <template v-slot:text><text style="color: white;">个人中心</text></template>
    </nvg-bar>
    <!-- 没信息 -->
    <view v-if="isShow" class="login-container">
      <view class="btn-login" @click="getUserinfo" >一键登录</view>
      <view class="tips-text" @click="agreePrivacy">
        <view style="border: 2rpx solid white;border-radius: 5rpx;height: 30rpx;width: 30rpx;">
          <view v-show="isAgree" class="iconfont icon-duihao" style="color: white; font-size: 30rpx;" ></view>
        </view>
        <view style="color: white;margin-left: 50rpx;">
          登录需同意
        </view>
        <view style="color: red;margin-left: 20rpx;" @click="navPrivacy">
          《用户协议及隐私政策》
        </view>
      </view>
    </view>
   <!-- 有信息 -->
   <view v-if="!isShow" class="box">
     <!-- 头像 -->
      <view class="userInfo" >
        <view v-if="userInfo" class="flex">
          <image class="avatar flex" :src="userInfo.avatarUrl">
          </image>
          </image>
          <text class="userName ellipsis" style="color: white;"  v-if="userInfo">{{"ID:"+userInfo.nickName}}</text>
        </view>
        <view class="flex" v-else>
          <view @click="reLogin" class="avatar flex" style="background-color: #3C3C3C;">
            <image style="background-color: #3C3C3C;height: 70rpx;width: 70rpx;background-size: cover;" src="https://static.qiniuyun.highvenue.cn/image/DanceAvatar.png">
          </view>
          <text class="userName" style="color: #3C3C3C;font-weight: 550;">请点击头像重新登录！</text>
        </view>
        <view class="right">
          <button type="default" open-type="contact" style="background: transparent; border: none!important;">
            <view style="width: 34rpx;height: 36rpx;background-size: cover; background-image: url(https://static.qiniuyun.highvenue.cn/image/DanceCustomer.png);">
              
            </view>
          </button>
          <view class="setting">
            <image
            @click="settings"
            src="https://static.qiniuyun.highvenue.cn/image/DanceSetting.png" 
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
        // 是否显示获得个人信息页面
        isShow:true,
        // 是否同意隐私协议
        isAgree:false,
      };
    },
    components: {
      nvgBar,
    },
    computed: {
      ...mapState('m_user',["userInfo",]),
    },
    created() {
      this.calShowPrivacy()
      console.log(this.userInfo)
    },
    methods: {
      ...mapMutations('m_user',["setUserInfo"]),
      // 拒绝授权之后重新登陆
      reLogin(){
        this.isAgree = true
        this.getUserinfo()
      },
      // 是否显示登录页面
      calShowPrivacy(){
        if(wx.getStorageSync("date")){
          // 将信息存储在本地，30天重新拿一次头像信息
          var date = new Date()
          // 当前时间戳
          var currentTime = this.$dayjs(date).format("YYYY-MM-DD")
          // 上一次点击信息登录的时间戳
          var historyTime = this.$dayjs(wx.getStorageSync("date")).format("YYYY-MM-DD")
          // 30天重新登陆一下，拿取头像以及名字信息进行更新
          var timeDifference = (Date.parse(currentTime) - Date.parse(historyTime))/(1 * 24 * 60 * 60 * 1000)
          if (timeDifference>=30) {
            this.isShow = true
          }
          else{
            this.isShow = false
          }
        }
      },
      // 同意隐私协议
      agreePrivacy(){
        this.isAgree = !this.isAgree
      },
      // 打开设置页面
      settings() {
        wx.openSetting({
          success (res) {
          }
        })
      },
      // 导航隐私页面
      navPrivacy() {
        uni.navigateTo({
          url: '../privacy/privacy'
        })
      },
      // 点击登陆获得个人信息页面
      async getUserinfo() {
        if(this.isAgree){
          wx.getUserProfile({
            lang: 'zh_CN',
            desc: '用于完善用户资料',
            success: async (res) => {
              let date = new Date()
              wx.setStorageSync("date",date)
              this.setUserInfo(res.userInfo)
              this.isShow = false
              await uni.$http.post("/users/info/",{data:res.userInfo,applet: "HiDancing"})
            },
            fail: error => {
              this.isShow = false
              uni.$showMsg("为了保证用户您信息更新的即时性，请同意授权！")
            }
          })
        }
        else{
          uni.$showMsg("请您同意用户隐私协议！")
        }
      },
    }
  }
</script>

<style lang="scss">
  @import '@/style/my'
</style>
