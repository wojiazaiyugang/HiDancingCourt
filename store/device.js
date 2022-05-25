





export default {
  namespaced: true,
  state: ()=> ({
    // 当前设备的信息
    info: null,
  }),
  
  mutations: {
    setDeviceInfo(state, payload) {
      state.info = payload
    },
  }
}
