export default {
  namespaced: true,
  
  state: () => ({
    videoInfo: null
  }),
  mutations: {
    updateVideoInfo(state,payload) {
      state.videoInfo = payload
        console.log('2')
      console.log(state.videoInfo)
    }
  }
  
}