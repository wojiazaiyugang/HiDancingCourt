export default {
  namespaced: true,
  state:{
    // 用户当前的人脸信息
    userFaceInfo:"",
  },
  mutations: {
    setUserFaceInfo(state,payload){
      state.userFaceInfo = payload
    }
  }
}