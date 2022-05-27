export default {
  // 开启命名空间
  namespaced: true,
  
  // 模块化数据
  state: () => ({
    // 个人用户信息
    userInfo:null,
  }),
  
  mutations: {
    setUserInfo(state,payload){
      state.userInfo = payload
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