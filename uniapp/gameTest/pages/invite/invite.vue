<template>
	<view style="background-color: #FFFDE8;display: flex;justify-content: center;flex-direction: column;">
		<view class="bgimg"></view>
		<view :style="{'width':'100%','height':height}" class="liuhai"></view>
		<view class="appbar" :style="{'top':height}">
			<view class="lefticon" @click="goback"></view>
			<span>我的邀请码</span>
		</view>
		<view :style="{'width':'100%','height':height}"></view>
		<view style="width: 100%;height: 110rpx;"></view>
		<view class="inviteBox code">
			<text class="inviteCode">{{inviteCode}}</text>
			<view @click="copyCode" class="copyCode">复制</view>
		</view>
		<view class="inviteBox count">
			<view class="inviteItem mr">
				<text class="inviteCount">{{inviteCount}}</text>
				<text class="inviteCountTip">已邀请好友</text>
			</view>
			<view class="inviteItem">
				<text class="inviteCount">{{inviteFen/1000}}</text>
				<text class="inviteCountTip">已获得奖励(元)</text>
			</view>
		</view>
		<view v-if="shangji" class="inviteBox sjuser">
			<text class="ruleTitle">我的邀请人</text>
			<view class="sjuserInfoBox">
				<image class="sjuserAvatar" :src="sjuser.avatar" mode="widthFix"></image>
				<view class="sjuserIncome">{{sjuser.nickname}} 邀请了<text class="sjuserCount">{{sjuser.inviteCount}}人</text>，累计收益<text class="sjuserCount">{{sjuser.inviteFen/1000}}元</text></view>
			</view>
		</view>
		<view class="inviteBtn" @click="invite">邀请好友</view>
		<view class="inviteRuleBox">
			<text class="ruleTitle">邀请奖励规则</text>
			<text class="ruleText">1.有效好友：用户登录并实名认证成功</text>
			<text class="ruleText">2.邀请有效好友越多，每天坐享收益越多</text>
			<text class="ruleText">3.如发现作弊，外挂等违规手段获取奖励，平台有权判定获得奖励无效</text>
		</view>
	</view>
