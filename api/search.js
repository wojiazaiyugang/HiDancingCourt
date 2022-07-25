import request from "./request.js"

// 各个场馆得验证码
export const verifyCode = (data) =>{
  return request.post(`/venues/invite`,data)
}

// 人脸查找所有视频
export const getAllvideos = (site_ids,start_time,stop_time,page,per_page,face_search,group,record_name) => {
  let applet = "HiDancing"
  let data = {site_ids,start_time,stop_time,page,per_page,face_search,applet,group,record_name}
  return request.post(`/search/`,data)
}

// 获取跳舞一键查找出来集体视频的标签
export const getVideoLabel = (venue_id)=>{
  return request.get(`/videos/label/?venue_id=${venue_id}`)
}