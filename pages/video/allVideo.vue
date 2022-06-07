<template>
	<view class="container">
    <view class="selectType">
      <view style="margin:0rpx 20rpx;white-space: nowrap">
        <scroll-view scroll-x="true" class="scrollClass" style=" margin-bottom: 40rpx;width: 100%;">
         <view v-for="(item,index) in timeList"
            class="timeDuration"
            :style="{backgroundColor:timeIndex==index?'#7E71F0':''}"
            @click="selectDuration({item,index})"
            :key="index"
          >
            {{item}}
          </view>
        </scroll-view>
        <scroll-view scroll-x="true" class="scrollClass">
          <view v-for="(item,index) in roomsList"
            class="timeDuration"
            :style="{backgroundColor:houseIndex==index?'#7E71F0':''}"
            @click="selectHouse({item,index})"
            :key="index"
          >
            {{index==0?"全部":item.name}}
          </view>
        </scroll-view>
      </view>
    </view>
    <scroll-view 
      scroll-y="true" 
      style="height: 85%;width: 100%;"
      @scrolltolower="scroolBottom" 
    >
      <view v-if="allVideos.length==0" class="videoShow" >
        当前时段暂无视频
      </view>
      <view v-else style="display: flex;flex-wrap: wrap; margin:0rpx 20rpx;">
        <videoData 
          v-for="(item,index) in allVideos" 
          :key="index" 
          :video="item">
        </videoData>
      </view>
      <view style="height: 200rpx;">
        
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
        // 舞蹈房的站点id
        siteId:0,
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
			}
		},
    components: {
      videoData,
    },
    computed: {
      ...mapState("m_venues",["siteInfos"]),
      ...mapState("m_video",["searchData","allSearchVideos"]),
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
        this.siteId = data.item.id
        console.log("查看id",this.siteId)
        this.houseIndex = data.index
        this.currentPage = 1
        this.loadingDone = false
        this.setAllSearchVideos([])
        if(data.index==0){
          this.siteArray = this.siteInfos.map(item=>{
            return item.id
          })
          this.getVideosByFace()
          this.setVideoHouse({id:this.siteId,clickStatus:false})
          return false
        }
        else{
          this.siteArray = [data.item.id]
          this.getVideosByFace()
          this.setVideoHouse({id:this.siteId,clickStatus:true})
          return false
        }
      },
      // 初始化时间段
      initTime(){
        console.log(this.searchData)
        this.houseId = this.searchData.houseId
        this.startTime = this.searchData.startTime 
        this.stopTime = this.searchData.stopTime 
        this.timeList.push("全部")
        for(var i=1;i<=12;i++){
          let tempTime = i*2>9?i*2:"0"+i*2
          let tempStr = (tempTime - 2)>9?(tempTime - 2):"0"+(tempTime - 2)
          this.timeList.push(tempStr+":00~"+tempTime+":00")
        }
        console.log("时间段",this.timeList)
      },
      // 根据舞蹈房ID获得教室
      async getRooms(){
        console.log("查看所有场地",this.siteInfos)
        this.siteArray = this.siteInfos.map(item=>{
          return item.id
        })
        this.roomsList = this.siteInfos.concat([])
        this.roomsList.unshift("全部")
        console.log(this.roomsList)
        console.log("输出站点数组",this.siteArray)
      },
      // 根据人脸以及时间站点信息获得全部搜索视频
      async getVideosByFace(){
        const {data} = await getAllvideos(this.siteArray,this.startTime,this.stopTime,this.currentPage,this.perPage,false)
        this.loadingDone = data.data.length<this.perPage
        this.allVideos = [...this.allSearchVideos,...data.data]
        this.setAllSearchVideos([...this.allVideos])
        this.setVideoPages({curPage:this.currentPage,perPage:this.perPage})
      },
      // 下拉到底刷新数据
      async scroolBottom() {
        if(this.loadingDone){
          this.$showMsg("数据已经加载完毕")
          return false
        }
        this.currentPage++
        this.getVideosByFace()
      }
    },
	}
</script>

<style lang="scss">
  @import "@/static/style/allVideo"
</style>
