<template>
	<view class="width-shi heichi100 ba-f7 bawhite overflow-hidden">
    <view class="heichixu80 marginy20">
      <view style="margin:0rpx 20rpx;white-space: nowrap">
        <scroll-view scroll-x="true" :show-scrollbar="false" class="heichi60 width-full" style=" margin-bottom: 40rpx;">
         <view v-for="(item,index) in timeList"
            class="timeDuration letter-spacing1"
            :style="{backgroundColor:timeIndex==index?'#7E71F0':'',color:timeIndex==index?'white':'balck'}"
            @click="selectDuration({item,index})"
            :key="index"
          >
            {{item}}
          </view>
        </scroll-view>
        <scroll-view scroll-x="true" :show-scrollbar="false" class="heichi60" :scroll-top="scrollHeight">
          <view v-for="(item,index) in roomsList"
            class="timeDuration black letter-spacing1"
            :style="{backgroundColor:houseIndex==index?'#7E71F0':'',color:houseIndex==index?'white':'balck'}"
            @click="selectHouse({item,index})"
            :key="index"
          >
            {{index==0?"全部舞房":item.name}}
          </view>
        </scroll-view>
      </view>
    </view>

    <scroll-view 
      scroll-y="true" 
      class="height-80 overflow-hidden"
      :show-scrollbar="false"
      @scrolltoupper="scroolTop"
      @scrolltolower="scroolBottom" 
    >
      <view class="height-full " style="margin-top: 10rpx;">
        <view v-if="allVideos.length==0" class="absolute margtop50zhi text-center margleftchi50 translatex-50 widthchi210 line-heichi60 gray" >
          请尝试重新拍照查询或联系管理员查看所有视频!
        </view>
        <view v-if="allVideos.length!=0" class="flex flexwrap height-full marginx10" style="align-content: flex-start;" >
          <videoData 
            v-for="(item,index) in allVideos" 
            :key="index" 
            :video="item">
          </videoData>
        </view>
      </view>

    </scroll-view>
	</view>
</template>

