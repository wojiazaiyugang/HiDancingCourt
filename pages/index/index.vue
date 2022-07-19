<template>
	<view class="container height-full width-full flex alitem-center justify-start flex-direction fon24 background-cover">
    <!-- Start 第一个Long-Button -->
    <view class="First-LongButton" @click="chooseVenues">
      <long-button>
        <template v-slot:icon >
        <image src="https://static.qiniuyun.highvenue.cn/image/DanceVL.png"
         class="height-full width-full"
         mode="aspectFit"></image>
        </template>
        
        <template v-slot:center-text>
          <text class="fonweight fon28">{{currentHourses?currentHourses:"请选择您练舞的舞蹈房"}}</text>
        </template>
        
        <template v-slot:i-choose>
         <image src="https://static.qiniuyun.highvenue.cn/image/switch.png"
          mode="aspectFit"
          class="width60 height-full"></image >
        </template>
      </long-button>
    </view>
    <!-- End 第一个Long-Button -->
    
    <!-- Start 球馆图片 -->
    <view class="courtPicture flex flex-center background-cover margtop40" >
      <view class="boradiu24 background-cover" style="width: 97%;height: 96%;"
       :style="{backgroundImage: `url(${currentBacimg})`}">
        
      </view>
    </view>
    <!-- End 球馆图片 -->
    
    <!-- Start 第二个Long-Button -->
    <view class="Second-LongButton margtop40" @click="showTimePopup">
      <long-button>
        <template v-slot:icon>
          <image class="height-full width-full" src="https://static.qiniuyun.highvenue.cn/image/DanceClock.png" mode="aspectFit"></image>
        </template> 
        <template v-slot:center-text>
         <text class="fonweight fon28">{{currentTimes}}</text>
        </template>
        <template v-slot:i-choose>
           <image class="height-full width60" 
           src="https://static.qiniuyun.highvenue.cn/image/switch.png" 
           mode="aspectFit" ></image >
        </template>
      </long-button>
    </view>
    <!-- End 第二个Long-Button -->
    <!-- Start hide第三个Long-Button -->
    <view style="width: 95%;margin-bottom: 45rpx; color: white;">
      <view style=" margin: 40rpx 0rpx 0rpx 0rpx;">
        <text style="color: red;letter-spacing: 1rpx;">*</text>请输入舞蹈房对应的匹配码
      </view>
      <view class="relative" style="height: 174rpx;border-radius: 30rpx;margin: 40rpx 26rpx 0rpx 26rpx; border: 4rpx solid #14E9FC;">
        <view
         class="InputBoard flex flex-center bagreinput " >
          <input
            @input="keyInput"
            :maxlength="4"
            :focus="focusStatus"
            :cursor-spacing="25"
            type="number"
            class="height-0 width-0 fon50 "/>
        </view>
        <view 
        class="absolute top0 left0 z-inde10 width-full height-full">
          <view class="width-full height-full flex justify-around alitem-center ">
            <view class="InputItem bablack flex relative flex-center"
            @click.stop="getFocus"
              v-for= "(item,index) in verfication"
              :key="index"
              >
               <view>{{item}}</view>
               <view :class="['absolute top20 right20 heichi60 bawhite',currentIndex==index?'widchi2':'']">
                 
               </view>
             </view>
          </view>
        </view>
      </view>
    </view>
    <!-- End 第三个Long-Button -->
    <!-- Start 透明层 -->
    <view class="Four-LongButton  flex flex-center babotton">
      <view class="First-LongButton-son" >
        
      </view>
      <view class="margright20 black">
        人脸查询开关
      </view>
      <view @click="changeSelectFace" class="margright20 widchi40 flex alitem-center justify-start heichi40 bawhite boradiu42">
        <view :class="['heichi30 line-heichi30 margleft5 relative z-inde1 boradiu42 babotton',faceSearch?'widchi30':'widchi15']" >
          <view class="iconfont absolute top0 right0 icon-kaiguan white fon32" ></view>
        </view>
      </view>
      <!-- Start 相机按钮 -->
    </view>
    
    <view class="camera flex flex-center babotton"  @click="useCamera">
      <view class="camera-son bacamer flex flex-center babotton" >
        <image src="https://static.qiniuyun.highvenue.cn/image/DanceCamera.png"
         mode="aspectFit" class="height-full width60"></image>
      </view>
    </view>
  
    <!-- Start底部 -->
    <view class="bottomSearch flex" >
      <!-- 用于占位 -->
      <view style="width: 93rpx;" >
       
      </view>
      <view class="SearchVideo" @click="SearchVideo">
        <text class="fon28 black fonweight">查找视频</text>
      </view>
      <view class="my background-cover flex flex-center" @click="navigateMy">
        <view class="black fonweight fon16 margtop40">
          我的
        </view>
      </view>
    </view>
    <!-- End底部 -->
   
   <!-- Start选择场馆弹出层 -->
   <uni-popup ref="popupVenues" :safeArea="false">
     <van-picker 
      show-toolbar
      cancel-button-text="请选择舞蹈房"
      confirm-button-text="确认"
      active-class="selectStyle"
      :isRecently="true"
      toolbar-class="changeToolbar"
      @confirm="confirmHouse"
      @change="selectHouse"
      :columns="columnsHouses" item-height="40"/>
   </uni-popup>
     
    
   <!-- Start 时间选择组件 -->
   <uni-popup ref="popup" :safeArea="false">
     <van-picker
      show-toolbar
      cancel-button-text="请选择日期"
      confirm-button-text="确认"
      active-class="selectStyle"
      :isToday="true"
      toolbar-class="changeToolbar"
      visible-item-count="5"
      @confirm="confirmHours"
      @change="selectHours"
      :columns="columnsDays" item-height="40"/>
   </uni-popup>
   <!-- End 时间选择组件 -->
   
   <!-- Start权限提示信息 -->
   <uni-popup ref="permissionsPopup" type="dialog">
      <uni-popup-dialog type="info" mode="base" content="您已拒绝该项授权，如需开启，请点击确认进入设置页面重新授权" 
      :before-close="true" 
      @close="closeProp" 
      @confirm="confirmProp">
      </uni-popup-dialog>
   </uni-popup>
   <!-- End权限提示信息 -->
  </view>
