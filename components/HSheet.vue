<template>
  <view :class="['h--sheet', {show: value}]">
    <view
      class="h--sheet-mask"
      @tap="maskHandler"
    />
    <view
      class="h--sheet-content-pr"
      :class="{'pb-20':pbActive}"
      @tap="tapContentHandler"
    >
      <view class="h--sheet-header">
        <view class="default-header">
          <text class="header-title">
            {{ title }}
          </text>
          <text
            class="ok-btn border-tap-big"
            @tap="okHandler"
          >
            {{ okText }}
          </text>
        </view>
      </view>
      <view
        ref="hsheetBody"
        class="overflow-y-scroll"
        :class="{'h--sheet-body': isOpenMask}"
        :style="{'height':sheetBodyHeight}"
        @touchend="touchEnd(isOpenMask)"
        @touchstart="touchStart(isOpenMask&&isFirst)"
      >
        <slot/>
      </view>
    </view>
  </view>
</template>

<script lang="scss" scoped>
  import { mapState } from 'vuex'
  export default {
    name: 'HSheet',
    props: {
      value: {
        type: Boolean,
        default: false,
      },
      stop: {
        type: Boolean,
        default: false,
      },
      title: String,
      okText: {
        type: String,
        default: '确认'
      },
      maskClose: {
        type: Boolean,
        default: true,
      },
      isOpenMask: {
        type: Boolean,
        default:false
      },
      sheetBodyHeight:{
        type:String,
        default:'auto'
      },
      // 是否需要padding-bottom
      pbActive:{
        type:Boolean,
        default:false
      }
    },
    data() {
      return {
        timer:'',
        choosedCourt:2,
        choosedCourtId:0,
        isFirst:true,
        startY:0
      };
    },
    computed:{
      ...mapState({
        viewHeight: state => state.device.info.windowHeight,
        viewWidth: state => state.device.info.windowWidth,
      }),
      // 由于微信小程序有rpx单位换算，需要计算获取hsheetItem的高度
      hsheetItemHeight(){
        return parseInt(parseInt(this.$refs.hsheetBody.childNodes[0].style.height) * this.viewWidth / 750)
      },
    },
    methods: {
      tapContentHandler() {
        if (!this.stop) {
          this.$emit('input', false)
        }
      },
      maskHandler() {
        if (this.maskClose) {
          this.$emit('input', false)
        }
      },
      okHandler() {
        this.$emit('ok')
        this.$emit('input', false)
        if(this.isOpenMask){ //开启渐变层，执行
          // 清理touchEnd的定时器
          clearTimeout(this.timer)
          // 把选中的Id传出去
          this.$emit('changeCourt',this.choosedCourtId)
        }
      },
      touchStart(isFirst){
        if(!isFirst) return;
        wx.createSelectorQuery().select('.first-hsheet-item').boundingClientRect().exec((rect)=>{
            this.startY = this.viewHeight-rect[0].top
            this.isFirst = false
        })
      },
      touchEnd(isOpenMask){
        if(!isOpenMask) return //如果渐变层不开启，直接return
        let query = wx.createSelectorQuery();
        query.select('.first-hsheet-item').boundingClientRect()
        // 由于 手指离开屏幕 到 滚动到固定位置，需要一段时间才停下，所以设置定时器（不是最好的办法）可优化
        this.timer = setTimeout(()=>{
          query.exec((rect)=>{ //不写箭头函数，this不指向vue！！
            this.choosedCourt = parseInt((this.viewHeight-rect[0].top) / this.hsheetItemHeight - 3)
            this.choosedCourtId = this.$refs.hsheetBody.childNodes[this.choosedCourt].dataset.id
          })
        },500)
      }
    }
  };
</script>
<style lang="less">
  @keyframes showUp {
    from {
      transform: translate3d(0, 100%, 0);
    }
    to {
      transform: translate3d(0, 0, 0);
    }
  }
  @keyframes hSheetBg {
    from {
      background-color: rgba(0, 0, 0, 0);
    }
    to {
      background-color: rgba(0, 0, 0, 0.5);
    }
  }
  .h--sheet {
    position: fixed;
    width: 100vw;
    height: 100vh;
    left: 0;
    bottom: 0;
    z-index: 30000;
    display: none;
    &.show {
      display: block;
      .h--sheet-mask, .h--sheet-content-pr {
        display: block;
      }
    }
    &-mask {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      top: 0;
      background-color: rgba(0, 0, 0, 0.5);
      animation: hSheetBg 0.3s;
      animation-fill-mode: forwards;
      display: none;
    }
    &-header {
      padding: 24px 0;
      .default-header {
        padding: 0 32px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 32px;
        .header-title {
          color: #000;
        }
        .ok-btn {
          color: #666;
        }
      }
    }
    &-content-pr {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: #fff;
      border-top-left-radius: 24px;
      border-top-right-radius: 24px;
      // animation: showUp 5s;
      animation-fill-mode: forwards;
      display: none;
    }
  }
  .h--sheet-body{
    scroll-snap-type: y mandatory;
    background-image: linear-gradient(white, white 37%, rgba(0, 0, 0, 0.2) 37%, rgba(0, 0, 0, 0.2) 37.2%, white 37%, white 56%, rgba(0, 0, 0, 0.2) 56%, rgba(0, 0, 0, 0.2) 56.2%, white 56%, white 100%);
  }
</style>
