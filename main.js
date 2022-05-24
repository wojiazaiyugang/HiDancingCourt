// #ifndef VUE3
import Vue from 'vue'
import App from './App'
import store from 'store/store.js'
import LongButton from '@/components/long-button/long-button'
import ChooseTime from '@/components/choose-time/choose-time' // 时间选择组件
import chooseVenues from '@/components/choose-venues/choose-venues.vue' // 场馆选择组件

import { $http } from '@escook/request-miniprogram' // 网络请求包

uni.$http = $http 

// 开发路径
$http.baseUrl = 'http://192.168.31.245:8082'
// 线上路径
// $http.baseUrl = 'https://api.highvenue.cn/development'

// 消息提示
uni.$showMsg = function (title="数据请求失败！", duration = 1000) {
  uni.showToast({
    title,
    duration,
    icon: 'none'
  })
}

// 请求拦截器
$http.beforeRequest = async function (options) {
   // console.log(options)
   // console.log('options')
   
   // console.log('999')
// if(uni.getStorageSync('code') == -2) return uni.$showMsg('登录过期，请退出重新登录')
   let token = uni.getStorageSync('token')
   options.header = {
    'Content-Type': 'application/json',
    'Authorization':`Bearer ${token}`
  }
  uni.$showMsg('加载中')
}

// 响应拦截器
$http.afterRequest = function (options) {
  uni.hideLoading()
  // console.log('响应')
  // console.log(options)
}

// wgs84坐标
// 确定如何计算位置
Vue.prototype.$getDistance = (lat1, lng1, lat2, lng2) => {
  var radLat1 = lat1 * Math.PI / 180.0;
  var radLat2 = lat2 * Math.PI / 180.0;
  var a = radLat1 - radLat2;
  var b = lng1 * Math.PI / 180.0 - lng2 * Math.PI / 180.0;
  var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
  s = s * 6378.137;
  s = Math.round(s * 10000)/10;
  return s
}

Vue.component('long-button', LongButton)
Vue.component('choose-time', ChooseTime)
Vue.component('choose-venues', chooseVenues)
Vue.config.productionTip = false

App.mpType = 'app'

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