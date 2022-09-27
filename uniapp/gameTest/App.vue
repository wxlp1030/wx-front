<script>
	import updateVersion from '@/uni_modules/uni-upgrade-center-app/utils/check-update'
	export default {
		onLaunch: function() {
			console.log('App Launch')
			updateVersion()//检查更新
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
	}
</script>

<style>
	uni-page-body,
	#app {
		height: 100%;
		font-weight: bold;
	}

	element.style {
		width: 28px;
		height: 35px;
	}

	* {
		box-sizing: border-box;
	}

	/*每个页面公共css */
</style>
