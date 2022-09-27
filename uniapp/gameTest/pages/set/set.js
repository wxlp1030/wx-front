import updateVersion from '@/uni_modules/uni-upgrade-center-app/utils/check-update'
import callCheckVersion from '@/uni_modules/uni-upgrade-center-app/utils/call-check-version'
let weixinAuthService;
let auths = null;
let aweixin = null;
export default {
	data() {
		return {
			height: 0,
			gotomarket:{
				iosMarketId:"",
				androidMarketUrl:"",
			},
			user: {
				avatar: "",
				nickname: "",
				inviteCode: "",
				phone: 0,
				zhifubao: "",
				openid: ""
			},
			avatarUrl:"https://vkceyugu.cdn.bspapp.com/VKCEYUGU-f184e7c3-1912-41b2-b81f-435d1b37c7b4/536fbc2c-31f0-41e1-9d51-3c4fb82f27c0.png",
			version: "1.0.0",
			univerifyStyle: {
				"icon": {
					"path": "static/icon.png" // 自定义显示在授权框中的logo，仅支持本地图片 默认显示App logo
				},
				"authButton": {
					"normalColor": "#be98e6", // 授权按钮正常状态背景颜色 默认值：#3479f5
					"highlightColor": "#be98e6", // 授权按钮按下状态背景颜色 默认值：#2861c5（仅ios支持）
					"disabledColor": "#d2abe6", // 授权按钮不可点击时背景颜色 默认值：#73aaf5（仅ios支持）
					"textColor": "#ffffff", // 授权按钮文字颜色 默认值：#ffffff
					"title": "本机号码一键绑定" // 授权按钮文案 默认值：“本机号码一键绑定”
				}
			}
		}
	},
	onLoad() {
		var self = this
		// #ifdef APP-PLUS
		self.version = plus.runtime.version
		// #endif
		uni.getStorage({
			key: 'uni_id_token',
			success: function(res) {
				self.token = res.data
			}
		});
		uni.getStorage({
			key: 'uid',
			success: function(res) {
				self.uid = res.data
				self.getuserinfo()
				// #ifdef APP-PLUS
				self.getMarket()
				// #endif
			}
		});

		uni.$on('changeuserinfo', (usnerinfo) => {
			console.log("usnerinfo", usnerinfo)
			if (usnerinfo.nickname) {
				self.user.nickname = usnerinfo.nickname
			}
			if (usnerinfo.zhifubao) {
				self.user.zhifubao = usnerinfo.zhifubao
			}
		})
	},
	onReady(){
		uni.getSystemInfo({
			//成功获取的回调函数，返回值为系统信息
			success: (sysinfo) => {
				this.height = sysinfo.statusBarHeight + 'px'
			}
		});
	},
	onUnload() {
		// 移除监听事件  
		uni.$off('changeuserinfo');
	},
	methods: {
		async checkVersion() {
			let res = await callCheckVersion()
			if (res.result.code > 0) {
				updateVersion()
			} else {
				uni.showToast({
					title: '当前已经是最新版本！',
					icon: 'none'
				});
			}
		},
		copyCode() {
			uni.setClipboardData({
				data: this.user.inviteCode,
				success: function() {
					console.log('success');
				}
			});
		},
		toFeedback(){
			uni.navigateTo({
				url: '/uni_modules/uni-feedback/pages/opendb-feedback/opendb-feedback',
				complete(e) {
					console.log("e: ",e);
				}
			});
		},
		toMsg(){
			uni.navigateTo({
				url: '/uni_modules/uni-feedback/pages/opendb-feedback/list'
			});
		},
		goback() {
			uni.navigateBack()
		},
		closeUserFn(){
			var self = this
			uni.showModal({
				title: '提示',
				content: '确定注销此账号吗？一旦注销将无法使用，请慎重！',
				showCancel: true,
				cancelText: '取消',
				confirmText: '确定',
				success: res => {
					console.log("res: ", res);
					if (res.confirm) {
						uni.showLoading({
							title: '处理中...',
							mask: true
						});
						uniCloud.callFunction({
							name: 'hallctrl',
							data: {
								action: "hall/closeUser",
								data: {
									uid:self.uid,
									uniIdToken:self.token
								}
							}
						}).then((res) => {
							console.log("res: ------------",res);
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
								title: "账号注销成功!",
								icon: 'none',
							});
							self.loginout()
						}).catch((err) => {
							uni.hideLoading()
							uni.showToast({
								title: "账号注销失败!",
								icon: 'none',
							});
							console.error(err)
						})
					}
				},
				fail: () => {},
				complete: () => {}
			});
		},
		getMarket(){
			var self = this
			uni.showLoading()
			uniCloud.callFunction({
				name: 'hallctrl',
				data: {
					action: "hall/getconfig",
					data: {
						"typeId":"gotomarket"
					}
				}
			}).then((res) => {
				uni.hideLoading()
				console.log("gotomarket----------",res)
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
				self.gotomarket = res.result.getConfigInfo
			}).catch((err) => {
				uni.hideLoading()
				console.log("err: ",err);
			})
		},
		gotoMarket(){
			// #ifdef APP-PLUS
			if (uni.getSystemInfoSync().platform == "ios") {
				// 这里填写appstore应用id
				// let appstoreid = Globalunit.iosMarketId; // 'id1417078253';
				plus.runtime.openURL("itms-apps://" + 'itunes.apple.com/cn/app/wechat/' + this.gotomarket.iosMarketId + '?mt=8');
			}
			if (uni.getSystemInfoSync().platform == "android") {
				var Uri = plus.android.importClass("android.net.Uri");
				// var uri = Uri.parse("market://details?id=" + Globalunit.androidMarketId);
				var uri = Uri.parse(this.gotomarket.androidMarketUrl);
				var Intent = plus.android.importClass('android.content.Intent');
				var intent = new Intent(Intent.ACTION_VIEW, uri);
				var main = plus.android.runtimeMainActivity();
				main.startActivity(intent);
			}
			// #endif
		},
		changeavatar() {
			var self = this
			uni.chooseImage({
				count: 1,
				sizeType: ['original', 'compressed'],
				sourceType: ['camera', 'album'], //这要注意，camera掉拍照，album是打开手机相册
				success: (res) => {
					var index = res.tempFilePaths[0].lastIndexOf(".");
					var obj = res.tempFilePaths[0].substring(index + 1, res.tempFilePaths[0].length);
					uniCloud.uploadFile({
						filePath: res.tempFilePaths[0],
						cloudPath: String(Math.random() * 5).split('.')[1] + '.' + obj,
						success: (res1) => {
							console.log("res1: --------------",res1);
							self.geturl(res1.fileID)
						}
					})
				}
			});
		},
		async geturl(fileID) {
			var self = this
			uni.showLoading({
				title: '处理中...'
			})
			var result = await uniCloud.getTempFileURL({
				// fileList: [{fileID: fileID,maxAge: "60"}]
				fileList: [fileID]
			})
			// var url = result['fileList'][0]['tempFileURL']['fileID']
			var url = result.fileList[0].tempFileURL
			self.user['avatar'] = url
			uniCloud.callFunction({
				name: 'hallctrl',
				data: {
					action: "hall/setuserinfo",
					data: {
						nickname: self.user['nickname'],
						avatar: url,
						uid: self.uid,
						uniIdToken: self.token
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
					avatar: url
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
		gopage(type) {
			console.log(type)
			if (type == 'aboutus') {
				uni.navigateTo({
					url: '/pages/about/about',
				});
			} else if (type == 'xieyi') {
				uni.navigateTo({
					url: '/pages/xieyi/xieyi?type=xieyi',
				});
			} else if (type == 'shiming') {
				uni.navigateTo({
					url: '/pages/shiming/shiming',
				});
			} else if (type == 'nickname') {
				uni.navigateTo({
					url: '/pages/nickname/nickname',
				});
			} else if (type == 'zhifubao') {
				uni.navigateTo({
					url: '/pages/alipay/alipay?zhifubao=' + this.user.zhifubao,
				});
			} else {
				uni.navigateTo({
					url: '/pages/xieyi/xieyi?type=yinsi',
				});
			}
		},
		loginout() {
			uni.removeStorageSync('uni_id_token');
			uni.removeStorageSync('uid');
			uni.navigateTo({
				url: '/pages/login/login',
				complete: (e) => {
					console.log("e: ",e);
				}
			});
		},
		getuserinfo() {
			var self = this
			uni.showLoading({
				title: '加载中...'
			})
			uniCloud.callFunction({
				name: 'hallctrl',
				data: {
					action: "hall/getuserinfo",
					data: {
						uid: self.uid,
						uniIdToken: self.token
					}
				}
			}).then((res) => {
				uni.hideLoading()
				console.log("getuserinfo----------",res)
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
					if (res.result.errcode == 10005) {
						uni.removeStorage({
							key: 'uni_id_token',
							success: function(res) {

							}
						});
						uni.removeStorage({
							key: 'uid',
							success: function(res) {
								uni.navigateTo({
									url: '/pages/login/login',
								});
							}
						});
					}
					return
				}
				self.user = res.result.data.user
			}).catch((err) => {
				uni.hideLoading()
			})
		},
		bingphone() {
			var self = this
			if (this.user.phone != 0) {
				uni.showToast({
					title: '已绑定手机号，无需再绑定',
					icon: "none"
				});
				return false
			}

			uni.login({
				provider: 'univerify',
				univerifyStyle: this.univerifyStyle,
				success(res) { // 登录成功// {openid:'登录授权唯一标识',access_token:'接口返回的 token'}
					console.log("res----univerifyStyle: ", res);
					// uni.showLoading({
					// 	title: '处理中...'
					// })
					uniCloud.callFunction({
						name: 'hallctrl',
						data: {
							action: "hall/bindMobile",
							data: {
								params: res.authResult,
								uid: self.uid,
								uniIdToken: self.token
							},
						}
					}).then((res) => {
						uni.hideLoading()
						uni.closeAuthView()
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
							title: "绑定成功",
							icon: 'none',
						});
						uni.$emit('changeuserinfo', {
							phone: res.result.phone
						});
						self.user.phone = res.result.phone
						console.log(res)
					}).catch((err) => {
						console.error(err, '登录失败');
						uni.hideLoading()
						uni.closeAuthView()
						uni.showToast({
							title: "登录失败，请稍后重试",
							icon: 'none',
						});
					})

				},
				fail(res) { // 登录失败
					console.log("fail-----", res)
					if (res.errCode == '30005') {
						uni.showModal({
							content: '请开启手机数据流量',
							showCancel: false
						});
					}
					uni.closeAuthView()
				}
			})
		},
		bindweixin() {
			var self = this
			for (let i = 0; i < auths.length; i++) {
				if (auths[i].id == 'weixin') {
					aweixin = auths[i];
					break;
				}
			}
			if (!aweixin) {
				uni.showModal({
					showCancel: false,
					content: '当前环境不支持微信登录'
				})
				return;
			}
			if (!aweixin.authResult) {
				aweixin.authorize(function(e) {
					console.log(e)
					uni.showLoading({
						title: '处理中...'
					})
					uniCloud.callFunction({
						name: 'hallctrl',
						data: {
							action: "hall/bindWeixin",
							data: {
								code: e.code,
								uid: self.uid ? self.uid : uni.getStorageSync('uid'),
								uniIdToken: self.token ? self.token : uni.getStorageSync('uni_id_token')
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
						uni.showToast({
							title: '绑定成功',
							icon: 'none',
						});
					}).catch((err) => {
						console.log(err)
						uni.hideLoading()
						uni.showToast({
							title: "绑定失败，请稍后重试",
							icon: 'none',
						});
					})
				}, function(e) {
					console.log(e)
					uni.showModal({
						showCancel: false,
						content: '绑定微信失败，请稍后再试'
					})
				});
			} else {
				authUserInfo()
				console.log("已经登录认证!");
			}
		},
		loginByWeixin() {
			var self = this
			console.log('微信登录')
			plus.oauth.getServices(function(services) {
				auths = services;
				self.bindweixin()
			}, function() {
				uni.showModal({
					showCancel: false,
					content: '绑定微信失败，请稍后再试'
				})
			});
		},
	}
}
