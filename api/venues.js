import request from "@/api/request.js"

// 获得所有的场馆
export const getVenues = () => {
  return request.get(`/venues/?applet=HiDancing`)
}

// 根据场馆id获得对应得场地信息
export const getSites = (venue_id) => {
  return request.get(`/sites/${venue_id}`)
}

// 根据场馆id获取场馆密码
export const getPassword = (venue_id) => {
  return request.get(`/venues/invite?venue_id=${venue_id}`)
}

// 查看目前用户拥有的场馆，也就是是否是场馆老板
export const getIsBoss = () => {
  return request.get(`/bosses/`)
}