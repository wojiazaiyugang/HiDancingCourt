import request from "./request.js"

// 添加下载的视频
export const addDownload = (video_id) => {
  let data = {video_id}
  return request.post(`/downloads/`,data)
}

// 根据id获取某个视频
export const getVideo = (video_id) => {
  return request.get(`/videos/?id=${video_id}`)
}

// 七牛云上传获取token
export const getQiNiuToken = (venue_id,filename) => {
  let data = {venue_id,filename}
  return request.get("/qiniu/",data)
}

// 根据上传视频的状态获取视频
export const getClipingVideos = (status,page,perpage) => {
  let per_page = perpage?perpage:10
  let data = {status,page,per_page}
  return request.get(`/records/clip/status/`,data)
}

// 根据recordid获得正在剪辑视频的剪辑进度
export const getClipingStatus = (record_id) => {
  return request.get(`/records/progress/?record_id=${record_id}`)
}