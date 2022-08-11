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