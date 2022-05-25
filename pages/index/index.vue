<template>
	<view class="container"
   style="background-image: url(https://static.qiniuyun.highvenue.cn/image/DanceBgi.jpg);"
   >
    <!-- Start 第一个Long-Button -->
    <view class="First-LongButton">
      <long-button>
        <template v-slot:icon >
        <image src="https://static.qiniuyun.highvenue.cn/image/hibascourt_images/location.png" mode="aspectFit" style="width: 80%; height: 80%;"></image>
        </template>
        
        <template v-slot:center-text>
          <text style="text-align: center;">请选择您练舞的舞蹈房</text>
        </template>
        
        <template v-slot:i-choose>
         <image src="https://static.qiniuyun.highvenue.cn/image/hibascourt_images/switch.png"
          mode="aspectFit"
          style="width: 60%; height: 100%;"
          @click="chooseVenues"></image >
        </template>
      </long-button>
    </view>
    <!-- End 第一个Long-Button -->
    
    <!-- Start 球馆图片 -->
    <view class="courtPicture">
      
    </view>
    <!-- End 球馆图片 -->
    
    <!-- Start 第二个Long-Button -->
    <view class="Second-LongButton">
    <long-button>
      <template v-slot:icon>
        <image src="https://static.qiniuyun.highvenue.cn/image/hibascourt_images/time.png" mode="aspectFit" style="width: 80%; height: 80%;"></image>
      </template> 
      <template v-slot:center-text>
       <text class="text">请选择您练舞的时段</text>
      </template>
      <template v-slot:i-choose>
         <image src="https://static.qiniuyun.highvenue.cn/image/hibascourt_images/switch.png" mode="aspectFit" @click="showTimePopup" style="width: 65%; height: 100%;" ></image >
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
         <textarea type="number" 
          v-for= "(item,index) in 4"
          :key= "index" 
          :id="index"
          :show-confirm-bar="false"
          :cursor-spacing="50"
          @input="bindKeyInput"
          class="InputItem" />
      </view>
    </view>
    <!-- End 第三个Long-Button -->
    
    <!-- Start 透明层 -->
    <view class="Four-LongButton">
      <view class="First-LongButton-son" :style="{background:supprt_find_color}" >
        <text 
        class="textColor" 
        style="margin: 10rpx 0 0 18rpx;"
        v-if="supprt_find"
        >点击图标人脸识别</text>  
        <text 
        class="textColor" 
        style="margin: 10rpx 0 0 18rpx;"
        v-else
        >该场馆不支持拍照查询</text>
      </view>
      <!-- Start 相机按钮 -->
    </view>
    <view class="camera" @click="useCamera">
      <view class="camera-son" :style="{background:supprt_find_color}"  >
        <image src="https://static.qiniuyun.highvenue.cn/image/hibascourt_images/camera.png" mode="aspectFit" style="width: 60%; height: 60%;"></image>
      </view>
    </view>
  
    <!-- Start底部 -->
    <view class="bottomSearch" >
      <!-- 用于占位 -->
      <view style="width: 93rpx;" >
       
      </view>
      <view class="SearchVideo" @click="SearchVideo">
        <text class="textColor">查找视频</text>
      </view>
      <view class="my" @click="toMy">
        <image src="https://static.qiniuyun.highvenue.cn/image/hibascourt_images/my.png" mode="aspectFit" style="width: 100%; height: 100%;"></image>
        <text class="pos-text">我的</text>
      </view>
    </view>
    <!-- End底部 -->
    
   <!-- Start 时间选择组件 -->
   <uni-popup ref="popup" :safeArea="false">
     <choose-time @data="getData($event)"></choose-time>
   </uni-popup>
   <!-- End 时间选择组件 -->
   
   <!-- Start选择场馆弹出层 -->
   <uni-popup ref="popupVenues" :safeArea="false">
     <choose-venues ref="allVenues" :siteInfo="siteInfo" @chanSiteInfo="chanSiteInfo($event)"></choose-venues>
   </uni-popup>
   <!-- End选择场馆弹出层 -->
   
   <!-- Start权限提示信息 -->
   <uni-popup ref="permissionsPopup" type="dialog">
   	<uni-popup-dialog type="info" mode="base" content="您已拒绝该项授权，如需开启，请点击确认进入设置页面重新授权" :duration="2000" :before-close="true" @close="close" @confirm="confirm"></uni-popup-dialog>
   </uni-popup>
   <!-- End权限提示信息 -->
  </view>
