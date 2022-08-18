<template>
  <view class="ba-f7"
    :style="{height:calHeight}"
    >
    <coupons :venueId="currentVenueId"></coupons>
  </view>
</template>

<script>
  import coupons from "@/components/coupons.vue"
  import { mapState, mapMutations } from "vuex"
  export default {
    components:{
      coupons,
    },
    data(){
      return {
        // 当前场馆
        currentVenueId:0,
      }
    },
    onLoad(options) {
      this.currentVenueId = options.venue_id
    },
    computed:{
      ...mapState("m_device",["deviceInfo"]),
      calHeight(){
        return this.deviceInfo&&this.deviceInfo.safeArea.height + 'px'
      },
    },
    methods:{
      
    },
  }
</script>

<style lang="less">
  
</style>
