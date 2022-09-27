let weixinAuthService;
export default {
	data() {
		return {
			"hasWeixinAuth": false,
			"providerList": [],
			"platform": "",
			"univerifyStyle": {
				"icon": {
					"path": "static/logo.png" // 自定义显示在授权框中的logo，仅支持本地图片 默认显示App logo
				},
				"authButton": {
					"normalColor": "#be98e6", // 授权按钮正常状态背景颜色 默认值：#3479f5
					"highlightColor": "#be98e6", // 授权按钮按下状态背景颜色 默认值：#2861c5（仅ios支持）
					"disabledColor": "#d2abe6", // 授权按钮不可点击时背景颜色 默认值：#73aaf5（仅ios支持）
					"textColor": "#ffffff", // 授权按钮文字颜色 默认值：#ffffff
					"title": "本机号码一键登录" // 授权按钮文案 默认值：“本机号码一键登录”
				},
				"privacyTerms":{
					"defaultCheckBoxState":false, // 条款勾选框初始状态 默认值： true
					"checkBoxSize":20, // 可选 条款勾选框大小，仅android支持
				}
			},
			"agree": false,
			"inviteCode": false
		}
	},
	onReady() {
		uni.getSystemInfo({
			success: (res) => {
				this.platform = res.platform.toLowerCase();
			}
		});
	},
	async onLoad() {
		// #ifdef APP-PLUS
		uni.getProvider({
			service: 'oauth',
			success: res => {
				console.log(res.provider, "provider-----------") // ['qq', 'univerify']
				this.providerList = res.provider
			}
		});
		plus.oauth.getServices((services) => {
			weixinAuthService = services.find((service) => {
				return service.id === 'weixin'
			})
			if (weixinAuthService) {
				this.hasWeixinAuth = true
			}
		});
		// #endif
		var token = uni.getStorageSync('uni_id_token');
		var uid = uni.getStorageSync('uid');
		if (token) {
			uni.reLaunch({
				url: '/pages/index/index?token=' + token + "&uid=" + uid,
			});
		}else {
			// #ifdef APP-PLUS
			this.inviteCode = await new Promise((callBack) => {
				uni.getClipboardData({
					success: function(res) {
						console.log("res: ======================",res);
						if (res.data.slice(0, 18) == 'uniInvitationCode:') {
							let uniInvitationCode = res.data.slice(18, 38)
							console.log('当前用户是其他用户推荐下载的,推荐者的code是：' + uniInvitationCode);
							// uni.showModal({
							// 	content: '当前用户是其他用户推荐下载的,推荐者的code是：'+uniInvitationCode,
							// 	showCancel: false
							// });
							callBack(uniInvitationCode)
							//当前用户是其他用户推荐下载的。这里登记他的推荐者id 为当前用户的myInviteCode。判断如果是注册
						} else {
							callBack(false)
						}
					},
					fail() {
						callBack(false)
					}
				});
			})
			// #endif
		}
	},
	methods: {
		bindshangji(callback) {
			var self = this
			console.log("this.inviteCode: ",this.inviteCode);
			uniCloud.callFunction({
				name: 'hallctrl',
				data: {
					action: "hall/bindshangji",
					data: {
						uid: self.uid ? self.uid : uni.getStorageSync('uid'),
						uniIdToken: self.token ? self.token : uni.getStorageSync('uni_id_token'),
						inviteCode: this.inviteCode
					}
				},
				success: res => {
					console.log('res-----------bindshangji', res);
				},
				complete(res) {
					// uni.hideLoading()
					console.log('res-----------complete', res);
					uni.setClipboardData({
						data: ""
					})
					uni.hideToast()
					callback()
				}
			})
		},
		async loginByApple() {
			if (!this.agree) {
				uni.showToast({
					title: "请先同意用户协议与隐私政策",
					icon: 'none',
				});
				return
			}
			const [loginErr, loginData] = await uni.login({
				provider: 'apple'
			});
			if (loginErr) {
				uni.showModal({
					showCancel: false,
					content: '苹果登录失败，请稍后再试'
				})
				return;
			}
			// 获取用户信息
			const [getUserInfoErr, result] = await uni.getUserInfo({
				provider: 'apple'
			});
			console.log("getUserInfo result: ", result);

			if (getUserInfoErr) {
				let content = getUserInfoErr.errMsg;
				if (~content.indexOf('uni.login')) {
					content = '请先完成登录操作';
				}
				uni.showModal({
					title: '获取用户信息失败',
					content: '错误原因' + content,
					showCancel: false
				});
				return;
			}
			uni.showLoading({
				title: '处理中...'
			})
			// uni-id 苹果登录
			uniCloud.callFunction({
				name: 'hallctrl',
				data: {
					action: "hall/loginByApple",
					data: result.userInfo
				}
			}).then((res) => {
				uni.hideLoading()
				console.log('res---------苹果登录---------', res)
				if (res.result.errcode && res.result.errcode != 0) {
					uni.showToast({
						title: res.result.errmsg,
						icon: 'none',
					});
					return
				}
				try {
					uni.setStorageSync('uni_id_token', res.result.data.token);
				} catch (e) {
					// error
				}
				try {
					uni.setStorageSync('uid', res.result.data.user.id);
				} catch (e) {
					// error
				}
				console.log("token", uni.getStorageSync('uni_id_token'))
				console.log("uid", uni.getStorageSync('uid'))
				this.bindshangji(() => {
					uni.reLaunch({
						url: '/pages/index/index?token=' + res.result.data.token + "&uid=" +
							res.result.data.user.id,
					});
				})

			}).catch((err) => {
				console.log("err: ", err);
				uni.hideLoading()
				uni.showToast({
					title: "苹果登录失败，请稍后重试!",
					icon: 'none',
				});
			})

		},
		loginByUniverify() {
			if (!this.agree) {
				uni.showToast({
					title: "请先同意用户协议与隐私政策",
					icon: 'none',
				});
				return
			}
			uni.login({
				provider: 'univerify',
				univerifyStyle: this.univerifyStyle,
				success:(res)=>{ // 登录成功
					console.log('一键登录',res.authResult); // {openid:'登录授权唯一标识',access_token:'接口返回的 token'}
					// uni.showLoading({
					// 	title: '处理中...'
					// })
					uniCloud.callFunction({
						name: 'hallctrl',
						data: {
							action: "hall/loginByUniverify",
							data: res.authResult
						}
					}).then((res) => {
						console.log('一键登录----------res', res)
						uni.hideLoading()
						uni.closeAuthView()
						if (res.result.errcode != 0) {
							uni.showToast({
								title: res.result.errmsg,
								icon: 'none'
							});
							return
						}
						try {
							uni.setStorageSync('uni_id_token', res.result.data.token);
						} catch (e) {
							// error
						}
						try {
							uni.setStorageSync('uid', res.result.data.user.id);
						} catch (e) {
							// error
						}
						console.log("token", uni.getStorageSync('uni_id_token'))
						console.log("uid", uni.getStorageSync('uid'))
						this.bindshangji(() => {
							uni.reLaunch({
								url: '/pages/index/index?token=' + res.result.data.token + "&uid=" + res.result.data.user.id,
							});
						})
					}).catch((err) => {
						console.log("err---------", err)
						uni.hideLoading()
						uni.closeAuthView()
						uni.showToast({
							title: "登录失败，请稍后重试",
							icon: 'none',
						});
					})
				},
				fail(res) { // 登录失败
					console.log("登录失败", res)
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
		getWeixinCode() {
			return new Promise((resolve, reject) => {
				// #ifdef MP-WEIXIN
				uni.login({
					provider: 'weixin',
					success(res) {
						console.log("res:-----uni.login ",res);
						resolve(res.code)
					},
					fail(err) {
						reject(new Error('微信登录失败'))
					}
				})
				// #endif
				// #ifdef APP-PLUS
				weixinAuthService.authorize(function(res) {
					resolve(res.code)
				}, function(err) {
					console.log(err)
					reject(new Error('微信登录失败'))
				});
				// weixinAuthService.authorize(function(res) {
				// 	resolve(res.code)
				// }, function(err) {
				// 	console.log(err)
				// 	reject(new Error('微信登录失败'))
				// },{
				// 	"scope":"scope_userinfo"
				// });
				// #endif
			})
		},
		loginByWeixinMini() {
			uni.showLoading({
				title: '加载中...'
			})
			uni.getUserProfile({
				desc: '用于完善会员资料', // 声明获取用户个人信息后的用途-弹窗
				success: (res) => {
					console.log("getUserProfile: ", res);
					uni.showLoading({
						title: '处理中...'
					})
					this.getWeixinCode().then((code) => {
						return uniCloud.callFunction({
							name: 'hallctrl',
							data: {
								action: "hall/loginByWeixin",
								data: {
									code: code,
									userInfo:res.userInfo
								}
							}
						})
					}).then((res) => {
						console.log('微信xcx---------', res)
						uni.hideLoading()
						if (res.result.errcode && res.result.errcode != 0) {
							uni.showToast({
								title: res.result.errmsg,
								icon: 'none',
							});
							return
						}
						uni.setStorageSync('uni_id_token', res.result.data.token);
						uni.setStorageSync('uid', res.result.data.user.id);
						uni.reLaunch({
							url: '/pages/index/index?token=' + res.result.data.token + "&uid=" +
								res.result.data.user.id,
						});
					}).catch((err) => {
						console.log("err: ", err);
						uni.showModal({
							showCancel: true,
							content: '微信登录失败，请稍后再试'  + err,
						})
						uni.hideLoading()
					})
				},
				fail: (err) => {
					console.log("err: ",err);
					uni.showModal({
						showCancel: false,
						content: '微信登录失败'
					})
				}
			})
		},
		loginByWeixin() {
			if (!this.agree) {
				uni.showToast({
					title: "请先同意用户协议与隐私政策",
					icon: 'none',
				});
				return
			}
			var self = this
			uni.showLoading({
				title: '处理中...'
			})
			this.getWeixinCode().then((code) => {
				return uniCloud.callFunction({
					name: 'hallctrl',
					data: {
						action: "hall/loginByWeixin",
						data: {
							code: code,
						}
					}
				})
			}).then((res) => {
				console.log('res-----微信登录---------', res)
				uni.hideLoading()
				
				if (res.result.errcode && res.result.errcode!= 0) {
					uni.showToast({
						title: res.result.errmsg,
						icon: 'none',
					});
					return
				}
				try {
					uni.setStorageSync('uni_id_token', res.result.data.token);
				} catch (e) {
					// error
				}
				try {
					uni.setStorageSync('uid', res.result.data.user.id);
				} catch (e) {
					// error
				}
				console.log("token", uni.getStorageSync('uni_id_token'))
				console.log("uid", uni.getStorageSync('uid'))
				if (res.result.data.user.nickname == "") {
					self.getuserinfo(res.result.data.token, res.result.data.user.id)
				} else {
					this.bindshangji(() => {
						uni.reLaunch({
							url: '/pages/index/index?token=' + res.result.data.token + "&uid=" +
								res.result.data.user.id,
						});
					})
				}
			}).catch((err) => {
				console.log("err: ", err);
				uni.showModal({
					showCancel: false,
					content: '微信登录失败，请稍后再试'
				})
				uni.hideLoading()
			})
		},
		getuserinfo(token, uid) {
			var self = this
			uni.showLoading({
				title: '处理中...'
			})
			uni.login({
				provider: 'weixin',
				success(res) {
					uni.getUserInfo({
						success(info) {
							console.log(info)
							var nickname = info['userInfo']['nickName']
							var avatar = info['userInfo']['avatarUrl']
							var sex = info['userInfo']['gender']
							uniCloud.callFunction({
								name: 'hallctrl',
								data: {
									action: "hall/setuserinfo",
									data: {
										nickname: nickname,
										avatar: avatar,
										sex: sex,
										uid: uid,
										uniIdToken: token
									}
								}
							}).then((res) => {
								console.log("res-----------setuserinfo-----: ",res);
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
								self.bindshangji(() => {
									uni.reLaunch({
										url: '/pages/index/index?token=' + token + "&uid=" +
											uid,
									});
								})
							}).catch((err) => {
								uni.hideLoading()
								uni.showToast({
									title: "设置失败!",
									icon: 'none',
								});
								console.error(err)
							})

						},
						fail: () => {
							uni.hideLoading()
							uni.showToast({
								title: "微信登录授权失败",
								icon: 'none'
							});
						}
					})
				},
				fail(err) {
					console.log("err:---------- ",err);
					uni.hideLoading()
					uni.showToast({
						title: "微信登录授权失败",
						icon: 'none'
					});
				}
			})
		}
	}
}
