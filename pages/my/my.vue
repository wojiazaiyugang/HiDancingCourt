<template>
  <view 
    :style="{height:calHeight}"
    class=" width-full background-cover" style="background-image: url(https://static.qiniuyun.highvenue.cn/image/DanceBGi1.jpg);">
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
    <view v-if="!isShow" class="paddingx12 height-full">
     <!-- 头像 -->
      <view class="margtop40 flex flex-center" >
        <view v-if="userInfo" class="flex relative width-full alitem-center heichixu85">
          <image class=" height-full widchi85 boradiu90 background-cover flex flex-center" style="border: 4rpx solid #7C6DFB;" :src="selfAvatar?selfAvatar:userInfo.data.open_data.avatarUrl">

          </image>
          <view class="margleft25 " v-if="userInfo">
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
           class="absolute left0 bottom0 translatey50 flex widchi85 text-center fon24 boradiu12 letter-spacing1 vipcolor vipback line-heichi60 heichi60" >
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
        <view class="height-full widchi6  boradiu8 bapruple">
          
        </view>
        <view class="margleft10 white fonweight fon36">
          今日密码
        </view>
      </view>
      <view v-show="isMaster"
        @tap="navCoupons"
        style="border-radius: 50rpx 0rpx 0rpx 50rpx; transform: translateY(-100rpx);"
        class="absolute right0 flex alitem-center white bapruple heichiduan80 line-heichi80 text-center widchi100">
        <view class="flex flex-center heichi60 widchi30 bawhite boradiuoverall margright20 margleft10">
          <text class="iconfont icon-youhuiquan fon36 pruple"></text>
        </view>
        <view>
          优惠券
        </view>
      </view>
      <view v-show="isMaster" class="height-10 boradiu90 relative" 
      style="border: 4rpx solid #7C6DFB; margin: 40rpx 48rpx 0rpx 48rpx;">
        <view class=" height-full width-full boradiu90 bapruple opcity3">
          
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
      <view v-show="isMaster" class="heichi50 flex margtop30" >
        <view class="height-full widchi6  boradiu8 bapruple" >
          
        </view>
        <view class="margleft10 white fonweight fon36">
          我的余额
        </view>
      </view>
      <view v-show="isMaster" 
        style="border: 4rpx dashed #4F4995;background:rgba(79,73,149,0.3);"
        class="height-12 margtop30 width-full flex flex-direction alitem-center " >
        <view class="height-20 margtop10">
          <text class="iconfont icon-jinbi fon36 gray"></text>
        </view>
        <view class="height-20 moneycolor fon40 ">
          {{bossMoney}}
        </view>
        <view class="height-20 fon24 gray margtop10">
          我的余额（元）
        </view>
        <view class="height-20 flex justify-around width95 alitem-center line-hei20 margtop10"
          style="border-top: 2rpx solid #7E70F1; "
          >
          <view 
            @tap="navConsum('充值记录')"
            class="moneycolor fon24 margtop10">
            <text class="iconfont icon-weibiaoti1 fon28 margright10"></text>
            充值记录
          </view>
          <view class="height-full widchi2 margtop10 boradiu8 bapruple">
            
          </view>
          <view
            @tap="navConsum('消费记录')"
            class="moneycolor fon24 margtop10">
            <text class="iconfont icon-wj-cznr fon28 margright10"></text>
            消费记录
          </view>
        </view>
      </view>
      <view v-show="isMaster" class="heichi50 flex margtop30" >
        <view class="height-full widchi6  boradiu8 bapruple">
          
        </view>
        <view class="margleft10 white fonweight fon36">
          余额充值
        </view>
      </view>
      <view v-show="isMaster" class="height-8 flex margtop30 justify-between alitem-center" >
        <view 
        @tap="selectType"
        class="height-full width30 flex flex-center boradiu8 moneycolor fon40" 
        style="border: 4rpx solid #4F4995;background:rgba(79,73,149,0.3);">
          <text class="fon28">￥</text>{{dancPrice.level_one/100}}
        </view>
        <view 
        @tap="selectType"
        class="height-full width30 flex flex-center boradiu8 moneycolor fon40 relative "
        style="border: 4rpx solid #4F4995;background:rgba(79,73,149,0.3);">
          <text class="fon28">￥</text>{{dancPrice.level_two/100}}
          <view 
            style="border-radius: 8rpx 0rpx 8rpx 0rpx;"
            class="absolute top0 left0 fon20 vipback vipcolor heichi30 widchi30 line-heichi30 text-center">
            推荐
          </view>
          <view 
            style="border-radius: 8rpx 0rpx 8rpx 0rpx;"
            class="absolute bottom0 right0 heichi30 widchi50 fon20 line-heichi30 text-center white bapruple">
            送{{dancPrice.level_two_handsel/100}}元
          </view>
        </view>
        <view 
        @tap="selectType"
        class="height-full width30 flex flex-center boradiu8 moneycolor fon40 relative"
        style="border: 4rpx solid #4F4995;background:rgba(79,73,149,0.3);">
          <text class="fon28">￥</text>{{dancPrice.level_three/100}}
          <view 
            style="border-radius: 8rpx 0rpx 8rpx 0rpx;"
            class="absolute top0 left0 vipback fon20 vipcolor heichi30 widchi30 line-heichi30 text-center">
            划算
          </view>
          <view 
            style="border-radius: 8rpx 0rpx 8rpx 0rpx;"
            class="absolute bottom0 right0 heichi30 widchi50 fon20 line-heichi30 text-center white bapruple">
            送{{dancPrice.level_three_handsel/100}}元
          </view>
        </view>
      </view>
      <view v-show="isMaster" class="flex justify-center margtop20 flex heichi40 line-heichi40 alitem-center">
        <view
         @tap="confirmPrivacy"
         :class="['heichi30 widchi15 text-center line-heichi30 boradiu8 ',isConfirm?'bapruple':'bawhite']">
          <text class="iconfont icon-duihao fon28 white"></text>
        </view>
        <view 
          @tap="confirmPrivacy"
          class="white fon20 margleft5">
          我已经阅读并同意
        </view>
        <view 
           @tap="navService"
          class="pruple fon20 margleft5">
          《舞蹈直拍服务协议》、
        </view>
        <view 
          @tap="navPrivacy"
          class="pruple fon20 ">
          《隐私协议》
        </view>
      </view>
      <view
        v-show="isMaster"
        @tap="openBoss"
        class="absolute bottom30 left-half fonweight translatex-50 babotton fon28 widthchi210 heichiduan80 line-heichi80 text-center boradiu50">
        立即开通
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
  import { getPrices, getBalance } from "@/api/pay.js"
  import nvgBar from "@/components/nvgBar"
  export default {
    data() {
      return {
        // 是否显示获得个人信息页面
        isShow:false,
        // 是否同意隐私协议
        isAgree:true,
        // 充值时同意的隐私协议
        isConfirm:true,
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
        // 场馆主所有的金额
        bossMoney:0,
        // 舞蹈房充值的价格
        dancPrice:null,
      };
    },
    components: {
      nvgBar,
    },
    computed: {
      ...mapState("m_user",["userInfo",]),
      ...mapState("m_device",["deviceInfo"]),
      calHeight(){
        return this.deviceInfo&&this.deviceInfo.screenHeight + 'px'
      },
    },
    created() {
      // this.calShowPrivacy()
      this.selectBoss()
      this.getCharge()
    },
    methods: {
      ...mapMutations("m_user",["setUserInfo"]),
      // 点击优惠券
      navCoupons(){
        uni.navigateTo({
          url:`../coupons/index?venue_id=${this.currentId}`
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
        let value = await getBalance(this.currentId)
        this.bossMoney = value.data.surplus_amount/100
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
            let tempData = await getBalance(this.currentId)
            console.log("查看",tempData)
            this.bossMoney = tempData.data.surplus_amount/100
          }
        })
      },
      // 获得充值的价格
      async getCharge(){
        let {data} = await getPrices()
        this.dancPrice = data
        console.log("价格",data)
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
      // 付费同意隐私协议
      confirmPrivacy(){
        this.isConfirm = !this.isConfirm
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
      // 导航服务协议
      navService(){
        uni.navigateTo({
          url: "../service-agreement/index"
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
      // 导航到账单流水页面
      navConsum(data){
        console.log("输出查看",data)
        uni.navigateTo({
          url: `../boss-money/index?title=${data}&courtId=${this.currentId}`
        })
      },
      // 充值开通
      async openBoss(){
        console.log("充值")
      },
      // 选择充值的类型
      selectType(){
        console.log("充值类型")
      },
    }
  }
</script>

<style lang="scss">
  @import "@/static/style/vantprop";
  button::after{
    display: none;
  }
</style>
