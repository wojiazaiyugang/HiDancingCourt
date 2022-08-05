import request from "./request.js"

// 请求拉取价格
export const getPrices = () => {
  return request.get("/prices/")
}

// 获取场馆主的余额
export const getBalance = (venue_id) => {
  return request.get(`/recharges/amount/?venue_id=${venue_id}`)
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
  return request.get(`/recharges/expenses/?venue_id=${venue_id}`)
}

// 支付之前创建订单
export const createOrders = (total_price) => {
  let applet = "HiDancing"
  let data = {total_price, applet}
  return request.post("/member/pay/",data)
}

// 查询订单是否支付成功
export const isPayDone = (orderNonceStr) => {
  return request.get(`/member/order/success?out_trade_no=${orderNonceStr}`)
}

// 充值成功之后上报订单，是为了记录订单信息
export const postOrder = (nonceStr,venue_id) => {
  let order_type = "RECHARGE"
  let data = {nonceStr,venue_id,order_type}
  return request.post("/orders/",data)
}

// 充值成功之后增加记录数据，方便后续的订单流水统计等
export const postRecords = (venue_id,price) => {
  let data = {venue_id,price}
  return request.post("/recharges/",data)
}