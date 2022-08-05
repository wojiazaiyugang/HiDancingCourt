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
              价格
            </view>
            <view class="fon24">
              元
            </view>
          </view>
        </view>
        <view class="bapruple height-full width40 boradiu20 flex flex-direction white">
          <view class="fon24 marginxy10">
            生成视频
          </view>
          <view class="fon40 alself-center flex alitem-end">
            <view class="fon40">
              数量
            </view>
            <view class="fon24">
              个
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
          {{calTime}}
        </view>
        <view class="margleft5">
          <text class="iconfont icon-xiala black fon40"></text>
        </view>
      </view>
      <scroll-view v-show="timeList!=0" scroll-y="true" class="width-full bawhite margtop10 heichi80">
        <view 
        v-for="(item,index) in timeList"
        :key="item.time"
        class="flex marginx10 justify-between heichixu100 line-heichi100"
        style="border-bottom: 1rpx solid #F7F7F7;">
          <view class="gray">
            {{item.time}}
          </view>
          <view class="fon36">
            {{item.price}}
          </view>
        </view>
      </scroll-view>
      <view v-show="timeList==0" class="fon40 gray margtop50zhi" >
        暂无{{currentTitle}}
      </view>
    </view>
    <uni-popup ref="popupTime" :safeArea="false" :mask-click="false">
      <van-datetime-picker
        v-model="currentDate"
        type="date"
        cancel-button-text="请选择您的另一家舞蹈房"
        confirm-button-text="确认"
        active-class="selectStyle"
        toolbar-class="changeToolbar"
        @confirm="confirmTimes"
        @change="selectTimes"
        item-height="40"
      />
    </uni-popup>
  </view>
</template>

<script>
  import { mapMutations,mapState } from "vuex"
  import { getRechargeRecords, getSpendRecords, getSpendNumbers } from "@/api/pay.js"
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
        // s时间选择容器里面的列表时间
        currentDate: new Date(),
      }
    },
    computed:{
      ...mapState("m_device",["deviceInfo","currentTime"]),
      // 当前用户手机的高度
      calHeight(){
        return this.deviceInfo&&this.deviceInfo.screenHeight + 'px'
      },
      // 格式化时间
      calTime(){
        this.showTime = this.currentTime
        if(this.selectIndex==0){
          return this.showTime.split(" ")[0].split("-")[0]+"年"+this.showTime.split(" ")[0].split("-")[1]+"月"+this.showTime.split(" ")[0].split("-")[2]+"日"
        }
        if(this.selectIndex==1){
          return this.showTime.split(" ")[0].split("-")[0]+"年"+this.showTime.split(" ")[0].split("-")[1]+"月"
        }
        return this.showTime.split(" ")[0].split("-")[0]+"年"
      }
    },
    onLoad(options) {
      this.inintData(options)
      this.getBillList()
      console.log("时间",this.$dayjs("2022-02").startOf('month').format('YYYY-MM-DD_HH-mm-ss')) 
      console.log("时间",this.$dayjs("2022-02").endOf('month').format('YYYY-MM-DD_HH-mm-ss'))
    },
    methods:{
      // 初始化数据
      inintData(data){
        this.currentTitle = data.title
        this.venue_id = data.courtId
        this.startTime = this.currentTime.split(" ")[0]+"_"+"00-00-00"      
        this.endTime = this.currentTime.split(" ")[0]+"_"+"23-59-59" 
      },
      // 筛选过滤时间
      filterTime(){
        this.$refs.popupTime.open("bottom")
      },
      // 确定时间选取
      confirmTimes(){
        this.$refs.popupTime.close()
      },
      // picker滑动选择时间
      selectTimes(data){
        console.log("输出时间",data)
      },
      // 初始化获得帐单列表
      async getBillList(){
        if(this.currentTitle=="充值记录"){
          let {data} = await getRechargeRecords(this.venue_id,this.startTime,this.endTime,this.page,this.perpage)
          this.timeList = data
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
          this.startTime = this.currentTime.split(" ")[0]+"_"+"00-00-00"
          this.endTime = this.currentTime.split(" ")[0]+"_"+"23-59-59" 
          this.getBillList()
        }
        if(this.selectIndex==1){
          let tempTime = this.currentTime.split(" ")[0].split("-")[0]+"-"+this.currentTime.split(" ")[0].split("-")[1]
          this.startTime = this.$dayjs(tempTime).startOf("month").format("YYYY-MM-DD_HH-mm-ss")
          this.endTime = this.$dayjs(tempTime).endOf("month").format("YYYY-MM-DD_HH-mm-ss")
          this.getBillList()
        }
        if(this.selectIndex==2){
          let tempYear = this.currentTime.split(" ")[0].split("-")[0]
          this.startTime = tempYear+"-01-01_00-00-00"
          this.endTime = tempYear+"-12-31_23-59-59"
          this.getBillList()
        }
      },
    },
  }
</script>

<style lang="scss">
  ::-webkit-scrollbar{
    display: none;
  }
</style>
