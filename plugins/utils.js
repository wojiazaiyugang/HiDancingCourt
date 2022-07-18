import Vue from "vue"
import dayjs from "dayjs"


// 消息提示
Vue.prototype.$showMsg = function (title="数据请求失败！", duration = 1000) {
  uni.showToast({
    title,
    duration,
    icon: "none"
  })
}

// 接口拉取提示
Vue.prototype.$showLoading = function (title,type) {
  uni.showLoading({
    title,
    icon: type
  })
}

// 关闭拉取提示
Vue.prototype.$hideLoading = function () {
  uni.hideLoading()
}

// wgs84坐标
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

