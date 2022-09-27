export default {
	data() {
		return {
			height: 0,
			coin: 0,
			money: 0,
			checkindex: 0,
			list: [],
			jianglilist: [{
					'status': 0,
					'time': 8,
					'coin': 200
				},
				{
					'status': 0,
					'time': 12,
					'coin': 400
				},
				{
					'status': 0,
					'time': 16,
					'coin': 600
				},
				{
					'status': 0,
					'time': 20,
					'coin': 800
				},
				{
					'status': 0,
					'time': 22,
					'coin': 1000
				}
			],
			list1: [],
			toasttitle: '',
			showtoastdialog: false,
			uid: "",
			token: "",
			percent: 0,
			needsong: 0,
			tixiancaidui: 0,
			taskinfo: {
				'coin': 0,
				'type': '元'
			},
			leijicaiduigequ: 0,
			firstjiangli: 0,
			videofanbei: {
				"min": 1,
				"max": 5
			},
			todayseevideo: 0,
			needvido: 0,
			timer: null,
			lastvideotime: 0,
			videobutton: null,
			inviteCount: 0,
			inviteFen: 0.00,
			adpidInfo: {
				"renwuRewardAdpid": 0,
				"mpGridAdpid":0
			},
			urlCallback: {
				userId: "",
				extra: ""
			},
			type: ''
		}
	},
	onLoad() {
		this.getadpid()
		uni.getStorage({
			key: 'videotime',
			success: (res) => {
				this.lastvideotime = Number(res.data)
			}
		});
		if (!this.timer) {
			this.timer = setInterval(() => {
				var nowtime = Math.floor(Date.now() / 1000)
				if (this.lastvideotime == 0) {
					this.videobutton = false
				} else {
					var time = this.lastvideotime + 120 - nowtime
					this.videobutton = this.gettime(time)
				}
			}, 1000)
		}
	},
	onReady() {
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
				this.gettaskinfo(this.uid, this.token)
			}
		});

		// #ifdef APP-PLUS
		uni.getSystemInfo({
			//成功获取的回调函数，返回值为系统信息
			success: (sysinfo) => {
				var height = sysinfo.statusBarHeight
				if (height < 44) {
					height = 22
				}
				this.height = height + 'px'
			}
		});
		// #endif

		// #ifdef MP-WEIXIN
		const resInfo = wx.getMenuButtonBoundingClientRect()
		this.height = resInfo.top + 'px' //胶囊距离顶部
		// #endif

		this.urlCallback.userId = this.uid
	},
	onShow() {
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
				this.gettaskinfo(this.uid, this.token)
			}
		});
		this.getuserinfo()
	},
	computed: {
		seevideojindu() {
			return this.todayseevideo > this.needvido ? this.needvido : this.todayseevideo
		},
		seevideojinduwidth() {
			return ((this.seevideojindu / this.needvido) * 125) + 'rpx'
		},
		choujiangProgress() {
			return this.tixiancaidui > this.needsong ? 1 : (this.needsong - this.tixiancaidui)
		},
		choujiangProgressWidth() {
			return this.tixiancaidui > this.needsong ? (1 / this.needsong) * 390 : (this.tixiancaidui / this.needsong) *
				390
		},
		qiandaoStatusText() {
			//0 未领取  1 已领取 2可以领取 3已过期
			return function(item) {
				let {
					status,
					time
				} = item;
				switch (status) {
					case 0:
						return time + "点领奖"
						break;
					case 1:
						return "已领取"
						break;
					case 2:
						return time + "点领奖"
						break;
					case 3:
						return "已过期"
						break;
				}
			}
		}
	},
	methods: {
		toInviteFriends() {
			uni.navigateTo({
				url: "/pages/inviteFriends/inviteFriends"
			})
		},
		toInviteReward() {
			uni.navigateTo({
				url: "/pages/inviteReward/inviteReward"
			})
		},
		toInvite() {
			uni.navigateTo({
				url: "/pages/invite/invite"
			})
		},
		gettime(value) {
			if (!value) return '';
			if (value < 0) {
				return false
			}
			let hh = parseInt(value / 3600); //小时
			let shh = value - hh * 3600;
			let ii = parseInt(shh / 60);
			let ss = shh - ii * 60;
			return (ii < 10 ? '0' + ii : ii) + ':' + (ss < 10 ? '0' + ss : ss);
		},

		checktab(index) {
			//猜歌任务 0   每日任务1
			var self = this
			self.checkindex = index
			self.gettaskinfo(self.uid, self.token)
		},
		gomine() {
			uni.reLaunch({
				url: '/pages/mine/mine',
			});
		},
		getadpid() {
			uni.showLoading()
			uniCloud.callFunction({
				name: 'hallctrl',
				data: {
					action: "hall/getadpid",
					data: {}
				}
			}).then((res) => {
				uni.hideLoading()
				console.log("getadpid----------", res.result.getAdpidInfo)
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
				this.adpidInfo = res.result.getAdpidInfo
			}).catch((err) => {
				uni.hideLoading()
				console.log("err: ", err);
			})
		},
		getuserinfo() {
			uni.showLoading({
				title: '处理中...'
			})
			uniCloud.callFunction({
				name: 'hallctrl',
				data: {
					action: "hall/getuserinfo",
					data: {
						uid: this.uid ? this.uid : uni.getStorageSync('uid'),
						uniIdToken: this.token ? this.token : uni.getStorageSync('uni_id_token')
					}
				}
			}).then(({
				result
			}) => {
				uni.hideLoading()
				console.log("getuserinfo-----------", result)
				this.inviteCount = result.data.user.inviteCount || 0
				this.inviteFen = result.data.user.inviteFen || 0
				if (result.code && result.code != 0) {
					uni.showToast({
						title: result.message,
						icon: 'none',
					});
					return
				}
				if (result.errcode && result.errcode != 0) {
					uni.showToast({
						title: result.errmsg,
						icon: 'none',
					});
					return
				}
			}).catch((err) => {
				console.log("err: ", err);
				uni.hideLoading()
				uni.showToast({
					title: "获取用户信息失败，请稍后重试!",
					icon: 'none',
				});
			})
		},
		qiandaojiangli() {
			var self = this
			uni.showLoading({
				title: '处理中...'
			})
			uniCloud.callFunction({
				name: 'hallctrl',
				data: {
					action: "hall/sign",
					data: {
						uid: self.uid,
						uniIdToken: self.token,
					}
				}
			}).then((res) => {
				uni.hideLoading()
				console.log('sign--------', res)
				if (res.result.code && res.result.code != 0) {
					uni.showToast({
						title: res.result.message,
						icon: 'none',
					});
					return
				}
				if (res.result.errcode && res.result.errcode == 10014) {
					self.showtoast('未到领奖时间，请稍后');
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
					title: '领取成功',
					icon: 'none',
				});
				self.coin = res.result.data.user.coin
				self.money = res.result.data.user.fen
				self.jianglilist = res.result.data.jianglilist
				self.tixiancaidui = res.result.data.user.tixiancaidui
				self.inviteCount = res.result.data.user.inviteCount
				self.inviteFen = res.result.data.user.inviteFen
				var jindu = 0;
				for (var i = 0; i < self.jianglilist.length; i++) {
					if (self.jianglilist[i]['status'] == 3 || self.jianglilist[i]['status'] == 1) {
						jindu += 1
					}
				}
				self.percent = jindu * 25
			}).catch((err) => {
				console.log("err: ", err);
				uni.hideLoading()
				uni.showToast({
					title: "获取失败，请稍后重试!",
					icon: 'none',
				});
			})
		},
		showtoast(title) {
			var self = this
			self.toasttitle = title
			self.showtoastdialog = true
			setTimeout(function() {
				self.showtoastdialog = false
			}, 3000)
		},
		gettaskinfo(uid, token) {
			var self = this
			if (self.coin == 0) {
				uni.showLoading({
					title: '处理中...'
				})
			}
			uniCloud.callFunction({
				name: 'hallctrl',
				data: {
					action: "hall/gettaskinfo",
					data: {
						uid: uid,
						uniIdToken: token,
						type: self.checkindex
					}
				}
			}).then((res) => {
				console.log("res:----gettaskinfo ", res);
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
				self.coin = res.result.data.user.coin
				self.money = res.result.data.user.fen
				self.firstjiangli = res.result.data.user.firstjiangli

				if (res.result.data.user.leijicaiduigequ > 5) {
					self.leijicaiduigequ = 5
				} else {
					self.leijicaiduigequ = res.result.data.user.leijicaiduigequ
				}
				self.needsong = res.result.data.needsong
				self.tixiancaidui = res.result.data.user.tixiancaidui
				if (self.checkindex == 0) {
					self.list = res.result.data.list
				} else {
					self.list1 = res.result.data.list
					self.jianglilist = res.result.data.jianglilist
					var jindu = 0;
					for (var i = 0; i < self.jianglilist.length; i++) {
						if (self.jianglilist[i]['status'] == 3 || self.jianglilist[i]['status'] == 1) {
							jindu += 1
						}
					}
					self.percent = jindu * 25
				}
				self.videofanbei = res.result.data.videofanbei
				self.needvido = res.result.data.needvido
				self.todayseevideo = res.result.data.todayseevideo
			}).catch((err) => {
				uni.hideLoading()
				uni.showToast({
					title: "获取失败，请稍后重试!",
					icon: 'none',
				});
			})
		},
		closepopup() {
			this.$refs.popup.close()
		},
		lingqujiangli(item, index) {
			var self = this
			// self.$refs.popup.open()
			uni.showLoading({
				title: '处理中...'
			})
			uniCloud.callFunction({
				name: 'hallctrl',
				data: {
					action: "hall/taskjiangli",
					data: {
						uid: self.uid,
						uniIdToken: self.token,
						id: item._id
					}
				}
			}).then((res) => {
				uni.hideLoading()
				console.log('res-----------', res)
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
				self.coin = res.result.data.user.coin
				self.money = res.result.data.user.fen
				self.tixiancaidui = res.result.data.user.tixiancaidui
				if (self.checkindex == 0) {
					self.list[index]['status'] = 2
				} else {
					self.list1[index]['status'] = 2
				}
				if (res.result.data.type == 'coin') {
					self.taskinfo.type = '金币'
				} else {
					self.taskinfo.type = '元'
				}
				self.taskinfo.coin = res.result.data.coin
				self.$refs.popup.open()
			}).catch((err) => {
				console.log("err: ", err);
				uni.hideLoading()
				uni.showToast({
					title: "领取失败，请稍后重试!",
					icon: 'none',
				});
			})
		},
		showAd(type) {
			// 0 其他任务taskjiangli 1看视频任务video
			uni.showLoading({
				title: '加载中...'
			})
			this.urlCallback.extra = type
			console.log("this.urlCallback: ", this.urlCallback);
			this.type = type
			this.$nextTick(() => {
				this.$refs.rewardedVideoRen.show()
			})

			uniCloud.callFunction({
				name: 'hallctrl',
				data: {
					action: "hall/getvideocount",
					data: {
						uid: this.uid,
						uniIdToken: this.token,
					}
				}
			}).then((res) => {
				uni.hideLoading()
				console.log("getvideocount---- ", res);
				this.$refs.popup.close()
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
			}).catch((err) => {
				console.log("err: ", err);
				uni.hideLoading()
			})
		},
		onadRewardedLoad() {
			console.log('激励视频广告数据加载成功');
		},
		onadRewardedClose(e) {
			console.log("onadclose: ", e);
			const detail = e.detail
			// 用户点击了【关闭广告】按钮
			if (detail && detail.isEnded) {
				// 正常播放结束
				// 这里应该联网给予用户激励。且这段代码应该做安全保护，详见下文中的“安全注意”
				console.log("onadclose " + detail.isEnded);
				this.getadvideocallback()
			} else {
				// 播放中途退出
				console.log("onadclose " + detail.isEnded);
			}
		},
		getadvideocallback() {
			uni.showLoading({
				title: '处理中...'
			})
			uniCloud.callFunction({
				name: 'hallctrl',
				data: {
					action: "hall/getadvideocallback",
					data: {
						uid: this.uid,
						uniIdToken: this.token
					}
				}
			}).then((res) => {
				uni.hideLoading()
				console.log("res:------getadvideocallback ", res);
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

				this.coin = res.result.data.user.coin
				this.money = res.result.data.user.fen
				if (this.type == 'video') {
					var nowtime = Math.floor(Date.now() / 1000)
					try {
						uni.setStorageSync('videotime', nowtime);
					} catch (e) {
						// error
					}
					this.todayseevideo = res.result.data.todayseevideo
					this.lastvideotime = nowtime
					this.videobutton = this.gettime(120)
				} else {
					if (res.result.data.beishu && res.result.data.increasecoins) {
						var title = '恭喜获得' + res.result.data.beishu + '倍奖励，' + res.result.data.increasecoins
						if (res.result.data.jianglitype == 'coin') {
							title = title + '金币'
						} else {
							title = title + '元'
						}
						uni.showToast({
							title: title,
							icon: 'none',
						});
					}
				}
			}).catch((err) => {
				console.log("err: ", err);
				uni.hideLoading()
			})
		},
		adLoad(e) {
			console.log("adLoad", e);
		},
		adError(e) {
			console.log("adError", e);
		}

	}
}
