<script>
 import { mapActions, mapMutations, } from 'vuex'
	export default {
		onLaunch: function() {
      this.getToken()
      this.getUserInfo()
		},
		onShow: function() {
		},
		onHide: function() {
		},
    methods: {
      ...mapActions("m_user",["getToken"]),
      ...mapMutations("m_user",["setUserInfo"]),
      // 获得用户信息
      async getUserInfo(){
        let {data} = await uni.$http.get("/users/info/?applet=HiDancing")
        this.setUserInfo(data.data.user_info)
        console.log(data.data.user_info)
      },
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
