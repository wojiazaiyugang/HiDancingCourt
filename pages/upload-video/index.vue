<template>
  <view class="ba-f7"
    :style="{height:calHeight}"
    >
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
  </view>
</template>

<script>
  import { mapState, mapMutations } from "vuex";
  import qiniuUploader from "@/plugins/qiniuUploader.js";
  import { getQiNiuToken } from "@/api/video.js";
  import clipCom from "@/components/clipCom.vue";
  import uploadCom from "@/components/uploadCom.vue";
  export default {
    components:{
      clipCom,
      uploadCom,
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
      // 删除所选择的视频
      deleteUpload(data){
        console.log("查看",data)
        this.uploadAarray = this.uploadAarray.filter(item=>{
          if(data!=item){
            return item
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
          // this.uploadOneByOne()
        }
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
              console.log("suoyou",that.uploadAarray)
              return false;
            }
            that.uploadAarray = res.tempFiles.map((item,index)=>{
              console.log("所有视频的key",item.tempFilePath,index)
              return item.tempFilePath
            })
            // that.uploadOneByOne(res.tempFiles,tempNumber,length)
          },
          fail:(error)=>{
            this.$showMsg("请您选择所要上传的视频！",2000,"error")
          }
        })
      },
      // 单个循环上传视频
      async uploadOneByOne(arrayData,count,length){
        console.log("开始执行")
        await getQiNiuToken(this.currentId,arrayData[count].tempFilePath).then(async value=>{
          console.log("上传视频的key",value.data.key)
          this.$showLoading(`正在上传第${count+1}个视频`,"none")
          await qiniuUploader.upload(arrayData[count].tempFilePath,res=>{
              count++
              if(count==length){
                console.log("失败数组",this.failList)
                this.$hideLoading()
                if(this.failList.length){
                  this.$showMsg(`视频上传成功${length-this.failList.length}个，第${this.failList.toString()}个视频上传失败！`,4000,"success")
                }
                else{
                  this.$showMsg(`所有视频已全部上传成功！`,4000,"success")
                }
              }
              else{
                // 递归
                this.uploadOneByOne(arrayData,count,length)
              }
            },error=>{
              this.failList.push(count+1)
              count++
              if(count==length){
                this.$hideLoading()
                this.$showMsg(`视频上传成功${length-this.failList.length}个，第${this.failList.toString()}个视频上传失败！`,4000,"success")
              }
              else{
                // 递归
                this.uploadOneByOne(arrayData,count,length)
              }
            },{
              region: "ECN",
              key:value.data.key,
              uptoken: value.data.token,
            },
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
