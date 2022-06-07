<script>
 import { mapActions, mapMutations, mapState } from "vuex"
	export default {
		onLaunch: function() {
      this.getToken().finally(()=>{
        this.getLocation().finally(()=>{
          this.getVenues()
        })
      })
		},
		onShow: function() {
		},
		onHide: function() {
		},
    computed:{
      ...mapState("m_user",["userId"]),
    },
    methods: {
      ...mapActions("m_user",["getToken",]),
      ...mapActions("m_device",["getLocation"]),
      ...mapActions("m_venues",["getVenues"]),
    }
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	@import "@/uni_modules/uni-scss/index.scss";
  @import "@/wxcomponents/vant/common/index.wxss";
	/* #ifndef APP-NVUE */
	@import "@/static/customicons.css";
  /*字体图标样式*/
  @import "@/static/iconfont/iconstyles/iconfont.css";
	// 设置整个项目的背景色 
	page {
		background-color: #f5f5f5;
	}
	/* #endif */
	.example-info {
		font-size: 14px;
		color: #333;
		padding: 10px;
	}
</style>
