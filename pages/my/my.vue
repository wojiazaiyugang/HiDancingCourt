<template>
  <view class="heichi100 width-full background-cover" style="background-image: url(https://static.qiniuyun.highvenue.cn/image/DanceBGi1.jpg);">
    <!-- 导航栏 -->
    <nvg-bar>
      <template v-slot:icon><text class="iconfont icon-fanhui fon32 white"></text></template>
      <template v-slot:text><text class="white">个人中心</text></template>
    </nvg-bar>
    <!-- 没信息 -->
    <view v-if="isShow" class="flex flex-center height-full flex-direction">
      <view v-show="userAuthorization" class="btn-login width90 heichixu100 boradiu50 text-center fon36 line-heichi100 babotton fonweight" 
      @click="loginUserinfo" >头像信息授权</view>
      <view v-show="!userAuthorization" class="btn-login width90 heichixu100 boradiu50 text-center fon36 line-heichi100 babotton fonweight" >
        <button
        class="btn-login width90 heichixu100 boradiu50 text-center fon36 line-heichi100 babotton fonweight"
        open-type="getPhoneNumber" @getphonenumber="openAuthority"
         >短信通知授权</button>
      </view>
      <view class="margtop50 flex flex-center white fon28" @click="agreePrivacy">
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
    <view v-if="!isShow" class="paddingx12">
     <!-- 头像 -->
      <view class="margtop40 flex flex-center" >
        <view v-if="userInfo" class="flex relative widthchi300 alitem-center">
          <image class=" heichixu85 widchi85 boradiu90 background-cover flex flex-center" style="border: 4rpx solid #7C6DFB;" :src="selfAvatar?selfAvatar:userInfo.data.open_data.avatarUrl">

          </image>
          <view class="margleft25 "  v-if="userInfo">
            <view class="flex">
              <view class="white fonweight heichi50 line-heichi50 widchi85 ellipsis letter-spacing1">
                {{(selfName?selfName:userInfo.data.open_data.nickName)}}
              </view>
              <view v-show="isMaster" class="margleft10 fon24 widchi85 heichi50 line-heichi50 vipcolor vipback text-center"
              style="border-radius: 0rpx 30rpx 30rpx 30rpx;">
                VIP管理员
              </view>
            </view>
