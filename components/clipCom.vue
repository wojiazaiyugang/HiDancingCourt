<template>
  <view class="width-full heichixu120 marginbottom20 bawhite" >
    <view class="marginx10 flex alitem-center justify-between height-full">
      <view class="flex alitem-center"  >
        <view class="margright20">
          <text class="iconfont icon-MP fon60 pruple"></text>
        </view>
        <view>
          <view class="fon28 widthchi200 ellipsis" >
            {{calShow?itemData.record_name:itemName}}
          </view>
          <view v-if="calShow"
            class="fon24 margtop10 widthchi200 ellipsis">
            {{itemData.end_time.split("_")[0]+" "+itemData.end_time.split("_")[1].replace(":","-")}}
          </view>
        </view>
      </view>
      <view
        class="flex alitem-center heichiduan80 widchi110 relative">
        <view class=" line-heichi80 fon28">
          {{clipType}}
        </view>
        <view
         v-if="calShow"
         class="absolute top0 right0 height-full widchi40 fon24 boradiuoverall text-center line-heichi80"
         style="color: #f17070;-webkit-mask: radial-gradient(transparent 15px, white 15px); ">
          <view class="width50 height-full"
          style="float: right;"
          :style="{background:calImgRight}"
          >
            
          </view>
          <view class="width50 height-full"
          style="float: left;"
          :style="{background:calImgLeft}"
          >
            
          </view>
        </view>
        <view
         v-if="calShow"
         class="absolute top0 right0 height-full widchi40 text-center line-heichi80 fon20 " style=" color: #f17070;">
          {{calNumber}}
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    name:"clipingComponent",
    props:{
      // 视频剪辑的状态
      clipType:{
        type:String,
        default:"",
      },
      // 视频剪辑的数据
      itemData:{
        type:Object,
        default:null,
      },
      // 等待剪辑名字
      itemName:{
        type:String,
        default:"",
      },
      // 正在剪辑哪一个视频的进度数据
      cliptext:{
        type:Number,
        default:0,
      }
    },
    data(){
      return {
        
      }
    },
    computed:{
      // 计算是否显示进度条
      calShow(){
        if(this.clipType=="等待剪辑"){
          return false;
        }
        return true;
      },
      // 计算剪辑的进度数值
      calNumber(){
        if(this.clipType=="剪辑完成"){
          return "100%";
        }
        if(this.clipType=="正在剪辑"){
          return (this.cliptext*100).toFixed(0)+"%";
        }
        return "0%";
      },
      // 计算剪辑的圆圈图左半边
      calImgRight(){
        if(this.clipType=="剪辑完成"){
          return `linear-gradient(#f17070 100%, #7E70F1 100%);`;
        }
        if(this.clipType=="正在剪辑"){
          return `linear-gradient(#f17070 ${this.cliptext*100*2+'%'}, #7E70F1 ${this.cliptext*100*2+'%'});`;
        }
        return `linear-gradient(#7E70F1 100%, #f17070 100%);`;
      },
      // 计算剪辑的圆圈图右半边
      calImgLeft(){
        if(this.clipType=="剪辑完成"){
          return `linear-gradient(#7E70F1 0%, #f17070 0%);`;
        }
        if(this.clipType=="正在剪辑"){
          return `linear-gradient(#7E70F1 ${(200-this.cliptext*100*2)+'%'}, #f17070 ${(200-this.cliptext*100*2)+'%'})`;
        }
        return `linear-gradient(#f17070 0%, #7E70F1 0%);`;
      },
    },
    methods:{
      
    },
  }
</script>

<style>

</style>
