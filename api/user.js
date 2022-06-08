import request from "./request.js"

// 根据微信登录code换取token
export const loginByCode = (code) => {
  return request.get(`/users/open_id/?code=${code}&applet=HiDancing`)
}

// 根据用户id获取用户信息
export const getUserInfo = (user_id) => {
  return request.get(`/users/${user_id}/info/`)
} 

// 根据微信开放接口获取的个人头像信息进行更新
export const updateInfo = (data) =>{
  return request.post(`/users/info/`,data)
}