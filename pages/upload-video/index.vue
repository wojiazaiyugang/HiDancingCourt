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
          @changeVideoStatus="showVideos"
          :videoName="item">
            
          </uploadCom>
        </view>
      </view>
      <video class="margleftchi50 translatex-50 "
        v-show="playVideo"
        :src="currentSrc" 
        controls
        loop
        objectFit="cover"
        :show-fullscreen-btn="false"
        :show-play-btn="false"
        :show-bottom-progress="true"
        autoplay="true">
      </video>
      <view v-show="uploadAarray.length!=0"
        @tap="uploadAlways"
        class="margleftchi50 translatex-50 boradiu16 bapruple heichiduan80 line-heichi80 widchi150 text-center white">
        <text class="iconfont icon-zengjiatianjiajiahao margright10 fon28"></text>
        <text class="fon28">继续添加</text>
      </view>
      <view class="heichifan200">
        
      </view>
    </scroll-view>
    <view class="bawhite width-full heichixu70 absolute bottom0 flex justify-center alitem-center">
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
    </view>
    <!-- 确认上传的场馆提示信息 -->
    <uni-popup ref="roomConfirm" type="dialog">
       <uni-popup-dialog type="info" mode="base" 
       :content="`您当前正在向  ${currentName}  上传视频，点击确认后开始上传！`" 
       :before-close="true" 
       @close="cancelSelect" 
       @confirm="confirmSelect">
       </uni-popup-dialog>
    </uni-popup>
  </view>
</template>

