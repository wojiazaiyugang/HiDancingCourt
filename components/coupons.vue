<template>
  <view class="heichishi110 marginxy10 bamyava boradiu12 relative flex" >
    <view class="width30 flex flex-direction flex-center relative"
      style="border-right: 2rpx dashed white;"
      >
      <view class="pruple fon50 heichi60 line-heichi60">
        免费
      </view>
      <view 
        @tap="useCoupons"
        :class="['margtop20 width70 heichi40 line-heichi40 fon28 white text-center boradiu8',isUse?'bacamerout':'bapruple']" >
        {{isUse?"已使用":"立即使用"}}
      </view>
      <view class="absolute top0 right0 heichi20 widchiyuan20 boradiuoverall bawhite translateyx-50">
        
      </view>
      <view class="absolute bottom0 right0 heichi20 widchiyuan20 boradiuoverall bawhite translate-50">
        
      </view>
    </view>
    <view class="width70 flex flex-direction justify-center " >
      <view class="white fon40 heichi60 line-heichi60" 
      style="margin: 0rpx 0rpx 20rpx 20rpx;">
        新场馆七天体验券
      </view>
      <view class="fon20 gray margleft10 heichi40 line-heichi40" >
        说明：上线7天内免费使用舞蹈直拍剪辑服务
      </view>
    </view>
    
    <view class="absolute top20 right20 heichi70 widchi35 background-cover boradiu12"
     style="background-image: url(https://static.qiniuyun.highvenue.cn/image/record_logo.png);">
      
    </view>
  </view>
</template>

<script>
  import { applyCoupons, checkoutCoupons, } from "@/api/venues.js"
  export default {
    props:{
      venueId:{
        type:Number,
        default:0,
      }
    },
    data(){
      return {
        // 优惠券使用与否的标志
        isUse:false,
        
      }
    },
    computed:{
      
    },
    mounted() {
      this.checkoutTime()
    },
    methods:{
      // 检查优惠券是否使用过期
      async checkoutTime(){
        await checkoutCoupons(this.venueId).then(value=>{
          if(value.code==0){
            this.isUse = true
          }
          if(value.code==-1){
            this.isUse = false
          }
        })
      },
      // 使用优惠券
      async useCoupons(){
        if(this.isUse){
          this.$showMsg("优惠券已使用，请勿再次使用！",3000,"error")
          return false
        }
        await applyCoupons(this.venueId).then(value=>{
          if(value.code==0){
            this.isUse = !this.isUse
            this.$showMsg("您已成功使用新场馆七天体验券，七天之内免费使用舞蹈直拍剪辑服务~",3000,"success")
          }
          else{
            this.$showMsg("使用优惠券失败，请联系工作人员！",3000,"error")
          }
        })
        console.log("使用优惠券")
      },
    },
  }
</script>

<style lang="less">
</style>
