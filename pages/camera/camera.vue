<template>
  <view class=" width-full heichi100 flex flex-direction justify-start bacamerPhto alitem-center" >
    <!-- 导航栏 -->
    <nvg-bar>
      <template v-slot:icon><text class="iconfont icon-fanhui fon32 black"></text></template>
      <template v-slot:text><text class="black">拍照查询{{userFaceValiate}}</text></template>
    </nvg-bar>
    <view class=" flex-direction margtop40 flex flex-center">
      <view class="font-weight-500">请拍摄正面照</view>
      <view class="fon28 margtop30" style="color: #c6c2cc;">点击头像拍照/更换照片</view>
    </view>
   <view 
      @tap="navMask"
      v-if="userFaceValiate&&!isRePhoto"
      style="border: 2rpx solid white;"
      class="widthchi210 heichi210 boradiuoverall relative overflow-hidden margtop60">
      <image
        :src="`data:image/jpeg;base64,${userFaceImg}`"
        class="boradiuoverall width-full height-full"
      />
    </view>
    <view
      v-if="isRePhoto"
      class="widthchi210 heichi210 relative overflow-hidden margtop60 boradiuoverall"
    >
      <camera
        class="height-full width-full z-index1"
        device-position="front"
        flash="off"
      />
      <view 
        style="border: 200rpx solid #3F028B;"
        class="width-full height-full z-index10 absolute top-half left-half translate--50 boradiuoverall">
      </view>
    </view>
    <view class="absolute bottom50 left-half translatex-50 widthchi210 heichixu100 boradiu42 text-center babotton line-heichi100" @click="useCamera">
      <text>点击拍照</text>
    </view>
  </view>
</template>

<script>
  import { mapState, mapMutations } from "vuex"
  import { validateFace, getUserFace, changeUserFace } from "@/api/user.js"
  import nvgBar from "@/components/nvgBar.vue"
  export default {
    components: {
      nvgBar,
    },
    data() {
      return {
        // 人脸拍摄照片转base64之后的
        baseImg: "",
        // 当前用户的人脸照片
        userFaceImg:"",
        // 是否点击头像进行拍照
        isRePhoto:false,
      };
    },
    computed:{
      ...mapState("m_camera",["userFaceValiate"]),
    },
    created() {
      this.valiateFace()
    },
    methods: {
      ...mapMutations("m_camera",["setUserFaceValiate","setUserFaceInfo"]),
      // 点击头像进行更换照片
      navMask(){
        this.isRePhoto = true
      },
      // 获取用户的人脸信息进行校验
      async valiateFace(){
        await getUserFace().then(async value=>{
          if(value.code==-1){
            this.$showMsg("您目前还没有拍摄过照片请您先拍照！",3000)
            this.isRePhoto = true
          }
          if(value.code==0){
            this.userFaceImg = value.data.data.face_img
            this.setUserFaceInfo(this.userFaceImg)
            this.$showMsg("照片校验成功！",1500,"success")
            this.setUserFaceValiate(true)
          }
        })
      },
      // 点击确认拍照
      async useCamera() {
        // 点击拍照手机震动
        this.$vs()
        const cmr = uni.createCameraContext()
        cmr.takePhoto({
          quality: "high",
          success: async (res) => {
            var tempSrc = ""
            tempSrc = res.tempImagePath
            this.baseImg = await wx.getFileSystemManager().readFileSync(res.tempImagePath, "base64")
            await validateFace({face:this.baseImg}).then( async data=>{
              if(data.code==0){
                this.$showMsg("拍照成功！",1500,"success")
                this.setUserFaceValiate(true)
                this.setUserFaceInfo(this.baseImg)
                await changeUserFace({face_img:this.baseImg})
                uni.navigateBack({
                  delta: 1
                })
              }
              else{
                this.setUserFaceValiate(false)
                this.$showMsg("照片不合格请重新拍摄！",1500,"none")
              }
            })
          }
        })
      },
    }
  }
</script>

<style lang="scss">
  
</style>
