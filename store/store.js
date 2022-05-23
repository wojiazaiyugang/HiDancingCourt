import Vue from "vue"
import Vuex from 'vuex'

// 导入用户信息
import user from './user'
import getters from './getters'
import venues from './venues.js'
import camera from './camera.js'
import video from './video.js'
import cart from './cart.js'
Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    // 命名空间名称
    m_user: user,
    m_venues: venues,
    m_camera: camera,
    m_video: video,
    m_cart: cart
  },
  getters
})

export default store