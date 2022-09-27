<template>
	<view style="background-color: #FFFDE8;">
		<view class="bgimg"></view>
		<view :style="{'width':'100%','height':height}" class="liuhai"></view>
		<view class="appbar" :style="{'top':height}">
			<view class="lefticon" @tap="goback"></view>
			<span>邀请奖励记录</span>
		</view>
		<view :style="{'width':'100%','height':height}"></view>
		<view style="width: 100%;height: 110rpx;"></view>
		<view class="tip">邀请好友成为有效用户，才能获得奖励</view>
		<unicloud-db v-if="uid" ref="udb" v-slot:default="{ data, loading, error, options }" orderby="create_date desc"
			collection="rewardinfo" :where="`user_id=='${uid}'`">
		<view>
			<!-- field="user_id{nickname,avatar},create_date" userinfo  where="user_id == $cloudEnv_uid"-->
				<view class="rewardBox" v-for="(item, index) in data" :key="index" v-if="data.length != 0">
					<view class="rewardInfo">
						<image class="avatar" :src="item.xiajiavatar" mode="widthFix"></image>
						<view class="title">{{item.xiajinickname}}</view>
						<view class="title" style="text-align: right;color: #FF5600;width: 20%;">{{ item.fen/1000 }}元</view>
					</view>
					<view class="time">{{ item.create_date | timeStamp }}</view>
				</view>
				<view class="wuxiaoxi" v-if="data.length == 0">
					<text class="wenzi">暂无数据</text>
				</view>
			</view>
		</unicloud-db>
	</view>
</template>

<script>
	const db = uniCloud.database();
	export default {
		data() {
			return {
				height: 0,
				uid: null,
				page:0,
			};
		},
		onPullDownRefresh() {
			this.$refs.udb.loadData({
				clear: true
			}, () => {
				uni.stopPullDownRefresh()
			})
		},
		onReachBottom() {
			console.log('触底加载更多');
			this.$refs.udb.loadMore()
		},
		onLoad(option) {
			var self = this;
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
					// console.log(res.data);
					self.token = res.data
				}
			});
			uni.getStorage({
				key: 'uid',
				success: function(res) {
					// console.log(res.data);
					self.uid = res.data
				}
			});
		},
		filters: {
			timeStamp: function(value) {
				//具体到时分秒
				if (!value) return '';
				// value = value * 1000;
				var date = new Date(value); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
				var year = date.getFullYear();
				var month = ('0' + (date.getMonth() + 1)).slice(-2);
				var sdate = ('0' + date.getDate()).slice(-2);
				var hour = ('0' + date.getHours()).slice(-2);
				var minute = ('0' + date.getMinutes()).slice(-2);
				var second = ('0' + date.getSeconds()).slice(-2);
				// 拼接
				var result = year + '-' + month + '-' + sdate + ' ' + hour + ':' + minute + ':' + second;
				// 返回
				return result;
			}
		},
		methods: {
			goback() {
				uni.navigateBack();
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

	.tip {
		width: 720rpx;
		margin: 0 auto;
		margin-bottom: 20rpx;
		border-radius: 20rpx;
		line-height: 50px;
		text-align: center;
		background-color: #EEEEEE;
	}
	.avatar{
		width:60px;
		height:60px;
		border-radius:100px;
	}
	.rewardBox {
		display: flex;
		flex-direction: column;
		width: 720rpx;
		height: auto;
		background-color: #d7e1ff;
		border: 2px solid #435ba2;
		margin: 0 auto;
		padding:20rpx;
		border-radius: 20rpx;
		margin-bottom: 20rpx;
	}
	.rewardInfo{
		width: 100%;
		height: auto;
		display: flex;
		flex-direction: row;
		align-items: center;
	}
	.time{
		color: #4D69BF;
	}
	.title{
		flex: 1;
		margin:0 15rpx;
		line-height: 80rpx;
		font-weight: bold;
		font-size: 35rpx;
		color: #24325a;
	}

	.wuxiaoxi {
		display: flex;
		justify-content: center;
	}

	.wenzi {
		font-size: 30rpx;
		line-height: 60px;
		color: #666666;
	}
</style>
