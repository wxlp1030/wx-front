<template>
	<view>
		<view :style="{'width':'100%','height':height}" class="liuhai"></view>
		<view class="appbar" :style="{'top':height}">
			<view class="lefticon" @tap="goback"></view>
			<span>关于我们</span>
		</view>
		<view :style="{'width':'100%','height':height}"></view>
		<view style="width: 100%;height: 110rpx;"></view>
		<view class="aboutbox">
			<view class="icon"></view>
			<view style="width: 100%;height: 18rpx;"></view>
			<view class="title">猜歌游戏</view>
			<view style="width: 100%;height: 110rpx;"></view>
			<view class="title" style="text-align: left;">{{count}}</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				height: 0,
				count: '欢迎使用猜歌游戏，为了更好的给用户提供服务，在用户使用猜歌游戏服务前，请用户仔细阅读用户服务协议。'
			}
		},
		onLoad() {
			var self = this
			uni.getSystemInfo({
				//成功获取的回调函数，返回值为系统信息
				success: (sysinfo) => {
					console.log('返回值为系统信息', sysinfo)
					self.height = sysinfo.statusBarHeight + 'px'
				},
				complete: () => {}
			});
		},
		methods: {
			goback() {
				uni.navigateBack()
			}
		}
	}
</script>

<style>
	page{
		background: radial-gradient(circle at 20px 20px,#AABEFA 5px,#B7C9FB 0); 
		background-size: 30px 30px;
	}
	.bgimg {
		position: fixed;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		z-index: -3;
	}

	.liuhai {
		background-image: url(../../static/imags/set/title.png);
		position: fixed;
		left: 0;
		top: 0;
		z-index: 999;
	}

	.appbar {
		width: 100%;
		height: 90rpx;
		position: fixed;
		left: 0;
		background-image: url(../../static/imags/set/title.png);
		line-height: 90rpx;
		text-align: center;
		font-size: 35rpx;
		color: #24325A;
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

	.aboutbox {
		width: 700rpx;
		height: auto;
		margin: 0 auto;
		background-color: #FFFDE8;
		border: 2px solid #222F56;
		border-radius: 20rpx;
		padding: 20rpx 0;
	}

	.aboutbox .icon {
		width: 130rpx;
		height: 130rpx;
		background-image: url(../../static/imags/set/tb.png);
		background-size: cover;
		margin: 20rpx auto;
	}

	.aboutbox .title {
		text-align: center;
		color: #4D69BF;
		font-size: 35rpx;
		font-weight: bold;
		line-height: 25px;
		padding: 0 20rpx;
	}
</style>
