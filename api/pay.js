import request from "./request.js"

// 请求拉取价格
export const getPrices = () => {
  return request.get("/prices")
}

// 获取场馆主的余额
export const getBalance = (venue_id) => {
  return request.get(`/recharges/amount?venue_id=${venue_id}`)
}

// 获得充值记录
export const getRechargeRecords = (venue_id,start_time,end_time,page,per_page) => {
  let data = { venue_id, start_time, end_time, page, per_page }
  return request.get("/recharges/",data)
}

// 获得消费记录
export const getSpendRecords = (venue_id,start_time,end_time,page,perpage) => {
  let data = { venue_id, start_time, end_time, page, perpage }
  return request.get("/expenses/",data)
}

// 获得总消费额度以及使用个数
export const getSpendNumbers = (venue_id) => {
  return request.get(`/recharges/expenses?venue_id=${venue_id}`)
}