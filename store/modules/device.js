export default {
  namespaced: true,
  state: {
    // 当前设备的信息
    deviceInfo: null,
    // 当前用户的定位信息
    locationInfo:null,
    // 当前服务器响应的时间
    currentTime:"",
  },
  mutations: {
    setDeviceInfo(state, payload) {
      state.deviceInfo = payload
    },
    setLocationInfo(state, payload) {
      state.locationInfo = payload
    },
    setServerTime(state,payload) {
      state.currentTime = payload
    }
  },
  actions:{
    getLocation({commit,state}){
      return new Promise((resolve,reject)=>{
        uni.getLocation({
        	type: "wgs84",
        	success: (res) => {
        		commit("setLocationInfo",res)
            return resolve()
        	},
          fail: (error) => {
            commit("setLocationInfo",error)
            return reject()
          }
        });
      })
    }
  }
}
