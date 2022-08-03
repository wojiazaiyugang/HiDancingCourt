<template>
  <view
    class="heichi100 background-cover"
    :style="{backgroundImage:`url(${calBackImg})`}"
  >
    <nvg-bar>
      <template v-slot:icon><text class="iconfont icon-fanhui fon32 white"></text></template>
    </nvg-bar>
    <view v-show="pageStatus=='share'">
      <button
        class="absolute bottom140 left-half translatex-50" 
        type="default" 
        open-type="contact" 
        style="background: transparent;">
        <view class=" black bashare heichiduan90 widchi120 line-heichi90 boradiu50 fonweight text-center fon28 ">
          联系我们
        </view>
      </button>
      <view
        @tap="calConnect"
        class="absolute bottom140 right100 black bashare heichiduan90 widchi45 line-heichi90 text-center fonweight fon28 boradiuoverall">
        电话
      </view>
    </view>
    <view v-show="pageStatus=='login'" class="flex flex-direction alitem-center">
      <view class="margtop35zhi text-center white fon24">
        仅需2步，免费加入舞蹈直拍，为学员带来更好的体验~
      </view>
      <view class=" width80 white marginbottom20 margtop40">
        <text style="color: red;">*</text> 场馆名称
      </view>
      <view 
        style="border: 7rpx solid #4F4995;background:rgba(79,73,149,0.3);"
        class="width80 heichixu85 text-center line-heichi170 boradiu90 fon32 white" >
        <input
          @input="keyInputName"
          class="width-full height-full"
          maxlength="30"
          placeholder="请输入您的场馆名称!"
        />
      </view>
      <view class=" width80 white marginbottom20 margtop40">
        <text style="color: red;">*</text> 联系方式
      </view>
      <view 
        style="border: 7rpx solid #4F4995;background:rgba(79,73,149,0.3);"
        class="width80 heichixu85 text-center line-heichi170 boradiu90 fon32 white" >
        <input
          @input="keyInputNumber"
          class="width-full height-full"
          placeholder="请输入您的手机号!"
        />
      </view>
      <view class="marginbottom20 margtop40 flex heichi40 line-heichi40 alitem-center">
        <view
         @tap="agreePrivacy"
         :class="['heichi30 widchi15 text-center line-heichi30 boradiu8 ',isAgree?'bapruple':'bawhite']">
          <text class="iconfont icon-duihao fon28 white"></text>
        </view>
        <view 
          @tap="agreePrivacy"
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
        @tap="submitApplication"
        class="absolute bottom100 left-half fonweight translatex-50 babotton fon28 widthchi210 heichiduan80 line-heichi80 text-center boradiu50">
        提交申请
      </view>
    </view>
    
  </view>
</template>

<script>
  import { applyBossInfo } from "@/api/venues.js"
  import nvgBar from "@/components/nvgBar"
  export default {
    name: "swiper-info",
    components: {
      nvgBar,
    },
    computed:{
      calBackImg(){
        if(this.pageStatus=="share"){
          return this.shareBackImg
        }
        if(this.pageStatus=="login"){
          return this.loginBackImg
        }
        return ""
      },
    },
    data() {
      return {
        // 转介绍的背景图片
        shareBackImg:"https://static.qiniuyun.highvenue.cn/image/hidancing_zhuanjieshao.jpg",
        // 登陆场馆主的背景图片
        loginBackImg:"https://static.qiniuyun.highvenue.cn/image/hidancing_xainshihuodong.jpg",
        // 联系电话
        connectNumber:18151641785,
        // 点击进来的是转介绍页面还是申请称为场馆主页面,取值为share与login
        pageStatus:"",
        // 是否同意隐私协议等问题
        isAgree:true,
        // 输入的舞蹈房名称
        danceRoom:"",
        // 输入的手机号
        cellPhone:0,
      };
    },
    onLoad(options) {
      this.pageStatus = options.status
    },
    methods:{
      // 输入场馆名字
      keyInputName(data){
        this.danceRoom = data.detail.value
      },
      keyInputNumber(data){
        this.cellPhone = data.detail.value
        console.log("查看手机号",this.cellPhone,typeof(this.cellPhone))
      },
      // 导航用户隐私页面
      navService(){
        uni.navigateTo({
          url: "../service-agreement/index"
        })
      },
      // 导航隐私页面
      navPrivacy() {
        uni.navigateTo({
          url: "../privacy/privacy"
        })
      },
      // 同意隐私以及服务协议
      agreePrivacy(){
        this.isAgree = !this.isAgree
      },
      // 拨打场馆电话
      calConnect() {
        uni.makePhoneCall({
          // 必须是string类型，否则打不通出错
          phoneNumber: String(this.connectNumber),
          success:()=>{
            
          },
          fail: (sss) => {
            this.$showMsg("拨打失败！",2000,"error")
          }
        })
      },
      // 申请称为场馆主
      async submitApplication(){
        if(this.isAgree){
          if(this.danceRoom){
            console.log("查看长度",this.cellPhone.length)
            if(this.cellPhone.length==11){
              await applyBossInfo(this.danceRoom,this.cellPhone).then(value=>{
                if(value.code==0){
                  this.$showMsg("您已成功申请，我们将会在一个工作日内和您取得联系，请您留意手机来电~",2000,"success")
                }
                else{
                  console.log("cuowu")
                }
              })
            }
            else{
              this.$showMsg("请您正确填写您的手机号方便后续的人工审核！",2000)
            }
          }
          else{
            this.$showMsg("请您填写所要申请的舞蹈房的名称！",2000)
          }
        }
        else{
          this.$showMsg("请您查看并同意服务协议以及隐私协议！",2000)
        }
      },
    },
  };
</script>

<style lang="scss">
  button::after {
    border: none;
  }
</style>