<template>
  <view class="width-full background-cover" :style="{height:calHeight}" style="background-image: url(https://static.qiniuyun.highvenue.cn/image/video_beijing2.jpg);">
    <view class="width-full height-full relative">
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
       autoplay="true"
       >
      </video>
      <!-- 状态栏占位 -->
      <view class="absolute width-full" style="top: 0rpx;left: 0rpx;">
        <view class="width-full" :style="{height:deviceInfo.statusBarHeight +'px'}">
          
        </view>
        <view class="width-full flex flex-center" :style="{height:((deviceInfo.menuInfo.top-deviceInfo.statusBarHeight)*2 + deviceInfo.menuInfo.height) +'px'}">
          <view class="iconfont icon-fanhui absolute fon28 white widchi60" :style="{lineHeight: ((deviceInfo.menuInfo.top-deviceInfo.statusBarHeight)*2 + deviceInfo.menuInfo.height) +'px',height:((deviceInfo.menuInfo.top-deviceInfo.statusBarHeight)*2 + deviceInfo.menuInfo.height) +'px',left:(deviceInfo.screenWidth - deviceInfo.menuInfo.right)+'px'}" @click="goBack">
            
          </view>
          <view style="color: white;">
            视频详情
          </view>
        </view>
      </view>
      <view 
        @click="preVideo"
        class="flex flex-center absolute bablack"
        style="left: 0rpx;opacity: 0.5; border-radius: 0rpx 40rpx 40rpx 0rpx; width: 120rpx;height: 120rpx;" 
        :style="{top:deviceInfo.screenHeight+'rpx'}">
        <view class="background-cover" style="width: 60rpx;height: 60rpx;opacity: 1; background-image: url(https://static.qiniuyun.highvenue.cn/image/pref_video.png);">
          
        </view>
      </view>
      <view
        @click="nextVideo"
        class="flex flex-center absolute bablack"
        style="right: 0rpx;opacity: 0.5;border-radius: 40rpx 0rpx 0rpx 40rpx; width: 120rpx;height: 120rpx;" 
        :style="{top:deviceInfo.screenHeight+'rpx'}">
        <view class="background-cover" style="width: 60rpx;height: 60rpx;opacity: 1; background-image: url(https://static.qiniuyun.highvenue.cn/image/next_video.png);">
          
        </view>
      </view>
      <view 
        class="flex absolute width-full justify-between alitem-center"
        style="bottom: 100rpx;height: 150rpx;">
        <view 
          :style="{marginLeft:(deviceInfo.screenWidth - deviceInfo.menuInfo.right)+'px'}"
        >
          <view v-show="isTotal" class="fon24 white marginbottom15">
            集体视频
          </view>
          <view class="white fon36 marginbottom15 ellipsis widthchi210" >
            {{playVideo.venue_name}}
          </view>
          <view class="fon24 white">
            {{playVideo.goal_time}}
          </view>
        </view>
        <view
          @click="downloadVideo"
          class="flex flex-center bapruple"
          style="width: 250rpx;height: 80rpx;border-radius: 50rpx;" 
          :style="{marginRight:(deviceInfo.screenWidth - deviceInfo.menuInfo.right)+'px'}">
          <view class="fon28 white" style="margin-right: 15rpx;">
            获取
          </view>
          <view class="background-cover white" style="width: 37rpx;height: 30rpx;background-image: url(https://static.qiniuyun.highvenue.cn/image/downlogo.png);">
            
          </view>
        </view>
      </view>
    </view>
    <uni-popup ref="cameraPermiss" type="dialog">
    	<uni-popup-dialog type="info" mode="base" content="您已拒绝该项授权，如需开启，请点击确认进入设置页面重新授权" :duration="2000" :before-close="true" @close="closeCamera" @confirm="confirmCamera"></uni-popup-dialog>
    </uni-popup>
  </view>
</template>

<script>
  import { mapState, mapMutations } from "vuex"
  import { addDownload } from "@/api/video.js"
  import { getAllvideos } from "@/api/search.js"
  export default {
    data() {
      return {
        // 当前视频播放的信息
        playVideo:null,
        // 当前视频所在全部视频的索引号
        numberId:0,
        // 下一个视频当前的页数
        nextPage:0,
        // 最后一个视频的标志
        lastVideoStatus:false,
        // 当前微信创建的播放对象
        videoContent:null,
        // 当前视频播放与否
        isPlay:true,
        // 是否是集体视频
        isTotal:false,
      };
    },
    created() {
      this.playingVideo()
      console.log("查看设备",this.deviceInfo)
    },
    computed: {
      ...mapState("m_video",[
        "currentVideo",
        "allSearchVideos",
        "videoPages",
        "searchData",
        "videoHouse",
      ]),
      ...mapState("m_venues",["siteInfos"]),
      ...mapState("m_device",["deviceInfo"]),
      calHeight(){
        return 2*(this.deviceInfo.safeArea.bottom-this.deviceInfo.statusBarHeight) +"rpx"
      }
    },
    methods: {
      ...mapMutations("m_video",["setAllSearchVideos","setVideoPages"]),
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
      playingVideo(){
        this.videoContent = wx.createVideoContext("myVideo")
        // 当前页面接收传递过来的视频对象
        this.playVideo = this.currentVideo
        this.isTotal = this.playVideo.name.split(".")[0].includes("group")
        // 当前页面接收传过来的视频页数
        this.nextPage = this.videoPages.curPage
      },
      // 返回上一页
      goBack(){
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
        this.isTotal = this.playVideo.name.split(".")[0].includes("group")
      },
      // 下一个视频
      async nextVideo(){
        if(this.lastVideoStatus){
          this.$showMsg("当前视频已是最后一个视频！")
        }
        else{
          this.allSearchVideos.map((item,index)=>{
            if(item.id==this.playVideo.id){
              this.numberId = index
            }
          })
          // 下一个是最后一个视频
          if(this.numberId==this.allSearchVideos.length-1){
            this.nextPage++
            if(this.videoHouse.clickStatus){
              let {data} = await getAllvideos([this.videoHouse.id],this.searchData.startTime,
              this.searchData.stopTime,this.nextPage,this.videoPages.perPage)
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
                this.setVideoPages({curPage:this.nextPage,perPage:this.perPage})
                this.playVideo = this.allSearchVideos[this.numberId+1]
              }
            }
            else{
              let siteList = this.siteInfos.map(item=>{
                return item.id
              })
              let {data} = await getAllvideos(siteList,this.searchData.startTime,
              this.searchData.stopTime,this.nextPage,this.videoPages.perPage)
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
                this.setVideoPages({curPage:this.nextPage,perPage:this.perPage})
                this.playVideo = this.allSearchVideos[this.numberId+1]
              }
            }
          }
          // 不是最后一个视频
          else{
            this.playVideo = this.allSearchVideos[this.numberId+1]
          }
        }
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
        let that = this;
        that.$showLoading("下载中！")
        var myDate = new Date();
        that.$download({
          url: that.playVideo.download_src,
          async success() {
            await addDownload(that.playVideo.id) 
            that.$hideLoading()
            that.$showMsg("下载成功！")
          },
          fail() {
            that.$showMsg("下载失败！")
          },
        });
      },
    }
  }
</script>

<style lang="scss">
  @import "@/static/style/vantprop";
</style>
