<template>
  <view class="ba-f7"
    :style="{height:calHeight}"
    >
    <view class="flex justify-around heichixu100 fon28 gray alitem-center">
      <view 
        v-for="(item,index) in textList"
        @tap="changeType(index)"
        :key="index"
        :class="currentType==index?'black typeColor boradiu16':''"
        >
        {{item}}
      </view>
    </view>
    <scroll-view
      class="width-full height-full "
      :scroll-y="true"
      >
      <view v-if="clipArray.length!=0">
        <view v-for="(item,index) in 15"
          :key="index">
          <clipCom>
            
          </clipCom>
        </view>
      </view>
      <view 
      v-else
      class="absolute left-half translatex-50 top100 width60 height-30 text-center" >
        <view 
          style="background-image: url(https://static.qiniuyun.highvenue.cn/image%2Fnoclipingvideos.png);"
          class="width-full height-80 background-cover">
          
        </view>
        <view class="fon28 gray margtop20">
          暂无记录~
        </view>
      </view>
      <view class="heichifan200">
        
      </view>
    </scroll-view>
    <view class="bawhite width-full heichixu85 absolute bottom0 flex justify-center alitem-center">
      <view
        @tap="openOrUpload"
        class="line-heichi80 heichiduan80  text-center boradiu50 white bapruple width60 ">
        <text class="iconfont icon-shangchuan fon36 margright10 fonweight"></text>
        <text>上传新视频</text>
      </view>
    </view>
  </view>
</template>

<script>
  import { mapState, mapMutations } from "vuex";
  import qiniuUploader from "@/plugins/qiniuUploader.js";
  import { getQiNiuToken } from "@/api/video.js";
  import clipCom from "@/components/clipCom.vue";
  import uploadCom from "@/components/uploadCom.vue";
  import nvgBar from "@/components/nvgBar";
  export default {
    components:{
      nvgBar,
      clipCom,
      uploadCom,
    },
    data(){
      return {
        // 导航栏的背景色
        navColor:"bawhite",
        // 当前是否有有上传处理的视频
        isClipping:true,
        // 待剪辑处理的数组
        clipArray:[],
        // 剪辑文字筛选
        textList:["等待剪辑","正在剪辑","剪辑完成"],
        // 当前视频的种类,0表示等待剪辑，1表示正在剪辑，2表示剪辑完成
        currentType:0,
      }
    },
    created() {
      console.log("查看设备",this.deviceInfo)
    },
    computed:{
      ...mapState("m_device",["deviceInfo"]),
      // 返回当前用户设备的高度
      calHeight(){
        return this.deviceInfo&&this.deviceInfo.screenHeight + 'px'
      },
    },
    methods:{
      // 若用户没有待上传的则是打开相册进行选取视频，若用户已有待上传的则用户将待上传的上传到七牛云
      openOrUpload(){
        uni.navigateTo({
          url:"../upload-video/index"
        })
      },
      // 切换视频的种类
      async changeType(data){
        this.currentType = data
      },
    },
  }
</script>

<style lang="scss">
  ::-webkit-scrollBar{
    display: none;
  }
  .typeColor::after{
    content: "";
    display: block;
    width: 50rpx;
    margin-left: 25rpx;
    margin-top: 5rpx;
    border-bottom: 4rpx solid #7E70F1;
  }
</style>
