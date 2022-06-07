<template>
  <view>
    <view class="video">
      <view 
      class="coverImage"
      :style="{backgroundImage: 'url(' + video.gif_src + ')'}"
      @click="clickVideo"
      >
        <view class="leftTop" >{{video.data.goal_labels[0]}}</view>
        <view class="leftBottom">
          <view>{{video.goal_time.slice(5,10)}}</view>
          <view>{{video.goal_time.substr(11,15)}}</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  import { mapMutations,mapState } from "vuex"
  export default {
    name:"videoData",
    props: {
      video: {
        type: Object,
        required: true
      },
      sonShow: {
        type:Boolean,
        required: true
      },
      length: {
        
        required: true
      },
      idx: {
        type: Number,
        required: true
      },
      fill: {
        type: Array,
        required: true
      }
    },
    data() {
      return {
        isShow: false,
        allCheck: false,
        num : 0,
        addVideo: false  ,// 没有添加到购物车
        cartList: [] // 当前页面购物车视频
      };
    },
    watch: {
      sonShow: function(newVal,oldVal) {
        console.log('-----------')
        console.log(newVal)
        console.log(oldVal)
        console.log(this.fill[this.idx])
        console.log(this.fill)
        console.log('-----------')
        // this.isShow = this.fill[this.idx]
        this.isShow = newVal
        // console.log(this.sonShow)
      } 
    },
    computed: {
      ...mapState('m_cart',['cart'])
    },
    created() {
      if(this.video.add_to_cart == 1) {
        this.isShow = true
        this.addVideo = true
      }
      // this.addVideo = false
    },
    mounted() {
      // console.log('song')
      // console.log(this.sonShow)
      // console.log(this.video)
      // this.isShow = this.sonShow
      // console.log(this.length)
    
      // this.fill = Array.from(Array(this.length), () => {
      //   return this.sonShow
      // })
      // console.log(this.fill)
      this.isShow = this.fill[this.idx]
    },
    methods: {
      ...mapMutations('m_video',['setCurrentVideo']),
      ...mapMutations('m_cart',['addCart','delCart']),
      // 单个视频的选择
      async checkClick() {
        // this.isShow = !this.isShow
        if(this.cart.every( item => item == this.video)) {
          console.log('every')
        }
        console.log(this.idx)
        console.log(this.fill)
        this.isShow = !this.isShow  // 当前复选取反
        
        this.fill[this.idx] = !this.fill[this.idx] // 在fill中的当前项取反
        // if(!this.isShow) {
        //   this.$emit('changeCheck',this.isShow)
        // } 
        this.allCheck = this.fill.every( item => item == true)
        console.log('---------------------')
        console.log(this.fill)
        // if(this.allCheck) {
          this.$emit('changeCheck',this.allCheck)
        // }
        console.log(this.sonShow)
        // console.log(this.video)
        this.video.check_status = !this.video.check_status
        console.log(this.video)
        // 添加进购物车
        if(!this.addVideo) {
          this.isShow = true
          this.CurrentPageAddCart(this.video)
          this.addVideo = true
          console.log('触发')
          // console.log('add_11111111111111to_cart')
          // this.video.add_to_cart = 1
          // console.log(this.video)
          // 更新购物车数组长度
          this.addCart(this.video)
          console.log('触发vuex')
        } else {
          // 删除购物车当前项
          this.isShow = false
          this.CurreentPageDelCartVideo(this.video)
          this.addVideo = false
          this.delCart(this.video)
          console.log('删除')
        }
      },
      // 添加购物车
      async CurrentPageAddCart(video) {
        console.log('addcart')
        const {data: res} = await uni.$http.post('/storehouse/hibas/cart', {
          video_id: video.id,
          goal_time:video.goal_time,
          site_id: video.site_id,
          venue_id: video.venue_id,
          goal_labels: video.goal_label
        })
        console.log(this.video)
        console.log('拿不到id')
        console.log(res)
        
        return this.$showMsg('该视频已添加进购物车')
        if(res.msg == '无法重复添加到购物车') return this.$showMsg('该视频已添加到购物车，请勿重复添加')
      },
      // 删除购物车视频
      async CurreentPageDelCartVideo(video) {
        const {data: res} = await uni.$http.delete('/storehouse/hibas/cart',{
          video_id: video.id
        })
        console.log(res)
        if(res.data == 'success') return this.$showMsg('该视频已从购物车删除')
        
      },
      // 跳转视频详情
      clickVideo() {
        // 存储当前的视频对象，进入视频播放页面不需要再拉取组件了
        this.setCurrentVideo(this.video)
        uni.navigateTo({
          url: '../../pages/video/video'
        })
      }
    }
  }
</script>

<style lang="scss">
  .video {
    position: relative;
    width: 220rpx;
    height: 300rpx;
    margin-top: 20rpx;
    margin-right: 17rpx;
    .coverImage{
      height: 100%;
      width: 100%;
      background-size: cover;
      border-radius: 25rpx;
    }
    .leftTop {
      z-index: 2;
      position: absolute;
      top: 0;
      left: 0;
      width: 107rpx;
      height: 40rpx;
      background-color: #fe5857;
      border-radius: 20rpx 0 ;
      font-size: 24rpx;
      line-height: 40rpx;
      text-align: center;
      color: #fff;
    }
    .leftBottom {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      z-index: 3;
      position: absolute;
      bottom: 0;
      left: 0;
      width: 107rpx;
      height: 50rpx;
      border-radius: 0 20rpx;
      font-size: 20rpx;
      background-color: rgba(0,0,0,.5);
      color: #fff;
    }
    .choose {
      z-index: 10;
      position: absolute;
      right: 0;
      width: 50rpx;
      height: 50rpx;
      line-height: 50rpx;
      text-align: center;
      background-color: rgba(102,102,102,.8);
      border-radius: 25rpx;
    }
    .color {
      background-image: linear-gradient(to bottom, #f7a216, #fe6205);
    }
  }
</style>
