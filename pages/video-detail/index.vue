<template>
  <view 
    @touchstart="selectPre"
    @touchend="selectNext"
    class="width-full background-cover" 
    style="background-image: url(https://static.qiniuyun.highvenue.cn/image/video_beijing2.jpg);">
    <view :style="{height:calVideoHeight}" class=" width-full relative">
      <video
       :class="['width-full',isTotal?'absolute top-half left-half translate--50 heichi210':'height-full'] "
       id="myVideo"
       :src="playVideo.download_src"
       @click="clickControl"
       controls
       loop
       objectFit="cover"
       :show-fullscreen-btn="false"
       :show-play-btn="false"
       :show-bottom-progress="true"
       autoplay="true"
       >
      </video>
      <view v-if="tipInfo" 
        class="absolute top0"
        :style="{left:deviceInfo.menuInfo.left+'px'}"
        >
        <view class="heichixu80 widchi50 translatex-50 background-cover" style="background-image: url(https://static.qiniuyun.highvenue.cn/image/hidancing_tishi.png);">
          
        </view>
        <view class="widchi120 text-center translatex-50 white">
          点击“...”可以将视频分享至朋友圈~
        </view>
      </view>
      <view
        class=" absolute width-full left0 heichifan120 bottom200">
        <view 
          :style="{marginLeft:(deviceInfo.screenWidth - deviceInfo.menuInfo.right)+'px'}"
        >
          <view v-show="isTotal" class="fon24 white heichi50 line-heichi50 marginbottom10">
            集体视频
          </view>
          <view class="white fon36 ellipsis widthchi210 heichi50 line-heichi50 marginbottom10" >
            {{playVideo.venue_name}}
          </view>
          <view class="heichi50 paddingx12 line-heichi50 bayello boradiu50 fon24 white widthtext marginbottom10">
            {{"#" + playVideo.data.label}}
          </view>
          <view class="fon24 white heichi50 line-heichi50">
            {{playVideo.goal_time}}
          </view>
        </view>
      </view>
      <view v-if="!isShare" class="absolute background-cover widchi30 heichiduan73 left-half bottom50 translate--50"
        style="background-image: url(https://static.qiniuyun.highvenue.cn/image/video_.png);"
        >
        
      </view>
    </view>
    <view v-show="!isShare" 
      class="absolute right20 bottom200  widchi50 heichifan150 flex flex-direction justify-between alitem-center">
      <view class="widchi50 bawhite bg-father heichixu100 boradiu20 flex justify-center alitem-center">
        <button
          class="bg-trans widchi20 bawhite bg-father heichixu100 boradiu20 flex justify-center alitem-center"
          open-type="share"
        >
          <view class="iconfont icon-zhuanfa white fon60 white opcity10" ></view>
        </button>
      </view>
      <view
        @click="downloadVideo"
        class="widchi50 bawhite bg-father heichixu100 boradiu20 flex justify-center alitem-center">
         <view class="iconfont icon-xiazaidaoru white fon60 opcity10" ></view>
      </view>
    </view>
    <uni-popup ref="cameraPermiss" type="dialog">
    	<uni-popup-dialog type="info" mode="base" content="您已拒绝该项授权，如需开启，请点击确认进入设置页面重新授权" :duration="2000" :before-close="true" @close="closeCamera" @confirm="confirmCamera"></uni-popup-dialog>
    </uni-popup>
  </view>
</template>