<script>
  import { mapState, mapMutations, } from "vuex"
  import { getAllvideos } from "@/api/search.js"
  import { videoData } from "@/components/videoData"
	export default {
		data() {
			return {
        // 是否切换舞蹈房
        changeHouse:false,
        // 时间选择索引
        timeIndex:0,
        // 舞蹈房算则索引
        houseIndex:0,
        // 顶部选择的时间段数组
        timeList:[],
        // 顶部的选择教室的数组
        roomsList:[],
        // 视频搜索的场地id数组
        siteArray:[],
        // 根据人脸以及时间信息获得的所有视频
        allVideos:[],
        // 搜索初始的页码数
        currentPage:1,
        // 每个页码所存放的视频数
        perPage:12,
        // 数据是否加载完毕
        loadingDone:false,
        // 所选舞房ID
        houseId:"",
        // 搜索的开始时间
        startTime:"",
        // 搜索的结束时间
        stopTime:"",
        // 滚动条的高度
        scrollHeight:0,
        // 一次请求完事再进行下次请求
        requestDone:true,
			}
		},
    components: {
      videoData,
    },
    computed: {
      ...mapState("m_venues",["siteInfos"]),
      ...mapState("m_video",["searchData","allSearchVideos"]),
      ...mapState("m_user",["faceSelect"]),
    },
    created() {
      this.getRooms()
      this.initTime()
      this.getVideosByFace()
      this.setAllSearchVideos([])
    },
		methods: {
      ...mapMutations("m_video",
      ["setAllSearchVideos",
      "setVideoPages",
      "setSearchData",
      "setSearchData",
      "setVideoHouse",
      ]),
      // 选择各个小时间段
      selectDuration(data){
        if(this.timeIndex==data.index){
          return false
        }
        this.timeIndex = data.index
        this.currentPage = 1
        this.loadingDone = false
        this.setAllSearchVideos([])
        if(data.index==0){
          this.startTime = this.searchData.startTime.split(" ")[0]+" "+"00:00:00"
          this.stopTime = this.searchData.stopTime.split(" ")[0]+" "+"24:00:00"
          this.setSearchData({houseId:this.houseId,startTime:this.startTime,stopTime:this.stopTime})
        }
        else{
          this.startTime = this.searchData.startTime.split(" ")[0]+" "+data.item.split("~")[0]+":00"
          this.stopTime = this.searchData.stopTime.split(" ")[0]+" "+data.item.split("~")[1]+":00"
          this.setSearchData({houseId:this.houseId,startTime:this.startTime,stopTime:this.stopTime})
        }
        this.getVideosByFace()
      },
      // 选择舞蹈房
      selectHouse(data){
        if(this.houseIndex == data.index){
          return false
        }
        var siteId = data.item.id
        this.scrollHeight = 0
        this.houseIndex = data.index
        this.currentPage = 1
        this.loadingDone = false
        this.setAllSearchVideos([])
        if(data.index==0){
          this.siteArray = this.siteInfos.map(item=>{
            return item.id
          })
          this.getVideosByFace()
          this.setVideoHouse({id:siteId,clickStatus:false})
          return false
        }
        else{
          this.siteArray = [data.item.id]
          this.getVideosByFace()
          this.setVideoHouse({id:siteId,clickStatus:true})
          return false
        }
      },
      // 初始化时间段
      initTime(){
        this.houseId = this.searchData.houseId
        this.startTime = this.searchData.startTime 
        this.stopTime = this.searchData.stopTime 
        this.timeList.push("所有时段")
        for(var i=1;i<=12;i++){
          let tempTime = i*2>9?i*2:"0"+i*2
          let tempStr = (tempTime - 2)>9?(tempTime - 2):"0"+(tempTime - 2)
          this.timeList.push(tempStr+":00~"+tempTime+":00")
        }
      },
      // 根据舞蹈房ID获得教室
      async getRooms(){
        this.siteArray = this.siteInfos.map(item=>{
          return item.id
        })
        this.roomsList = this.siteInfos.concat([])
        this.roomsList.unshift("全部舞房")
      },
      // 根据人脸以及时间站点信息获得全部搜索视频
      async getVideosByFace(){
        if(this.requestDone){
          this.requestDone = false
          if(this.loadingDone){
            return false
          }
          this.$showLoading("加载中！","none")
          const {data} = await getAllvideos(this.siteArray,this.startTime,this.stopTime,this.currentPage,this.perPage,this.faceSelect)
          this.requestDone = true
          this.$hideLoading()
          this.loadingDone = data.length<this.perPage
          this.allVideos = [...this.allSearchVideos,...data]
          console.log("正常拉取",this.allVideos)
          this.setAllSearchVideos([...this.allVideos])
          this.setVideoPages({curPage:this.currentPage,perPage:this.perPage})
        }
      },
      // 下拉到底刷新数据
      async scroolBottom() {
        console.log("下滑")
        if(this.allVideos.length>=this.perPage){
          if(this.loadingDone){
            this.$showMsg("视频已加载完毕！")
            return false
          }
          this.currentPage++
          this.getVideosByFace()
        }
        
      },
      // 向上滑动更新所有的视频数据
      async scroolTop(){
        console.log("上滑")
        var upPage = 1
        if(this.requestDone){
          this.requestDone = false
          this.$showLoading("加载中！","none")
          const {data} = await getAllvideos(this.siteArray,this.startTime,this.stopTime,upPage,this.perPage,this.faceSelect)
          this.$hideLoading()
          this.requestDone = true
          // 上滑数组筛选
          this.allVideos = this.allVideos.filter((item,index)=>{
            if(data[index]&&data[index].id!=item.id){
              return item
            }
            if(!data[index]){
              return item
            }
          })
          this.allVideos = [...data,...this.allVideos]
          this.setAllSearchVideos([...this.allVideos])
          this.setVideoPages({curPage:upPage,perPage:this.perPage})
        }
      },
    },
	}
</script>

<style lang="scss">
  ::-webkit-scrollbar{
    display: none;
  }
  .timeDuration{
    display: inline-block;
    text-align: center;
    padding: 0rpx 50rpx;
    height: 60rpx;
    line-height: 60rpx;
    font-size: 30rpx;
    border-radius: 30rpx;
  }
</style>
