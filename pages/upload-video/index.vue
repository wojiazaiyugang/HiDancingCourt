<template>
  <view class="ba-f7"
    :style="{height:calHeight}"
    >
    <nvg-bar v-show="deviceInfo.platform!='windows'">
       <template v-slot:icon><text class="iconfont icon-fanhui fon32 black"></text></template>
       <template v-slot:text><text class="black">上传视频</text></template>
     </nvg-bar>
    <view v-if="uploadAarray.length==0"
      class="width-full height-full"
      >
       <view class="background-cover width60 heichifan160 absolute left-half top-35 translate--50"
        style="background-image: url(https://static.qiniuyun.highvenue.cn/image%2FvideoUploadBackimg.png);"
       >
         
       </view>
       <view class="text-center fon28 gray absolute left-half top-half translate--50">
         暂未上传过视频
       </view>
       <view class="text-center fon28 gray absolute left-half top-half translate--50 margtop40">
         快去拍摄舞蹈视频并上传吧~
       </view>
    </view>
    <scroll-view
      v-else
      class="width-full height-full "
      :scroll-y="true"
      >
      <view >
        <view v-for="(item,index) in uploadAarray"
          :key="index">
          <uploadCom 
          @deleteVideo="deleteUpload"
          :videoName="item">
            
          </uploadCom>
        </view>
      </view>
      <view v-show="uploadAarray.length!=0"
        @tap="uploadAlways"
        class="margleftchi50 translatex-50 boradiu16 bapruple heichiduan80 line-heichi80 widchi150 text-center white">
        <text class="iconfont icon-zengjiatianjiajiahao margright10 fon28"></text>
        <text class="fon28">继续添加</text>
      </view>
      <view class="heichifan200">
        
      </view>
    </scroll-view>
    <view class="bawhite width-full heichixu85 absolute bottom0 flex justify-center alitem-center">
      <view
        @tap="openOrUpload"
        class="line-heichi80 heichiduan80  text-center boradiu50 white bapruple width60 ">
        <text class="iconfont icon-shangchuan fon36 margright10 fonweight"></text>
        <text>开始上传</text>
      </view>
    </view>

    <view 
      v-if="uploadStatus"
      class="absolute top0 left0 bablack opcity6 width-full height-full z-inde1">
        
    </view>
    <view 
      v-if="uploadStatus"
      class=" fon40 absolute top-half left-half flex flex-direction alitem-center width80 height-40 translate--50 opcity10 z-inde10">
      <view class="relative heichifan200 widthchi200 flex alitem-center" >
        <view class="absolute top-half left-half translate--50 width-full height-full fon24 boradiuoverall text-center line-heichi80"
         style="color: red;-webkit-mask: radial-gradient(transparent 180rpx, white 180rpx); ">
          <view class="width50 height-full"
          style="float: right;"
          :style="{background:`linear-gradient(#7E70F1 ${((currentVideo-1)/videoAllNumber+currentProcess/videoAllNumber/100)*2*100+'%'}, white ${((currentVideo-1)/videoAllNumber+currentProcess/videoAllNumber/100)*2*100+'%'});`}"
          >
            
          </view>
          <view class="width50 height-full"
          style="float: left;"
          :style="{background:`linear-gradient(white ${(200-((currentVideo-1)/videoAllNumber+currentProcess/videoAllNumber/100)*2*100)+'%'}, #7E70F1 ${(200-((currentVideo-1)/videoAllNumber+currentProcess/videoAllNumber/100)*2*100)+'%'});`}"
          >
            
          </view>
        </view>
        <view class="absolute top-half left-half translate--50 fon24 fon100 white">
          {{(uploadAll?100:(currentProcess/videoAllNumber+(currentVideo-1)/videoAllNumber*100).toFixed(0))+"%"}}
        </view>
      </view>
      <view class="white fon28 margtop20">
        <text >正在上传</text>
        <text class="margleft10">{{currentVideo+"/"+videoAllNumber}}</text>
      </view>
      <view class="white margtop10 fon28">
        {{"已上传"+(oploadByte/1024/1024).toFixed(2)+"M，"+"共"+(totalByte/1024/1024).toFixed(2)+"M"}}
      </view>
      <view class="white fon24 margtop10">
        视频上传完成前请不要退出小程序或关闭微信哦
      </view>
      <view 
        @tap="confirmComplte"
        v-show="uploadAll"
        class="pruple bawhite text-center heichi60 widchi100 line-heichi60 fon28 boradiu30 margtop50">
        确定
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
      clipCom,
      uploadCom,
      nvgBar,
    },
    data(){
      return {
        // 导航栏的背景色
        navColor:"bawhite",
        // 当前是否有有上传处理的视频
        isClipping:true,
        // 待上传的数组
        uploadAarray:[],
        // 是否是继续上传视频
        continueUpload:false,
        // 当前场馆的id
        courtId:0,
        // 视频是否正在上传
        uploadStatus:false,
        // 所选视频是否上传完成
        uploadAll:false,
        // 所选的待上传的视频总数
        videoAllNumber:0,
        // 正在上传第几个视频
        currentVideo:0,
        // 当前视频上传的进度
        currentProcess:0,
        // 当前视频上传了多少字节
        oploadByte:0,
        // 当前视频总共有多少字节
        totalByte:0,
      }
    },
    onLoad(options) {
      this.courtId = options.venue_id
    },
    computed:{
      ...mapState("m_device",["deviceInfo"]),
      // 返回当前用户设备的高度
      calHeight(){
        return this.deviceInfo&&this.deviceInfo.screenHeight + 'px';
      },
    },
    methods:{
      // 确认视频已经上传完成
      confirmComplte(){
        this.uploadAll = false
        this.uploadStatus = false
      },
      // 删除所选择的视频
      deleteUpload(data){
        console.log("查看",data)
        this.uploadAarray = this.uploadAarray.filter(item=>{
          if(data!=item){
            return item;
          }
        })
      },
      // 继续上传视频
      uploadAlways(){
        this.continueUpload = true;
        this.uploadQiniu();
      },
      // 若用户没有待上传的则是打开相册进行选取视频，若用户已有待上传的则用户将待上传的上传到七牛云
      openOrUpload(){
        if(this.uploadAarray.length==0){
          this.uploadQiniu()
        }
        else{
          // 视频正在上传
          this.uploadStatus = true;
          // 点击开始上传，当前视频就是0
          this.currentVideo = 0;
          // 所有视频重新上传
          this.uploadAll = false;
          this.uploadOneByOne(this.uploadAarray,0,this.uploadAarray.length)
        }
        // this.uploadStatus = true;
      },
      // 上传七牛云打开相册
      async uploadQiniu(){
        var that = this
        uni.chooseMedia({
          count:9,
          sourceType:["album"],
          mediaType:["video"],
          success:async (res)=>{
            console.log("输出res",res)
            var tempNumber = 0
            var length = res.tempFiles.length;
            that.failList = []
            if(that.continueUpload){
              that.continueUpload = false;
              let tempList = res.tempFiles.map((item,index)=>{
                console.log("所有视频的key",item.tempFilePath,index);
                return item.tempFilePath;
              })
              that.uploadAarray = [...that.uploadAarray,...tempList];
              console.log("suoyou",that.uploadAarray);
              that.videoAllNumber = that.uploadAarray.length;
              return false;
            }
            that.uploadAarray = res.tempFiles.map((item,index)=>{
              console.log("所有视频的key",item.tempFilePath,index)
              return item.tempFilePath
            })
            that.videoAllNumber = that.uploadAarray.length;
          },
          fail:(error)=>{
            this.$showMsg("请您选择所要上传的视频！",2000,"error")
          }
        })
      },
      // 单个循环上传视频
      async uploadOneByOne(arrayData,count,length){
        console.log("开始执行",arrayData,count,length)
        // 上传完一个进度归为0
        this.currentProcess = 0;
        this.currentVideo = count+1;
        await getQiNiuToken(this.courtId,arrayData[count]).then(async value=>{
          console.log("上传视频的key",value.data.key)
          // this.$showLoading(`正在上传第${count+1}个视频`,"none")
          await qiniuUploader.upload(arrayData[count],res=>{
              count++
              if(count==length){
                console.log("失败数组",this.failList)
                // 不论成功或者失败视频都上传完成
                this.uploadAll = true;
                this.$hideLoading()
                if(this.failList.length){
                  // 失败的数组重新赋值给上传数组重新上传
                  let tempArray = []
                   this.failList.map(item=>{
                     tempArray = this.uploadAarray[item]
                   })
                  this.uploadAarray = [...tempArray]
                  // this.$showMsg(`视频上传成功${length-this.failList.length}个，第${this.failList.toString()}个视频上传失败！`,4000,"success")
                }
                else{
                  // 上传成功的视频删除不再重新上传
                  this.uploadAarray = [];
                }
              }
              else{
                // 递归
                this.uploadOneByOne(arrayData,count,length)
              }
            },error=>{
              this.failList.push(count+1)
              count++;
              if(count==length){
                this.$hideLoading()
                this.$showMsg(`视频上传成功${length-this.failList.length}个，第${this.failList.toString()}个视频上传失败！`,4000,"success")
              }
              else{
                // 递归
                this.uploadOneByOne(arrayData,count,length)
              }
            },
            {
              region: "ECN",
              key:value.data.key,
              uptoken: value.data.token,
            },
            progress=>{
              console.log("查看进度",progress);
              // 当前视频上传的进度
              this.currentProcess = progress.progress;
              // 当前视频已经上传的大小
              this.oploadByte = progress.totalBytesSent;
              // 当前视频需要上传的总大小
              this.totalByte = progress.totalBytesExpectedToSend;
            }
          )
        })
      },
    },
  }
</script>

<style lang="scss">
  ::-webkit-scrollBar{
    display: none;
  }
</style>
