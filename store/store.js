import Vue from "vue";
import Vuex from "vuex";

// 导入用户信息
import user from "./modules/user.js";
import venues from "./modules/venues.js";
import camera from "./modules/camera.js";
import video from "./modules/video.js";
import device from "./modules/device.js";

Vue.use(Vuex);
const store = new Vuex.Store({
  modules: {
    // 命名空间名称
    m_user: user,
    m_venues: venues,
    m_camera: camera,
    m_video: video,
    m_device: device,
  },
})

export default store;