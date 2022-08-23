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
    <view 
      v-show="sliderStatus"
      class="width-full heichi50 bawhite flex alitem-center justify-center">
      <view class="slider">
        
      </view>
      <view class="height-full fon24 gray margleft10 line-heichi50">
        加载中~
      </view>
    </view>
    <scroll-view
      class="width-full height-full "
      :scroll-y="true"
      @scroll="calTop"
      @scrolltolower="toEnd"
      @touchstart="startSlider"
      @touchend="endSlider"
      >
      <view v-if="videoList.length!=0">
        <view v-for="(item,index) in videoList"
          :key="index">
          <clipCom
            :clipType="textList[currentType]"
            :itemData="item"
            :cliptext="clipingNumber[index]"
            >
            
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
  import { getClipingVideos, getClipingStatus } from "@/api/video.js";
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
        // 剪辑文字筛选
        textList:["等待剪辑","正在剪辑","剪辑完成"],
        // 当前视频的种类,0表示等待剪辑，1表示正在剪辑，2表示剪辑完成
        currentType:0,
        // 当前场馆的id
        currentId:0,
        // 开始滑动时的用户接触的位置
        startPosition:0,
        // 滑动拉取接口
        sliderStatus:false,
        // 查询所要剪辑的状态,默认是查询待剪辑的，WAIT_CLIP待剪辑，CLIPING正在剪辑，CLIP_FINIFSHED剪辑完成，CLIP_FAIL剪辑失败
        selectStatus:"WAIT_CLIP",
        // 当前显示的视频数量及状态
        videoList:[],
        // 当前查询的页数
        page:1,
        // 每一页加载的数量
        per_page:12,
        // 数据是否加载完事
        loadingDone:false,
        // 正在剪辑的视频剪辑状态
        clipingNumber:[],
        // 下滑定时器
        timer:null,
        // 滑动条距离顶部的距离
        sliderTop:0,
      }
    },
    onLoad(options) {
      this.initData(options)
    },
    computed:{
      ...mapState("m_device",["deviceInfo"]),
      // 返回当前用户设备的高度
      calHeight(){
        return this.deviceInfo&&this.deviceInfo.screenHeight + 'px'
      },
    },
    methods:{
      // 初始化数据
      initData(data){
        this.$showMsg("下拉刷新各类剪辑状态！",3000,"none")
        this.currentId = data.venue_id
        this.selectTypeVideos()
      },
      // 滑动底部加载数据
      toEnd(){
        var that = this;
        if(that.timer){
          clearTimeout(that.timer)
        }
        that.timer = setTimeout(()=>{
          if(that.videoList.length>=that.per_page){
            if(that.loadingDone){
              that.$showMsg("数据已加载完成！",2000,"none")
              return false
            }
            else{
              that.page++
              that.selectTypeVideos()
            }
          }
        },200)
      },
      // 根据条件查询视频
      async selectTypeVideos(){
        this.$showLoading("数据加载中!","none");
        if(this.currentType!=1){
          let {data} = await getClipingVideos(this.selectStatus,this.page,this.per_page);
          this.$hideLoading();
          this.sliderStatus = false;
          this.videoList = [...this.videoList,...data];
          console.log("查看数值",this.videoList);
          this.loadingDone = data.length<this.per_page;
        }
        else{
          await getClipingVideos(this.selectStatus,this.page,this.per_page).then(async value=>{
            this.$hideLoading();
            this.videoList = [...this.videoList,...value.data];
            if(value.data.length!=0){
              this.clipingNumber = await Promise.all(value.data.map(async item=>{
                // 一个视频需要处理10分钟算，剪辑占90%，上传占10%
                let {data} = await getClipingStatus(item.id);
                let number = (data.current_index+data.current_upload_index)/(data.total_num+data.total_upload_num);
                return number;
              }))
              console.log("查看正在剪辑的数值",this.clipingNumber)
            }
            this.sliderStatus = false;
          })
        }
      },
      // 若用户没有待上传的则是打开相册进行选取视频，若用户已有待上传的则用户将待上传的上传到七牛云
      openOrUpload(){
        uni.navigateTo({
          url:`../upload-video/index?venue_id=${this.currentId}`
        })
      },
      // 切换视频的种类
      async changeType(data){
        // 例如处在等待剪辑，再次点击等待剪辑不响应事件
        if(data==this.currentType){
          return false
        }
        this.currentType = data;
        // 处于等待剪辑
        if(this.currentType==0){
          this.selectStatus = "WAIT_CLIP";
        }
        // 处于正在剪辑
        if(this.currentType==1){
          this.selectStatus = "CLIPING";
        }
        // 处于剪辑完成
        if(this.currentType==2){
          this.selectStatus = "CLIP_FINIFSHED";
        }
        this.videoList = [];
        this.clipingNumber = [];
        this.page = 1;
        this.loadingDone = false;
        this.selectTypeVideos();
      },
      calTop(data){
        console.log("聚集顶部的距离",data)
        this.sliderTop = data.detail.scrollTop
      },
      // 用户开始接触屏幕
      startSlider(data){
        this.startPosition = data.changedTouches[0].pageY
      },
      // 用户滑动结束判断上滑还是下滑
      endSlider(e){
        if(e.changedTouches[0].pageY>this.startPosition&&(e.changedTouches[0].pageY-this.startPosition)>=10&&this.sliderTop<=5){
          console.log("上touch")
          this.sliderStatus = true
          this.videoList = [];
          this.clipingNumber = [];
          this.page = 1;
          this.loadingDone = false;
          this.selectTypeVideos();
        }
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
  .slider{
    width: 30rpx;
    height: 30rpx;
    border-radius: 50%;
    border: 2px solid transparent;
    border-top: 2px solid #787878;
    border-left: 2px solid #787878;
    animation: rotate 1s infinite linear;
  }
  @keyframes rotate {
    100% {
      transform: rotate(360deg);
    }
  }
</style>
