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
    <view 
      v-show="currentType==0&&videoList.length!=0"
      class="width-full gray fon24 heichi50 line-heichi50 text-center">
      <text class="iconfont icon-shengyin_shiti margright10 fon28"></text>
      <text>当前处于视频剪辑高峰期，共有{{currentClipVideos}}个视频待剪辑~</text>
    </view>
    <scroll-view
      class="width-full height-full "
      :scroll-y="true"
      @scroll="calTop"
      @scrolltolower="toEnd"
      @touchstart="startSlider"
      @touchend="endSlider"
      >

      <view 
        v-if="videoList.length==0&&currentType!=2"
        class="absolute left-half translatex-50 top100 width60 height-30 text-center" >
        <view 
          style="background-image: url(https://static.qiniuyun.highvenue.cn/image%2Fnoclipingvideos.png);"
          class="width-full height-80 background-cover">
          
        </view>
        <view class="fon28 gray margtop20">
          暂无记录~
        </view>
      </view>
      <view v-if="videoList.length!=0&&currentType!=2">
        <view v-for="(item,index) in videoList"
          :key="index">
          <clipCom
            :clipType="textList[currentType]"
            :itemData="item"
            :itemName="item"
            :cliptext="clipingNumber[index]"
            >
            
          </clipCom>
        </view>
      </view>
      <view
        v-else-if="currentType==2">
        <view
          v-for="(item,index) in timeList"
          @tap="selectTimeList(index)"
          :key="index"
        >
          <view style="margin: 0rpx 0rpx 20rpx 20rpx;">
            <text class="margright10 fon28">{{item}}</text>
            <text :class="['iconfont fon32',currentClipType==index?'icon-xiala1':'icon-xiala3']  "></text>
          </view>
         <view
            v-for="(item,indexData) in videoList"
            v-if="currentClipType == index&&videoList.length!=0"
            :key="item.record_name">
            <clipCom
              :clipType="textList[currentType]"
              :itemData="item"
              :cliptext="clipingNumber[index]"
              >
              
            </clipCom>
          </view>
          <view class=" width-full heichixu100 line-heichi100 text-center"
            v-if="currentClipType == index&&videoList.length==0"
          >
            <view class="fon28 gray ">
              暂无记录~
            </view>
          </view>
        </view>
      </view>
      <view class="heichifan200">
        
      </view>
    </scroll-view>
    <view class="bawhite width-full heichixu70 absolute bottom0 flex justify-center alitem-center">
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
  import { getAwaitCliping, getAwaitClipingName, } from "@/api/venues.js";
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
        // 查询所要剪辑的状态,默认是查询待剪辑的，WAIT_CLIP待剪辑，CLIPING正在剪辑，CLIP_FINISHED剪辑完成，CLIP_FAIL剪辑失败
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
        // 当前总共待剪辑多少个视频
        currentClipVideos:0,
        // 剪辑完成的时间列表
        timeList:[],
        // 剪辑完成当前搜索日期
        currentClipType:0,
        // 剪辑完成的开始时间
        startTime:"",
        // 剪辑完成的结束时间
        endTime:"",
        
      }
    },
    onLoad(options) {
      this.$showMsg("下拉刷新各类剪辑状态！",3000,"none");
      this.currentId = options.venue_id;
      this.calTimeList();
    },
    onShow() {
      this.currentType = 0;
      this.clipingNumber = [];
      this.page = 1;
      this.loadingDone = false;
      this.getTotalNumber();
      this.getTotalNames();
    },
    computed:{
      ...mapState("m_device",["deviceInfo","currentTime"]),
      // 返回当前用户设备的高度
      calHeight(){
        return this.deviceInfo&&this.deviceInfo.screenHeight + 'px'
      },
    },
    methods:{
      // 点击剪辑完成时间选择剪辑完成列表
      async selectTimeList(dataValue){
        // 自己点击自己收起来
        if(this.currentClipType == dataValue){
          this.currentClipType = -1;
          return false;
        }
        this.page = 1;
        this.loadingDone = false;
        this.currentClipType = dataValue;
        this.endTime = this.$dayjs(this.currentTime).subtract(dataValue,"day").format("YYYY-MM-DD_23-59-59");
        this.startTime = this.$dayjs(this.currentTime).subtract(dataValue,"day").format("YYYY-MM-DD_00-00-00");
        let {data} = await getClipingVideos(this.selectStatus,this.page,this.per_page,this.currentId,this.startTime,this.endTime);
        this.sliderStatus = false;
        this.videoList = [...this.videoList,...data];
        this.loadingDone = data.length<this.per_page;
      },
      // 计算剪辑完成的时间列表
      calTimeList(){
        this.startTime = this.$dayjs(this.currentTime).subtract(7,"day").format("YYYY-MM-DD_00-00-00");
        this.endTime = this.$dayjs(this.currentTime).format("YYYY-MM-DD_HH-mm-ss");
        for(var i=0;i<=7;i++){
          this.timeList.push(this.$dayjs(this.currentTime).subtract(i,"day").format("YYYY-MM-DD"));
        }
        console.log("时间列表",this.timeList);
      },
      // 计算当前待剪辑视频总数
      async getTotalNumber(){
        let {data} = await getAwaitCliping();
        this.currentClipVideos = data.wait_clip_num;
      },
      // 计算当前待剪辑视频名字
      async getTotalNames(){
        let {data} = await getAwaitClipingName(this.currentId);
        this.videoList = [];
        this.videoList = data.video_names;
      },
      // 滑动底部加载数据,待剪辑不必下滑，没有分页
      toEnd(){
        var that = this;
        if(that.currentType!=0){
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
        }
      },
      // 根据条件查询视频
      async selectTypeVideos(){
        // 待剪辑
        if(this.currentType==0){
          this.sliderStatus = false;
          this.getTotalNumber();
          this.getTotalNames();
          return false;
        }
        // 正在剪辑
        if(this.currentType==1){
          let end = this.$dayjs(this.currentTime).format("YYYY-MM-DD_HH-mm-ss");
          let start = this.$dayjs(this.currentTime).subtract(7,"day").format("YYYY-MM-DD_HH-mm-ss");
          await getClipingVideos(this.selectStatus,this.page,this.per_page,this.currentId,start,end).then(async value=>{
            this.videoList = [];
            this.clipingNumber = [];
            this.videoList = [...this.videoList,...value.data];
            if(value.data.length!=0){
              this.clipingNumber = await Promise.all(value.data.map(async item=>{
                // 一个视频需要处理10分钟算，剪辑占90%，上传占10%
                let {data} = await getClipingStatus(item.id);
                let curClip = data.current_index||0;
                let totalClip = data.total_num||0;
                let curUpload = data.current_upload_index||0;
                let totalUpload = data.total_upload_num||0;
                // 视频正在预处理，所有数值都为0；
                if(!curClip&&!totalClip&&!curUpload&&!totalUpload){
                  return 0;
                }
                // 正在剪辑，没有上传，上传的数值为null
                if(!curUpload&&!totalUpload){
                  let number = curClip/totalClip*0.9;
                  return number;
                }
                let number = curClip/totalClip*0.9+curUpload/totalUpload*0.1;
                return number;
              }))
              console.log("查看正在剪辑的数值",this.clipingNumber)
            }
            this.sliderStatus = false;
          })
          return false;
        }
        // 剪辑完成
        if(this.currentType==2){
          let {data} = await getClipingVideos(this.selectStatus,this.page,this.per_page,this.currentId,this.startTime,this.endTime);
          this.$hideLoading();
          this.sliderStatus = false;
          this.videoList = [...this.videoList,...data];
          this.loadingDone = data.length<this.per_page;
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
        this.page = 1;
        this.loadingDone = false;
        // 处于等待剪辑
        if(this.currentType==0){
          this.getTotalNumber();
          this.getTotalNames();
          return false
        }
        // 处于正在剪辑
        if(this.currentType==1){
          this.selectStatus = "CLIPING";
        }
        // 处于剪辑完成
        if(this.currentType==2){
          this.selectStatus = "CLIP_FINISHED";
          this.currentClipType = 0;
          this.endTime = this.$dayjs(this.currentTime).subtract(0,"day").format("YYYY-MM-DD_23-59-59");
          this.startTime = this.$dayjs(this.currentTime).subtract(0,"day").format("YYYY-MM-DD_00-00-00");
        }
        this.selectTypeVideos();
      },
      // 计算滑动条到顶部的距离
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
        if(this.currentType==1){
          if(e.changedTouches[0].pageY>this.startPosition&&(e.changedTouches[0].pageY-this.startPosition)>=10&&this.sliderTop<=5){
            console.log("上touch")
            this.sliderStatus = true
            this.page = 1;
            this.loadingDone = false;
            this.selectTypeVideos();
          }
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
    margin-left: 30rpx;
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
