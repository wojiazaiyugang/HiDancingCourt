export default {
  // 开启命名空间
  namespaced: true,
  
  // 模块化数据
  state: () => ({
    // 用户信息对象
    userinfo: JSON.parse(uni.getStorageSync('userinfo') || '{}') ,
    // 视频下载数量
    videoDownloadNum: 0
  }),
  
  mutations: {
    // 更新视频下载数量
    updateVideoDownloadNum(state,payload) {
      state.videoDownloadNum = payload
    },
    // 更新用户基本信息
    updateUserInfo(state,userinfo) {
      state.userinfo = userinfo
      this.commit('m_user/saveUserInfoToStorage')
    },
    // 用户信息持久化存储至本地
    saveUserInfoToStorage(state) {
      uni.setStorageSync('userinfo',JSON.stringify(state.userinfo))
    },
    // token永久存入本地
    saveTokenToStorage(state) {
      uni.setStorageSync('token',JSON.stringify(state.token))
    },
  },
  actions: {
    async getToken() {
      // 拿到openId
      if(uni.getStorageSync('token')) return
        const [err,res] = await uni.login()
        if(err || res.errMsg !== 'login:ok') return uni.$showMsg('登录失败')
        if(res.code) {
          const { data } = await uni.$http.get(`/users/open_id/?code=${res.code}&applet=HiDancing`)
          
          uni.setStorageSync('token',data.data)
        }
    },
  },
  
  getters: {
    
  }
  
}