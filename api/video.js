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
export const getClipingVideos = (status,page,perpage,venue_id,start,end) => {
  let per_page = perpage?perpage:10
  let data = {status,page,per_page,venue_id,start,end}
  return request.get(`/records/clip/status/`,data)
}

// 根据recordid获得正在剪辑视频的剪辑进度
export const getClipingStatus = (record_id) => {
  return request.get(`/records/progress/?record_id=${record_id}`)
}

// 获得所有的正在剪辑、待剪辑以及剪辑完成的视频
export const getNumbers = (venue_id,start,end) => {
  let data = {venue_id,start,end};
  return request.get("/records/num/",data);
}