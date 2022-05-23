<template>
  <view class="current">
    <view class="topText flex-between">
      <text>请选择日期和时间</text>
      <text @click="close">确定</text>
    </view>
    <view class="chosse-time">
      <view class="left">
        <scroll-view 
        class="scroll"
        scroll-y="true"
        >
          <ul class="ul">
            <li 
            class="li" 
            ref="li"
            v-for="(item,index) in timeList" 
            :key="index"
            :class="currentDay == index ? 'leftAddClass' : ''"
            @click="currentLeft(item,index)"
            >{{ item }}</li>
          </ul>
          <view class="placeholder">
          </view>
        </scroll-view>
      </view>
      <view class="right">
        <view class="rightTop">
          <text>已选择时间段{{ start_time }}{{ stop_time }}</text>
        </view>
        <view class="rightDown flex-between">
           <view
             class="block" 
             v-for="(item,index) in IntTime" 
             :key="index" 
             @click="handleTimeBlock(item,index)" 
             :class="{addClass:item.selected}"
             >
             {{ item.time }}
           </view>
        </view>
        <view class="hotTime flex">
          <text class="txt flex">常用时段：</text>
          <view 
          class="block-long flex" 
          v-for="(item,index) in hotTime" 
          :key="index"
          @click="hotClick(item,index)" 
          :class="hotCli == index ? 'hotAddClass' : ''"
          >{{ item }}</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  import {mapMutations} from 'vuex'
  export default {
    name:"choose-time",
    data() {
      return {
        IntTime: [], // 右边每个小块时间
        hotTime: [], // 常用时段
        timeList: [], // 左边滚动时间列表
        currentDay: '',  // 常用时段动态样式
        hotCli: 'z', // 常用时段动态样式
        dataObj: {}, // 接口需要传递的数据
        start_time: '', // 展示数据
        stop_time: '' // 展示数据
      }
    },
    created () {
      this.forTime() // 15天
      this.getTime() // 左边补零拼接
      this.splice() 
      this.hotSplice() // 常用时段
      this.addAttribute() // 数组时间格式转换为数组套对象
    },
    methods: {
      forTime() {
        let arr =[]
        for(let i= 8; i<= 23; i++){
          arr.push(i)
        }
        this.IntTime = [...arr]
      },
      // 左边时间
      getTime() {
        let date = new Date();
        date.setDate(date.getDate());
        let dateTemp;
        for (let i = 15; i > 0; i--) {
          let m = date.getMonth() + 1
          m = m > 10 ? m : `0${m}`
          let d = date.getDate()
          d = d >= 10 ? d : `0${d}` 
          dateTemp = m + "-" + d
          this.timeList.push(dateTemp)
          date.setDate(date.getDate() - 1)
         }
        this.timeList[0] = `今天`
      },
      addAttribute() {
        this.IntTime.forEach(item => {
          item = {
            time: item,
            selected: false,
            }
          this.IntTime.push(item)
        })
        this.IntTime = this.IntTime.splice(16,32)
      },
      // 块时间补零且赋值
      splice () {
        this.IntTime.forEach( item => 
          this.IntTime.push(item = item >= 10 ? `${item}:00` : `0${item}:00`)
        )
        this.IntTime = this.IntTime.slice(16,32)
      },
      // 常用时段
      hotSplice() {
        let Atime = `${this.IntTime[6]}-${this.IntTime[8]}`
        let Btime = `${this.IntTime[7]}-${this.IntTime[9]}`
        let Ctime = `${this.IntTime[10]}-${this.IntTime[12]}`
        this.hotTime.push(Atime,Btime,Ctime)
      },
      // 小块时间
      handleTimeBlock (item,index) {
        this.hotCli = -1
        let start = this.start_time.substr(0,2)
        let stop = this.stop_time.substr(0,2)
        // 开始没值就赋值 
        if(this.start_time == ''){
          this.start_time = `${item.time}~` 
          item.selected = ! item.selected
         }
         // 结束没值 且本次点击大于开始 给结束
        else if(this.stop_time == '' && item.time.substr(0,2) > start ) {
          this.stop_time = item.time
          item.selected = ! item.selected
           }
         // 结束没值 且本次点击小于开始 给开始
        else if(this.stop_time == '' && item.time.substr(0,2) < start) {
          this.start_time = this.start_time.substr(0,5)
          const startIdx =  this.IntTime.findIndex( key => key.time == this.start_time)
          this.IntTime[startIdx].selected = false
          this.start_time = `${item.time}~`
          item.selected = !item.selected
           }
         // 都有值 再次点击 清空开始和结束的状态  给开始赋值 清空结束
        else if (this.start_time && this.stop_time ) {
            // 找inttime中时间和开始时间相同的，把这项的selected改为false，然后让本次点击的为true
          this.start_time = this.start_time.substr(0,5)
          const startIdx =  this.IntTime.findIndex( key => key.time == this.start_time)
          this.IntTime[startIdx].selected = false
          const StopIdx =  this.IntTime.findIndex( key => key.time == this.stop_time)
          this.IntTime[StopIdx].selected = false
          item.selected = !item.selected
          this.start_time = `${item.time}~` 
          this.stop_time = ''
           }
        this.dataObj.start_time = this.start_time,
        this.dataObj.stop_time = this.stop_time
      },
      // 左边
      currentLeft(item,index) {
        this.start_time = ''
        this.stop_time = ''
        this.IntTime.forEach( key =>{
          key.selected = false
        })
        this.currentDay = index
        this.hotCli = -1
        let time = new Date()
        if(item == '今天') {
          let time = new Date()
          let m = time.getMonth() + 1
          m = m > 10 ? m : `0${m}`
          let d = time.getDate()
          d = d >= 10 ? d : `0${d}` 
          item = `${m}-${d}`
        }
        // let y = `${time.getFullYear()}-${item}`
        // this.dataObj.year = y
        this.dataObj.year = `${time.getFullYear()}-${item}`
      },
      close() {
        this.$parent.close()
        this.$emit('data',this.dataObj)
        this.currentDay = 0
        this.hotCli = 'z'
        this.start_time.substr(0,5) 
        // 清空所有选中状态
        this.IntTime.forEach( item => item.selected = false) 
        this.start_time = ''
        this.stop_time = ''
      },
      // 常用时段
      hotClick(item,index) {
        this.start_time = ''
        this.stop_time = ''
        this.IntTime.forEach( key => key.selected = false)
        this.hotCli = index
        this.start_time += `${item.substr(0,5)}~`
        this.stop_time = `${item.substr(6,12)}`
        this.dataObj.start_time = this.start_time,
        this.dataObj.stop_time = this.stop_time
      }
    }
    
  }
</script>

<style lang="scss" scoped>
  @import '@/style/choose-time'
</style>
