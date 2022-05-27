<template>
	<view class="container">
    <scroll-view 
      scroll-y="true" 
      style="height: 50%;" 
      @scrolltolower="scroolBottom" 
    >
      <view class="videoShow" v-if="allVideoShow">
        当前时段暂无视频
      </view>
      <view v-else>
        <view style="display: flex; flex-wrap: wrap; ">
          <view class="white" v-for="(item,index) in allVideos" :key="index">
            <videoData :video="item"></videoData>
          </view>
        </view>
        <view class="placeholder" style="width: 320rpx; height: 180rpx;"></view>
      </view>

    </scroll-view>
	</view>
</template>

<script>
  import { mapState,mapActions,mapMutations } from 'vuex'
  import { videoDate } from '@/components/videoData/videoData.vue'
  import Toast from '@/wxcomponents/vant/toast/toast.js'
	export default {
		data() {
			return {
        // 搜索出来的是否具有视频
        allVideoShow: false,
        // 根据人脸以及时间信息获得的所有视频
        allVideos:[],
        // 搜索初始的页码数
        currentPage:1,
        // 每个页码所存放的视频数
        perPage:20,
        // 数据是否加载完毕
        loadingDone:false,
        // 所选舞房ID
        houseId:"",
        // 所选搜索时间
        houseTime:"",
        // 搜索的开始时间
        startTime:"",
        // 搜索的结束时间
        stopTime:"",
			}
		},
    components: {
      videoDate,
    },
    computed: {
      ...mapState('m_venues',['showTimeArr','videoShow','newSiteIdVideo']),
      ...mapState('m_cart',['cart']),
      ...mapState('m_user',['userinfo'])
    },
    onLoad(data) {
      this.houseId = data.houseId
      this.houseTime = data.selectTime
      this.startTime = this.houseTime + " " + "00:00:00"
      this.stopTime =this.houseTime + " " + "24:00:00"
      this.initTime()
      this.getVideosByFace()
    },
		methods: {
      ...mapMutations('m_venues',['updatePage','clearPage','clearSiteIdVideo']),
      ...mapMutations("m_video",["setAllSearchVideos","setVideoPages"]),
      // 初始化时间段
      initTime(){
        
      },
      // 根据人脸以及时间站点信息获得全部搜索视频
      async getVideosByFace(){
        const {data} = await uni.$http.post('/search/hidancing_search', {
          start_time: this.startTime,
          stop_time: this.stopTime,
          venue_id: parseInt(this.houseId) ,
          page:this.currentPage,
          per_page:this.perPage,
          applet:"HiDancing"
        })
        if(data.data.length==0){
          this.allVideoShow = true
        }
        this.loadingDone = data.data.length<this.perPage
        this.allVideos = [...data.data]
        this.setAllSearchVideos([...data.data])
        this.setVideoPages({curPage:this.currentPage,perPage:this.perPage})
      },
      change(e) {
        this.clearPage()
        console.log(e.detail.title)
        console.log('change')
          if (e.detail.title == '三分球') {
            this.getVideo({
              start_time: this.startTime,
              stop_time: this.stopTime,
              goal_category: '三分球'
          })
          }
          else if(e.detail.title == '两分球') {
            console.log('22')
            this.getVideo({
              start_time: this.startTime,
              stop_time: this.stopTime,
              goal_category: '两分球'
          })
        }
        else if(e.detail.title == '全部' || e.detail.title== '进球类型'  ) {
          this.getVideo( {
            start_time: this.startTime,
            stop_time: this.stopTime,
            goal_category: ''
          })
        }
        else if(e.detail.title == '时段' ){
          this.getVideo({
            start_time: this.startTime,
            stop_time: this.stopTime
          })
        }
      },
      async changes(e) {
        this.clearSiteIdVideo()
        this.clearPage()
        console.log(e.detail.title)
        console.log('changes')
        if(e.detail.title == '全部') {
          this.getVideo( {
            start_time: this.startTime,
            stop_time: this.stopTime
          })
        } 
        else {
          var start = `${this.startTime.slice(0,10)} ${e.detail.title.slice(0,5)}:00`
          var stop = `${this.stopTime.slice(0,10)} ${e.detail.title.slice(6,11)}:00`
          this.getVideo( {
            start_time: start,
            stop_time: stop
          })
        }
        console.log(this.siteIdVideo)
      },
      upper() {
        uni.$showMsg('已经是最新数据')
      },
      // 下拉到底刷新数据
      async scroolBottom() {
        console.log("1111")
        if(this.loadingDone){
          uni.$showMsg("数据已经加载完毕")
          return false
        }
        this.currentPage++
        const {data} = await uni.$http.post('/search/hidancing_search', {
          start_time: "2022-05-13 07:45:13",
          stop_time: "2022-05-13 13:46:13",
          venue_id:22,
          page:this.currentPage,
          per_page:this.perPage,
          applet:"HiDancing"
        })
        this.loadingDone = data.data.length<this.perPage
        this.allVideos = [...this.allVideos,...data.data]
        this.setAllSearchVideos([...this.allVideos])
        this.setVideoPages({curPage:this.currentPage,perPage:this.perPage})
      },
		}
	}
</script>

<style lang="scss">
  @import '@/style/allVideo'
</style>
