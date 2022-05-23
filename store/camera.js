export default {
  namespaced: true,
  state: () => ({
    imgSrc: '' // 用户照片信息转base64
  
  }),
  mutations: {
    updateImgSrc(state,payload) {
      state.imgSrc = payload
      console.log('img')
      console.log(state.imgSrc)
    }
  }
}