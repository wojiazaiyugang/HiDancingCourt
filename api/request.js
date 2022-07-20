
import qs from "qs"
import store from "@/store/store.js"

// 开发环境
// const baseUrl = "https://api.highvenue.cn/development"
// 线上环境
const baseUrl = "https://api.highvenue.cn"


const successHandler = (res, resolve) => {
  store.commit("m_device/setServerTime", res.header["Date"])
  resolve(res.data)
}
const failHandler = (res, reject) => {
  reject(res.data)
}


const request = {
  get: (url, params = null) => {
    return new Promise(async (resolve, reject) => {
      let headers = {
        "Content-Type": "application/json",
        "Authorization":`Bearer ${uni.getStorageSync("token")}`
      }
      url = (params && Object.keys(params).length) ? url + "?" + qs.stringify(params) : url
      uni.request({
        url: baseUrl + url,
        method: "GET",
        header:headers,
        success: res => successHandler(res, resolve),
        fail: res => failHandler(res, reject),
      })
    })
  },
  post: (url, data) => {
    return new Promise(async (resolve, reject) => {
      let headers = {
        "Content-Type": "application/json",
        "Authorization":`Bearer ${uni.getStorageSync("token")}`
      }
      uni.request({
        url: baseUrl + url,
        method: "POST",
        data,
        header:headers,
        success: res => successHandler(res, resolve),
        fail: res => failHandler(res, reject),
      })
    })
  },
  put: (url, data) => {
    return new Promise(async (resolve, reject) => {
      let headers = {
        "Content-Type": "application/json",
        "Authorization":`Bearer ${uni.getStorageSync("token")}`
      }
      uni.request({
        url: baseUrl + url,
        method: "PUT",
        data,
        header:headers,
        success: res => successHandler(res, resolve),
        fail: res => failHandler(res, reject),
      })
    })
  },
  delete: (url, data) => {
    return new Promise(async (resolve, reject) => {
      let headers = {
        "Content-Type": "application/json",
        "Authorization":`Bearer ${uni.getStorageSync("token")}`
      }
      uni.request({
        url: baseUrl + url,
        method: "DELETE",
        data,
        header:headers,
        success: res => successHandler(res, resolve),
        fail: res => failHandler(res, reject),
      })
    })
  },
}

export default request
