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
