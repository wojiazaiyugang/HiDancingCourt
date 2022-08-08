<template>
  <view 
    :style="{height:calHeight}"
    class="ba-f7 ">
    <nvg-bar :baColor="bawhite">
      <template v-slot:icon><text class="iconfont icon-fanhui fon32 black"></text></template>
      <template v-slot:text><text class="black">{{currentTitle}}</text></template>
    </nvg-bar>
    <view 
      v-show="currentTitle=='消费记录'"
      class="width-full flex justify-center"
      >
      <view class="flex justify-between width90 heichixu80 margtop20">
        <view class="bapruple height-full width40 boradiu20 flex flex-direction white">
          <view class=" fon24 marginxy10">
            总消费
          </view>
          <view class=" alself-center flex alitem-end">
            <view class="fon40">
              {{spendData.totalPrice/100}}<text class="fon24">元</text>
            </view>
          </view>
        </view>
        <view class="bapruple height-full width40 boradiu20 flex flex-direction white">
          <view class="fon24 marginxy10">
            生成视频
          </view>
          <view class="fon40 alself-center flex alitem-end">
            <view class="fon40">
              {{spendData.totalNumber}}<text class="fon24">个</text>
            </view>
          </view>
        </view>
      </view>
    </view>
    <view class="flex flex-direction alitem-center">
      <view class="flex flex-center heichi60 line-heichi60 width80 margtop20 ">
        <view 
          v-for="(item,index) in billList"
          :key="index"
          @tap="selectBill(index)"
          :class="['width30 text-center',selectIndex==index?'bapruple white boradiu50':'']">
          {{item}}
        </view>
      </view>
      <view 
        @tap="filterTime"
        class="width95 heichi60 line-heichi60 flex alitem-center margtop20">
        <view class="fon32">
          {{showTime}}
        </view>
        <view class="margleft5">
          <text class="iconfont icon-xiala black fon40"></text>
        </view>
      </view>
      <scroll-view v-if="timeList!=0" 
      @scrolltolower="scroolBottom"
      scroll-y="true" class="width-full bawhite margtop10 heichi80">
        <view 
        v-for="(item,index) in timeList"
        :key="index"
        class="flex marginx10 justify-between heichixu100 line-heichi100 "
        style="border-bottom: 1rpx solid #F7F7F7;">
          <view class="gray fon28">
            {{item.time.split("_")[0].split("-")[0]+"年"+item.time.split("_")[0].split("-")[1]+"月"+item.time.split("_")[0].split("-")[2]+"日"+" "+item.time.split("_")[1].replace(/-/g,":")}}
          </view>
          <view class="fon36">
            {{-item.price/100}}
          </view>
        </view>
      </scroll-view>
      <view v-else class="fon40 gray margtop50zhi" >
        暂无{{currentTitle}}
      </view>
    </view>
    <uni-popup ref="popupTime" :safeArea="false" :mask-click="false">
     <van-datetime-picker
        v-model="currentDate"
        :min-date="minDate"
        :type="timeType"
        cancel-button-text="请选择日期"
        confirm-button-text="确认"
        active-class="selectStyle"
        toolbar-class="changeToolbar"
        @input="onPicInput"
        @confirm="confirmTimes"
      />
    </uni-popup>
    <uni-popup ref="popupYear" :safeArea="false" :mask-click="false">
      <van-picker 
       show-toolbar
       cancel-button-text="请选择日期"
       confirm-button-text="确认"
       active-class="selectStyle"
       toolbar-class="changeToolbar"
       @confirm="confirmYear"
       @change="selectYears"
       :columns="columnsYears" item-height="40"/>
    </uni-popup>
  </view>
</template>

