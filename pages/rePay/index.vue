<template>
  <view class=" background-cover width-full heichi100 flex flex-direction alitem-center"
   style="background-image: url(https://static.qiniuyun.highvenue.cn/image%2FreplayContract.jpg);">
    <view class="heichixu100 widchi50 boradiu20 background-cover margtop30zhi"
    style="background-image: url(https://static.qiniuyun.highvenue.cn/image/record_logo.png);"
    >
      
    </view>
    <view class="margtop120 width70 fon28">
      <view class="fonweight">
        账号名称：{{contractInfo.name}}
      </view>
      <view class="margtop60 relative fonweight">
        <text >账户号码：</text>
        <text class="pruple "
        style="text-decoration: underline;"
        >{{contractInfo.account}}</text>
        <view
         @tap="copyAccount"
         class="absolute flex flex-center white flex-direction text-center translate-50 letter-spacing1 fon20 heichiduan80 widchi40"
         style="right: -20rpx;bottom: -20rpx; border-radius: 0rpx 40rpx 40rpx 40rpx;  background: linear-gradient(to right, #7e70f1 , #1a1640);"
         >
         <view>
           一键
         </view>
         <view>
           复制
         </view>
        </view>
      </view>
      <view class="margtop60 fonweight">
        地址：{{contractInfo.address}}
      </view>
      <view class="margtop60 fonweight">
        联系方式：{{contractInfo.phone_num}}
      </view>
      <view class="margtop60 fonweight">
        开户行：{{contractInfo.bank}}
      </view>
    </view>
    <view class="margtop60 flex flex-direction alitem-center fon24">
      <view class="widchi80 heichixu80 background-cover"
      style="background-image: url(https://static.qiniuyun.highvenue.cn/image%2FofficialAccountCode.png);"
      >
        
      </view>
      <view class="margtop20 fonweight">
        *客服微信
      </view>
      <view class="margtop40 fon24 gray">
        *按照合同打完款后请通知客服人员
      </view>
      <view class="fon24 gray">
        联系方式：{{contractInfo.last_phone_num}}
      </view>
    </view>
  </view>
</template>

<script>
  import { mapState } from "vuex";
  import { getContractInfo } from "@/api/venues.js";
  export default {
    data(){
      return {
        // 具体的合同信息
        contractInfo:null,
      }
    },
    computed:{
      ...mapState("m_device",["deviceInfo"]),
      calHeight(){
        return this.deviceInfo&&(this.deviceInfo.screenHeight)*2 + 'rpx'
      },
    },
    created() {
      this.getInfo();
      console.log("输出设备信息",this.deviceInfo)
    },
    methods:{
      // 获得合同具体得信息
      async getInfo(){
        let {data} = await getContractInfo();
        this.contractInfo = data;
      },
      // 复制账户号码
      copyAccount(){
        var that = this
        wx.setClipboardData({
          data: that.contractInfo.account,
          success (res) {
            wx.getClipboardData({
              success (res) {
                
              }
            })
          }
        })
      },
    },
  }
</script>

<style>
</style>
