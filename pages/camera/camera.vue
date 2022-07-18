<template>
  <view class="container width-full background-cover relative">
    <!-- 导航栏 -->
    <nvg-bar>
      <template v-slot:icon><text class="iconfont icon-fanhui black fon32" ></text></template>
      <template v-slot:text><text class="black">拍照查询</text></template>
    </nvg-bar>
    
    <view class="textContent flex flex-direction flex-center">
      <view>请拍摄正面照</view>
      <view style="color: #c6c2cc;font-size: 28rpx; margin-top: 26rpx;">点击头像拍照/更换照片</view>
    </view>
    
    <camera 
    class="camera" 
    flash="off" 
    device-position="front"
    v-if="isShow"
    >
    </camera>
    <view v-else style="-webkit-transform:rotate(0deg);">
      <view class="img background-cover" :style="{backgroundImage: 'url(' + src + ')'}" @click="this.isShow = !this.isShow">
      </view>
      <view class="resetImg flex flex-center">点击照片可重新拍摄</view>
    </view>
    
    
    <!-- 底部按钮 -->
    <view class="bottom flex flex-center">
      <view class="SearchVideo white" v-if="isShow" @click="useCamera"><text>点击拍照</text></view>
      <view class="SearchVideo white" v-else @click="navBack">
        <text>确认</text>
      </view>
      </view>
  </view>
</template>

<script>
  import { mapState,mapMutations } from "vuex"
  import nvgBar from "@/components/nvgBar"
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
      navBack() {
        uni.navigateBack({
          delta: 1
        })
      }
    }
  }
</script>

<style lang="scss">
  @import "@/static/style/camera"
</style>
