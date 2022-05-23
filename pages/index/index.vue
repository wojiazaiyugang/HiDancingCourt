<template>
	<view class="container"
   style="background-image: url(https://static.qiniuyun.highvenue.cn/image/hibascourt_images/index-bgi.jpg);"
   >
    <!-- Start 第一个Long-Button -->
    <view class="First-LongButton">
      <long-button>
        <template v-slot:icon >
        <image src="https://static.qiniuyun.highvenue.cn/image/hibascourt_images/location.png" mode="aspectFit" style="width: 80%; height: 80%;"></image>
        </template>
        
        <template v-slot:first-text>
          <text class="text">定位：{{courtName}}
        <!-- <text style="padding-left: 20rpx;">默认： 1号场地</text> -->
          </text>
        </template>
        
        <template v-slot:second-text>
          <text class="text" @click="color">默认：{{site}}</text>
        </template>
        
        <template v-slot:i-choose>
         <image src="https://static.qiniuyun.highvenue.cn/image/hibascourt_images/switch.png" mode="aspectFit" style="width: 60%; height: 100%;" @click="chooseVenues"></image >
        </template>
      </long-button>
    </view>
    <!-- End 第一个Long-Button -->
    
    <!-- Start 球馆图片 -->
    <view class="courtPicture flex">
      <image class="flex" src="https://static.qiniuyun.highvenue.cn/image/hibascourt_images/picture.png" ></image>
    </view>
    <!-- End 球馆图片 -->
    
    <!-- Start 第二个Long-Button -->
    <view class="Second-LongButton">
    <long-button>
      <template v-slot:icon>
        <image src="https://static.qiniuyun.highvenue.cn/image/hibascourt_images/time.png" mode="aspectFit" style="width: 80%; height: 80%;"></image>
      </template> 
      <template v-slot:first-text>
       <text class="text">默认时段：{{ showTime.showStart }}~{{ showTime.showStop }}</text>
      </template>
      <template v-slot:i-choose>
         <image src="https://static.qiniuyun.highvenue.cn/image/hibascourt_images/switch.png" mode="aspectFit" @click="showTimePopup" style="width: 65%; height: 100%;" ></image >
      </template>
    </long-button>
    </view>
    <!-- End 第二个Long-Button -->
    
    <!-- Start show第三个Long-Button -->
    <view class="show-Third-LongButton" v-if="false">
      <long-button >
        <template v-slot:icon>
            <image src="https://static.qiniuyun.highvenue.cn/image/hibascourt_images/sports.png" mode="aspectFit" style="width: 60%; height:60%;"></image>
        </template>
        <template v-slot:first-text>
          <text class="text">请选择您打球时战袍的颜色</text>
        </template>
      </long-button>
    </view>
    <!-- End 第三个Long-Button --> 
    
    <!-- Start hide第三个Long-Button -->
    <view class="hide-Third-LongButton" v-else>
      <long-button>
        <template v-slot:icon>
            <image src="https://static.qiniuyun.highvenue.cn/image/hibascourt_images/ccc-sports.png" mode="aspectFit" style="width: 60%; height:60%;"></image>
        </template>
        <template v-slot:first-text>
          <text class="text">该场馆不支持战袍颜色选择</text>
        </template>
      </long-button>
    </view>
    <!-- End 第三个Long-Button -->
    
    <!-- Start 透明层 -->
    <view class="transparent">
      <view class="Four-LongButton">
        <view class="First-LongButton-son" :style="{background:supprt_find_color}" >
          <text 
          class="textColor" 
          style="margin: 10rpx 0 0 18rpx;"
          v-if="supprt_find"
          >点击图标拍照查询</text>  
          <text 
          class="textColor" 
          style="margin: 10rpx 0 0 18rpx;"
          v-else
          >该场馆不支持拍照查询</text>
        </view>
      </view>
      <!-- Start 相机按钮 -->
      <view class="camera" @click="useCamera">
        <view class="camera-son flex" :style="{background:supprt_find_color}"  >
           <image src="https://static.qiniuyun.highvenue.cn/image/hibascourt_images/camera.png" mode="aspectFit" style="width: 60%; height: 60%;"></image>
        </view>
      </view>
      <!-- End 相机按钮 -->
    </view>
    <!-- End 透明层 -->
    
    <!-- Start底部 -->
   <view class="bottom flex" >
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
        start_time: '', // 接口数据(废弃)-媒介数据
        stop_time: '', //接口数据(废弃)-媒介数据
        showTime: {showStart: '',showStop: ''}, // 时间选择组件传递的时间数据
        courtName: 'HiCourt运动体验中心1111',
        site: '1号场地',
        supprt_find: 1 ,// 是否支持拍照 默认支持
        venuesList: [] ,// 场馆数据包含场地图片
        // siteArr: [],
        allVideoTimeArr: [],
        siteInfo: []
			}
		},
     created() {
      // this.checkToken()
      this.getVenues()
      this.defaultTime()
      console.log('wx')
      //  wx.getSystemInfo({
      //   success(res) {
      //     console.log(res)
      //   }
      // })
    },
    computed: {
      supprt_find_color() {
        return this.supprt_find === 1 ? 'linear-gradient(to bottom, #f7a216, #fe6205)' : '#666!important'
      },
      ...mapState('m_camera',['imgSrc']),
      ...mapState('m_venues',['startTime','stopTime','allVenues'])
    },
		methods: {
      ...mapMutations('m_venues',['getVenuesImg','updateStartTime','updateStopTime','updateShowTimeArr']),
      ...mapActions('m_venues',['getVideo']),
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
        
        // console.log('==========')
        // console.log(this.showTime.showStart)
        
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
        // if( hed < 2 ) {
        //   hed = '00'
        // } else if( hed < 1 ) {
        //   hed = 22
        // }
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
        
        // console.log(`${y}-${M}-${d} ${hed}:${m}:00`)
        // console.log(`${y}-${M}-${d} ${h}:${m}:00`)
         // console.log(this.startTime)
         // console.log(this.stopTime)
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
      // 有token，发送业务请求
      // checkToken() {
      //   // let that = this
      //   let timer = ''
      //   // clearInterval(timer)
      //   if(uni.getStorageSync('token')) {
      //     this.getVenues()
      //     return
      //   } else {
      //     timer = setInterval(async() => {
      //       if(uni.getStorageSync('token')){
      //         this.getVenues()
      //         clearInterval(timer)
      //       }
      //     })
      //   }
      // },
      // 用户授权位置信息
      wxGetLocation() {
        var that = this
        uni.getLocation({
          type: 'wgs84',
          success: async function(res) {
            console.log('经纬度',res)
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
        console.log('getVenues')
        let that = this
        // let timer = ''
        // clearInterval(timer)
        // timer = setInterval(async() => {
          // if(uni.getStorageSync('token')){
            
            const {data: res} = await uni.$http.get('/venues/')
            // console.log('2ss')
            console.log(res)
            that.venuesList = res.data
            this.wxGetLocation()
            // console.log('data')
            // this.wxGetLocation()
            // console.log(that.venuesList)
            
            
            // for(let i = 0; i < that.venuesList.length; i++){
            //   if(that.venuesList[i].id == 5 || that.venuesList[i].id == 9 || that.venuesList[i].id == 10){
            //     that.venuesList.splice(i,1)
            //     i--
            //   }
            // }
            // console.log('siteid')
            // that.venuesList.forEach(async item => {
            //   const {data: img} = await uni.$http.get(`/sites/${item.id}`)
            //   // that.siteArr.push(...img.data)
            //   item.img = img.data
            // })
            // console.log(that.venuesList[0])
            // console.log('that')
            // 更新vuex场地信息
            // 更新场馆信息
            this.getVenuesImg(this.venuesList)
            // clearInterval(timer)
          // }
        // },100)
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
        console.log(img)
        this.siteInfo = [...img.data]
        // console.log(this.siteInfo)
      },
      chanSiteInfo(event) {
        this.siteInfo = [...event]
        console.log('event')
        console.log(event)
      },
      // 查找视频
      async  SearchVideo() {
        var query = {
          start_time: this.startTime,
          stop_time: this.stopTime,
          face_img: this.imgSrc
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