<!--           <view v-show="isMaster" class="white margtop20">
              时间
            </view> -->
          </view>
          <view v-show="isMaster"
          @tap="chengeCourt"
           style="margin-left: 4rpx;"
           class="absolute left0 bottom0 flex widchi85 text-center fon24 boradiu12 letter-spacing1 vipcolor vipback line-heichi60 heichi60" >
            <view class="ellipsis margleft5">
              {{currentName}}
            </view>
            <view class="widchi15 height-full marginx5">
              <image src="https://static.qiniuyun.highvenue.cn/image/switch.png"
               mode="aspectFit"
               class="widchi15 height-full"></image >
            </view>
          </view>
        </view>
        <view class="flex flex-center" v-else>
          <view @click="reLogin" class="avatar flex flex-center bamyava" >
            <image class="bamyava background-cover" style="height: 70rpx;width: 70rpx;" src="https://static.qiniuyun.highvenue.cn/image/DanceAvatar.png">
          </view>
          <text class="margleft25 widchi160 fonweight" style="color: #3C3C3C;">请点击头像重新登录！</text>
        </view>
        <view class="widchi75 flex flex-center">
          <button type="default" open-type="contact" style="background: transparent; border: none!important;">
            <view class="background-cover widchi17 heichi36" style="background-image: url(https://static.qiniuyun.highvenue.cn/image/DanceCustomer.png);">
              
            </view>
          </button>
          <view class="widchi17 heichi36">
            <image
            class="height-full width-full"
            @click="settings"
            src="https://static.qiniuyun.highvenue.cn/image/DanceSetting.png" ></image>
          </view>
        </view>
      </view>
      <view v-show="isMaster" class="heichi50 flex margtop50" >
        <view class="height-full widchi6  boradiu8" style="background-color: #7C6DFB;">
          
        </view>
        <view class="margleft10 white fonweight fon36">
          今日密码
        </view>
      </view>
      <view v-show="isMaster"
      @tap="navCoupons"
      style="border-radius: 50rpx 0rpx 0rpx 50rpx; transform: translateY(-100rpx);"
      class="absolute right0  white bapruple heichiduan80 line-heichi80 text-center widchi100">
        优惠券
      </view>
      <view v-show="isMaster" class="heichixu85 boradiu90 relative" 
      style="border: 4rpx solid #7C6DFB; margin: 40rpx 48rpx 0rpx 48rpx;">
        <view class=" height-full width-full boradiu90" style="opacity: 0.3; background-color: #7C6DFB;">
          
        </view>
        <view class=" height-full width-full absolute left0 top0 boradiu90 flex alitem-center justify-around">
          <view class="heichixu100 widchi50 fonweight fon40 boradiuoverall line-heichi100 text-center vipcolor vipback" 
          v-for="(item,index) in bossInviteCode"
          :key="index">
            {{item}}
          </view>
        </view>
        <view
         @tap="confirmCopy"
         class="absolute right0 bottom0 flex flex-center flex-direction text-center translate-50 letter-spacing1 vipcolor vipback fon24 heichiduan80 widchi40"
         style="border-radius: 0rpx 40rpx 40rpx 40rpx;"
         >
         <view>
           一键
         </view>
         <view>
           复制
         </view>
        </view>
      </view>
      <view v-show="isMaster" class="text-center width-full margtop20 gray fon20">
        *快去分享给学员让他们查看自己的专属C位视频吧~
      </view>
      <view v-show="!isMaster" class="flex flex-direction alitem-center" >
         <view
         @tap="navApply"
          style="border: 7rpx solid #4F4995;background:rgba(79,73,149,0.3);"
          class="margtop60 fonweight text-center fon36 heichixu100 pruple widchi150 boradiu50 line-heichi100">
           限时活动
         </view>
         <view class="margtop30 white bapruple fon24 heichi50 line-heichi50 width70 text-center boradiu30">
           舞蹈工作室免费上线HiDancing小程序
         </view>
         <view 
           @tap="navApply"
           class="margtop30 heichi240 background-cover width-full" style="background-image: url(https://static.qiniuyun.highvenue.cn/image/hidancing_wode.png);">
           
         </view>
      </view>
    </view>
    <uni-popup ref="popupCourt" :safeArea="false" :mask-click="false">
      <van-picker 
       show-toolbar
       cancel-button-text="请选择您的另一家舞蹈房"
       confirm-button-text="确认"
       active-class="selectStyle"
       :isRecently="true"
       toolbar-class="changeToolbar"
       @confirm="confirmCourt"
       @change="selectCourt"
       :columns="columnsCourts" item-height="40"/>
    </uni-popup>
  </view>
</template>

