import request from "./request.js"

export const addDownload = (video_id) => {
  let data = {video_id}
  return request.post(`/downloads/`,data)
}