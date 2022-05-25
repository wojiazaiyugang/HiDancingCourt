export default {
  namespaced: true,
  
  state: () => ({
    // 视频播放页面当前播放的视频
    currentVideo: null,
    // 根据条件搜索出来的全部视频
    allSearchVideos:[],
    // 存储搜索视频当前的页数以及每一页多少个
    videoPages:{
      curPage:0,
      perPage:0,
    },
  }),
  mutations: {
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