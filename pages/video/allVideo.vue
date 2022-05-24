<template>
	<view class="container">
    <van-tabs :active="active" @click="change">
      <van-tab title="时段">
        <view style="margin-top: 20rpx;"></view>
        <!-- 时段二级tabs栏 -->
        <van-tabs type="card" @click="changes">
          <van-tab title="全部">
            <view class="videoShow" v-if="allVideoShow">当前时段暂无视频</view>
            <scroll-view 
            scroll-y="true" 
            style="height: 1200rpx; margin-top: 20rpx;" 
            @scrolltolower="lower" 
            v-else
            >
            <view style="display: flex; gap: calc(16%/3) ; flex-wrap: wrap; padding: 0 32rpx;">
              <view class="white" v-for="(item,index) in siteIdVideo.length != 0 && siteIdVideo" :key="index">
               <videoData :video="item"></videoData>
              </view>
            </view>
              
              <view class="placeholder" style="width: 320rpx; height: 180rpx;"></view>
            </scroll-view>
          </van-tab>
          <!-- 时间区间数据 -->
          <van-tab :title="item" v-for="(item,index) in showTimeArr" :key="index">
            <view class="videoShow" v-if="videoShow">当前时段暂无视频</view>
            <scroll-view
            scroll-y="true" 
            style="height: 1200rpx; margin-top: 20rpx;" 
            @scrolltolower="lower" 
            v-else
            >
            <view style="display: flex; gap: calc(16%/3) ; flex-wrap: wrap; padding: 0 32rpx;">
              <view class="white" v-for="(item,idx) in siteIdVideo.length != 0 && siteIdVideo" :key="idx">
               <videoData :video="item"></videoData>
              </view>
            </view>
              
              <view class="placeholder" style="width: 320rpx; height: 180rpx;"></view>
            </scroll-view>
          </van-tab>
        </van-tabs>
      </van-tab>
      
      <van-tab title="教室">
        <view class="" style="margin-top: 20rpx;"></view>
        <van-tabs type="card" @click="change">
          <!-- 进球类型全部 -->
          <view>
            <van-tab title="全部" @click="changes">
             <view class="videoShow" v-if="allVideoShow">当前时段暂无视频</view>
             <scroll-view 
             scroll-y="true" 
             style="height: 1200rpx; margin-top: 20rpx;" 
             @scrolltolower="lower" 
             v-else
             >
             <view style="display: flex; gap: calc(16%/3) ; flex-wrap: wrap; padding: 0 32rpx;">
               <view class="white" v-for="(item,index) in siteIdVideo.length != 0 && siteIdVideo" :key="index">
                <videoData :video="item"></videoData>
               </view>
             </view>
               
               <view class="placeholder" style="width: 320rpx; height: 180rpx;"></view>
             </scroll-view>
            </van-tab>
          </view>
          <!-- 三分球/二分球 -->
          <van-tab :title="item" v-for="(item,index) in ballType" :key="index">
           <view class="videoShow" v-if="allVideoShow">当前时段暂无视频</view>
           <scroll-view 
           scroll-y="true" 
           style="height: 1200rpx; margin-top: 20rpx;" 
           @scrolltolower="lower" 
           @scrolltoupper="upper"
           v-else
           >
           <view style="display: flex; gap: calc(16%/3) ; flex-wrap: wrap; padding: 0 32rpx;">
             <view class="white" v-for="(item,idx) in siteIdVideo.length != 0 && siteIdVideo" :key="idx">
              <videoData :video="item"></videoData>
             </view>
           </view>
             
             <view class="placeholder" style="width: 320rpx; height: 180rpx;"></view>
           </scroll-view>
         </van-tab>
        </van-tabs>
      </van-tab>
    </van-tabs>
	</view>
</template>

