<template>
	<view class="container"
   style="background-image: url(https://static.qiniuyun.highvenue.cn/image/DanceBgi.jpg);"
   >
    <!-- Start 第一个Long-Button -->
    <view class="First-LongButton">
      <long-button>
        <template v-slot:icon >
        <image src="https://static.qiniuyun.highvenue.cn/image/DanceVL.png" mode="aspectFit" style="width: 100%; height: 100%;"></image>
        </template>
        
        <template v-slot:center-text>
          <text style="font-size: 30rpx;font-weight: 550;">{{currentHourses?currentHourses:"请选择您练舞的舞蹈房"}}</text>
        </template>
        
        <template v-slot:i-choose>
         <image src="https://static.qiniuyun.highvenue.cn/image/switch.png"
          mode="aspectFit"
          style="width: 60%; height: 100%;"
          @click="chooseVenues"></image >
        </template>
      </long-button>
    </view>
    <!-- End 第一个Long-Button -->
    
    <!-- Start 球馆图片 -->
    <view class="courtPicture" :style="{backgroundImage: `url(${currentBacimg})`}">
      
    </view>
    <!-- End 球馆图片 -->
    
    <!-- Start 第二个Long-Button -->
    <view class="Second-LongButton">
    <long-button>
      <template v-slot:icon>
        <image src="https://static.qiniuyun.highvenue.cn/image/DanceClock.png" mode="aspectFit" style="width: 100%; height: 100%;"></image>
      </template> 
      <template v-slot:center-text>
       <text style="font-size: 30rpx;font-weight: 550;">{{currentTimes?currentTimes:"请选择您练舞的时段"}}</text>
      </template>
      <template v-slot:i-choose>
         <image src="https://static.qiniuyun.highvenue.cn/image/switch.png" mode="aspectFit" @click="showTimePopup" style=" width: 65%; height: 100%;" ></image >
      </template>
    </long-button>
    </view>
    <!-- End 第二个Long-Button -->
    
    
    <!-- Start hide第三个Long-Button -->
    <view style="width: 95%;margin-bottom: 40rpx; color: white;">
      <view style=" margin: 40rpx 0rpx 0rpx 0rpx;">
        <text style="color: red;letter-spacing: 1rpx;">*</text>请输入舞蹈房对应的匹配码
      </view>
      <view class="InputBoard">
         <input type="number" 
          v-for= "(item,index) in verfication"
          :key= "index" 
          :maxlength="1"
          :hold-keyboard="true"
          :focus="currentIndex==index"
          :id="index"
          :show-confirm-bar="false"
          @input="keyInput"
          class="InputItem" />
      </view>
    </view>
    <!-- End 第三个Long-Button -->
    
    <!-- Start 透明层 -->
    <view class="Four-LongButton">
      <view class="First-LongButton-son" >
        
      </view>
      <!-- Start 相机按钮 -->
    </view>
    <view class="camera" @click="useCamera">
      <view class="camera-son" >
        <image src="https://static.qiniuyun.highvenue.cn/image/DanceCamera.png" mode="aspectFit" style="width: 60%; height: 60%;"></image>
      </view>
    </view>
  
    <!-- Start底部 -->
    <view class="bottomSearch" >
      <!-- 用于占位 -->
      <view style="width: 93rpx;" >
       
      </view>
      <view class="SearchVideo" @click="SearchVideo">
        <text style="font-size: 30rpx;color: black;">查找视频</text>
      </view>
      <view class="my" @click="navigateMy">
        <view style="font-size: 15rpx;color: black;margin-top: 40rpx;font-weight: 550;">
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
      custom-class="rootStytle"
      active-class="selectStyle"
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
      custom-class="rootStytle"
      active-class="selectStyle"
      toolbar-class="changeToolbar"
      @confirm="confirmHours"
      @change="selectHours"
      :columns="columnsDays" item-height="40"/>
   </uni-popup>
   <!-- End 时间选择组件 -->
   
   <!-- Start权限提示信息 -->
   <uni-popup ref="permissionsPopup" type="dialog">
   	<uni-popup-dialog type="info" mode="base" content="您已拒绝该项授权，如需开启，请点击确认进入设置页面重新授权" :before-close="true" @close="close" @confirm="confirm"></uni-popup-dialog>
   </uni-popup>
   <!-- End权限提示信息 -->
  </view>
</template>

