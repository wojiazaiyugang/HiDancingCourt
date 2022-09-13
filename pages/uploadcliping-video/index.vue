<template>
  <view class="ba-f7 "
    :style="{height:calHeight}"
    >
    <view 
    @tap="chengeTime"
    class="flex paddinf-top10 fon24 margleft10 heichi50 line-heichi50 marginbottom10">
      <view class="fonweight margright20">
        日期
      </view>
      <view 
      style="border: 4rpx solid #7E70F1;"
      class="widchi150 flex justify-between boradiu30 heichi50 line-heichi50 ">
        <view class="gray margleft10">
          {{endTime.split("_")[0]}}
        </view>
        <view class="pruple margright20">
          <text class="iconfont icon-rili-xianxing-xi fon36"></text>
        </view>
      </view>
    </view>
    <view class="flex justify-around heichixu100 fon28 gray alitem-center width80 margleftchi50 translatex-50">
      <view 
        v-for="(item,index) in textList"
        @tap="changeType(index)"
        :key="index"
        :class="[' text-center heichi50 line-heichi50 relative',currentType==index?'black fonweight typeColor boradiu16':'']"
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
      v-show="currentType==1&&videoList.length!=0"
      class="width-full gray fon24 heichi50 line-heichi50 text-center">
      <text class="iconfont icon-shengyin_shiti margright10 fon28"></text>
      <text>当前处于视频剪辑高峰期，共有{{currentClipVideos}}个视频待剪辑~</text>
    </view>
    <view 
      v-show="currentType!=0&&videoList.length!=0"
      class="fonweight margleft10 fon28">
      {{calText}}
    </view>
    <view 
    v-show="currentType!=0&&videoList.length!=0"
    class="flex justify-between fon28 margtop30 heichixu100 paddingx10 line-heichi100 bawhite">
      <view class="">
        <text class="iconfont icon-biaoqian pruple fon32 margright20"></text>
        <text>老师/舞种</text>
      </view>
      <view class="">
        视频名称
      </view>
      <view class="">
        <text v-show="currentType>1">剪辑进度</text>
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
      <view 
        v-if="videoList.length==0&&currentType!=0"
        class="absolute left-half translatex-50 top100 width60 height-30 text-center" >
        <view 
          style="background-image: url(https://static.qiniuyun.highvenue.cn/image%2Fnoclipingvideos.png);"
          class="width-full height-80 background-cover">
          
        </view>
        <view class="fon28 gray margtop20">
          暂无记录~
        </view>
      </view>
      <view v-if="videoList.length!=0&&currentType!=0">
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
      <view v-show="currentType==0">
      	<!-- 环状图 -->
      	<view class="width-full heichi240">
      		<ring-chart
      			:dataAs="pieData"
      			canvasId="index_ring_1"
            v-show="currentType==0"
      		/>
      	</view>
        <view class="margtop50 text-center fon24 fonweight">
          上传视频总条数:<text class="pruple">{{videoTotalNumber}}</text>条
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
    <uni-popup ref="popupTime" :safeArea="false" :mask-click="false">
      <van-datetime-picker
       type="date"
       :value="currentDate"
       :min-date="minDate"
       :formatter="formatter"
       show-toolbar
       cancel-button-text="请选择日期"
       confirm-button-text="确认"
       active-class="selectStyle"
       :isToday="true"
       toolbar-class="changeToolbar"
       visible-item-count="5"
       @confirm="confirmTimes"
       @input="selectTimes"
       item-height="40"/>
    </uni-popup>
  </view>
</template>

