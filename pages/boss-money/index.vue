<template>
  <view 
    :style="{height:calHeight}"
    class="ba-f7 flex width-full flex-direction alitem-center">
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
    <view 
      v-show="currentTitle=='充值记录'"
      class="">
      chongzhi
    </view>
    <view class="flex flex-center heichi60 line-heichi60 width80 margtop20">
      <view 
        v-for="(item,index) in billList"
        :key="index"
        @tap="selectBill(index)"
        :class="['width30 text-center',selectIndex==index?'bapruple white boradiu50':'']">
        {{item}}
      </view>
    </view>
  </view>
</template>

<script>
  import { mapMutations,mapState } from "vuex"
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
      }
    },
    computed:{
      ...mapState("m_device",["deviceInfo"]),
      // 当前用户手机的高度
      calHeight(){
        return this.deviceInfo&&this.deviceInfo.screenHeight + 'px'
      },
    },
    onLoad(options) {
      this.currentTitle = options.title
    },
    methods:{
      // 点击账单列表进行选择
      selectBill(data){
        this.selectIndex = data
      },
    },
  }
</script>

<style lang="less">
  
</style>
