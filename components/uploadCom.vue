<template>
  <view class="marginxy21 bawhite heichixu120 boradiu20">
    <view class="marginx10 flex justify-between alitem-center height-full">
      <view class="flex alitem-center height-full" >
        <view class="bapruple heichiduan80 widchi40 boradiu20 text-center line-heichi80 white marginx10">
          <text class="iconfont icon-zanting fon40"></text>
        </view>
        <view class="boradiu16 bapruple heichiduan80 line-heichi80 flex widchi100 paddingx12 white fon28">
          <view class="width90 ellipsis">
            {{videoName.split("//")[1]}}
          </view>
            /mp4
        </view>
      </view>
      <view 
        @tap="deleteChoose"
        class="pruple">
        <text class="iconfont icon-cha fon40"></text>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    name:"UploadVideos",
    props:{
      videoName:{
        type:String,
        default:"",
      },
    },
    data(){
      return {
        
      }
    },
    computed:{
      
    },
    methods:{
      // 取消上传
      deleteChoose(){
        console.log("删除当前视频",this.videoName)
        this.$emit("deleteVideo",this.videoName)
      },
    },
  }
</script>

<style>
</style>