</template>

<script>
  import { mapMutations,mapState,mapActions } from "vuex"
  import { verifyCode } from "@/api/search.js"
  import { getSites } from "@/api/venues.js"
  import { getUserFace, } from "@/api/user.js"
  import LongButton from "@/components/long-button"
  import Vue from "vue"
	export default {
    components:{
      LongButton,
    },
		data() {
			return {
        // 当前场馆的背景图
        currentBacimg:"",
        // 可获得的场馆数
        columnsHouses:[],
        // 可供检索的天数
        columnsDays:[],
        // 可供检索的天数带年度
        columnsDaysYear:[],
        // 检索天数的长度
        dayLength:15,
        // input框自动获取焦点
        currentIndex:-1,
        // 四位验证码用于战报搜索
        verfication:["","","",""],
        // 选定的舞房
        currentHourses:"",
        // 选定的时间段
        currentTimes:"",
        // 光标显示的状态
        focusStatus:false,
        // 是否人脸搜索
        faceSearch:true,
        // 视频搜索防止二次检索
        videoSearch:true,
			}
		},
    watch:{
      locationInfo(newValue,oldValue){
        if(!newValue.latitude){
          this.$refs.permissionsPopup&&this.$refs.permissionsPopup.open("center")
        }
      },
      allVenues(newValue,oldValue){
        if(newValue.length!=0){
          this.columnsHouses = this.allVenues.filter(item=>{
            if(item.data.supprt_find){
              return item
            }
          })
          this.columnsHouses = this.columnsHouses.map(item=>{
            return item.name
          })
          this.currentHourses = this.columnsHouses[0]
          this.currentBacimg = this.allVenues[0].data.thumbnail
        }
      }
    },
    created() {
      this.getTimeData()
      this.getDeviceInfo()
    },
    computed: {
      ...mapState("m_venues",["startTime","stopTime","allVenues"]),
      ...mapState("m_device",["locationInfo"]),
      ...mapState("m_camera",["userFaceInfo"])
    },
    // 分享到群聊
    onShareAppMessage(res) {
      return {
        title: `快来欣赏我在${this.currentHourses}的精彩视频吧~`,
        path:`/pages/index/index`,
      }
    },
    // 分享朋友圈
    onShareTimeline(){
      return {
        title: `快来欣赏我在${this.currentHourses}球场的精彩视频吧~`,
        query: ``,
      };
    },
		methods: {
      ...mapActions("m_device",["getLocation",]),
      ...mapActions("m_venues",["getVenues",]),
      ...mapMutations("m_video",["setSearchData"]),
      ...mapMutations("m_device",["setDeviceInfo"]),
      ...mapMutations("m_venues",["setSiteInfos"]),
      ...mapMutations("m_camera",["setUserFaceInfo"]),
      ...mapMutations("m_user",["setFaceSelect"]),
      // 修改是否人脸查找
      changeSelectFace(){
        console.log("kaishi")
        this.faceSearch = !this.faceSearch
        console.log("差别",this.faceSearch)
        this.setFaceSelect(this.faceSearch)
      },
      // 点击外层获取光标位置让其显示
      getFocus(){
        this.focusStatus = !this.focusStatus
      },
      // 存储当前设备的信息
      async getDeviceInfo(){
        await uni.getSystemInfo({
          success:async(res)=> {
            // 得到胶囊位置信息
            let menuInfo = await uni.getMenuButtonBoundingClientRect()
            this.setDeviceInfo(Object.assign({}, res, {menuInfo}))
          }
        })
      },
      // 打开选择场馆
      chooseVenues() {
        this.$refs.popupVenues.open("bottom")
      },
      // 选择舞房点击确认
      confirmHouse(){
        this.$refs.popupVenues.close()
      },
      // 滑动选择舞房
      selectHouse(data){
        this.currentHourses = this.columnsHouses[data.detail.index]
        this.currentBacimg = this.allVenues[data.detail.index].data.thumbnail
      },
      // 点击选择时段
      showTimePopup() {
        this.$refs.popup.open("bottom")
      },
      // 选择时间段点击确认
      confirmHours(){
        this.$refs.popup.close()
      },
      // 滑动选择时间
      selectHours(data){
        this.currentTimes = this.columnsDaysYear[data.detail.index]
      },
      // 时间选择组件传递的数据
      getTimeData() {
        for(var i=0;i<this.dayLength;i++){
          var date = new Date()
          date.setDate(date.getDate() - i)
          var tempDay = date.getDate()
          var tempMonth = date.getMonth() +  1
          var tempYear = date.getFullYear()
          tempMonth = tempMonth > 10 ? tempMonth : `0${tempMonth}`
          tempDay = tempDay > 10 ? tempDay : `0${tempDay}`
          var calDate = tempMonth+"-"+tempDay
          var calDateYear = tempYear+"-"+tempMonth+"-"+tempDay
          this.columnsDays.push(calDate)
          this.columnsDaysYear.push(calDateYear)
          this.currentTimes = this.columnsDaysYear[0]
        }
        console.log("123456")
      },
      // 输出查看键盘输入
      keyInput(data){
        var keyNumber = [...data.target.value+""]
        this.verfication = [...keyNumber]
        this.currentIndex = keyNumber.length-1
        for(var i=0;i<4;i++){
          if(!this.verfication[i]){
            this.verfication[i] = ""
          }
        }
        if(keyNumber.length==4){
          wx.hideKeyboard()
        }
      },
      // 调用相机
      useCamera() {
        // this.$showMsg("暂不支持人脸查询！")
        uni.authorize({
          scope: "scope.camera",
          success: (res) => {
            uni.navigateTo({
              url: "../camera/camera"
            })
          },
          fail: () => {
            this.$refs.permissionsPopup.open("center")
          }
        })
      },
      // 查找视频
      async SearchVideo() {
        if(this.videoSearch){
          this.videoSearch = false
          this.$showLoading("页面正在跳转！")
          await getUserFace().then(async value=>{
            if(value.code==-1){
              this.videoSearch = true
              this.$showMsg("您目前还没有拍摄过照片请您先拍照！",3000,"none")
              return false
            }
            if(value.code==0){
              var tempImg = value.data.data.face_img
              this.setUserFaceInfo(tempImg)
            }
          })
          // 输入得四位验证码
          var tempCode = ""
          // 所选择的场馆id
          var selectId = 0
          this.verfication.map(item=>{
            tempCode = tempCode + item.toString()
          })
          this.allVenues.map(item=>{
            if(item.name==this.currentHourses){
              selectId = item.id
            }
          })
          await verifyCode({
            // 场馆邀请码
            invite_code: parseInt(tempCode),  
            // 场馆id
            venue_id: selectId,  
            applet: "HiDancing"
          }).then(async (value)=>{
            if(value.code==-1){
              this.$hideLoading()
              this.videoSearch = true
              this.$showMsg("密码输入错误，请您重新输入！",2000,"none")
            }
            else{
              await getSites(selectId).then((value)=>{
                this.setSiteInfos(value.data)
                if(this.userFaceInfo){
                  this.$hideLoading()
                  this.videoSearch = true
                  this.setSearchData({houseId:selectId,startTime:this.currentTimes+ " " + "00:00:00",stopTime:this.currentTimes+ " " + "24:00:00"})
                  uni.navigateTo({
                    url: "../search-report/index",
                  })
                }
                else{
                  this.$hideLoading()
                  this.videoSearch = true
                  this.$showMsg("您尚未拍照，无法进行人脸搜索，请您先拍照！",2000)
                }
              })
            }
          })
        }
      },
      // 去个人页面
      navigateMy() {
        uni.navigateTo({
          url: '../my/my'
        })
      },
      // 拒绝授权关闭提示框
      closeProp() {
        this.$refs.permissionsPopup.close()
      },
      // 同意授权
      confirmProp() {
        // 二次授权
        var that = this 
         wx.openSetting({
          success (res) {
            that.$refs.permissionsPopup.close()
            wx.getSetting({
              success: async response => {
                if (response.authSetting["scope.userLocation"]) {
                  that.getLocation().finally(()=>{
                    that.getVenues()
                  })
                }
              },
              fail: res => {
              },
              complete: res => {
              },
            })
          }
        })
      },
		}
	}
</script>

<style lang="scss">
  @import "@/static/style/index";
  @import "@/static/style/vantprop";
</style>