<script>
  import { mapMutations,mapState,mapActions } from "vuex"
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
        // 选定舞房的ID
        selectId:0,
        // 选定的时间段
        currentTimes:"",
        courtName: 'HiCourt运动体验中心1111',
        site: '1号场地',
        supprt_find: 1 ,// 是否支持拍照 默认支持
        venuesList: [] ,// 场馆数据包含场地图片
        allVideoTimeArr: [],
        siteInfo: []
			}
		},
    created() {
      this.getVenues()
      this.setSystemInfo()
      this.getTimeData()
    },
    computed: {
      ...mapState('m_camera',['imgSrc']),
      ...mapState('m_venues',['startTime','stopTime','allVenues']),
      ...mapState("m_device",["info"])
    },
		methods: {
      ...mapMutations('m_venues',['getVenuesImg','updateStartTime','updateStopTime','updateShowTimeArr']),
      ...mapMutations("m_device",["setDeviceInfo",]),
      ...mapMutations("m_video",["setSearchData"]),
      ...mapActions('m_venues',['getVideo']),
      // 选择场馆
      chooseVenues() {
        this.$refs.popupVenues.open('bottom')
      },
      // 选择舞房点击确认
      confirmHouse(){
        this.$refs.popupVenues.close()
      },
      // 滑动选择舞房
      selectHouse(data){
        this.currentHourses = this.columnsHouses[data.detail.index]
        this.currentBacimg = this.venuesList[data.detail.index].data.thumbnail
        console.log(this.venuesList[data.detail.index].data.thumbnail)
      },
      // 点击选择时段
      showTimePopup() {
        this.$refs.popup.open('bottom')
        this.currentTimes = this.columnsDaysYear[0]
      },
      // 选择时间段点击确认
      confirmHours(){
        this.$refs.popup.close()
      },
      // 滑动选择时间
      selectHours(data){
        this.currentTimes = this.columnsDaysYear[data.detail.index]
      },
      // 查找视频
      async SearchVideo() {
        var tempCode = ""
        this.verfication.map(item=>{
          tempCode = tempCode + item.toString()
        })
        await uni.$http.post(`/venues/invite`,{
          // 场馆邀请码
          invite_code: parseInt(tempCode),  
          // 场馆id
          venue_id: 14,  
          applet: "HiDancing"
        }).then(value=>{
          if(value.data.code==0){
            this.venuesList.map(item=>{
              if(item.name==this.currentHourses){
                this.selectId = item.id
              }
            })
            this.setSearchData({houseId:this.selectId,startTime:this.currentTimes+ " " + "00:00:00",stopTime:this.currentTimes+ " " + "24:00:00"})
            uni.navigateTo({
              url: "../video/allVideo",
            })
          }
          else{
            uni.$showMsg("验证码输入错误，请重新输入！")
          }
        })
      },
      // 输出查看键盘输入
      keyInput(data){
        this.verfication[data.target.id] = data.target.value
        if(this.verfication[data.target.id]){
          if(data.target.id<this.verfication.length-1){
            this.currentIndex = parseInt(data.target.id) + 1
          }
          else{
            this.currentIndex = parseInt(data.target.id)
          }
        }
        else{
          this.currentIndex = parseInt(data.target.id)
        }
      },
      // 获得当前的设备信息
      async setSystemInfo() {
        var that =this
        uni.getSystemInfo({
          success: function (res) {
            let menuInfo = uni.getMenuButtonBoundingClientRect()
            that.setDeviceInfo(Object.assign({}, res, {menuInfo}))
          }
        });
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
        }
      },
      // 调用相机
      useCamera() {
        uni.$showMsg("暂不支持人脸查询！")
        // uni.authorize({
        //   scope: 'scope.camera',
        //   success: (res) => {
        //     uni.navigateTo({
        //       url: '../camera/camera'
        //     })
        //   },
        //   fail: () => {
        //     // uni.$showMsg('如需再次授权，请到个人中心设置页面进行授权')
        //     this.$refs.permissionsPopup.open('center')
        //   }
        // })
      },
      close() {
        this.$refs.permissionsPopup.close()
      },
      confirm() {
        // 二次授权
        var that = this 
        wx.openSetting({
          success () {
            that.wxGetLocation()
          }
        })
        this.$refs.permissionsPopup.close()
      },
      // 用户授权位置信息
      wxGetLocation() {
        var that = this
        uni.getLocation({
          type: 'wgs84',
          success: async function(res) {
            // 计算距离
            var distance = [] // 最近距离
            let list = await Promise.all(that.venuesList.map(item => {
              if(res.latitude) {
               distance.push(Vue.prototype.$getDistance(res.longitude,res.latitude,item.data.location[0],item.data.location[1])) 
              }
              else {
                // item.myLocation = 0
              }
            }))
          that.courtName = that.venuesList[distance.indexOf(Math.min(...distance))].name  
          const currentObj = that.venuesList.find(function(item){
            if(item.name == that.courtName){
              return item
            }
          })
          
          // 是否支持人脸
          that.venuesList.forEach(item => {
            if(item.name == that.courtName){
              that.supprt_find = item.data.supprt_find
              }
            })
          },
          fail: function() {
            that.venuesList.forEach(item => {
              if(item.name == that.courtName){
                that.supprt_find = item.data.supprt_find
              }
            })
            that.$refs.permissionsPopup.open('center')
          }
        })
      },
      // 请求所有场馆
      async getVenues() {
        const {data} = await uni.$http.get('/venues/?applet=HiDancing')
        this.venuesList = data.data
        this.columnsHouses = this.venuesList.map(item=>{
          return item.name
        })
        this.currentHourses = this.columnsHouses[0]
        this.currentBacimg = this.venuesList[0].data.thumbnail
        this.wxGetLocation()
        this.getVenuesImg(this.venuesList)
      },
      // 去个人页面
      navigateMy() {
        uni.navigateTo({
          url: '../my/my'
        })
      },
		}
	}
</script>

<style lang="scss">
  @import "@/static/style/index"
</style>
