<template>
  <view class="container width-full background-cover">
    <!-- 导航栏 -->
    <nvg-bar>
      <template v-slot:icon><text class="iconfont icon-fanhui fon32 white"></text></template>
      <template v-slot:text><text class="white">个人中心</text></template>
    </nvg-bar>
    <!-- 没信息 -->
    <view v-if="isShow" class="flex flex-center height-full flex-direction">
      <view class="btn-login fonweight" @click="loginUserinfo" >一键登录</view>
      <view class="tips-text flex flex-center white fon28" @click="agreePrivacy">
        <view style="border: 2rpx solid white;border-radius: 5rpx;height: 30rpx;width: 30rpx;">
          <view v-show="isAgree" class="iconfont icon-duihao white fon32" ></view>
        </view>
        <view class="white" style="margin-left: 50rpx;">
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
      <view class="userInfo flex flex-center" >
        <view v-if="userInfo" class="flex flex-center">
          <image class="avatar flex flex-center" :src="selfAvatar?selfAvatar:userInfo.data.open_data.avatarUrl">
          </image>
          
          <text class="userName ellipsis white"  v-if="userInfo">{{"ID: "+(selfName?selfName:userInfo.data.open_data.nickName)}}</text>
        </view>
        <view class="flex flex-center" v-else>
          <view @click="reLogin" class="avatar flex flex-center bamyava" >
            <image class="bamyava background-cover" style="height: 70rpx;width: 70rpx;" src="https://static.qiniuyun.highvenue.cn/image/DanceAvatar.png">
          </view>
          <text class="userName fonweight" style="color: #3C3C3C;">请点击头像重新登录！</text>
        </view>
        <view class="right flex flex-center">
          <button type="default" open-type="contact" style="background: transparent; border: none!important;">
            <view class="background-cover" style="width: 34rpx;height: 36rpx; background-image: url(https://static.qiniuyun.highvenue.cn/image/DanceCustomer.png);">
              
            </view>
          </button>
          <view class="setting">
            <image
            class="height-full width-full"
            @click="settings"
            src="https://static.qiniuyun.highvenue.cn/image/DanceSetting.png" ></image>
          </view>
        </view>
      </view>
      
      <view class="bannerInfo background-cover">
        
      </view>
    </view>
  </view>
</template>

<script>
  import { mapMutations,mapState } from "vuex"
  import { updateInfo } from "@/api/user.js"
  import nvgBar from "@/components/nvgBar"
  export default {
    data() {
      return {
        // 是否显示获得个人信息页面
        isShow:true,
        // 是否同意隐私协议
        isAgree:false,
        // 个人头像
        selfAvatar:"",
        // 个人名字
        selfName:"",
      };
    },
    components: {
      nvgBar,
    },
    computed: {
      ...mapState("m_user",["userInfo",]),
    },
    created() {
      this.calShowPrivacy()
      console.log("查看信息",this.userInfo)
    },
    methods: {
      ...mapMutations('m_user',["setUserInfo"]),
      // 拒绝授权之后重新登陆
      reLogin(){
        this.isAgree = true
        this.loginUserinfo()
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
      async loginUserinfo() {
        if(this.isAgree){
          wx.getUserProfile({
            lang: "zh_CN",
            desc: "用于完善用户资料",
            success: async (res) => {
              let date = new Date()
              wx.setStorageSync("date",date)
              let tempInfo = this.userInfo
              tempInfo.data.open_data = res.userInfo
              this.setUserInfo(tempInfo)
              this.selfAvatar = res.userInfo.avatarUrl
              this.selfName = res.userInfo.nickName
              this.isShow = false
              await updateInfo({data:res.userInfo})
            },
            fail: error => {
              this.isShow = false
              this.$showMsg("为了保证用户您信息更新的即时性，请同意授权！",2000)
            }
          })
        }
        else{
          this.$showMsg("请您同意用户隐私协议！")
        }
      },
    }
  }
</script>

<style lang="scss">
  @import "@/static/style/my"
</style>