<script>
  import { mapState,mapActions,mapMutations } from 'vuex'
  import { videoDate } from '@/components/videoData/videoData.vue'
  import { shoppingCar } from '@/components/shopping-car/shopping-car.vue'
  import Toast from '@/wxcomponents/vant/toast/toast.js'
	export default {
		data() {
			return {
				active: 0, //当前选中的选项卡：默认选中第一个~
        ballType: ['三分球','两分球'],
        allVideoShow: false,
        num: 0,
        
			}
		},
    components: {
      videoDate,
      shoppingCar
    },
    computed: {
      ...mapState('m_venues',['siteIdVideo','total','showTimeArr','startTime','stopTime','videoShow','newSiteIdVideo']),
      ...mapState('m_cart',['cart']),
      ...mapState('m_user',['userinfo'])
      
    },
    async created() {
      if( this.showTimeArr[0].slice(0,2) < 8 || this.showTimeArr[0].slice(0,2) >23) {
        this.allVideoShow = true
      }
      this.getCart()   
    },
    // 页面离开事件
    onUnload() {
      this.clearSiteIdVideo()
      console.log('onunload')
      // console.log(this.siteIdVideo)
      console.log(this.cart.length)
      
    },
		methods: {
      ...mapMutations('m_venues',['updatePage','clearSiteIdVideo','clearPage','clearSiteIdVideo']),
      ...mapActions('m_venues',['getVideo']),
      ...mapMutations('m_cart',['addCart']),
      change(e) {
        this.clearSiteIdVideo()
        this.clearPage()
        console.log(e.detail.title)
        console.log('change')
          if (e.detail.title == '三分球') {
            this.getVideo({
              start_time: this.startTime,
              stop_time: this.stopTime,
              goal_category: '三分球'
          })
          }
          else if(e.detail.title == '两分球') {
            console.log('22')
            this.getVideo({
              start_time: this.startTime,
              stop_time: this.stopTime,
              goal_category: '两分球'
          })
        }
        else if(e.detail.title == '全部' || e.detail.title== '进球类型'  ) {
          this.getVideo( {
            start_time: this.startTime,
            stop_time: this.stopTime,
            goal_category: ''
          })
        }
        else if(e.detail.title == '时段' ){
          this.getVideo({
            start_time: this.startTime,
            stop_time: this.stopTime
          })
        }
      },
      async changes(e) {
        this.clearSiteIdVideo()
        this.clearPage()
        console.log(e.detail.title)
        console.log('changes')
        if(e.detail.title == '全部') {
          this.getVideo( {
            start_time: this.startTime,
            stop_time: this.stopTime
          })
        } 
        else {
          var start = `${this.startTime.slice(0,10)} ${e.detail.title.slice(0,5)}:00`
          var stop = `${this.stopTime.slice(0,10)} ${e.detail.title.slice(6,11)}:00`
          this.getVideo( {
            start_time: start,
            stop_time: stop
          })
        }
        console.log(this.siteIdVideo)
      },
      upper() {
        uni.$showMsg('已经是最新数据')
      },
      // 下拉到底
      lower() {
        console.log('==========')
        // console.log(this.siteIdVideo);
        // console.log(this.total)
        console.log(this.siteIdVideo.length)
        if(this.siteIdVideo.length == this.total)
        return uni.$showMsg('没有更多数据了')
        this.updatePage(1)
        // var query = {
        //   start_time: this.startTime,
        //   stop_time: this.stopTime,
        // }
        this.getVideo({
            start_time: this.startTime,
            stop_time: this.stopTime
          })
      },
      async getCart() {
        const {data} = await uni.$http.get('/storehouse/hibas/cart')
        console.log(data)
      },
      toCart() {
        this.getCart()
        uni.navigateTo({
          url: '../cart/cart'
        })
      },
      // 支付
      pay() {
        console.log(this.userinfo)
        if(uni.getStorageInfoSync().keys["userinfo"]) {
          return Toast('请先登录在进行视频下载')
        } else {
          uni.navigateTo({
            url: '../pay/pay'
          })
        }
      }
		}
	}
</script>

<style lang="scss">
  @import '@/style/allVideo'
</style>
