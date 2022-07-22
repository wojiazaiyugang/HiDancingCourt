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