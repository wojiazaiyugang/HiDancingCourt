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

// 用户post后端是哪个场馆,venue_id是场馆id,passwd是场馆密码
export const postLastSearch = (venue_id,passwd) => {
  let data = {venue_id,passwd};
  return request.post(`/venues/last/browse/`,data)
}

// 记录每一次成功登录的舞房密码
export const postSuccessSearch = (venue_id,passwd) => {
  let data = {venue_id,passwd};
  return request.post(`/venues/passwd/`,data)
}

// 根据场馆id获取每个场馆的密码
export const getCourtPasswd = (venue_id) => {
  return request.get(`/venues/passwd/?venue_id=${venue_id}`)
}

// 用户上传视频之后总的待剪辑数量
export const getAwaitCliping = () => {
  return request.get("/records/wait/num/")
}

// 根据场馆ID搜索待剪辑视频的名字
export const getAwaitClipingName = (venue_id) => {
  return request.get(`/records/wait/?venue_id=${venue_id}`)
}

// 用户上传完事之后post后端视频下载剪辑逻辑
export const postKeyUpload = (venue_name,video_names) => {
  let data = { venue_name, video_names };
  return request.post("/records/download/",data);
}