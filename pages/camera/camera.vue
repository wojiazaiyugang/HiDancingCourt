<template>
  <view class=" width-full heichi100 flex flex-direction justify-start bacamerPhto alitem-center" >
    <!-- 导航栏 -->
    <nvg-bar>
      <template v-slot:icon><text class="iconfont icon-fanhui fon32 white"></text></template>
      <template v-slot:text><text class="white">拍照查询</text></template>
    </nvg-bar>
   <view 
      @tap="navMask"
      v-if="faceValiate&&!isRePhoto"
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
    <view class=" flex-direction margtop40 flex flex-center">
      <view class="fon28 white" >点击头像重新拍照/更换照片</view>
      <view class="font-weight-500 margtop30 white">请您保持与跳舞时一致妆容进行拍摄</view>
    </view>
    <view class="absolute bottom50 left-half translatex-50 widthchi210 heichixu100 boradiu42 text-center babotton line-heichi100"
      @click="useCamera">
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
        // 是否经过人脸验证成功
        faceValiate:false,
        // 点击一次确认拍照
        cameraOne:true,
      };
    },
    computed:{
      ...mapState("m_camera",["userFaceInfo"]),
    },
    created() {
      this.valiateFace()
    },
    methods: {
      ...mapMutations("m_camera",["setUserFaceInfo"]),
      // 点击头像进行更换照片
      navMask(){
        this.isRePhoto = true
      },
      // 获取用户的人脸信息进行校验
      async valiateFace(){
        console.log("查看人脸信息",this.userFaceInfo)
        if(!this.userFaceInfo){
          this.$showMsg("您目前还没有拍摄过照片请您先拍照！",3000)
          this.isRePhoto = true
        }
        else{
          this.$showMsg("照片校验成功！",1500,"success")
          this.userFaceImg = this.userFaceInfo
          this.faceValiate = true
        }
      },
      // 点击确认拍照
      async useCamera() {
        // 点击拍照手机震动
        this.$vs()
        if(this.cameraOne){
          this.cameraOne = false
          const cmr = uni.createCameraContext()
          cmr.takePhoto({
            quality: "high",
            success: async (res) => {
              console.log("chakanres",res)
              var tempSrc = ""
              tempSrc = res.tempImagePath
              this.isRePhoto = false
              this.baseImg = await wx.getFileSystemManager().readFileSync(res.tempImagePath, "base64")
              this.userFaceImg = this.baseImg
              await validateFace({face:this.baseImg}).then( async data=>{
                if(data.code==0){
                  this.$showMsg("拍照成功！",1500,"success")
                  this.cameraOne = true
                  this.faceValiate = true
                  this.setUserFaceInfo(this.baseImg)
                  await changeUserFace({face_img:this.baseImg})
                }
                else{
                  this.faceValiate = false
                  this.cameraOne = true
                  this.isRePhoto = true
                  this.$showMsg("照片不合格请重新拍摄！",1500,"none")
                }
              })
            }
          })
        }
      },
    }
  }
</script>

<style lang="scss">
  
</style>
