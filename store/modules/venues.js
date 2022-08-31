import Vue from "vue"
import { getVenues, checkoutLastSearch } from "@/api/venues.js"
import device from "./device.js"

export default {
  namespaced: true,
  state:{
    // 所有的场馆信息
    allVenues: [],
    // 根据场馆id搜索的场地信息
    siteInfos:[],
    // 场地获取完成登录的标志
    loginComplete:false,
    // 上次浏览场馆的密码
    lastCourtPasswd:[],
  },
  
  mutations: {
    setSiteInfos(state,payload){
      state.siteInfos = payload
    },
    setAllVenues(state,payload) {
      state.allVenues = payload
    },
    setLoginComplete(state,payload){
      state.loginComplete = payload
    },
    setLastCourtPasswd(state,payload){
      state.lastCourtPasswd = payload
    }
  },
  actions: {
    async getVenues({commit,state}){
      uni.showLoading({title:"加载中！",icon:"none"})
      let {data} = await getVenues()
      let location = device.state.locationInfo
      let list = await Promise.all(data.map(item=>{
        if(location.latitude){
          item.unDistance = Vue.prototype.$getDistance(location.longitude,location.latitude,item.data.location[0],item.data.location[1])
        }
        else{
          item.unDistance = 0
        }
        return item
      }))
      list.sort((pre,cur)=>pre.unDistance-cur.unDistance)
      var tempCourt = null
      await checkoutLastSearch().then(value=>{
        // 若上次搜索为空，也就是从没有搜索过场馆
        if(value.data.venue_id){
          list.map(item=>{
            if(item.id==value.data.venue_id){
              tempCourt = item
            }
          })
          list = list.filter(item=>{
            if(item.id!=value.data.venue_id){
              return item
            }
          })
          if(value.data.passwd){
            let data = [...value.data.passwd];
            commit("setLastCourtPasswd",data);
          }
          list.unshift(tempCourt)
          commit("setLoginComplete",true)
          commit("setAllVenues",list)
          uni.hideLoading()
        }
        else{
          commit("setLoginComplete",true)
          commit("setAllVenues",list)
          uni.hideLoading()
        }
      })
    },
  }
}