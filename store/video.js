export default {
  namespaced: true,
  
  state: () => ({
    // 当前选择的教室id以及是否点击教室
    videoHouse:{
      id:"",
      clickStatus:false,
    },
    // 视频播放页面当前播放的视频
    currentVideo: null,
    // 根据条件搜索出来的全部视频
    allSearchVideos:[],
    // 存储搜索视频当前的页数以及每一页多少个
    videoPages:{
      curPage:0,
      perPage:0,
    },
    // 视频搜索的工作室ID以及时间
    searchData:{
      houseId:"",
      startTime:"",
      stopTime:"",
    }
  }),
  mutations: {
    setVideoHouse(state,payload){
      state.videoHouse = payload
    },
    setSearchData(state,payload){
      state.searchData = payload
    },
    setCurrentVideo(state,payload) {
      state.currentVideo = payload
    },
    setAllSearchVideos(state,payload){
      state.allSearchVideos = payload
    },
    setVideoPages(state,payload){
      state.videoPages = payload
    }
  }
  
}