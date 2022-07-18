export default {
  namespaced: true,
  state:{
    // 用户的人脸验证照片是否通过
    userFaceValiate: true,
    // 用户当前的人脸信息
    userFaceInfo:"",
  },
  mutations: {
    setUserFaceValiate(state,payload) {
      state.userFaceValiate = payload
    },
    setUserFaceInfo(state,payload){
      state.userFaceInfo = payload
    }
  }
}