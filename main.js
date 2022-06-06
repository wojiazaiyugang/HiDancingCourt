// #ifndef VUE3
import Vue from 'vue'
import App from './App'
import store from 'store/store.js'
import "@/plugins/utils"


import { $http } from '@escook/request-miniprogram' // 网络请求包

uni.$http = $http 

// 开发路径
// $http.baseUrl = 'http://192.168.31.245:8082'
// 线上路径
$http.baseUrl = 'https://api.highvenue.cn/development'


Vue.config.productionTip = false

App.mpType = "app"

const app = new Vue({
  ...App,
  store

})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
import App from './App.vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif