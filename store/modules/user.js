import { loginByCode, getUserInfo } from "@/api/user.js"

export default {
  // 开启命名空间
  namespaced: true,
  // 模块化数据
  state: {
    // 个人用户信息
    userInfo:null,
    // 用户的user_id，用于获得用户的个人信息
    userId:"",
  },
  
  mutations: {
    setUserInfo(state,payload){
      state.userInfo = payload
    },
    setUserId(state,payload){
      state.userId = payload
    },
  },
  actions: {
    async getToken({commit,state}) {
      uni.login({
        provider: "weixin",
        success: async ({code}) => {
          // let {data} = await loginByCode(code)
          await loginByCode(code).then(async value=>{
            uni.setStorageSync("token",value.data.token)
            commit("setUserId",value.data.user_id)
            let {data} = await getUserInfo(value.data.user_id)
            commit("setUserInfo",data)
          })

        }
      });
    },
  },
}