<template>
	<view class="width-shi heichi100 ba-f7 bawhite overflow-hidden">
<!--    <view class="heichixu80 marginy20">
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
    </view> -->
    <scroll-view 
      scroll-y="true" 
      class="height-90 overflow-hidden"
      :show-scrollbar="false"
      @scrolltolower="scroolBottom(false)"
      @scrolltoupper="scroolTop(false)"
      @touchstart="startScrol"
      @touchend="endScrol"
    >
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
        // 可以搜索的视频数量
        currentNumber:0,
        // 每次搜索的最新的进球时间
        perTime:"",
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
        // 防抖上滑定时器
        upTimer:null,
        // 防抖下滑定时器
        downTimer:null,
			}
		},
    components: {
      videoAll,
    },
    computed: {
      ...mapState("m_venues",["siteInfos"]),
      ...mapState("m_video",["searchData",]),
      ...mapState("m_user",["faceSelect"]),
      ...mapState("m_device",["deviceInfo"]),
    },
    created() {
      this.getRooms()
      this.getAllDancTypes()
    },
		methods: {
      ...mapMutations("m_video",[
      "setSelectSite",
      "setSiteId",
      ]),
      ...mapMutations("m_venues",["setSiteInfos"]),
      // 上滑
      startScrol(data){
        this.startPosition = data.changedTouches[0].pageY
      },
      // 滑动结束
      endScrol(e){
        if(this.allVideos.length<this.currentNumber&&this.allVideos){
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
          this.currentNumber = 12
        }
        else{
          this.videoType = "parent"
          this.currentNumber = 5
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
        var start = this.startTime.split(" ")[0] +"_"+ this.startTime.split(" ")[1].replace(/:/g,"-")
        var end = this.stopTime.split(" ")[0] +"_"+ this.stopTime.split(" ")[1].replace(/:/g,"-")
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
          let {data} = await getAllvideos(this.siteArray,this.startTime,this.stopTime,this.currentNumber,this.perTime,this.faceSelect,this.videoType,this.selectLabel)
          this.requestDone = true;
          this.perTime = data.length>0&&data[data.length-1].goal_time;
          this.$hideLoading()
          this.loadingDone = data.length<this.currentNumber
          this.allVideos = [...this.allVideos,...data]
        }
      },
      // 下拉到底刷新数据
      async scroolBottom(status) {
        if(this.downTimer){
          clearTimeout(this.downTimer)
        }
        this.downTimer = setTimeout(()=>{
          if(this.allVideos.length>=this.currentNumber||JSON.parse(status)){
            this.getVideosByFace()
          }
        },500)
      },
      // 向上滑动更新所有的视频数据
      async scroolTop(status){
          if(this.upTimer){
            clearTimeout(this.upTimer)
          }
          this.upTimer = setTimeout(async ()=>{
            if(this.allVideos.length>=this.currentNumber||JSON.parse(status)){
              this.perTime = "";
              if(this.requestDone){
                this.requestDone = false
                this.$showLoading("加载中！","none");
                let {data} = await getAllvideos(this.siteArray,this.startTime,this.stopTime,this.currentNumber,this.perTime,this.faceSelect,this.videoType,this.selectLabel)
                this.$hideLoading();
                this.perTime = data.length>0&&data[data.length-1].goal_time;
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
          },500)
      },
    },
	}
</script>

<style lang="scss">
  ::-webkit-scrollbar{
    display: none;
  }
</style>