<script>
  import { mapMutations,mapState } from "vuex"
  import { getRechargeRecords, getSpendRecords, getSpendNumbers,  } from "@/api/pay.js"
  import nvgBar from "@/components/nvgBar.vue"
  export default {
    props:{
      
    },
    components:{
      nvgBar,
    },
    data(){
      return {
        // 充值记录还是消费记录
        currentTitle:"",
        // 导航栏背景
        bawhite:"bawhite",
        // 账单选择
        billList:["日账单","月账单","年账单"],
        // 账单的年月日选择标志,0表示选择日，1表示选择月，2表示选择年
        selectIndex:0,
        // 选择的时间显示
        showTime:"",
        // 搜索的账单详细列表
        timeList:[],
        // scroll当前拉去得页数
        page:1,
        // scroll当前每一页拉取得个数
        perpage:14,
        // 查询账单流水得开始时间
        startTime:"",
        // 查询账单流水得结束时间
        endTime:"",
        // 所查询得场馆id
        venue_id:0,
        // 时间选择容器里面的列表时间
        currentDate: new Date().getTime(),
        // 时间选择器里面的最小时间
        minDate: new Date(2022, 0, 1).getTime(),
        // 消费数据
        spendData:{
          totalPrice:0,
          totalNumber:0,
        },
        // 年月的时间选择,date表示天数的选择，year-month表示月份的选择
        timeType:"date",
        // 年份的选择
        columnsYears:[],
        // 数据是否加载完毕的标志
        loadingDone:false,
      }
    },
    computed:{
      ...mapState("m_device",["deviceInfo","currentTime"]),
      // 当前用户手机的高度
      calHeight(){
        return this.deviceInfo&&this.deviceInfo.screenHeight + 'px'
      },
    },
    onLoad(options) {
      this.inintData(options)
      this.getBillList()
    },
    methods:{
      // 年份的滑动时间选取
      selectYears(data){
        console.log("年份时间",data)
        this.showTime = data.detail.value
        this.startTime = data.detail.value + "-01-01_00-00-00"
        this.endTime = data.detail.value + "-12-31_23-59-59"
      },
      // 年份的时间确定
      confirmYear(){
        this.$refs.popupYear.close()
        this.page = 1
        this.timeList = []
        this.getBillList()
      },
      // 滑动选取时间
      onPicInput(e) {
        this.currentDate = e.detail
        if(this.selectIndex==0){
          this.startTime = this.$dayjs(e.detail).format("YYYY-MM-DD") + "_00-00-00"
          this.endTime = this.$dayjs(e.detail).format("YYYY-MM-DD") + "_23-59-59"
          this.showTime = this.$dayjs(e.detail).format("YYYY-MM-DD").split("-")[0]+"年"+this.$dayjs(e.detail).format("YYYY-MM-DD").split("-")[1]+"月"+this.$dayjs(e.detail).format("YYYY-MM-DD").split("-")[2]+"日"
        }
        if(this.selectIndex==1){
          let tempTime = this.$dayjs(e.detail).format("YYYY-MM-DD").split("-")[0] + "-" + this.$dayjs(e.detail).format("YYYY-MM-DD").split("-")[1]
          this.startTime = this.$dayjs(tempTime).startOf("month").format("YYYY-MM-DD_HH-mm-ss")
          this.endTime = this.$dayjs(tempTime).endOf("month").format("YYYY-MM-DD_HH-mm-ss")
          this.showTime = this.$dayjs(e.detail).format("YYYY-MM-DD").split("-")[0]+"年"+this.$dayjs(e.detail).format("YYYY-MM-DD").split("-")[1]+"月"
        }
      },
      // 初始化数据
      async inintData(data){
        var tempDate = new Date()
        this.currentTitle = data.title
        this.venue_id = data.courtId
        this.startTime = this.currentTime.split(" ")[0]+"_"+"00-00-00"      
        this.endTime = this.currentTime.split(" ")[0]+"_"+"23-59-59" 
        // 当前年份到2022年所有的年份时间
        var tempYear = tempDate.getFullYear()
        var duration = tempYear - 2020
        for(let i=0;i<=duration;i++){
          this.columnsYears.push(tempYear--)
        }
        this.showTime = this.currentTime.split(" ")[0].split("-")[0]+"年"+this.currentTime.split(" ")[0].split("-")[1]+"月"+this.currentTime.split(" ")[0].split("-")[2]+"日"
        if(this.currentTitle=="消费记录"){
          let {data} = await getSpendNumbers(this.venue_id)
          this.spendData.totalPrice = data.total_expenses_amount
          this.spendData.totalNumber = data.total_use_count
        }
      },
      // 筛选过滤时间
      filterTime(){
        if(this.selectIndex==2){
          this.$refs.popupYear.open("bottom")
          return false
        }
        this.$refs.popupTime.open("bottom")
      },
      // 确定时间选取
      confirmTimes(){
        this.$refs.popupTime.close()
        this.page = 1
        this.timeList = []
        this.getBillList()
      },
      // picker滑动选择时间
      // 初始化获得帐单列表
      async getBillList(){
        this.$showLoading()
        if(this.currentTitle=="充值记录"){
          let {data} = await getRechargeRecords(this.venue_id,this.startTime,this.endTime,this.page,this.perpage)
          this.timeList = [...this.timeList,...data]
          console.log("chakan",this.timeList)
          if(data.length<this.perpage){
            this.loadingDone = true
            this.$hideLoading()
          }
        }
        if(this.currentTitle=="消费记录"){
          let {data} = await getSpendRecords(this.venue_id,this.startTime,this.endTime,this.page,this.perpage)
          this.timeList = [...this.timeList,...data]
          if(data.length<this.perpage){
            this.loadingDone = true
            this.$hideLoading()
          }
        }
      },
      // 点击账单列表进行选择
      async selectBill(data){
        // 防止重复点击进行接口拉取
        if(this.selectIndex==data){
          return false
        }
        this.selectIndex = data
        if(this.selectIndex==0){
          this.$refs.popupYear.close()
          this.timeType = "date"
          this.startTime = this.currentTime.split(" ")[0]+"_"+"00-00-00"
          this.endTime = this.currentTime.split(" ")[0]+"_"+"23-59-59" 
          this.showTime = this.currentTime.split(" ")[0].split("-")[0]+"年"+this.currentTime.split(" ")[0].split("-")[1]+"月"+this.currentTime.split(" ")[0].split("-")[2]+"日"
          this.page = 1
          this.timeList = []
          this.getBillList()
        }
        if(this.selectIndex==1){
          this.$refs.popupYear.close()
          this.timeType = "year-month"
          let tempTime = this.currentTime.split(" ")[0].split("-")[0]+"-"+this.currentTime.split(" ")[0].split("-")[1]
          console.log("zhuanhuan时间",tempTime)
          this.startTime = this.$dayjs(tempTime).startOf("month").format("YYYY-MM-DD_HH-mm-ss")
          this.endTime = this.$dayjs(tempTime).endOf("month").format("YYYY-MM-DD_HH-mm-ss")
          this.showTime = this.currentTime.split(" ")[0].split("-")[0]+"年"+this.currentTime.split(" ")[0].split("-")[1]+"月"
          this.page = 1
          this.timeList = []
          this.getBillList()
        }
        if(this.selectIndex==2){
          this.$refs.popupTime.close()
          let tempYear = this.currentTime.split(" ")[0].split("-")[0]
          this.startTime = tempYear+"-01-01_00-00-00"
          this.endTime = tempYear+"-12-31_23-59-59"
          this.showTime = this.currentTime.split(" ")[0].split("-")[0]+"年"
          this.page = 1
          this.timeList = []
          this.getBillList()
        }
      },
      // 账单列表过多向下滑动触发
      scroolBottom(){
        if(this.loadingDone){
          this.$showMsg("数据已经拉取完毕！",2000)
          return false
        }
        this.page++
        this.getBillList()
      }
    },
  }
</script>

<style lang="scss">
  @import "@/static/style/vantprop";
  ::-webkit-scrollbar{
    display: none;
  }
</style>
