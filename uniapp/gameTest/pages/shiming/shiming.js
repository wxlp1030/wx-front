export default {
	data() {
		return {
			name: null,
			idcard: null,
			token: null,
			uid: null,
			isauthentication: 0,
			height: 0,
		}
	},
	onload() {
		uni.getStorage({
			key: 'uni_id_token',
			success: (res) => {
				this.token = res.data
			}
		});
		uni.getStorage({
			key: 'uid',
			success: (res) => {
				this.uid = res.data
				this.getuserinfo()
			}
		});
	},
	onReady() {
		uni.getSystemInfo({
			//成功获取的回调函数，返回值为系统信息
			success: (sysinfo) => {
				this.height = sysinfo.statusBarHeight + 'px'
			}
		});
	},
	methods: {
		goback() {
			uni.navigateBack()
		},
		tijiao() {
			var self = this
			if (self.name == null || self.name == "") {
				uni.showToast({
					title: "请输入真实姓名",
					icon: 'none',
				});
				return
			}
			var id =
				/^[1-9][0-9]{5}(19|20)[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}([0-9]|x|X)$/;
			if (self.idcard == null || self.idcard == "") {
				uni.showToast({
					title: "请输入身份证号",
					icon: 'none',
				});
				return
			}
			if (!id.test(self.idcard)) {
				uni.showToast({
					title: "请输入正确的身份证号",
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
					action: "hall/authentication",
					data: {
						realname: self.name,
						idcard: self.idcard,
						uid: self.uid ? self.uid : uni.getStorageSync('uid'),
						uniIdToken: self.token ? self.token : uni.getStorageSync('uni_id_token')
					}
				}
			}).then((res) => {
				console.log("authentication: ----", res);
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
				uni.showToast({
					title: "认证成功",
					icon: 'none',
				});
				uni.$emit('changeuserinfo', {});
			}).catch((err) => {
				console.log("err: ", err);
				uni.hideLoading()
				uni.showToast({
					title: "认证失败，请稍后重试!",
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
						uid: self.uid ? self.uid : uni.getStorageSync('uid'),
						uniIdToken: self.token ? self.token : uni.getStorageSync('uni_id_token')
					}
				}
			}).then((res) => {
				uni.hideLoading()
				console.log("getuserinfo: ", res);
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
				self.idcard = res.result.data.user.idcard
				self.name = res.result.data.user.realname
				self.isauthentication = res.result.data.user.isauthentication
			}).catch((err) => {
				uni.hideLoading()
				uni.showToast({
					title: "获取用户信息失败，请稍后重试!",
					icon: 'none',
				});
			})
		}
	}
}
