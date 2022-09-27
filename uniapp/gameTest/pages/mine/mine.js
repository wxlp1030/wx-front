// #ifdef APP-PLUS
import AlmostLottery from '@/uni_modules/almost-lottery/components/almost-lottery/almost-lottery.vue'
import {
	clearCacheFile,
	clearStore
} from '@/uni_modules/almost-lottery/utils/almost-utils.js'
// #endif
export default {
	// #ifdef APP-PLUS
	components: {
		AlmostLottery
	},
	// #endif
	data() {
		return {
			iconType: 'clear',
			height: 0,
			rolecoin: 0,
			list: [],
			checkindex: 0,
			toasttitle: '',
			showtoastdialog: false,
			user1: {},
			user: {
				"coin": 0,
				"fen": 0,
				"leijicaiduigequ": 0,
				"tixiancaidui": 0,
				"tixiannum": 0,
				"leijitixian": 0,
				"lianxuqiandao": 0,
				"leijiliandui": 0,
				"leijikanshiping": 0
			},
			uid: "",
			token: "",
			needsong: 0,
			duihuan: 0,
			// 中奖下标
			prizeIndex: -1,
			prizeList: [],
			// 以下是转盘配置相关数据
			lotteryConfig: {
				// 抽奖转盘的整体尺寸，单位rpx
				lotterySize:600,
				//奖品名称的字号
				fontsize: 32,
				//奖品文字相对轮盘边缘的距离
				marginOutside:15,
				//Canvas边缘距离转盘边缘的距离
				canvasMarginOutside:100,
				lotteryBg:"/static/imags/set/lotteryBg.png"
			},
			// 是否正在抽奖中
			prizeing: false,
			// 中奖类目名称
			targetName: '',
			// 奖品是否设有库存
			onStock: true,
			// 是否由前端控制概率，默认不开启
			onFrontend: false,
			// 权重随机数的最大值
			weightTotal: 0,
			// 权重数组
			weightArr: []
		}
	},
	onLoad() {
		uni.getStorage({
			key: 'uni_id_token',
			success: (res)=> {
				this.token = res.data
			}
		});
		uni.getStorage({
			key: 'uid',
			success: (res)=> {
				this.uid = res.data
				this.loadmine()
			}
		});
	},
	onReady(){
		uni.getSystemInfo({
			//成功获取的回调函数，返回值为系统信息
			success: (sysinfo) => {
				var height = sysinfo.statusBarHeight
				if (height == 0) {
					height = 22
				}
				this.height = height + 'px'
			}
		});
	},
	onShow() {
		uni.getStorage({
			key: 'uni_id_token',
			success: (res)=> {
				this.token = res.data
			}
		});
		uni.getStorage({
			key: 'uid',
			success: (res)=> {
				this.uid = res.data
				this.loadmine()
			}
		});
	},
	computed:{
		needsongNum(){
			return this.user.tixiancaidui>this.needsong?1:(this.needsong - this.user.tixiancaidui )
		},
		needsongProcess(){
			return this.user.tixiancaidui>this.needsong?(1/this.needsong):(this.user.tixiancaidui / this.needsong) * 390
		}
	},
	methods: {
		showtoast(title) {
			var self = this
			self.toasttitle = title
			self.showtoastdialog = true
			setTimeout(function() {
				self.showtoastdialog = false
			}, 3000)
		},
		goset() {
			uni.navigateTo({
				url: '/pages/set/set',
			});
		},
		tixianjilu() {
			uni.navigateTo({
				url: '/pages/tixian/tixian',
			});
		},
		tixian() {
			var self = this
			uni.showLoading({
				title: '处理中...'
			})
			uniCloud.callFunction({
				name: 'hallctrl',
				data: {
					action: "hall/withdraw",
					data: {
						item: self.list[self.checkindex],
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
				console.log(res)
				uni.showToast({
					title: "提现成功，请等待审核",
					icon: 'none',
				});
				self.user = res.result.data.user
			}).catch((err) => {
				uni.hideLoading()
				uni.showToast({
					title: "提现失败，请稍后重试!",
					icon: 'none',
				});
				console.error(err)
			})
		},
		loadmine() {
			var self = this
			if (self.user.coin == 0) {
				uni.showLoading({
					title: '处理中...'
				})
			}
			uniCloud.callFunction({
				name: 'hallctrl',
				data: {
					action: "hall/loadmine",
					data: {
						uid: self.uid,
						uniIdToken: self.token
					}
				}
			}).then((res) => {
				uni.hideLoading()
				console.log("res:----- ",res);
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
				self.needsong = res.result.data.needsong
				self.duihuan = res.result.data.duihuan
				self.list = res.result.data.tixianlist
				// if (self.user.isfirstwithdraw == 0) {
				//     self.list = [300, 500, 1000, 2000]
				// }
			}).catch((err) => {
				uni.hideLoading()
			})
		},
		closehuodetixian(type) {
			var self = this
			self.$refs.huodetixian.close()
			if (type == 2) {
				if (self.user.tixiannum <= 0) {
					uni.reLaunch({
						url: '/pages/index/index',
					});
				}
			}
		},
		openrole() {
			var self = this
			uni.showLoading({
				title: '处理中...'
			})
			uniCloud.callFunction({
				name: 'hallctrl',
				data: {
					action: "hall/getrole",
					data: {
						uid: self.uid,
						uniIdToken: self.token
					}
				}
			}).then((res) => {
				console.log("res:------- ",res);
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

				self.user1 = res.result.data.user
				var roles = res.result.data.role
				self.prizeList = []
				for (var i = 1; i <= 8; i++) {
					var item = {'prizeName':'现金'+roles['role' + (i)]+'元','prizeId':i}
					self.prizeList.push(item)
				}
				console.log("已获取到奖品列表数据 ",self.prizeList);
				self.$refs.role.open()
			}).catch((err) => {
				uni.hideLoading()
				uni.showToast({
					title: "获取失败，请稍后重试!",
					icon: 'none',
				});
				console.error(err)
			})
		},
		// 抽奖转盘绘制完成
		handleDrawFinish(res) {
			// 抽奖转盘准备就绪后，这里处理你的逻辑
			console.log('抽奖转盘绘制完成', res)
			uni.showToast({
				title: res.msg,
				mask: true,
				icon: 'none'
			})
		},
		handleDrawStart() {
			var self = this
			if (self.user.tixiannum <= 0) {
				uni.showToast({
					title: "次数不足，请先猜歌",
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
					action: "hall/role",
					data: {
						uid: self.uid,
						uniIdToken: self.token
					}
				}
			}).then((res) => {
				console.log('res---role',res)
				
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

				self.user1 = res.result.data.user
				var index = res.result.data.index
				self.rolecoin = res.result.data.fen
				self.prizeIndex = index
				
			}).catch((err) => {
				uni.hideLoading()
				uni.showToast({
					title: "操作失败，请稍后重试!",
					icon: 'none',
				});
				console.error(err)
			})

		},
		handleDrawEnd() {
			var self = this
			self.user = self.user1
			self.$refs.huodetixian.open()
		},
		closerole() {
			var self = this
			self.$refs.role.close()
		},
		coin2fen() {
			var self = this
			uni.showLoading({
				title: '处理中...'
			})
			uniCloud.callFunction({
				name: 'hallctrl',
				data: {
					action: "hall/duihuan",
					data: {
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
				uni.showToast({
					title: "成功兑换1元现金!",
					icon: 'none',
				});
				self.user = res.result.data.user
			}).catch((err) => {
				uni.hideLoading()
				uni.showToast({
					title: "操作失败，请稍后重试!",
					icon: 'none',
				});
				console.error(err)
			})
		},
		qiandao() {
			var self = this
			uni.showLoading({
				title: '处理中...'
			})
			uniCloud.callFunction({
				name: 'hallctrl',
				data: {
					action: "hall/signin",
					data: {
						uid: self.uid,
						uniIdToken: self.token
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
				uni.showToast({
					title: "签到成功!",
					icon: 'none',
				});
			}).catch((err) => {
				uni.hideLoading()
				uni.showToast({
					title: "签到失败，请稍后重试!",
					icon: 'none',
				});
				console.log(err)
			})
		}
	}
}
