import request from "@/api/request.js"

// 获得所有的场馆
export const getVenues = () => {
  return request.get(`/venues/?applet=HiDancing`)
}

// 根据场馆id获得对应得场地信息
export const getSites = (venue_id) => {
  return request.get(`/sites/${venue_id}`)
}