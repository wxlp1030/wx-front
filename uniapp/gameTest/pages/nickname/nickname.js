export default {
	data() {
		return {
			name:null,
			idcard:null,
			token:null,
			uid:null,
			isauthentication:0,
            height:0,
		}
	},
	methods: {
        goback(){
        	uni.navigateBack()
        },
		tijiao(){
			var self = this
			console.log('获取验证码')
			if (self.name == null || self.name == "") {
				uni.showToast({
					title: "请输入昵称",
					icon: 'none',
				});
				return
			}
			uni.showLoading({
				title: '处理中...'
			})
			uniCloud.callFunction({
				name: 'hallctrl',
				data: {
					action: "hall/setuserinfo",
					data: {
						nickname: self.name,
						uid:self.uid,
						uniIdToken:self.token,
					}
				}
			}).then((res) => {
				uni.hideLoading()
				if (res.result.code && res.result.code != 0) {
					uni.showToast({
						title: res.result.message,
						icon: 'none',
					});
					return
				}
				if (res.result.errcode && res.result.errcode != 0) {
					uni.showToast({
						title: res.result.errmsg,
						icon: 'none',
					});
					return
				}
				uni.$emit('changeuserinfo', {
					nickname:self.name
				});
				uni.showToast({
					title: "设置成功!",
					icon: 'none',
				});
			}).catch((err) => {
				uni.hideLoading()
				uni.showToast({
					title: "设置失败!",
					icon: 'none',
				});
				console.error(err)
			})
		},
		getuserinfo() {
			var self = this
			uni.showLoading({
				title: '处理中...'
			})
			uniCloud.callFunction({
				name: 'hallctrl',
				data: {
					action: "hall/getuserinfo",
					data: {
						uid: self.uid?self.uid:uni.getStorageSync('uid'),
						uniIdToken:self.token?self.token:uni.getStorageSync('uni_id_token')
					}
				}
			}).then((res) => {
				uni.hideLoading()
				console.log(res)
				if (res.result.code && res.result.code != 0) {
					uni.showToast({
						title: res.result.message,
						icon: 'none',
					});
					return
				}
				if (res.result.errcode && res.result.errcode != 0) {
					uni.showToast({
						title: res.result.errmsg,
						icon: 'none',
					});
					return
				}
				self.name = res.result.data.user.nickname
			}).catch((err) => {
				uni.hideLoading()
				uni.showToast({
					title: "获取用户信息失败，请稍后重试!",
					icon: 'none',
				});
			})
		}
	},
	onLoad: function(option) {
		var self = this
		uni.getSystemInfo({
			//成功获取的回调函数，返回值为系统信息
			success: (sysinfo) => {
		        self.height = sysinfo.statusBarHeight + 'px'
			},
			complete: () => {}
		});
		uni.getStorage({
		    key: 'uni_id_token',
		    success: function(res) {
		        console.log(res.data);
		        self.token = res.data
		    }
		});
		uni.getStorage({
		    key: 'uid',
		    success: function(res) {
		        console.log(res.data);
		        self.uid = res.data
		        self.getuserinfo()
		    }
		});
	},
}