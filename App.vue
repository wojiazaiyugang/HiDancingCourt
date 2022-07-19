<script>
 import { mapActions, mapMutations, mapState } from "vuex"
	export default {
		onLaunch: function() {
      console.log("123456")
		},
		onShow: function() {
      console.log("onshow")
      this.getToken().finally(()=>{
        this.getLocation().finally(()=>{
          console.log("123")
          this.getVenues()
        })
      })
      const updateManager = wx.getUpdateManager()
      // 检查是否版本更新
      updateManager.onCheckForUpdate(function (res) {
        // 请求完新版本信息的回调
        // 版本有更新发生提示
        updateManager.onUpdateReady(function () {
          wx.showModal({
            title: "更新提示",
            content: "新版本已经准备好，是否重启应用？",
            success: function (res) {
              if (res.confirm) {
                // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
                updateManager.applyUpdate()
              }
            }
          })
        })
        // 新版本更新失败进行提示
        updateManager.onUpdateFailed(function () {
        
        })
      })
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
	@import "@/static/style/text.scss";
  @import "@/static/style/color.scss";
  @import "@/static/style/position.scss";
  @import "@/wxcomponents/vant/common/index.wxss";
	/* #ifndef APP-NVUE */
	@import "@/static/customicons.css";
  /*字体图标样式*/
  @import "@/static/iconfont/iconstyles/iconfont.css";
	/* #endif */
</style>
