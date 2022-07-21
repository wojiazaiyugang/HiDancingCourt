<script>
 import { mapActions, mapMutations, mapState } from "vuex"
 import { getUserFace, } from "@/api/user.js"
	export default {
		onLaunch: function() {
      console.log("onlaunch")
      this.getToken().finally(()=>{
        this.getLocation().finally(()=>{
          console.log("1234")
          this.getVenues()
          this.getDeviceInfo()
          this.getFaceInfo()
        })
      })
		},
		onShow: function() {
      console.log("onshow")
      const updateManager = wx.getUpdateManager()
      if(updateManager){
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
      }
		},
		onHide: function() {
      
		},
    methods: {
      ...mapActions("m_user",["getToken",]),
      ...mapActions("m_device",["getLocation"]),
      ...mapActions("m_venues",["getVenues"]),
      ...mapMutations("m_device",["setDeviceInfo"]),
      ...mapMutations("m_camera",["setUserFaceInfo"]),
      // 存储当前设备的信息
      async getDeviceInfo(){
        await uni.getSystemInfo({
          success:async(res)=> {
            // 得到胶囊位置信息
            let menuInfo = await uni.getMenuButtonBoundingClientRect()
            this.setDeviceInfo(Object.assign({}, res, {menuInfo}))
          }
        })
      },
      async getFaceInfo(){
        // 获取人脸信息
        let {data} = await getUserFace()
          this.setUserFaceInfo(data.data.face_img)
      },
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
