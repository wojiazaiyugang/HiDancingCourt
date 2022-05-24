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
        // 四位验证码
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
    },
    computed: {
      supprt_find_color() {
        return this.supprt_find === 1 ? 'linear-gradient(to bottom, #FB9D6A, #F6397E)' : '#666!important'
      },
      ...mapState('m_camera',['imgSrc']),
      ...mapState('m_venues',['startTime','stopTime','allVenues'])
    },
		methods: {
      ...mapMutations('m_venues',['getVenuesImg','updateStartTime','updateStopTime','updateShowTimeArr']),
      ...mapActions('m_venues',['getVideo']),
      // 输出查看键盘输入
      bindKeyInput(e){
        console.log("e",e)
        this.verfication[e.target.id] = e.target.value
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
        const {data: res} = await uni.$http.get('/venues/')
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
      async  SearchVideo() {
        console.log(this.verfication)
        var query = {
          start_time: this.startTime,
          stop_time: this.stopTime,
          // face_img: this.imgSrc
          face_img:"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"
        }
        this.date(this.startTime,this.stopTime)
        // console.log(query)
        this.getVideo(query)
          setTimeout( () => {
            uni.navigateTo({
              url: '../video/allVideo'
            })
          },50)
      },
		}
	}
</script>

<style lang="scss">
  @import '@/style/index'
</style>