</template>

<script>
  import { mapMutations,mapState,mapActions } from 'vuex'
  import Vue from 'vue'
	export default {
		data() {
			return {
        // 四位验证码用于战报搜索
        verfication:[],
        start_time: '', // 接口数据(废弃)-媒介数据
        stop_time: '', //接口数据(废弃)-媒介数据
        showTime: {showStart: '',showStop: ''}, // 时间选择组件传递的时间数据
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
      this.defaultTime()
      this.setSystemInfo()
    },
    computed: {
      supprt_find_color() {
        return this.supprt_find === 1 ? 'linear-gradient(to bottom, #FB9D6A, #F6397E)' : '#666!important'
      },
      ...mapState('m_camera',['imgSrc']),
      ...mapState('m_venues',['startTime','stopTime','allVenues']),
      ...mapState("m_device",["info"])
    },
		methods: {
      ...mapMutations('m_venues',['getVenuesImg','updateStartTime','updateStopTime','updateShowTimeArr']),
      ...mapMutations("m_device",["setDeviceInfo",]),
      ...mapActions('m_venues',['getVideo']),
      // 输出查看键盘输入
      bindKeyInput(e){
        console.log("e",e)
        this.verfication[e.target.id] = e.target.value
      },
      
      
      
      async setSystemInfo() {
        // try {
          // 得到设备信息
          // let info = await uni.getSystemInfo(),
          //   // 得到胶囊位置信息
          //   menuInfo = uni.getMenuButtonBoundingClientRect()
          //   this.setDeviceInfo(Object.assign({}, info, {menuInfo}))
          //   console.log("查看当前的设备信息",this.info)
            
            var that =this
            uni.getSystemInfo({
            	success: function (res) {
                console.log("查看当前的设备信息",res)
                let menuInfo = uni.getMenuButtonBoundingClientRect()
                console.log("查看按钮",menuInfo)
                that.setDeviceInfo(Object.assign({}, res, {menuInfo}))
                console.log("sadasd",that.info)
              }
            });
            
      },
      // 时间选择组件传递的数据
      getData(time) {
        // console.log(time)
        time.start_time = time.start_time.substr(0,5)
        // console.log(time.start_time)
        // console.log(time.stop_time)
        if(time.start_time && time.stop_time) {
          this.showTime.showStart = time.start_time.replace(':',' : ')
          this.showTime.showStop = time.stop_time.replace(':',' : ')
        }
        if(time.year){
          this.start_time = `${time.year} ${time.start_time}:00`
          this.stop_time = `${time.year} ${time.stop_time}:00`
          // 格式化日期的标准时间格式
          this.updateStartTime(this.start_time)
          this.updateStopTime(this.stop_time)
          this.date(this.start_time,this.stop_time)
         } 
        else {
          let day = new Date()
          let y = day.getFullYear()
          let m = day.getMonth() + 1
          m = m > 10 ? m : `0${m}`
          let d = day.getDate()
          d = d >= 10 ? d : `0${d}` 
          let currentDay = `${y}-${m}-${d}`
          this.start_time = `${currentDay} ${time.start_time}:00`
          this.stop_time = `${currentDay} ${time.stop_time}:00`
          // console.log(this.start_time)
          // console.log(this.stop_time)
          this.updateStartTime(this.start_time)
          this.updateStopTime(this.stop_time)
          this.date(this.start_time,this.stop_time)
        }
      },
      // 更新所有视频页面时段数据
      date(startTime,stopTime) {
        // 防止只有一个时间，造成栈溢出
        if(startTime.length < 19 || stopTime.length < 19) {
          return
        } 
          let time1 = new Date(startTime) // 标准日期格式
          let time2 = time1.getTime() // 毫秒数
          let newTime = time1.setTime(time2 + 1800000) // 加半小时毫秒数
          let a = new Date(newTime) // 标准日期格式
          let y = a.getFullYear()
          let M = ((a.getMonth()+1) < 10 ? '0'+(a.getMonth()+ 1) : (a.getMonth()+ 1))
          let d = (a.getDate() < 10 ? '0'+ a.getDate() : a.getDate())
          let h = (a.getHours() < 10 ? '0'+a.getHours() : a.getHours())
          let m = (a.getMinutes() < 10 ? '0'+a.getMinutes() : a.getMinutes())
          let s = (a.getSeconds() < 10 ?'00' : a.getSeconds())
          this.allVideoTimeArr.push(`${h}:${m}:${s}`)
          if(parseInt(stopTime.slice(10,13)) == h )  {
            this.updateShowTimeArr(this.allVideoTimeArr)
            this.allVideoTimeArr = []
            return
          }
          this.date(`${y}-${M}-${d} ${h}:${m}:${s}0`,stopTime)  
        },
      // 默认时段
      defaultTime () {
        let date = new Date()
        let y = date.getFullYear()
        let M = ((date.getMonth()+1) < 10 ? '0'+(date.getMonth()+ 1) : (date.getMonth()+ 1))
        let d = (date.getDate() < 10 ? '0'+ date.getDate() : date.getDate())
        let h = date.getHours() < 10 ? '0' +date.getHours() : date.getHours()
        // 前两个小时
        let hed = h - 2
        hed = hed < 10 ? '0'+hed : hed
        console.log(hed)
        let m = date.getMinutes()
        m = m < 10 ? `0${m}` : m
        this.showTime.showStart = `${hed} : ${m}`
        // console.log(`${hed} : ${m}`)
        this.showTime.showStop = `${h} : ${m}`
        if(m < 30) {
          this.updateStartTime(`${y}-${M}-${d} ${hed}:00:00`)
          this.updateStopTime(`${y}-${M}-${d} ${h}:30:00`)
          // console.log('<30')
        } else {
          this.updateStartTime(`${y}-${M}-${d} ${hed}:30:00`)
          this.updateStopTime(`${y}-${M}-${d} ${parseInt(h) + 1}:00:00`)
          // console.log('>=30')
        }
      },
      // 点击选择时段
      showTimePopup() {
        this.$refs.popup.open('bottom')
      },
      // 调用相机
      useCamera() {
        uni.authorize({
          scope: 'scope.camera',
          success: (res) => {
            console.log(res)
            uni.navigateTo({
              url: '../camera/camera'
            })
          },
          fail: () => {
            // uni.$showMsg('如需再次授权，请到个人中心设置页面进行授权')
            this.$refs.permissionsPopup.open('center')
          }
        })
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
            // console.log(that.venuesList)
            let list = await Promise.all(that.venuesList.map(item => {
            // console.log(item.data.location[0])
              if(res.latitude) {
               distance.push(Vue.prototype.$getDistance(res.longitude,res.latitude,item.data.location[0],item.data.location[1])) 
              }
              else {
                // item.myLocation = 0
              }
            }))
          // 显示球馆名称
          // console.log('venueslist')
          // console.log(that.venuesList)
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
        let that = this
        const {data: res} = await uni.$http.get('/venues/?applet=HiDancing')
        that.venuesList = res.data
        this.wxGetLocation()
        this.getVenuesImg(this.venuesList)
      },
      // 去个人页面
      toMy() {
        uni.navigateTo({
          url: '../my/my'
        })
      },
      // 选择场馆
      async chooseVenues() {
        this.$refs.popupVenues.open('bottom')
        const {data: img} = await uni.$http.get(`/sites/${this.allVenues[0].id}`)
        console.log("初始第一个",img)
        this.siteInfo = [...img.data]
      },
      chanSiteInfo(event) {
        this.siteInfo = [...event]
        console.log('event')
        console.log(event)
      },
      // 查找视频
      SearchVideo() {
        uni.navigateTo({
          url: '../video/allVideo'
        })
      },
		}
	}
</script>

<style lang="scss">
  @import '@/style/index'
</style>
