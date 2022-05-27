<template>
  <view class="container" style="background-image: url(https://static.qiniuyun.highvenue.cn/image/cameraBgi.jpg);">
    <!-- 导航栏 -->
    <nvg-bar>
      <template v-slot:icon><text class="iconfont icon-fanhui" style="color: white;" ></text></template>
      <template v-slot:text><text>拍照查询</text></template>
    </nvg-bar>
    
    <view class="textContent flex">
      <view>请拍摄正面照</view>
      <view style="color: #c6c2cc;font-size: 28rpx; margin-top: 26rpx;">点击头像拍照/更换照片</view>
    </view>
    
    <!-- 相机圈 -->
    <camera 
    class="camera" 
    flash="off" 
    device-position="front"
    v-if="isShow"
    >
    </camera>
    <view v-else style="-webkit-transform:rotate(0deg);">
      <view class="img" :style="{backgroundImage: 'url(' + src + ')'}" @click="this.isShow = !this.isShow">
      </view>
     <!-- <image 
      :src="src" 
      class="img"  
      @click="this.isShow = !this.isShow"
      >
      </image> -->
      <view class="resetImg flex">点击照片可重新拍摄</view>
    </view>
    
    
    <!-- 底部按钮 -->
    <view class="bottom flex">
      <view class="SearchVideo" v-if="isShow" @click="useCamera"><text>点击拍照</text></view>
      <view class="SearchVideo" v-else @click="last">
        <text>确认</text>
      </view>
      </view>
  </view>
</template>

<script>
  import { mapState,mapMutations } from 'vuex'
  import nvgBar from '@/components/nvgBar/nvgBar.vue'
  export default {
    data() {
      return {
      isShow: true, // 下方拍照按钮文字和相机和图片显示
      src: '' ,// 页面展示图片
      base64: ''
      };
    },
    components: {
      nvgBar,
    },
    created() {
      this.showDay = this.currentDay
    },
    methods: {
      ...mapMutations('m_camera',['updateImgSrc']),
      showTimePopup() {
        this.$refs.popup.open('bottom')
      },
      async useCamera() {
        try{
          this.isShow = !this.isShow
          const cmr = uni.createCameraContext()
          await cmr.takePhoto({
            quality: 'high',
            success: async (res) => {
              this.src = res.tempImagePath
              this.base64 = await wx.getFileSystemManager().readFileSync(res.tempImagePath, "base64")
              // console.log(this.base64)
              this.updateImgSrc(this.base64)
             }
          })
        }catch(err) {
          
        }
      },
      last() {
        uni.navigateBack({
          delta: 1
        })
      }
    }
  }
</script>

<style lang="scss">
  @import '@/style/camera'
</style>
