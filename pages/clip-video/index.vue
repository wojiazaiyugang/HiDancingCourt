<template>
	<view class="width-shi heichi100 ba-f7 bawhite overflow-hidden">
    <nvg-bar>
      <template v-slot:icon><text class="iconfont icon-fanhui fon36 black"></text></template>
      <template v-slot:text><text class="black fon36">tuonilaoshi</text></template>
    </nvg-bar>
    剪辑视频
    <!-- <scroll-view 
      scroll-y="true" 
      class="height-80 overflow-hidden"
      :show-scrollbar="false"
      @scrolltoupper="scroolTop"
      @scrolltolower="scroolBottom" 
    >
      <view class="height-full " style="margin-top: 10rpx;">
        <view v-if="allVideos.length==0" class="absolute margtop50zhi text-center margleftchi50 translatex-50 widthchi210 line-heichi60 gray" >
          请尝试重新拍照查询或联系管理员查看所有视频!
        </view>
        <view v-if="allVideos.length!=0" class="flex flexwrap height-full marginx10" style="align-content: flex-start;" >
          <videoData 
            v-for="(item,index) in allVideos" 
            :key="index" 
            :video="item">
          </videoData>
        </view>
      </view>

    </scroll-view> -->
	</view>
</template>

<script>
  import { mapState, mapMutations, } from "vuex"
  import { videoData } from "@/components/videoData"
  import nvgBar from "@/components/nvgBar"
	export default {
		data() {
			return {
        
			}
		},
    components: {
      videoData,
      nvgBar,
    },
    computed: {

    },
    created() {

    },
		methods: {
      
    }
	}
</script>

<style lang="scss">
  
</style>

