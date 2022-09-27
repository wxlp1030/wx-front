import UniShare from '/uni_modules/uni-share/js_sdk/uni-share.js';
const uniShare = new UniShare();
export default {
	data() {
		return {
			type:'',
			urlCallback: {
				userId: '',
				extra: ''
			},
			adpidInfo: {
				fuhuoRewardAdpid: 0,
				hongbaoBannerAdpid: 0,
				interstitialAdpid: 0
			},
			failImg: '../../static/imags/index/jblk.png',
			winImg: '../../static/imags/index/zj.png',
			canlingqu: 10,
			innerAudioContext: null,
			allsong: 0,
			audioPlay: true,
			hongbaodialog: false,
			hongbao: 0,
			hblist: [],
			videodialog: false,
			caigejieguo: false,
			timer: null,
			time: 3,
			uid: '',
			token: "",
			user: {
				"coin": 0,
				"index": 1,
				"fen": 0,
				"leijicaiduigequ": 0,
				"tixiancaidui": 0,
				"liandui": 0,
				"leijiliandui": 0
			},
			songinfo: {
				url: "",
				daan1: "",
				daan2: "",
				daan3: "",
				_id: ""
			},
			nowtime: 0,
			timer1: null,
			hongbaocoin: 0,
			height: 0,
			videofanbei: {
				"min": 1,
				"max": 5
			},
			lianduijiangli: {
				"song": 0,
				"fen": 0
			},
			inviteCode:"",
			downloadInfo:{
				"logo": {
					"extname": "png",
					"name": "logo.png",
					"url": ""
				},
				"appname": "",
				"slogan": "",
				"company": "",
				"domainname": ""
			}
		}
	},
	beforeDestroy() {
		this.innerAudioContext.destroy();
	},
	onLoad() {
		this._interstitialTimer = null;
		this.getadpid()
		uni.getStorage({
			key: 'uni_id_token',
			success: (res) => {
				console.log("res:---token ", res);
				if (!res.data) {
					uni.reLaunch({
						url: '/pages/login/login',
						complete: (e) => {
							console.log("e: ", e);
						}
					});
				} else {
					this.token = res.data
				}
			}
		});
	
		uni.getStorage({
			key: 'uid',
			success: (res) => {
				this.uid = res.data
				this.loadsong()
			}
		});
	
		this.nowtime = Math.floor(Date.now() / 1000)
		if (!this.timer1) {
			this.timer1 = setInterval(() => {
				if (this.hblist.length > 0) {
					this.changehongbao1(this.hblist)
				}
			}, 1000)
		}
		// #ifdef APP-PLUS
		this.getdownload()
		// #endif
	},
	onShow() {
		uni.getStorage({
			key: 'uni_id_token',
			success: (res) => {
				this.token = res.data
			},
			fail: (err) => {
				uni.reLaunch({
					url: '/pages/login/login',
				});
			}
		});
		uni.getStorage({
			key: 'uid',
			success: (res) => {
				this.uid = res.data
				this.loadsong(true)
			}
		});
		this.startInterstitialTimer();
	},
	onReady() {
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
	onHide() {
		if (this.innerAudioContext != null) {
			this.innerAudioContext.destroy()
		}
		this.stopInterstitialTimer();
	},
	onBackPress({from}) {
		if(from=='backbutton'){
			this.$nextTick(function(){
				uniShare.hide()
			})
			return uniShare.isShow;
		}
	},
	methods: {
		getadpid(){
			uniCloud.callFunction({
				name: 'hallctrl',
				data: {
					action: "hall/getadpid",
					data: {}
				}
			}).then((res) => {
				console.log("getadpid----------",res.result.getAdpidInfo)
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
				console.log("err: ",err);
			})
		},
		startInterstitialTimer() {
			this.stopInterstitialTimer();
			this._interstitialTimer = setInterval(() => {
				this.$refs.interstitial.show()
			}, 1000 * 60 * 2);
		},
		stopInterstitialTimer() {
			if (this._interstitialTimer) {
				clearInterval(this._interstitialTimer);
			}
		},
		getdownload(){
			uni.showLoading()
			uniCloud.callFunction({
				name: 'hallctrl',
				data: {
					action: "hall/getconfig",
					data: {"typeId":"download"}
				}
			}).then((res) => {
				uni.hideLoading()
				console.log("download----------",res.result.getConfigInfo)
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
				this.downloadInfo = res.result.getConfigInfo
			}).catch((err) => {
				uni.hideLoading()
				console.log("err: ",err);
			})
		},
		toshare() {
			uniShare.show({
				content: { //https://m3w.cn/yjcg公共的分享参数配置  类型（type）、链接（herf）、标题（title）、summary（描述）、imageUrl（缩略图）
					type: 0,
					href: 'https://'+ this.downloadInfo.domainname+'/#/?code='+"uniInvitationCode:"+this.inviteCode,
					title: this.downloadInfo.appname,
					summary:this.downloadInfo.slogan,
					imageUrl: this.downloadInfo.logo.url +
						'?x-oss-process=image/resize,m_fill,h_100,w_100' //压缩图片解决，在ios端分享图过大导致的图片失效问题
				},
				menus: [
					{
						"img": "/static/app-plus/sharemenu/wechatfriend.png",
						"text": "微信好友",
						"share": { //当前项的分享参数配置。可覆盖公共的配置如下：分享到微信小程序，配置了type=5
							"provider": "weixin",
							"scene": "WXSceneSession"
						}
					},
					{
						"img": "/static/app-plus/sharemenu/wechatmoments.png",
						"text": "微信朋友圈",
						"share": {
							"provider": "weixin",
							"scene": "WXSceneTimeline"
						}
					},
					{
						"img": "/static/app-plus/sharemenu/weibo.png",
						"text": "微博",
						"share": {
							"provider": "sinaweibo"
						}
					},
					{
						"img": "/static/app-plus/sharemenu/qq.png",
						"text": "QQ",
						"share": {
							"provider": "qq"
						}
					},
					{
						"img": "/static/app-plus/sharemenu/copyurl.png",
						"text": "复制",
						"share": "copyurl"
					},
					{
						"img": "/static/app-plus/sharemenu/more.png",
						"text": "更多",
						"share": "shareSystem"
					}
				],
				cancelText: "取消分享",
			}, e => { //callback
				console.log(e);
			})
		},
		// #ifdef APP-PLUS
		setClipboardText(text) {
			try {
				console.log('复制剪贴板')
				var os = plus.os.name;
				text = text || '';
				if ('iOS' == os) {
					// var UIPasteboard  = plus.ios.importClass('UIPasteboard');  
					// var pasteboard = UIPasteboard.generalPasteboard();  
					// pasteboard.setValueforPasteboardType(text, 'public.utf8-plain-text');
					var pasteboard = plus.ios.invoke('UIPasteboard', 'generalPasteboard');
					plus.ios.invoke(pasteboard, 'setValue:forPasteboardType:', text, 'public.utf8-plain-text');
				} else {
					var main = plus.android.runtimeMainActivity();
					// var Context = plus.android.importClass('android.content.Context');
					// var clip = main.getSystemService(Context.CLIPBOARD_SERVICE);
					var clip = main.getSystemService('clipboard');
					plus.android.invoke(clip, 'setText', text);
				}
				uni.showToast({
					title: "复制成功",
					icon: 'none',
				});
			} catch (e) {
				uni.showToast({
					title: "复制失败",
					icon: 'none',
				});
				console.error('error @setClipboardText!!');
			}
		},
		getClipboardText() {
			try {
				var os = plus.os.name;
				if ('iOS' == os) {
					var pasteboard = plus.ios.invoke('UIPasteboard', 'generalPasteboard');
					return plus.ios.invoke(pasteboard, 'valueForPasteboardType:', 'public.utf8-plain-text')
				} else {
					var main = plus.android.runtimeMainActivity();
					var clip = main.getSystemService('clipboard');
					return plus.android.invoke(clip, 'getText');
				}
			} catch (e) {
				console.error('error @getClipboardText!!');
			}
		},
		// #endif
		// 音频播放暂停
		audioPlayFn(play) {
			let {innerAudioContext} = this
			if (play) {
				innerAudioContext.play()
			} else {
				innerAudioContext.pause()
			}
		},
		gomine() {
			uni.reLaunch({
				url: '/pages/mine/mine',
			});
		},
		contextInit() {
			let that = this;
			let innerAudioContext = uni.createInnerAudioContext();
			innerAudioContext.autoplay = true;
			innerAudioContext.src = that.songinfo['url'];
			innerAudioContext.loop = true;
			that.innerAudioContext = innerAudioContext
		},
		closehuodetixian() {
			var self = this
			self.$refs.huodetixian.close()
			self.loadsong()
		},
		closepopup() {
			var self = this
			self.$refs.popup.close()
			self.loadsong()
		},
		closecaigepopup() {
			var self = this
			if (self.time <= 0) {
				self.$refs.caigepopup.close()
				self.loadsong()
			}
		},
		opencaigepopup() {
			var self = this
			self.time = 3
			if (self.timer != null) {
				clearInterval(self.timer)
			}
			self.$refs.caigepopup.open()
			self.timer = setInterval(function() {
				self.time--
				if (self.time < 0) {
					clearInterval(self.timer)
				}
			}, 1000)
		},
		loadsong(show) {
			var self = this
			if (!show) {
				uni.showLoading({
					title: '处理中...'
				})
			}
			uniCloud.callFunction({
				name: 'hallctrl',
				data: {
					action: "hall/getsong",
					data: {
						uid: self.uid,
						uniIdToken: self.token
					}
				}
			}).then((res) => {
				console.log("getsong: ----------",res);
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
				self.videofanbei = res.result.data.videofanbei
				self.lianduijiangli = res.result.data.lianduijiangli
				self.user = res.result.data.user
				self.allsong = res.result.data.needsong
				self.songinfo = res.result.data.song
				if (self.innerAudioContext != null) {
					self.innerAudioContext.destroy()
				}
				self.contextInit();
				// console.log('红包', res.result.data.hongbao)
				self.changehongbao(res.result.data.hongbao)
				self.inviteCode = res.result.data.user.inviteCode
			}).catch((err) => {
				console.log("err: ", err);
				uni.hideLoading()
				uni.showToast({
					title: "获取失败，请稍后重试!",
					icon: 'none',
				});
			})
		},

		dati(index) {
			var self = this
			self.innerAudioContext.pause()
			uni.showLoading({
				title: '处理中...'
			})
			uniCloud.callFunction({
				name: 'hallctrl',
				data: {
					action: "hall/dati",
					data: {
						uid: self.uid,
						uniIdToken: self.token,
						daan: index,
						id: self.songinfo._id
					}
				}
			}).then((res) => {
				uni.hideLoading()
				console.log('获取歌曲-----', res)
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
				self.user = res.result.data.user
				self.caigejieguo = res.result.data.result == 'error' ? false : true
				if (res.result.data.tixianjihui) {
					self.$refs.huodetixian.open()
				} else {
					self.hongbao = res.result.data.hongbao
					if (res.result.data.hongbaotype == "liandui") {
						self.$refs.popup.open()
					} else {
						self.opencaigepopup()
					}
				}
			}).catch((err) => {
				console.log("err: ", err);
				uni.hideLoading()
				self.innerAudioContext.play();
				uni.showToast({
					title: "答题失败，请重试!",
					icon: 'none',
				});
			})
		},
		onadload() {
			console.log('插屏广告数据加载成功');
		},
		onadclose(e) {
			console.log("onadclose-----", e);
		},
		onaderror(e) {
			console.log("广告加载失败:--- ", e);
		},
		onadRewardedLoad() {
			console.log('激励视频广告数据加载成功');
		},
		onadRewardedClose(e) {
			const detail = e.detail
			// 用户点击了【关闭广告】按钮
			if (detail && detail.isEnded) {
				// 正常播放结束
				// 这里应该联网给予用户激励。且这段代码应该做安全保护，详见下文中的“安全注意”
				console.log("onadclose---正常播放结束 " + detail.isEnded);
				//1猜对caiduijiangli 奖励3-5倍  2 猜错复活fuhuo  3 红包奖励hongbaofanbei 3-5倍
				this.getadvideocallback()
				
			} else {
				console.log("onadclose--播放中途退出 " + detail.isEnded);
				if (this.type == 'caiduijiangli' || this.type == 'hongbaofanbei') {
					this.$refs.caigepopup.close()
				} else {
					this.$refs.hongbaopopup.close()
				}
			}
		},
		showAd(type) {
			uni.showLoading({
				title: '加载中...'
			})
			this.urlCallback.extra = type
			this.type = type
			console.log("this.urlCallback:---- ",this.urlCallback );
			this.$nextTick(()=>{
				this.$refs.rewardedVideo.show()
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
				console.log("getvideocount--------: ", res);
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
			}).catch((err) => {
				uni.hideLoading()
				console.log("err: ", err);
			})
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
				console.log("res:------getadvideocallback ",res);
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
				this.user = res.result.data.user
				this.loadsong()
				if (this.type == 'caiduijiangli' || this.type == 'fuhuo') {
					this.$refs.caigepopup.close()
				} else {
					this.$refs.hongbaopopup.close()
				}
				if ((this.type == 'caiduijiangli' || this.type == 'hongbaofanbei') && res.result.data.beishu && res.result.data.increasecoins) {
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
			}).catch((err) => {
				console.log("err: ", err);
				uni.hideLoading()
				if (this.type == 'caiduijiangli' || this.type == 'fuhuo') {
					this.$refs.caigepopup.close()
				} else {
					this.$refs.hongbaopopup.close()
				}
			})
		},
		howplay() {
			var self = this
			uni.navigateTo({
				url: '/pages/play/play',
			});
		},
		closehongbaopopup() {
			var self = this
			self.$refs.hongbaopopup.close()
		},
		changehongbao(data) {
			var self = this
			var count = 0
			var list = []
			var now = Math.floor(Date.now() / 1000);
			for (var i = 1; i <= 10; i++) {
				var item = data['red' + i]
				item['index'] = i
				var time = item.lingqu + (item.time) * 60 - now
				item.chai = self.gettime(time)
				list.push(item)
				if (item.lingqu + item['time'] * 60 < now || item.lingqu == 0) {
					count += 1
				}
			}
			self.canlingqu = count
			self.hblist = list
		},
		changehongbao1() {
			var self = this
			var count = 0
			var list = []
			var now = Math.floor(Date.now() / 1000);
			for (var i = 1; i <= 10; i++) {
				var item = self.hblist[i - 1]

				var time = item.lingqu + (item.time) * 60 - now
				item.chai = self.gettime(time)
				list.push(item)
				if (item.lingqu + item['time'] * 60 < now || item.lingqu == 0) {
					count += 1
				}
			}
			self.canlingqu = count
			self.hblist = list
		},
		chaihongbao() {
			var self = this
			self.time = 3
			if (self.timer != null) {
				clearInterval(self.timer)
			}
			self.$refs.hongbaopopup.open()
			self.timer = setInterval(function() {
				self.time--
				if (self.time < 0) {
					clearInterval(self.timer)
				}
			}, 1000)
		},
		linghongbao(item) {
			var self = this
			uni.showLoading({
				title: '处理中...'
			})
			uniCloud.callFunction({
				name: 'hallctrl',
				data: {
					action: "hall/linghongbao",
					data: {
						uid: self.uid,
						uniIdToken: self.token,
						index: item.index,
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
				self.user = res.result.data.user
				self.hongbaocoin = res.result.data.coin
				self.changehongbao(res.result.data.hongbao)
				self.chaihongbao()
			}).catch((err) => {
				console.log("err: ", err);
				uni.hideLoading()
				uni.showToast({
					title: "领取失败，请稍后重试!",
					icon: 'none',
				});
			})
		},
		gettime(value) {
			if (!value) return '';
			if (value < 0) {
				return '拆开'
			}
			let hh = parseInt(value / 3600); //小时
			let shh = value - hh * 3600;
			let ii = parseInt(shh / 60);
			let ss = shh - ii * 60;
			return (hh < 10 ? '0' + hh : hh) + ':' + (ii < 10 ? '0' + ii : ii) + ':' + (ss < 10 ? '0' + ss : ss);
		},
		onload(e) {
			console.log("onload"+ e);
		},
		onclose(e) {
			console.log("onclose: " + e.detail);
		},
		onerror(e) {
			console.log("onerror: " + e.detail.errCode + " message:: " + e.detail.errMsg);
		}
	}
}
