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
  return request.get(`/venues/invite/?venue_id=${venue_id}`)
}

// 查看目前用户拥有的场馆，也就是是否是场馆老板
export const getIsBoss = () => {
  return request.get(`/bosses/`)
}

// 用户申请场馆接口
export const applyBossInfo = (name,contact_details) => {
  let data = {name, contact_details}
  return request.post("/apply/",data)
}

// 获取优惠券
export const applyCoupons = (venue_id) => {
  let data = {venue_id}
  return request.put("/venues/coupon/",data)
}

// 查看优惠券是否过期
export const checkoutCoupons = (venue_id) => {
  return request.get(`/venues/coupon/?venue_id=${venue_id}`)
}

// 用户查询上次是否浏览过场馆
export const checkoutLastSearch = () => {
  return request.get("/venues/last/browse/")
}

// 用户post后端是哪个场馆
export const postLastSearch = (venue_id) => {
  return request.post(`/venues/last/browse/?venue_id=${venue_id}`)
}