<script>
  import { mapState, mapMutations } from "vuex";
  import { getQiNiuToken } from "@/api/video.js";
  import { getClipingVideos, getClipingStatus } from "@/api/video.js";
  import { getAwaitCliping, getAwaitClipingName, } from "@/api/venues.js";
  import { getSearchNumber } from "@/api/search.js";
  import qiniuUploader from "@/plugins/qiniuUploader.js";
  import clipCom from "@/components/clipCom.vue";
  import uploadCom from "@/components/uploadCom.vue";
  import nvgBar from "@/components/nvgBar";
  import RingChart from "@/components/stan-ucharts/RingChart.vue";
  export default {
    components:{
      nvgBar,
      clipCom,
      uploadCom,
      RingChart,
    },
    data(){
      return {
        // 当前视频的总条数
        videoTotalNumber:0,
        // 导航栏的背景色
        navColor:"bawhite",
        // 剪辑文字筛选
        textList:["总览","等待剪辑","正在剪辑","剪辑完成"],
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
        // 正在剪辑的视频剪辑状态，显示百分比用的
        clipingNumber:[],
        // 下滑定时器
        timer:null,
        // 滑动条距离顶部的距离
        sliderTop:0,
        // 当前总共待剪辑多少个视频
        currentClipVideos:0,
        // 剪辑完成的开始时间
        startTime:"",
        // 剪辑完成的结束时间
        endTime:"",
        // 是否下拉显示加载中
        sliderUp:false,
        // 时间选择器当前的时间
        currentDate: new Date().getTime(),
        // 时间选择器最小的时间
        minDate: new Date(2022,1,1).getTime(),
        // 将时间改换为带年月日的
        formatter(type,value){
          if (type === "year") {
            return `${value}年`;
          } else if (type === "month") {
            return `${value}月`;
          }
          return `${value}日`;
        },
        pieData: {
        	//饼状图数据
        	series: [
        		{
        			name: "等待剪辑",
        			data: 0
        		},
        		{
        			name: "正在剪辑",
        			data: 0
        		},
        		{
        			name: "剪辑完成",
        			data: 0
        		}
        	]
        }
      }
    },
    onLoad(options) {
      this.$showMsg("下拉刷新各类剪辑状态！",3000,"none");
      // 获得当前的场馆id
      this.currentId = options.venue_id;
      this.endTime = this.$dayjs(this.currentTime).format("YYYY-MM-DD_HH-mm-ss");
      this.startTime = this.$dayjs(this.currentTime).format("YYYY-MM-DD_00-00-00");
      this.getVideoNumber();
    },
    onShow() {
      // 上传完视频或者刚进页面显示待剪辑
      this.currentType = 0;
      this.clipingNumber = [];
      this.page = 1;
      this.loadingDone = false;
    },
    computed:{
      ...mapState("m_device",["deviceInfo","currentTime"]),
      // 返回当前用户设备的高度
      calHeight(){
        return this.deviceInfo&&this.deviceInfo.screenHeight + 'px'
      },
      // 计算等待剪辑、正在剪辑与剪辑完成的数量
      calText(){
        // 等待剪辑
        if(this.currentType==1){
          return `等待剪辑视频数: ${this.pieData.series[0].data}`;
        }
        // 正在剪辑
        if(this.currentType==2){
          return `正在剪辑视频数: ${this.pieData.series[1].data}`;
        }
        // 剪辑完成
        if(this.currentType==3){
          return `剪辑完成视频数: ${this.pieData.series[2].data}`;
        }
      }
    },
    methods:{
      // 拉取视频总览数据
      async getVideoNumber(){
        let {data} = await getSearchNumber(this.currentId,this.startTime,this.endTime);
        this.videoTotalNumber = data.total_num;
        this.pieData.series[0].data=data.wait_clip_num;
        this.pieData.series[1].data=data.cliping_num;
        this.pieData.series[2].data=data.clip_finished_num;
      },
      // 点击时间之后选择时间
      confirmTimes(){
        this.$refs.popupTime.close();
        this.getVideoNumber();
      },
      // 时间组件切换时输出的数据
      selectTimes(data){
        this.startTime = this.$dayjs(data.detail).format("YYYY-MM-DD") + "_00-00-00";
        this.endTime = this.$dayjs(data.detail).format("YYYY-MM-DD") + "_23-59-59";
      },
      // 页面上的修改时间，打开时间选择器
      chengeTime(){
        this.$refs.popupTime.open("bottom");
      },
      // 计算当前待剪辑视频总数
      async getTotalNumber(){
        let {data} = await getAwaitCliping();
        this.currentClipVideos = data.wait_clip_num;
      },
      // 计算当前待剪辑视频名字
      async getTotalNames(){
        let {data} = await getAwaitClipingName(this.currentId);
        this.videoList = data.video_names;
      },
      // 滑动底部加载数据,待剪辑不必下滑，没有分页
      toEnd(){
        var that = this;
        if(that.currentType!=0&&that.currentType!=1){
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
        if(this.currentType==1){
          this.getTotalNumber();
          this.getTotalNames();
          return false;
        }
        // 正在剪辑
        if(this.currentType==2){
          let end = this.$dayjs(this.currentTime).format("YYYY-MM-DD_HH-mm-ss");
          let start = this.$dayjs(this.currentTime).subtract(7,"day").format("YYYY-MM-DD_HH-mm-ss");
          await getClipingVideos(this.selectStatus,this.page,this.per_page,this.currentId,start,end).then(async value=>{
            // 只有下拉刷新才会在请求完成之后拉取数据
            if(this.sliderUp){
              this.videoList = [];
              this.clipingNumber = [];
              this.sliderUp = false;
            }
            this.videoList = [...this.videoList,...value.data];
            this.loadingDone = value.data.length<this.per_page;
            if(value.data.length!=0){
              let numberArr = await Promise.all(value.data.map(async item=>{
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
              this.clipingNumber = [...this.clipingNumber,...numberArr]
            }
            this.sliderStatus = false;
          })
          return false;
        }
        // 剪辑完成
        if(this.currentType==3){
          let {data} = await getClipingVideos(this.selectStatus,this.page,this.per_page,this.currentId,this.startTime,this.endTime);
          this.$hideLoading();
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
        // 只要切换剪辑的状态种类，下滑刷新的标志隐藏
        this.sliderStatus = false;
        // 例如处在等待剪辑，再次点击等待剪辑不响应事件
        if(data==this.currentType){
          return false;
        }
        this.videoList = [];
        this.clipingNumber = [];
        this.currentType = data;
        this.page = 1;
        this.loadingDone = false;
        // 处于总览数据
        if(this.currentType==0){
          this.getVideoNumber();
          return false
        }
        // 处于等待剪辑
        if(this.currentType==1){
          this.getTotalNumber();
          this.getTotalNames();
          return false
        }
        // 处于正在剪辑
        if(this.currentType==2){
          this.selectStatus = "CLIPING";
        }
        // 处于剪辑完成
        if(this.currentType==3){
          this.selectStatus = "CLIP_FINISHED";
        }
        this.selectTypeVideos();
      },
      // 计算滑动条到顶部的距离
      calTop(data){
        this.sliderTop = data.detail.scrollTop;
      },
      // 用户开始接触屏幕时候的位置
      startSlider(data){
        this.startPosition = data.changedTouches[0].pageY;
      },
      // 用户滑动结束判断上滑还是下滑,只有正在剪辑才会下拉刷新数据，其它不用下拉刷新
      endSlider(e){
        if(this.currentType==1){
          if(e.changedTouches[0].pageY>this.startPosition&&(e.changedTouches[0].pageY-this.startPosition)>=10&&this.sliderTop<=5){
            // 下滑刷新隐藏
            this.sliderStatus = true;
            this.page = 1;
            this.loadingDone = false;
            this.sliderUp = true;
            this.selectTypeVideos();
          }
        }
      },
    },
  }
</script>

<style lang="scss">
  @import "@/static/style/vantprop";
  ::-webkit-scrollBar{
    display: none;
  }
  .typeColor::after{
    position: absolute;
    width: 50rpx;
    left: 50%;
    transform: translateX(-50%);
    content: "";
    display: block;
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
