<template>
  <view class="current">
    <view class="topText flex-between">
      <text>请选择球馆和场地</text>
      <text @click="confirmCourt">确定</text>
    </view>
    <view class="choose-venues">
      <view class="left">
        <scroll-view 
        class="scroll"
        scroll-y="true"
        >
          <ul class="ul">
            <li 
            class="li"
            ref="li"
            v-for="(item,index) in allVenues" 
            :key="item.id"
            :class="current == index ? 'leftAddClass' : ''"
            @click="currentLeft(item,index)"
            >
            {{ item.data.full_name }}
            </li>
          </ul>
          <view class="placeholder">
          </view>
        </scroll-view>
      </view>
      <view class="right">
        <scroll-view class="scroll" scroll-y="true" style="width: 100%; height: 100%;">
          <view class="imgContainer">
            <view v-for="(item,index) in siteInfo" 
              :key="item.id" 
              class="img" 
              :style="{backgroundImage: 'url(' + item.data.cover + ')'}" 
              
            >
              <view class="row">
                <view class="checkBtn" @click="checkClick(item,index)">
                  <view class="btnSon"  v-if="btnShow"></view>
                </view>
                <view class="siteNum">场地{{index+1}}</view>
              </view>
            </view>
            <view style="width: 1rpx; height: 100rpx;"></view>
          </view>
        </scroll-view>
      </view>
    </view> 
  </view> 
</template>

<script>
  import { mapState } from 'vuex'
  export default {
    name:"choose-venues",
    computed: {
      ...mapState('m_venues',['allVenues'])
    },
    props: {
      siteInfo: {
        type: Array,
        required: true
      }
    },
    data() {
      return {
        current: 0 ,// 动态类名
        isShow: false,
        btnShow: false,
      }
    },
    
    methods: {
      async currentLeft(item,index) {
        console.log(item)
        this.current= index
        this.isShow = true
        const {data: img} = await uni.$http.get(`/sites/${item.id}`)
        // console.log(img.data)
        // console.log(this.siteInfo)
        // console.log('siteinfo')
        this.$emit('chanSiteInfo',img.data )
        // console.log(this.siteInfo)
      },
      // 选定场馆
      confirmCourt(){
        this.$parent.close();
        this.current = 0
      },
      checkClick(item) {
         this.btnShow = !this.btnShow
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '@/style/choose-venues'
</style>
