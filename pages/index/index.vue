<template>
  <view class=" background-cover "
   style="background-image: url(https://static.qiniuyun.highvenue.cn/image/DanceBgi.jpg);"
   :style="{height:calHeight}">
    <view v-if="loginComplete" class=" height-full  width-full flex alitem-center justify-around flex-direction fon24 ">
      <!-- Start 第一个Long-Button -->
      <view class="width95 margtop30zhi" @click="chooseVenues">
        <long-button>
          <template v-slot:icon >
          <image src="https://static.qiniuyun.highvenue.cn/image/DanceVL.png"
           class="height-full width-full"
           mode="aspectFit"></image>
          </template>
          
          <template v-slot:center-text>
            <text class="fonweight fon28">{{currentHourses?currentHourses:calName}}</text>
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
      <view class="heichi25shi babotton boradiu24 width80 flex flex-center background-cover " >
        <view class="boradiu24 background-cover" style="width: 97%;height: 96%;"
         :style="{backgroundImage: `url(${currentBacimg?currentBacimg:calBaimg})`}">
          
        </view>
      </view>
      <!-- End 球馆图片 -->
      
      <!-- Start 第二个Long-Button -->
      <view class="width95 " @click="showTimePopup">
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
      <view class="white width95">
        <view>
          <text style="color: red;letter-spacing: 1rpx;">*</text>请输入舞蹈房对应的匹配码
        </view>
        <view class="relative" style="height: 174rpx;border-radius: 30rpx;margin: 40rpx 26rpx 0rpx 26rpx; border: 4rpx solid #14E9FC;">
          <view
           class=" heichixu85 opcity2 boradiu30 flex flex-center bagreinput " >
            <input
              @input="keyInput"
              v-model="verfication"
              :cursor-spacing="50"
              :maxlength="4"
              :focus="focusStatus"
              type="number"
              class="height-0 width-0 fon50 "/>
          </view>
          <view 
          class="absolute top0 left0 z-inde10 width-full height-full">
            <view class="width-full height-full flex justify-around alitem-center ">
              <view class="InputItem heichixu110 widchi55 line-heichi110 bablack flex relative flex-center text-center fon50 white opcity10 boradiu12"
              @click.stop="getFocus"
                v-for= "(item,index) in 4"
                :key="index"
                >
                 <view>{{verfication[index]}}</view>
                 <view :class="['absolute top20 right20 heichi60 bawhite',currentIndex==index?'widchi2':'']">
                   
                 </view>
               </view>
            </view>
          </view>
        </view>
      </view>
      <!-- End 第三个Long-Button -->
      <!-- Start 透明层 -->
      <view class="boradiu50 heichiduan80 width95  flex justify-end alitem-center babotton">
        <view class="margright20 black">
          人脸查询开关
        </view>
        <view @click="changeSelectFace" class="margright20 widchi40 flex alitem-center justify-start heichi40 bawhite boradiu42">
          <view :class="['heichi30 line-heichi30 margleft5 relative z-inde1 boradiu42 babotton',faceSearch?'widchi30':'widchi15']" >
            <view class="iconfont absolute top0 right0 icon-kaiguan white fon32" ></view>
          </view>
        </view>
        <view class="boradiuoban heichixu110 widchi55 absolute translatex-50 left-half flex flex-center babotton"  @click="useCamera">
           <view class="widchi45 boradiuoban heichiduan90 bacamer flex flex-center babotton" >
             <image src="https://static.qiniuyun.highvenue.cn/image/DanceCamera.png"
              mode="aspectFit" class="height-full width60"></image>
           </view>
        </view>
        <!-- Start 相机按钮 -->
      </view>
      
      <!-- Start底部 -->
      <view class=" width-full flex justify-between margright40" >
        <!-- 用于占位 -->
        <view style="width: 93rpx;" >
         
        </view>
        <view class="letter-spacing1 widthchi210 heichiduan80 boradiu50 text-center line-heichi80 babotton" @click="SearchVideo">
          <text class="fon28 black fonweight">查找视频</text>
        </view>
        <view class=" widchi35 heichi70 background-cover flex flex-center"
         style="background-image: url(https://static.qiniuyun.highvenue.cn/image/people.png);"
         @click="navigateMy">
          <view class="black fonweight fon16 margtop40">
            我的
          </view>
        </view>
      </view>
    </view>
    <image
      v-else
      class="absolute left-half heichi210 widthchi210 top-half  translate--50"
      src="https://static.qiniuyun.highvenue.cn/image/hicourt/loading.svg"
    />
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
       <uni-popup-dialog type="info" mode="base" :content="`您已拒绝${permissionType}授权，如需开启，请点击确认进入设置页面重新授权`" 
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
  import LongButton from "@/components/longButton"
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
        verfication:[],
        // 选定的舞房
        currentHourses:"",
        // 选定的时间段
        currentTimes:"",
        // 光标显示的状态
        focusStatus:false,
        // 是否人脸搜索
        faceSearch:false,
        // 视频搜索防止二次检索
        videoSearch:true,
        // 授权的种类
        permissionType:"",
			}
		},
    created() {
      this.getTimeData()
    },
    computed: {
      ...mapState("m_venues",["startTime","stopTime","allVenues","loginComplete"]),
      ...mapState("m_device",["locationInfo","deviceInfo"]),
      ...mapState("m_camera",["userFaceInfo"]),
      calName(){
        var tempCourt = this.allVenues.filter(item=>{
          if(item.data.supprt_find){
            return item
          }
        })
        tempCourt = tempCourt.map(item=>{
          return item.name
        })
        return tempCourt[0]
      },
      calBaimg(){
       return this.allVenues[0]&&this.allVenues[0].data.thumbnail
      },
      calHeight(){
        return this.deviceInfo&&this.deviceInfo.screenHeight + 'px'
      },
    },
    // 分享到群聊
    onShareAppMessage(res) {
      return {
        title: `快来欣赏我在${this.currentHourses?this.currentHourses:this.allVenues[0].name}的精彩视频吧~`,
        path:`/pages/index/index`,
      }
    },
    // 分享朋友圈
    onShareTimeline(){
      return {
        title: `快来欣赏我在${this.currentHourses?this.currentHourses:this.allVenues[0].name}的精彩视频吧~`,
        query: ``,
      };
    },
		methods: {
      ...mapActions("m_device",["getLocation",]),
      ...mapActions("m_venues",["getVenues",]),
      ...mapMutations("m_video",["setSearchData"]),
      ...mapMutations("m_user",["setFaceSelect"]),
      // 修改是否人脸查找
      changeSelectFace(){
        this.faceSearch = !this.faceSearch
        this.setFaceSelect(this.faceSearch)
      },
      // 点击外层获取光标位置让其显示
      getFocus(){
        this.focusStatus = !this.focusStatus
      },
      // 打开选择场馆
      chooseVenues() {
        // 定位没有完成
        if(this.locationInfo.latitude){
          this.columnsHouses = this.allVenues.filter(item=>{
            if(item.data.supprt_find){
              return item
            }
          })
          this.columnsHouses = this.columnsHouses.map(item=>{
            return item.name
          })
          this.$refs.popupVenues.open("bottom")
        }
        else{
          this.permissionType = "位置"
          this.$refs.permissionsPopup.open("center")
        }
      },
      // 选择舞房点击确认
      confirmHouse(){
        this.$refs.popupVenues.close()
      },
      // 滑动选择舞房
      selectHouse(data){
        if(this.currentHourses!=this.columnsHouses[data.detail.index]){
          this.verfication = []
          this.currentIndex = -1
        }
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
      },
      // 输出查看键盘输入
      keyInput(data){
        this.verfication = data.target.value
        this.currentIndex = this.verfication.length-1
        // 若没有输入满则用空格填充
        if(this.verfication.length==4){
          wx.hideKeyboard()
        }
      },
      // 调用相机
      useCamera() {
        uni.authorize({
          scope: "scope.camera",
          success: (res) => {
            uni.navigateTo({
              url: "../camera/camera"
            })
          },
          fail: () => {
            this.permissionType = "相机"
            this.$refs.permissionsPopup.open("center")
          }
        })
      },
      // 查找视频
      async SearchVideo() {
        if(this.videoSearch){
          this.videoSearch = false
          this.$showLoading("页面正在跳转！")
          // 所选择的场馆id
          var selectId = 0
          // 下滑选择了其他场馆
          if(this.currentHourses){
            this.allVenues.map(item=>{
              if(item.name==this.currentHourses){
                selectId = item.id
              }
            })
          }
          // 没有选择场馆
          else{
            selectId = this.allVenues[0].id
          }
          await verifyCode({
            // 场馆邀请码
            invite_code: this.verfication,  
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
              if(this.faceSearch){
                if(this.userFaceInfo){
                  this.$hideLoading()
                  this.videoSearch = true
                  this.setSearchData({houseId:selectId,startTime:this.currentTimes+ " " + "00:00:00",stopTime:this.currentTimes+ " " + "23:59:59"})
                  uni.navigateTo({
                    url: "../search-report/index",
                  })
                }
                // 尚未人脸拍照
                else{
                  this.$hideLoading()
                  this.videoSearch = true
                  this.$showMsg("您尚未拍照，无法进行人脸搜索，请您先拍照！",2000)
                }
              }
              else{
                this.$hideLoading()
                this.videoSearch = true
                this.setSearchData({houseId:selectId,startTime:this.currentTimes+ " " + "00:00:00",stopTime:this.currentTimes+ " " + "23:59:59"})
                uni.navigateTo({
                  url: "../search-report/index",
                })
              }
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
      // 打开授权页面进行二次授权
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
  @import "@/static/style/vantprop";
  .InputItem{
    border: 4rpx solid #FC06ED;
  }
</style>
