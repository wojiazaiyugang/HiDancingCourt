
export default {
  namespaced: true,
  state: {
    // 当前设备的信息
    deviceInfo: null,
    // 当前用户的定位信息
    locationInfo:null,
  },
  mutations: {
    setDeviceInfo(state, payload) {
      state.deviceInfo = payload
    },
    setLocationInfo(state, payload) {
      state.locationInfo = payload
    }
  },
  actions:{
    getLocation({commit,state}){
      return new Promise((resolve,reject)=>{
        uni.getLocation({
        	type: "wgs84",
        	success: (res) => {
            console.log("定位信息",res)
        		commit("setLocationInfo",res)
            return resolve()
        	},
          fail: (error) => {
            console.log()
            return reject()
          }
        });
      })
    }
  }
}
