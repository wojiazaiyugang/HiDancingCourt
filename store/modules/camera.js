export default {
  namespaced: true,
  state:{
    // 用户照片信息转base64
    imgSrc: "" 
  },
  mutations: {
    updateImgSrc(state,payload) {
      state.imgSrc = payload
    }
  }
}