<script>
  import { mapState, mapMutations } from "vuex"
  import { addDownload, getVideo, } from "@/api/video.js"
  import { getAllvideos } from "@/api/search.js"
  export default {
    data() {
      return {
        // 当前视频播放的信息
        playVideo:null,
        // 当前视频所在全部视频的索引号
        numberId:0,
        // 每一页拉取的视频数量
        count:10,
        // 最后的进球时间
        lastGoalTime:"",
        // 最后一个视频的标志
        lastVideoStatus:false,
        // 当前微信创建的播放对象
        videoContent:null,
        // 当前视频播放与否
        isPlay:true,
        // 是否是集体视频
        isTotal:false,
        // 是否分享视频
        isShare:false,
        // 分享进来的video_id
        shareId:0,
        // 查询视频得种类
        videoType:"child",
        // 战报搜索所选的站点
        sitesList:[],
        // 是否是查看集体视频
        isAll:false,
        // 开始滑动的位置
        sliderPosition:0,
        // 视频播放的提示信息
        tipInfo:true,
      };
    },
    onLoad(e) {
      if(e.id){
        this.isShare = true
        this.shareId = e.id
        this.getVideoDetail()
        return false
      }
      this.playingVideo(e.all)
    },
    computed: {
      ...mapState("m_video",[
        "currentVideo",
        "allSearchVideos",
        "videoPages",
        "searchData",
        "siteId",
        "selectSite",
      ]),
      ...mapState("m_venues",["siteInfos"]),
      ...mapState("m_device",["deviceInfo"]),
      ...mapState("m_user",["userInfo","faceSelect"]),
      ...mapState("m_video",["currentAllVideos"]),
      calHeight(){
        return this.deviceInfo&&this.deviceInfo.screenHeight + 'px'
      },
      calVideoHeight(){
        return this.deviceInfo&&this.deviceInfo.screenHeight-90 + 'px'
      },
    },
    // 分享到群聊
    onShareAppMessage(res) {
      wx.reportEvent("share_video", {
        "user_id": this.userInfo.data.id,
        "user_name": this.userInfo.data.open_data.nickName?this.userInfo.data.open_data.nickName:"未获得名字",
        "dancingroom_id": this.playVideo.venue_id,
        "dancingroom_name": this.playVideo.venue_name,
        "video_id": this.playVideo.id,
      })
      return {
        title: `快来欣赏我在${this.playVideo.venue_name}的精彩视频吧~`,
        path:`/pages/video-detail/index?id=${this.playVideo.id}`,
      }
    },
    // 分享朋友圈
    onShareTimeline(){
      wx.reportEvent("share_friends_circle", {
        "video_id": this.playVideo.id,
        "user_id": this.userInfo.data.id,
        "dancingroom_id": this.playVideo.venue_id,
        "dancingroom_name": this.playVideo.venue_name
      })
      return {
        title: `快来欣赏我在${this.playVideo.venue_name}的精彩视频吧~`,
        query: `id=${this.playVideo.id}`,
      };
    },
    methods: {
      ...mapMutations("m_video",["setAllSearchVideos","setVideoPages"]),
      // 上一个视频
      async selectPre(data){
        this.sliderPosition = data.changedTouches[0].pageY
      },
      async selectNext(value){
        if(value.changedTouches[0].pageY>this.sliderPosition&&(value.changedTouches[0].pageY-this.sliderPosition)>=20){
          this.tipInfo = true
          setTimeout(()=>{
            this.tipInfo = false
          },2000)
          this.preVideo()
        }
        if(value.changedTouches[0].pageY<this.sliderPosition&&(this.sliderPosition-value.changedTouches[0].pageY)>=20){
          this.tipInfo = true
          setTimeout(()=>{
            this.tipInfo = false
          },2000)
          this.nextVideo()
        }
      },
      // 根据视频ID获得视频信息
      async getVideoDetail(){
        let {data} = await getVideo(this.shareId)
        this.playVideo = data
        this.isTotal = this.playVideo.name.split(".")[0].includes("group")
      },
      // 点击视频进行播放与否
      clickControl(){
        if(this.isPlay){
          this.videoContent.pause()
        }
        else{
          this.videoContent.play()
        }
        this.isPlay = !this.isPlay
      },
      // 播放当前视频
      playingVideo(value){
        if(this.selectSite){
          this.sitesList = [this.siteId]
        }
        else{
          this.sitesList = this.siteInfos.map(item=>{
            return item.id
          })
        }
        this.videoContent = wx.createVideoContext("myVideo")
        // 当前页面接收传递过来的视频对象
        if(JSON.parse(value)){
          this.playVideo = this.currentAllVideos
        }
        else{
          this.playVideo = this.currentVideo
        }
        this.isTotal = this.playVideo.name.split(".")[0].includes("group")
        // 当前页面接收传过来的视频页数
        this.lastGoalTime = this.videoPages.curTime;
        // we分析统计观看视频的次数
        wx.reportEvent("watch_video", {
          "dancingroom_name": this.playVideo.venue_name,
          "dancingroom_id": this.playVideo.venue_id,
          "video_id":this.playVideo.id,
          "user_name": this.userInfo.data.open_data.nickName?this.userInfo.data.open_data.nickName:"未获得名字",
          "user_id": this.userInfo.data.id
        })
        setTimeout(()=>{
          this.tipInfo = false
        },2000)
      },
      // 返回上一页
      goBack(){
        if(this.isShare){
          uni.navigateTo({
            url: "../index/index",
          })
          return false
        }
        uni.navigateBack({
        	delta: 1,
        });
      },
      // 上一个视频
      preVideo(){
        this.lastVideoStatus = false
        this.allSearchVideos.map((item,index)=>{
          if(item.id==this.playVideo.id){
            this.numberId = index
          }
        })
        // 播放的不是第一个视频
        if(this.numberId){
          this.playVideo = this.allSearchVideos[this.numberId-1]
        }
        // 若播放的是第一个视频
        else{
          uni.showToast({
          	icon:"none",
            title: "当前视频已是首个视频！",
          	duration: 1000
          });
        }
        // we分析统计观看视频的次数
        wx.reportEvent("watch_video", {
          "dancingroom_name": this.playVideo.venue_name,
          "dancingroom_id": this.playVideo.venue_id,
          "video_id":this.playVideo.id,
          "user_name": this.userInfo.data.open_data.nickName?this.userInfo.data.open_data.nickName:"未获得名字",
          "user_id": this.userInfo.data.id
        })
        this.isTotal = this.playVideo.name.split(".")[0].includes("group")
      },
      // 下一个视频
      async nextVideo(){
        if(this.lastVideoStatus){
          this.$showMsg("当前视频已是最后一个视频！");
        }
        else{
          this.allSearchVideos.map((item,index)=>{
            if(item.id==this.playVideo.id){
              this.numberId = index
            }
          })
          // 下一个是最后一个视频
          if(this.numberId==this.allSearchVideos.length-1){
            let {data} = await getAllvideos(this.sitesList,this.searchData.startTime,this.searchData.stopTime,this.count,this.lastGoalTime,this.faceSelect,this.videoType,"",this.currentAllVideos.data.record_name)
            if(data.length==0){
              uni.showToast({
                icon:"none",
                title: "当前视频已是最后一个视频！",
                duration: 1000
              })
              this.lastVideoStatus = true
            }
            else{
              this.setAllSearchVideos([...this.allSearchVideos,...data])
              this.setVideoPages({curTime:this.lastGoalTime,count:this.count})
              this.playVideo = this.allSearchVideos[this.numberId+1]
            }
          }
          // 不是最后一个视频
          else{
            this.playVideo = this.allSearchVideos[this.numberId+1]
          }
        }
        // we分析统计观看视频的次数
        wx.reportEvent("watch_video", {
          "dancingroom_name": this.playVideo.venue_name,
          "dancingroom_id": this.playVideo.venue_id,
          "video_id":this.playVideo.id,
          "user_name": this.userInfo.data.open_data.nickName?this.userInfo.data.open_data.nickName:"未获得名字",
          "user_id": this.userInfo.data.id
        })
        this.isTotal = this.playVideo.name.split(".")[0].includes("group")
      },
      // 拒绝开启相册权限弹出窗关闭事件
      closeCamera(){
        this.$refs.cameraPermiss.close()
      },
      // 拒绝开启相册权限弹出窗开启事件
      confirmCamera(){
        this.$refs.cameraPermiss.close()
        wx.openSetting({
          success (res) {
            // 开启权限设置
            
          }
        })
      },
      // 上报下载视频
      async downloadVideo(){
        var that = this
        // 手机震动
        uni.vibrateShort()
        // 是否开启相册权限
        wx.getSetting({
          success: response => {
            if (!response.authSetting["scope.writePhotosAlbum"]) {
              wx.authorize({
                scope: "scope.writePhotosAlbum",
                success() {
                  // 同意相册
                  that.saveToAlbum()
                },
                fail() {
                  // 不同意相册
                  that.$refs.cameraPermiss.open("center")
                }
              })
            }
            else{
              wx.authorize({
                /* 这个就是保存相册的 */
                scope: "scope.writePhotosAlbum",
                async success() {
                  that.saveToAlbum()
                },
                fail() {
                  this.$showMsg("您已取消下载！")
                },
              });
            }
          },
          fail: res => {
          },
          complete: res => {
          },
        })
      },
      // 下载视频的动作
      async saveToAlbum() {
        this.$download({
          url: this.playVideo.download_src,
          video_id: this.playVideo.id,
        });
        wx.reportEvent("down_video", {
          "user_id": this.userInfo.data.id,
          "user_name": this.userInfo.data.open_data.nickName?this.userInfo.data.open_data.nickName:"未获得名字",
          "dancingroom_id": this.playVideo.venue_id,
          "dancingroom_name": this.playVideo.venue_name,
          "video_id":this.playVideo.id,
        })
      },
    }
  }
</script>

<style lang="scss">
  @import "@/static/style/vantprop";
  button::after {
    border: none;
  }
</style>
