export default {
  namespaced: true,
  state:{
    // 用户是否选择场地
    selectSite:false,
    // 用户选择单个场地搜索的场地ID
    siteId:0,
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
      houseId:[],
      startTime:"",
      stopTime:"",
    },
  },
  mutations: {
    setSelectSite(state,payload){
      state.selectSite = payload
    },
    setSiteId(state,payload){
      state.siteId = payload
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
    },
  }
}