<script>
  import { mapMutations,mapState } from "vuex"
  import { updateInfo, getPhone } from "@/api/user.js"
  import { getPassword, getIsBoss } from "@/api/venues.js"
  import nvgBar from "@/components/nvgBar"
  export default {
    data() {
      return {
        // 是否显示获得个人信息页面
        isShow:false,
        // 是否同意隐私协议
        isAgree:true,
        // 个人头像
        selfAvatar:"",
        // 个人名字
        selfName:"",
        // 防止多次点击状态量
        stopClicks:true,
        // 是否是场馆主
        isMaster:false,
        // 场馆主的邀请码
        bossInviteCode:"",
        // 头像信息授权与电话授权的标志
        userAuthorization:true,
        // 场馆主所有的场馆名字
        columnsCourts:[],
        // 当前显示场馆的相关信息
        currentName:"",
        // 当前场馆的ID
        currentId:0,
        // 场馆主所有的场馆ID
        columnsIds:[],
      };
    },
    components: {
      nvgBar,
    },
    computed: {
      ...mapState("m_user",["userInfo",]),
    },
    created() {
      // this.calShowPrivacy()
      this.selectBoss()
    },
    methods: {
      ...mapMutations("m_user",["setUserInfo"]),
      // 点击优惠券
      navCoupons(){
        uni.navigateTo({
          url:`../coupons/index`
        })
      },
      // 首页两个banner图点击跳转
      navApply(){
        uni.navigateTo({
          url: `../swiper-index/index?status=login`,
        })
      },
      // 重新选择场馆
      async confirmCourt(){
        let {data} = await getPassword(this.currentId)
        this.bossInviteCode = String(data.invite_code)
        this.$refs.popupCourt.close()
      },
      // 滑动条改变时的选择
      selectCourt(data){
        this.currentName = data.detail.value
        this.currentId = this.columnsIds[this.columnsCourts.indexOf(this.currentName)]
      },
      // 多个场馆主切换舞蹈房
      chengeCourt(){
        this.$refs.popupCourt.open("bottom")
      },
      // 赋值用户的账号密码
      confirmCopy(){
        var that = this
        wx.setClipboardData({
          data: that.bossInviteCode,
          success (res) {
            wx.getClipboardData({
              success (res) {
                console.log(res.data) // data
              }
            })
          }
        })
      },
      // 查看该用户是否是场馆老板
      async selectBoss(){
        await getIsBoss().then(async value=>{
          if(value.data.length!=0){
            this.isMaster = true
            this.columnsCourts = value.data.map(item=>{
              return item.name
            })
            this.columnsIds = value.data.map(item=>{
              return item.id
            })
            this.currentName = value.data[0].name
            this.currentId = this.columnsIds[0]
            let {data} = await getPassword(value.data[0].id)
            this.bossInviteCode = String(data.invite_code)
          }
        })
      },
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
          this.userAuthorization = wx.getStorageSync("info")?false:true
          this.isShow = timeDifference>=30?true:false
        }
        else{
          this.userAuthorization = wx.getStorageSync("info")?false:true
          this.isShow = true
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
          url: "../privacy/privacy"
        })
      },
      // 点击登陆获得个人信息页面
      async loginUserinfo() {
        if(!this.stopClicks){
          return false
        }
        this.stopClicks = false
        var that = this
        if(this.isAgree){
          wx.getUserProfile({
            lang: "zh_CN",
            desc: "用于完善用户资料",
            success: async (res) => {
              wx.setStorageSync("info","yes")
              this.userAuthorization = false
              this.stopClicks = true
              let tempInfo = this.userInfo
              tempInfo.data.open_data = res.userInfo
              this.setUserInfo(tempInfo)
              this.selfAvatar = res.userInfo.avatarUrl
              this.selfName = res.userInfo.nickName
              await updateInfo({data:res.userInfo})
            },
            fail: error => {
              this.userAuthorization = false
              this.$showMsg("为了保证用户您信息更新的即时性，请同意授权！",2000)
            }
          })
        }
        else{
          this.stopClicks = true
          this.$showMsg("请您同意用户隐私协议！")
        }
      },
      // 打开手机号
      async openAuthority(e){
        console.log("是否同意",this.isAgree)
        if(this.isAgree){
          if(e.detail.errMsg == "getPhoneNumber:ok") {
            // 用户点击同意获取电话
            if(e.detail.code){
              let date = new Date()
              wx.setStorageSync("date",date)
              this.isShow = false
              await getPhone(e.detail.code)
            }
          }
          if(e.detail.errMsg == "getPhoneNumber:fail user deny"){
            this.isShow = false
            this.$showMsg("为了获取数据信息，请您同意授权！")
          }
        }
        else{
          this.$showMsg("请您同意用户隐私协议！")
        }
      },
    }
  }
</script>

<style lang="scss">
  @import "@/static/style/vantprop";
</style>