<script>
  import { mapState, mapMutations } from "vuex";
  import qiniuUploader from "@/plugins/qiniuUploader.js";
  import { getQiNiuToken } from "@/api/video.js";
  import { postKeyUpload } from "@/api/venues.js";
  import clipCom from "@/components/clipCom.vue";
  import uploadCom from "@/components/uploadCom.vue";
  import nvgBar from "@/components/nvgBar";
  import log from "@/plugins/log.js";
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
        // 待上传的数组视频，显示的是带上传视频的临时路径的整体
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
        // 是否播放视频
        playVideo:false,
        // 当前播放视频的临时地址
        currentSrc:"",
        // 当前场馆的名字
        currentName:"",
        // 上传失败的视频数组
        failList:[],
      }
    },
    onLoad(options) {
      this.courtId = options.venue_id;
      this.allVenues.map(item=>{
        if(this.courtId==item.id){
          this.currentName = item.name;
        }
      })
      this.$showMsg("所上传视频可以点击播放按钮进行查看哦~",3000,"none");
    },
    computed:{
      ...mapState("m_device",["deviceInfo"]),
      ...mapState("m_venues",["allVenues"]),
      // 返回当前用户设备的高度
      calHeight(){
        return this.deviceInfo&&this.deviceInfo.screenHeight + 'px';
      },
    },
    methods:{
      // 取消上传视频，隐藏弹窗
      cancelSelect(){
        this.$refs.roomConfirm.close();
      },
      // 确认视频上传
      confirmSelect(){
        // 确认上传也隐藏弹窗
        this.$refs.roomConfirm.close();
        // 视频正在上传
        this.uploadStatus = true;
        // 点击开始上传，上传的是第几个视频
        this.currentVideo = 0;
        // 待上传的视频总数量
        this.videoAllNumber = 0;
        // 所有视频重新上传
        this.uploadAll = false;
        // 第一个参数是所要上传视频的临时路径，第二个参数是从第几个开始上传，第三个参数是所要上传的视频的长度
        this.uploadOneByOne(this.uploadAarray,0,this.uploadAarray.length);
      },
      // 子组件控制页面播放哪个视频 
      showVideos(data){
        this.playVideo = data.playStatus;
        this.currentSrc = data.name;
      },
      // 删除所选择的视频
      deleteUpload(data){
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
          this.uploadQiniu();
          this.uploadStatus = false;
        }
        else{
          this.$refs.roomConfirm.open("center");
        }
      },
      // 上传七牛云打开相册
      async uploadQiniu(){
        var that = this;
        uni.chooseMedia({
          count:9,
          sourceType:["album"],
          mediaType:["video"],
          success:async (res)=>{
            // 继续上传
            if(that.continueUpload){
              that.continueUpload = false;
              let tempList = res.tempFiles.map((item,index)=>{
                return item.tempFilePath;
              })
              that.uploadAarray = [...that.uploadAarray,...tempList];
              that.videoAllNumber = that.uploadAarray.length;
              return false;
            }
            // 一次性选择完事
            that.uploadAarray = res.tempFiles.map((item,index)=>{
              return item.tempFilePath;
            })
            that.videoAllNumber = that.uploadAarray.length;
          },
          fail:(Error)=>{
            console.log("选择文件夹失败",Error);
            // 不是取消上传的才是真正的错误
            if(Error.errMsg!="chooseMedia:fail cancel"){
              log.info("打开文件夹失败的原因",Error);
              that.$showMsg("视频文件选择失败，请重新选择！",2000,"none");
            }
          }
        })
      },
      // 单个循环上传视频
      async uploadOneByOne(arrayData,count,length){
        // 上传完一个进度归为0
        this.currentProcess = 0;
        // 当前视频已经上传的大小，新上传归0
        this.oploadByte = 0;
        // 当前视频需要上传的总大小，新上传归0
        this.totalByte = 0;
        // 第一个视频其值为 1
        this.currentVideo = count+1;
        // 待上传的视频总数
        this.videoAllNumber = length;
        await getQiNiuToken(this.courtId,arrayData[count].split("/").slice(-1)[0]).then(async value=>{
          await qiniuUploader.upload(arrayData[count],
            async res=>{
              count++
              if(count==length){
                // if(this.failList.length){
                //   // 上传失败不返回隐藏上传进度条，显示上传失败的
                //   this.uploadStatus = false;
                //   // 失败的数组重新赋值给上传数组重新上传
                //   let tempArray = [];
                //   this.failList.map(item=>{
                //     tempArray.push(this.uploadAarray[item]);
                //   })
                //   let newArr = this.uploadAarray.filter((item) => {
                //     return !tempArray.includes(item)
                //   });
                //   newArr = newArr.map(item=>{
                //     return item.split("/").slice(-1)[0];
                //   })
                //   postKeyUpload(this.currentName,newArr);
                //   this.uploadAarray = [...tempArray];
                // }
                // else{
                  // 全部成功之后向后端发指令
                  let newArr = this.uploadAarray;
                  newArr = newArr.map(item=>{
                    return item.split("/").slice(-1)[0];
                  })
                  postKeyUpload(this.currentName,newArr)
                  // 上传成功的视频删除不再重新上传,同时返回视频剪辑目录
                  this.uploadAarray = [];
                  // 所有视频上传完成
                  this.uploadAll = true;
                  uni.navigateBack({
                    delta:1,
                  })
                // }
              }
              else{
                // 递归一个一个进行视频上传
                this.uploadOneByOne(arrayData,count,length)
              }
            },async error=>{
              log.info("文件上传失败的原因",Error.errMsg);
              this.$showMsg("当前视频文件上传失败，正在重新上传",3000,"none");
              // this.failList.push(count);
              // count++;
              // if(count==length){
              //   // 上传失败不返回隐藏上传进度条，显示上传失败的
              //   this.uploadStatus = false;
              //   // 失败的数组重新赋值给上传数组重新上传
              //   let tempArray = [];
              //    this.failList.map(item=>{
              //     tempArray.push(this.uploadAarray[item])
              //   })
              //   let newArr = this.uploadAarray.filter((item) => {
              //     return !tempArray.includes(item)
              //   });
              //   // 上传给后端的名字必须是/后面纯纯的名字
              //   newArr = newArr.map(item=>{
              //     return item.split("/").slice(-1)[0];
              //   })
              //   postKeyUpload(this.currentName,newArr);
              //   // 将上传失败的数组归给待上传的列表显示
              //   this.uploadAarray = [];
              //   this.uploadAarray = [...tempArray];
              //   this.failList = [];
              // }
              // else{
              //   // 递归
                this.uploadOneByOne(arrayData,count,length);
              // }
            },
            {
              region: "ECN",
              key:value.data.key,
              uptoken: value.data.token,
            },
            progress=>{
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
  @import "@/static/style/vantprop";
  ::-webkit-scrollBar{
    display: none;
  }
</style>
