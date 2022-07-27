<template>
	<view class="width-shi heichi100 ba-f7 bawhite overflow-hidden">
    <view class="heichixu80 marginy20">
      <view style="white-space: nowrap" class="marginx10">
        <scroll-view scroll-x="true" :show-scrollbar="false" class="heichi60 width-full" style=" margin-bottom: 40rpx;">
         <view v-for="(item,index) in techDancTypes"
            class="display-block paddingx25 line-heichi60 heichi60 fon28 boradiu30 text-center letter-spacing1"
            :style="{backgroundColor:timeIndex==index?'#7E71F0':'',color:timeIndex==index?'white':'balck'}"
            @click="selectDuration({item,index})"
            :key="index"
          >
            {{item}}
          </view>
        </scroll-view>
        <scroll-view scroll-x="true" :show-scrollbar="false" class="heichi60" >
          <view v-for="(item,index) in roomsList"
            class="display-block paddingx25 line-heichi60 heichi60 fon28 boradiu30 text-center black letter-spacing1"
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
      @scrolltoupper="scroolTop(false)"
      @scrolltolower="scroolBottom(false)"
      @touchstart="startScrol"
      @touchend="endScrol"
    >
      <view class=" margtop10">
        <view v-if="allVideos.length==0" class="absolute margtop50zhi text-center margleftchi50 translatex-50 widthchi210 line-heichi60 gray" >
          请尝试重新拍照查询或联系管理员查看所有视频!
        </view>
        <view v-if="allVideos.length!=0&&!faceSelect" class="marginx10">
         <videoAll
            v-for="(item,index) in allVideos" 
            :key="index" 
            :videoAll="item">
          </videoAll>
        </view>
        <view class="flex flexwrap " style="align-content: flex-start;margin: 10rpx 20rpx 0rpx 20rpx; " 
        v-if="allVideos.length!=0&&faceSelect" >
         <videoData
            v-for="(item,index) in allVideos" 
            :key="index" 
            :videoAll="item">
          </videoData>
        </view>
         <view class="heichishi100">
           
         </view>
      </view>

    </scroll-view>
	</view>
</template>

<script>
  import { mapState, mapMutations, } from "vuex"
  import { getAllvideos, getVideoLabel } from "@/api/search.js"
  import { getSites } from "@/api/venues.js"
  import videoAll  from "@/components/videoAll"
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
        // 一次请求完事再进行下次请求
        requestDone:true,
        // 查找集体视频还是小视频
        videoType:"",
        // 开始滑动时的坐标位置
        startPosition:0,
        // 所有老师的标签
        techDancTypes:[],
        // 查询单个老师的标签
        selectLabel:"",
			}
		},
    components: {
      videoAll,
    },
    computed: {
      ...mapState("m_venues",["siteInfos"]),
      ...mapState("m_video",["searchData",]),
      ...mapState("m_user",["faceSelect"]),
    },
    created() {
      this.getRooms()
      this.getAllDancTypes()
    },
		methods: {
      ...mapMutations("m_video",[
      "setSearchData",
      "setSelectSite",
      "setSiteId",
      ]),
      ...mapMutations("m_venues",["setSiteInfos"]),
      // 上滑
      startScrol(data){
        console.log("开始",data.changedTouches[0].pageY)
        this.startPosition = data.changedTouches[0].pageY
      },
      // 滑动结束
      endScrol(e){
        console.log("结束",e.changedTouches[0].pageY)
        if(this.allVideos.length<this.perPage&&this.allVideos){
          if(e.changedTouches[0].pageY>this.startPosition&&(e.changedTouches[0].pageY-this.startPosition)>=10){
            this.scroolTop(true)
          }
          if(e.changedTouches[0].pageY<this.startPosition&&(this.startPosition-e.changedTouches[0].pageY)>=10){
            this.scroolBottom(true)
          }
        }
      },
      // 获得舞房有多少个房间
      async getRooms(){
        if(this.faceSelect){
          this.videoType = "child"
        }
        else{
          this.videoType = "parent"
        }
        await getSites(this.searchData.houseId).then(data=>{
          this.setSiteInfos(data.data)
          this.siteArray = data.data.map(item=>{
            return item.id
          })
          this.getVideosByFace()
          this.roomsList = this.siteInfos.concat([])
          this.roomsList.unshift("全部舞房")
        })
      },
      // 获得所有舞蹈老师的跳舞种类
      async getAllDancTypes(){
        this.houseId = this.searchData.houseId
        this.startTime = this.searchData.startTime 
        this.stopTime = this.searchData.stopTime
        console.log("开始时间",this.startTime,this.searchData.startTime)
        var start = this.startTime.split(" ")[0] +"_"+ this.startTime.split(" ")[1].replace(/:/g,"-")
        var end = this.stopTime.split(" ")[0] +"_"+ this.stopTime.split(" ")[1].replace(/:/g,"-")
        console.log("asdjsa",start)
        let {data} = await getVideoLabel(this.searchData.houseId,start,end)
        this.techDancTypes = data
        this.techDancTypes = this.techDancTypes&&this.techDancTypes.map(item=>{
          return item.label
        })
        this.techDancTypes.unshift("全部老师")
      },
      // 选择各个小时间段
      selectDuration(data){
        if(this.timeIndex==data.index){
          return false
        }
        this.allVideos = []
        this.timeIndex = data.index
        this.currentPage = 1
        this.loadingDone = false
        if(data.index==0){
          this.selectLabel = ""
        }
        else{
          this.selectLabel = this.techDancTypes[data.index]
        }
        this.getVideosByFace()
      },
      // 选择舞蹈房
      selectHouse(data){
        if(this.houseIndex == data.index){
          return false
        }
        this.allVideos = []
        this.houseIndex = data.index
        this.currentPage = 1
        this.loadingDone = false
        if(data.index==0){
          this.setSelectSite(false)
          this.siteArray = this.siteInfos.map(item=>{
            return item.id
          })
          this.getVideosByFace()
          return false
        }
        else{
          let siteId = data.item.id
          this.siteArray = [siteId]
          this.setSiteId(siteId)
          this.setSelectSite(true)
          this.getVideosByFace()
          return false
        }
      },
      // 根据人脸以及时间站点信息获得全部搜索视频
      async getVideosByFace(){
        if(this.requestDone){
          this.requestDone = false
          if(this.loadingDone){
            this.$showMsg("视频已加载完毕！")
            this.requestDone = true
            return false
          }
          this.$showLoading("加载中！","none")
          let {data} = await getAllvideos(this.siteArray,this.startTime,this.stopTime,this.currentPage,this.perPage,this.faceSelect,this.videoType,this.selectLabel)
          console.log("输出数值",data)
          this.requestDone = true
          this.$hideLoading()
          this.loadingDone = data.length<this.perPage
          this.allVideos = [...this.allVideos,...data]
        }
      },
      // 下拉到底刷新数据
      async scroolBottom(status) {
        if(this.allVideos.length>=this.perPage||JSON.parse(status)){
          this.currentPage++
          this.getVideosByFace()
        }
      },
      // 向上滑动更新所有的视频数据
      async scroolTop(status){
        if(this.allVideos.length>=this.perPage||JSON.parse(status)){
          var upPage = 1
          if(this.requestDone){
            this.requestDone = false
            this.$showLoading("加载中！","none")
            let {data} = await getAllvideos(this.siteArray,this.startTime,this.stopTime,this.currentPage,this.perPage,this.faceSelect,this.videoType,this.selectLabel)
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
          }
        }
      },
    },
	}
</script>

<style lang="scss">
  ::-webkit-scrollbar{
    display: none;
  }
</style>
