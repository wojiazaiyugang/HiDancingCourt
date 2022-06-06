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
    },
    updatelatitudeLongitude(state,payload) {
      state.latitudeLongitude = payload
    },
    getVenuesImg(state,payload) {
      state.allVenues = payload
    },
    updateSiteIdVideo(state,payload) {
      state.siteIdVideo.push(...payload)
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
    },
    updateSetId(state,payload) {
      state.setId = payload
    },
    updatePage(state,payload) {
      state.page += payload
    },
    updateBallType(state,payload) {
      state.ballType.push(payload)
    },
    updateTotal(state,payload) {
      state.total = payload
    },
    updateDay(state,payload) {
      state.day.push(payload) 
    },
    updateHours(state,payload) {
      state.hours.push(payload)
    },
    updateVideoShow(state,payload) {
      state.videoShow = payload
    }
  },
  actions: {
    async getVideo({commit,state,rootState},payload) {
      const {data} = await uni.$http.post('/search/hidancing_search', {
        // site_ids: [54],
        // face_img: payload.face_img,
        // goal_category: payload.goal_category,
        // start_time: payload.start_time,
        // stop_time: payload.stop_time,
        // page: state.page,
        // per_page: state.per_page,
        // start_time: this.startTime,
        // stop_time: this.stopTime,
        start_time: "2022-05-13 07:45:13",
        stop_time: "2022-05-13 13:46:13",
        venue_id:22,
        page:1,
        per_page:5,
        applet:"HiDancing"
      })
      console.log(data)
      if(data.data.data == []) {
        commit('updateVideoShow',!state.videoShow)
      }
      commit('updateTotal',data.data.total_num)
      commit('updateSiteIdVideo',data.data.data)
      commit('updateNewSiteIdVideo',data.data.data)
    }
  }
}