import Vue from 'vue'
export default {
  namespaced: true,
  
  state: () => ({
    // 所有的场馆信息
    allVenues: [],
    // 根据场地id搜索到的视频
    siteIdVideo: [],
    // 用户选择搜索时间,场馆id
    startTime: '',
    stopTime: '',
    setId: [],
    page: 1,
    per_page: 13,
    ballType: [],
    total: '',
    day: [],
    hours: [],
    // 所有视频时段显示
    showTimeArr: [],
    // 用户经纬度
    latitudeLongitude: {},
    venuesList: [] ,//场馆数据包含场地图片
    videoShow: false ,// 暂无视频显示隐藏
    newSiteIdVideo: []
  }),
  
  mutations: {
    updateShowTimeArr(state,payload) {
      state.showTimeArr = []
      var arr = []
      arr.unshift(state.startTime.slice(11,16))
      payload.forEach((item,index) => {
      item = item.slice(0,5)
      arr.push(item)
      })
      arr.forEach((item,index) => {
        if(index == arr.length -1) return
        state.showTimeArr.push(`${arr[index]}-${arr[index + 1]}`)
      })
    },
    updateVenuesList(state,payload) {
      state.venuesList = payload
      // console.log(state.venuesList)
      // console.log('1')
    },
    updatelatitudeLongitude(state,payload) {
      state.latitudeLongitude = payload
      // console.log(state.latitudeLongitude)
    },
    getVenuesImg(state,payload) {
      state.allVenues = payload
      // console.log(state.allVenues[0])
      // console.log('34')
    },
    updateSiteIdVideo(state,payload) {
      state.siteIdVideo.push(...payload)
      console.log('sitevideo')
      console.log(state.siteIdVideo)
    },
    updateNewSiteIdVideo(state,payload){
      state.newSiteIdVideo.push(...payload)
    },
    clearSiteIdVideo(state,payload) {
      state.siteIdVideo = []
    },
    clearPage(state,payload) {
      state.page = 1
    },
    updateStartTime(state,payload) {
      state.startTime = payload
      // console.log(state.startTime)
    },
    updateStopTime(state,payload) {
      state.stopTime = payload
      // console.log(state.stopTime)
      // console.log('stoptime')
    },
    updateSetId(state,payload) {
      state.setId = payload
      // console.log(state.setId)
    },
    updatePage(state,payload) {
      state.page += payload
      // console.log(state.page)
    },
    updateBallType(state,payload) {
      state.ballType.push(payload)
      // console.log(state.ballType)
    },
    updateTotal(state,payload) {
      state.total = payload
      // console.log(this.total)
    },
    updateDay(state,payload) {
      state.day.push(payload) 
    },
    updateHours(state,payload) {
      state.hours.push(payload)
    },
    updateVideoShow(state,payload) {
      state.videoShow = payload
      // console.log(state.videoShow)
    }
  },
  actions: {
    async getVideo({commit,state,rootState},payload) {
      // console.log(state.startTime)
      // console.log(state.stopTime)
      // console.log(rootState)
     
      const {data} = await uni.$http.post('/search/', {
        site_ids: [54],
        face_img: payload.face_img,
        goal_category: payload.goal_category,
        start_time: payload.start_time,
        stop_time: payload.stop_time,
        page: state.page,
        per_page: state.per_page
      })
      console.log(data)
      if(data.data.data == []) {
        commit('updateVideoShow',!state.videoShow)
      }
      // console.log(data)
      // console.log('xxxx')
      // console.log(data.data.total_num)
      // 更新总条数
      commit('updateTotal',data.data.total_num)
      // 更新数组
      commit('updateSiteIdVideo',data.data.data)
      commit('updateNewSiteIdVideo',data.data.data)
    }
    // 请求所有场馆
    // async getVenues({dispatch,commit,state},payload) {
    //   // console.log(conte)
    //   var that = this
    //   // let timer = ''
    //   // clearInterval(timer)
    //   // timer = setInterval(async() => {
    //     // if(uni.getStorageSync('token')){
    //       // this.wxGetLocation()
          
    //       const {data: res} = await uni.$http.get('/venues/')
    //       console.log('2ss')
    //       // console.log(res)
    //       commit('updateVenuesList',res.data)
          
    //       dispatch('wxGetLocation')
    //       // console.log('data')
    //       // this.wxGetLocation()
    //       // console.log(that.venuesList)
    //       for(let i = 0; i < state.venuesList.length; i++){
    //         if(state.venuesList[i].id == 5 || state.venuesList[i].id == 9 || state.venuesList[i].id == 10){
    //           state.venuesList.splice(i,1)
    //           i--
    //         }
    //       }
    //       console.log('siteid')
          
    //       // 计算距离
    //       var distance = [] // 最近距离
    //       // console.log(that.venuesList)
    //       let list = state.venuesList.map(item => {
    //       console.log(state.latitudeLongitude.latitude)
    //       console.log('state.latitudeLongitude.latitude')
    //         if(state.latitudeLongitude.latitude) {
    //           console.log('latitudeLongitude')
    //          distance.push(Vue.prototype.$getDistance(state.latitudeLongitude.longitude,state.latitudeLongitude.latitude,item.data.location[0],item.data.location[1]))
    //         }
    //         else {
    //           item.myLocation = 0
    //         }
    //       })
          
          
          // 拿场地信息
          // that.venuesList.forEach(async item => {
          //   const {data: img} = await uni.$http.get(`/sites/${item.id}`)
          //   // that.siteArr.push(...img.data)
          //   item.img = img.data
          // })
          // console.log(that.venuesList[0])
          // console.log('that')
          // 更新vuex场地信息
          // this.updateSiteInfo(this.siteArr)
          
          // 更新场馆信息
          // commit('getVenuesImg',state.venuesList)
          // this.getVenuesImg(this.venuesList)
          // clearInterval(timer)
        // }
      // },100)
    // },
    // 用户授权位置信息
    // wxGetLocation({commit,state},payload) {
    //   var that = this
    //   wx.getLocation({
    //     type: 'wgs84',
    //     success: function(res) {
    //       console.log('经纬度',res)
    //       commit('updatelatitudeLongitude',res)

          // // 计算距离
          // var distance = [] // 最近距离
          // // console.log(that.venuesList)
          // let list = await Promise.all(state.venuesList.map(item => {
          // // console.log(item.data.location[0])
          //   if(res.latitude) {
          //    distance.push(Vue.prototype.$getDistance(res.longitude,res.latitude,item.data.location[0],item.data.location[1])) 
          //   }
          //   else {
          //     item.myLocation = 0
          //   }
          // }))
          
          // console.log(that.venuesList)
          // console.log(distance)
        // 显示球馆名称
        // console.log('venueslist')
        // console.log(that.venuesList)
        
        
        // that.courtName = that.venuesList[distance.indexOf(Math.min(...distance))].name  
        // const currentObj = that.venuesList.find(function(item){
        //   if(item.name == that.courtName){
        //     return item
        //   }
        // })
        
        // 是否支持人脸
        // that.venuesList.forEach(item => {
        //   if(item.name == that.courtName){
        //     that.supprt_find = item.data.supprt_find
        //     }
        //   })
        // },
        
        // fail: function() {
        //   that.venuesList.forEach(item => {
        //     if(item.name == that.courtName){
        //       that.supprt_find = item.data.supprt_find
        //     }
        //   })
        //   that.$refs.permissionsPopup.open('center')
        // }
      // })
    // },
  }
}