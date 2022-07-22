<template>
	<view class="width-shi heichi100 ba-f7 bawhite overflow-hidden">
    <nvg-bar>
      <template v-slot:icon><text class="iconfont icon-fanhui fon32 black"></text></template>
      <template v-slot:text><text class="black ">剪辑视频</text></template>
    </nvg-bar>
    <scroll-view 
      scroll-y="true" 
      class="height-full"
      :show-scrollbar="false"
      @scrolltoupper="scroolTop"
      @scrolltolower="scroolBottom" 
    >
       <view class="flex flexwrap " style="align-content: flex-start;margin: 10rpx 20rpx 0rpx 20rpx; " >
          <videoData
            v-for="(item,index) in clipVideos" 
            :key="index" 
            :video="item">
          </videoData>
        </view>
    </scroll-view>
	</view>
</template>

<script>
  import { mapState, mapMutations, } from "vuex"
  import { getAllvideos } from "@/api/search.js"
  import { videoData } from "@/components/videoData"
  import nvgBar from "@/components/nvgBar"
	export default {
		data() {
			return {
        // 根据大视频获得小视频的record_name
        recordName:"",
        // 根据大视频获得小视频的总数
        clipVideos:[],
        // 检索的舞房ID数组
        sitesList:[],
        // 每页检索多少个视频
        perPage:12,
        // 当前是第几页
        currentPage:1,
        // 查询视频得种类
        videoType:"child",
        // 防止同一接口多次请求
        requestOne:true,
        // 数据加载完毕
        loadingNone:false,
			}
		},
    components: {
      videoData,
      nvgBar,
    },
    computed: {
      ...mapState("m_video",["searchData","siteId","selectSite",]),
      ...mapState("m_user",["faceSelect"]),
      ...mapState("m_venues",["siteInfos",])
    },
    onLoad(e) {
      this.recordName = e.name
      if(this.selectSite){
        this.sitesList = [this.siteId]
      }
      else{
        this.sitesList = this.siteInfos.map(item=>{
          return item.id
        })
      }
      this.getClipVideos()
      this.setAllSearchVideos([])
    },
		methods: {
      ...mapMutations("m_video",
      ["setAllSearchVideos",
      "setVideoPages",
      ]),
      // 根据集体视频获得子视频
      async getClipVideos(){
        if(this.requestOne){
          this.requestOne = false
          if(this.loadingNone){
            this.$showMsg("视频已加载完毕！")
            return false
          }
          this.$showLoading("加载中！","none")
          const {data} = await getAllvideos(this.sitesList,this.searchData.startTime,this.searchData.stopTime,this.currentPage,this.perPage,this.faceSelect,this.videoType)
          this.requestOne = true
          this.$hideLoading()
          this.loadingNone = data.length<this.perPage
          this.clipVideos = [...this.clipVideos,...data]
          this.clipVideos = this.clipVideos.slice(0,10)
          console.log("正常拉取",this.clipVideos)
          this.setAllSearchVideos([...this.clipVideos])
          this.setVideoPages({curPage:this.currentPage,perPage:this.perPage})
        }
      },
      // 上拉刷新新的小视频
      async scroolTop(){
        console.log("上外")

          console.log("上里")
          var upPage = 1
          if(this.requestOne){
            this.requestOne = false
            this.$showLoading("加载中！","none")
            let {data} = await getAllvideos(this.sitesList,this.searchData.startTime,this.searchData.stopTime,upPage,this.perPage,this.faceSelect,this.videoType)
            console.log("shanghua",data)
            this.$hideLoading()
            this.requestOne = true
            // 上滑数组筛选
            this.clipVideos = this.clipVideos.filter((item,index)=>{
              if(data[index]&&data[index].id!=item.id){
                return item
              }
              if(!data[index]){
                return item
              }
            })
            this.clipVideos = [...data,...this.clipVideos]
            this.setAllSearchVideos([...this.clipVideos])
            console.log("shanghua123",this.clipVideos)
          }
      },
      // 下滑刷新新的小视频
      async scroolBottom(){
        console.log("xia外")
        if(this.clipVideos.length>=this.perPage){
          console.log("xia里")
          this.currentPage++
          this.getClipVideos()
        }
      }
    }
	}
</script>

<style lang="scss">
  ::-webkit-scrollbar{
    display: none;
  }
</style>

