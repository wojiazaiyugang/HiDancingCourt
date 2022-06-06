import Vue from "vue"
import dayjs from "dayjs"



// 路径导航传参
Vue.prototype.$go = (url, params = {}) => {
  url = formatUrl(url, params)
  uni.navigateTo({
    url,
  })
}

// 消息提示
uni.$showMsg = function (title="数据请求失败！", duration = 1000) {
  uni.showToast({
    title,
    duration,
    icon: 'none'
  })
}

// 路径导航传参
Vue.prototype.$redirect = (url, params = {}) => {
  url = formatUrl(url, params)
  uni.redirectTo({
    url,
  })
}

// 挂载时间
Vue.prototype.$dayjs = dayjs

// 下载视频
Vue.prototype.$download = ({url, name, success, fail}) => {
  name = name || new Date().getTime()
  wx.authorize({
    /* 这个就是保存相册的 */
    scope: "scope.writePhotosAlbum",
    // 单次视频下载过多导致后续下载失败，删除本地缓存
    success: () => {
      let fs = wx.getFileSystemManager()
      const basepath = `${wx.env.USER_DATA_PATH}`
      fs.readdir({
        dirPath: basepath,/// 获取文件列表
        success(res) {
          res.files.forEach((val) => { // 遍历文件列表里的数据
            fs.unlink({
              filePath: basepath + '/' +val
            });
          })
        },
      })
      wx.downloadFile({
        url,
        filePath: wx.env.USER_DATA_PATH + '/' + name + '.mp4',
        success: res => {
          wx.saveVideoToPhotosAlbum({
            filePath: res.filePath,
            fail: error => fail(error),
            success: res => success(res)
          })
        },
        fail: error => {
          fail(error)
        },
      })
    }
  })
}

Vue.prototype.$share = ({url, suffix, success, fail}) => {
  wx.downloadFile({
    url,
    filePath: wx.env.USER_DATA_PATH + '/' + new Date().getTime() + '.' + suffix,
    fail: error => fail(error),
    success: res => {
      wx.showShareImageMenu({
        path: res.filePath,
        fail: error => fail(error),
        success: res => success(res)
      })
    }
  })
}


Vue.prototype.$downloadFile = (url) => {
  return new Promise((resolve, reject) => {
    wx.downloadFile({
      url,  //公众平台需要配置相应的域名
      filePath: wx.env.USER_DATA_PATH + '/' + new Date().getTime(),
      success: res => {
        resolve(res)
      },
      fail: err => {
        reject(err)
      }
    })
  })
}
