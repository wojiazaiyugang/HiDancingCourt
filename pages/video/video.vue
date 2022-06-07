<template>
  <view class="video-container" :style="{height:calVideoHeight}">
    <view class="video-text">
      <video
       id="myVideo"
       :src="playVideo.download_src"
       controls
       objectFit="cover"
       :show-fullscreen-btn="false"
       :show-play-btn="false"
       autoplay="true"
       style="height: 100%;width: 100%;"
       >
      </video>
      <!-- 状态栏占位 -->
      <view style="position: absolute;top: 0rpx;left: 0rpx;width: 100%;">
        <view style="width: 100%;" :style="{height:info.statusBarHeight +'px'}">
          
        </view>
        <view style=" width: 100%; display: flex;justify-content: center;align-items: center;" :style="{height:((info.menuInfo.top-info.statusBarHeight)*2 + info.menuInfo.height) +'px'}">
          <view style="position: absolute; font-size: 30rpx;color: white;" :style="{left:(info.screenWidth - info.menuInfo.right)+'px'}" @click="goBack" class="iconfont icon-fanhui">
            
          </view>
          <view style="color: white;">
            视频详情
          </view>
        </view>
      </view>
      <view 
        @click="preVideo"
        style="display: flex;justify-content: center;align-items: center; position: absolute;left: 0rpx;opacity: 0.5; border-radius: 0rpx 40rpx 40rpx 0rpx; width: 120rpx;height: 120rpx;background-color: #31362A;" 
        :style="{top:info.screenHeight+'rpx'}">
        <view style="width: 60rpx;height: 60rpx;background-size: cover; background-image: url(https://static.qiniuyun.highvenue.cn/image/pref_video.png);">
          
        </view>
      </view>
      <view
        @click="nextVideo"
        style="display: flex;justify-content: center;align-items: center; position: absolute;right: 0rpx;opacity: 0.5;border-radius: 40rpx 0rpx 0rpx 40rpx; width: 120rpx;height: 120rpx;background-color: #31362A;" 
        :style="{top:info.screenHeight+'rpx'}">
        <view style="width: 60rpx;height: 60rpx;background-size: cover; background-image: url(https://static.qiniuyun.highvenue.cn/image/next_video.png);">
          
        </view>
      </view>
      <view 
        style="display: flex;justify-content: space-between;align-items: center; position: absolute;bottom: 100rpx;height: 150rpx;width: 100%;">
        <view 
          :style="{marginLeft:(info.screenWidth - info.menuInfo.right)+'px'}"
        >
          <view style="margin-bottom: 30rpx;font-size: 35rpx;color: white;">
            {{playVideo.venue_name}}
          </view>
          <view style="font-size: 25rpx;color: white;">
            {{playVideo.goal_time}}
          </view>
        </view>
        <view
          @click="downloadVideo"
          style="width: 250rpx; background-color: #7E71F0;height: 80rpx;border-radius: 50rpx;display: flex;justify-content: center;align-items: center;" 
          :style="{marginRight:(info.screenWidth - info.menuInfo.right)+'px'}">
          <view style="font-size: 27rpx;color: white;margin-right: 15rpx;">
            获取
          </view>
          <view style="width: 37rpx;height: 30rpx;color: white;background-size: cover; background-image: url(https://static.qiniuyun.highvenue.cn/image/downlogo.png);">
            
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
      };
    },
    created() {
      this.playingVideo()
    },
    computed: {
      ...mapState("m_video",["currentVideo","allSearchVideos","videoPages",]),
      ...mapState("m_device",["info"]),
      ...mapState("m_video",["searchData","videoHouse"]),
      calVideoHeight(){
        return 2*this.info.screenHeight +"rpx"
      }
    },
    methods: {
      ...mapMutations("m_video",["setAllSearchVideos","setVideoPages"]),
      // 播放当前视频
      playingVideo(){
        // 当前页面接收传递过来的视频对象
        this.playVideo = this.currentVideo
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
      },
      // 下一个视频
      async nextVideo(){
        this.allSearchVideos.map((item,index)=>{
          if(item.id==this.playVideo.id){
            this.numberId = index
          }
        })
        // 下一个是最后一个视频
        if(this.numberId==this.allSearchVideos.length-1){
          this.nextPage++
          if(this.videoHouse.clickStatus){
            const {data} = await uni.$http.post('/search/hidancing_search', {
              face_query:0,
              start_time: this.searchData.startTime,
              stop_time: this.searchData.stopTime,
              site_id: this.videoHouse.id,
              page:this.nextPage,
              per_page:this.videoPages.perPage,
              applet:"HiDancing"
            })
            if(data.data.length==0){
              uni.showToast({
              	icon:"none",
                title: "当前视频已是最后一个视频！",
              	duration: 1000
              });
            }
            else{
              this.setAllSearchVideos([...this.allSearchVideos,...data.data])
              this.setVideoPages({curPage:this.nextPage,perPage:this.perPage})
              this.playVideo = this.allSearchVideos[this.numberId+1]
            }
          }
          else{
            const {data} = await uni.$http.post('/search/hidancing_search', {
              face_query:0,
              start_time: this.searchData.startTime,
              stop_time: this.searchData.stopTime,
              venue_id: this.searchData.houseId,
              page:this.nextPage,
              per_page:this.videoPages.perPage,
              applet:"HiDancing"
            })
            if(data.data.length==0){
              uni.showToast({
              	icon:"none",
                title: "当前视频已是最后一个视频！",
              	duration: 1000
              });
            }
            else{
              this.setAllSearchVideos([...this.allSearchVideos,...data.data])
              this.setVideoPages({curPage:this.nextPage,perPage:this.perPage})
              this.playVideo = this.allSearchVideos[this.numberId+1]
            }
          }
        }
        // 不是最后一个视频
        else{
          this.playVideo = this.allSearchVideos[this.numberId+1]
        }
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
                  console.log("下载视频")
                  that.saveToAlbum()
                },
                fail() {
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
        var myDate = new Date();
        that.$download({
          url: that.playVideo.download_src,
          async success() {
            await uni.$http.post("/downloads/dance", {
              video_id: that.playVideo.id,
              applet:"HiDancing"
            }).then(()=>{
              this.$showMsg("下载成功！")
            })
          },
          fail() {
            this.$showMsg("下载失败！")
          },
        });
      },
    }
  }
</script>

<style lang="scss">
  .video-container {
    width: 100%;
    .video-text {
      width: 100%;
      height:100%;
      position: relative;
    }
    /deep/ .uni-popup-dialog {
      width: 590rpx!important;
      height: 345rpx!important;
      font-size: 30rpx!important;
      border-radius: 30rpx!important;
      .uni-dialog-title-text {
        font-size: 30rpx;
        font-weight: 600;
      }
      .uni-dialog-content {
        margin-top: 30rpx;
        .uni-dialog-content-text {
          font-size: 30rpx;
        }
      }
      .uni-dialog-button-group {
        border: none;
        margin-top: 45rpx;
        .cancel {
          width: 198rpx;
          height: 80rpx;
          border-radius: 48rpx;
          line-height: 80rpx;
          text-align: center;
          font-size: 30rpx;
          color: #fff;
          background-color: #666;
        }
        .uni-button-color {
          width: 198rpx;
          height: 80rpx;
          border-radius: 48rpx;
          line-height: 80rpx;
          text-align: center;
          font-size: 30rpx;
          color: #fff;
          background-image: linear-gradient(to bottom, #f7a216, #fe6205);
        }
      }
      .uni-border-left {
        border: none;
      }
    }
  }
</style>