</template>
<script>
	const db = uniCloud.database();
	import UniShare from 'uni_modules/uni-share/js_sdk/uni-share.js';
	const uniShare = new UniShare();
	export default {
		data() {
			return {
				height: 0,
				uid: null,
				inviteCount: 0,
				inviteFen: 0.00,
				inviteCode: "",
				shangji:"",
				sjuser: {
					"nickname": "哄哄",
					"avatar": "https://thirdwx.qlogo.cn/mmopen/vi_32/Q3auHgzwzM755nTpictEBzpiaSMSuXlhSqF1UrWrktEGMo79gjP4pKMIyod4rcW5JnLXJRPHWpUicPNaCy3RhUXJA/132",
					"inviteCount": 1,
					"inviteFen": 0,
				},
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
			};
		},
		onLoad(option) {
			uni.getSystemInfo({
				success: (sysinfo) => {
					// console.log('返回值为系统信息', sysinfo)s
					this.height = sysinfo.statusBarHeight + 'px'
				}
			});
			uni.getStorage({
				key: 'uni_id_token',
				success: (res) => {
					this.token = res.data
				}
			});
			uni.getStorage({
				key: 'uid',
				success: (res) => {
					// console.log(res.data);
					this.uid = res.data
					this.getuserinfo()
					this.getshangji()
				}
			});
		},
		onShow() {
			this.getdownload()
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
			goback() {
				uni.navigateBack();
			},
			copyCode() {
				uni.setClipboardData({
					data: this.inviteCode,
					success: function() {
						console.log('success');
					}
				});
			},
			getdownload(){
				uni.showLoading()
				uniCloud.callFunction({
					name: 'hallctrl',
					data: {
						action: "hall/getconfig",
						data: {
							"typeId":"download"
						}
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
			invite() {
				uniShare.show({
					content: { //https://m3w.cn/yjcg公共的分享参数配置  类型（type）、链接（herf）、标题（title）、summary（描述）、imageUrl（缩略图）
						type: 0,
						href: 'https://' + this.downloadInfo.domainname + '/#/?code=' + "uniInvitationCode:" + this.inviteCode,
						title: this.downloadInfo.appname,
						summary: this.downloadInfo.slogan,
						imageUrl: this.downloadInfo.logo +
							'?x-oss-process=image/resize,m_fill,h_100,w_100' //压缩图片解决，在ios端分享图过大导致的图片失效问题
					},
					menus: [{
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
					console.log(result, "getuserinfo-----------")
					this.inviteCount = result.data.user.inviteCount || 0
					this.inviteFen = result.data.user.inviteFen || 0
					this.inviteCode = result.data.user.inviteCode
					this.shangji = result.data.user.shangji
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
			getshangji() {
				var self = this
				uni.showLoading({
					title: '处理中...'
				})
				uniCloud.callFunction({
					name: 'hallctrl',
					data: {
						action: "hall/getshangji",
						data: {
							uid: self.uid ? self.uid : uni.getStorageSync('uid'),
							uniIdToken: self.token ? self.token : uni.getStorageSync('uni_id_token')
						}
					}
				}).then((res) => {
					uni.hideLoading()
					console.log(res,"shangji---------------info")
					if (res.result.code && res.result.code != 0) {
						uni.showToast({
							title: res.result.message || res.result.errmsg,
							icon: 'none',
						});
						return
					}
					self.sjuser = res.result.data.user
				}).catch((err) => {
					uni.hideLoading()
				})
			}
		}
	};
</script>
<style>
	* {
		font-family: 'font-test' !important;
	}

	.bgimg {
		position: fixed;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		z-index: -3;
		background-color: #fffde8;
	}

	.liuhai {
		position: fixed;
		left: 0;
		top: 0;
		z-index: 999;
		background-color: #5f7ff5;
	}

	.appbar {
		width: 100%;
		height: 90rpx;
		position: fixed;
		left: 0;
		background-color: #5f7ff5;
		line-height: 90rpx;
		text-align: center;
		font-size: 35rpx;
		color: #ffffff;
		z-index: 999;
	}

	.appbar .lefticon {
		width: 57rpx;
		height: 58rpx;
		background-image: url(../../static/imags/set/fh.png);
		background-size: cover;
		position: absolute;
		top: 0;
		bottom: 0;
		left: 30rpx;
		margin: auto;
	}

	.inviteBox {
		width: 700rpx;
		border-radius: 10px;
		margin: 0 auto;
		background-color: #d7e1ff;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.code {
		height: 150px;
		margin-bottom: 20rpx;
		flex-direction: column;
	}

	.inviteCode {
		font-size: 60rpx;
		font-weight: bold;
	}

	.copyCode {
		width: 60px;
		height: 30px;
		line-height: 30px;
		color: #FFFFFF;
		text-align: center;
		margin-top: 15px;
		border-radius: 20px;
		background-color: #5f7ff5;
	}

	.count {
		height: 120px;
		flex-direction: row;
		border-top: #EEEEEE solid 1px;
	}

	.inviteItem {
		width: 360rpx;
		display: flex;
		align-items: center;
		flex-direction: column;
	}

	.mr {
		border-right: #EEEEEE solid 1px;
	}

	.inviteCount {
		font-size: 60rpx;
		font-weight: bold;
	}

	.inviteCountTip {
		font-size: 26rpx;
		color: #999;
	}

	.inviteRuleBox {
		margin: 40rpx 30rpx;
		display: flex;
		flex-direction: column;
	}
	.sjuser{
		height: 120px;
		padding:20rpx;
		flex-direction: column;
		margin-top: 5px;
	}
	.sjuserInfoBox{
		width:100%;
		display: flex;
		align-items: center;
		flex-direction: row;
	}
	.sjuserAvatar{
		width:50px;
		height:50px;
		border-radius: 100px;
	}
	.sjuserIncome{
		font-size:32rpx;
		margin-left: 20px;
		color: #666;
	}
	.sjuserCount{
		color: #5f7ff5;
		font-weight: 600;
	}
	.ruleTitle {
		font-size: 36rpx;
		font-weight: bold;
		margin-bottom: 15rpx;
	}

	.ruleText {
		font-size: 30rpx;
		color: #666;
		line-height: 30px;
	}

	.inviteBtn {
		width: 350rpx;
		height: 50px;
		line-height: 48px;
		text-align: center;
		border-radius: 30px;
		background-color: #d7e1ff;
		margin: 0 auto;
		margin-top: 50px;
		font-size: 35rpx;
		font-weight: 600;
		border: 2px solid #435ba2;
	}
</style>
