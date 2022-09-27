<template>
	<view>
		<view :style="{'width':'100%','height':height}" class="liuhai"></view>
		<view class="appbar" :style="{'top':height}">
			<view class="lefticon" @tap="goback"></view>
			<span>玩法</span>
		</view>
		<view :style="{'width':'100%','height':height}"></view>
		<view style="width: 100%;height: 90rpx;"></view>
		<!-- <image src="../../static/imags/index/play.jpg" mode="widthFix" style="width: 750rpx;"></image> -->
		<view class="content-box">
			<view class="title">
				基础玩法
			</view>
			<view class="wanfa-box">
				<view class="wanfa-item" v-for="(item,index) in list" :key="index">
					<template v-if="index%2">
						<image class="show-img" :src="item.showImg" mode="widthFix"></image>
						<view class="info-box">
							<view class="sum-title">
								<text class="sum-title-text">{{item.num}}</text>
							</view>
							<view class="info-text">{{item.text}}</view>
						</view>
					</template>
					<template v-else>
						<view class="info-box">
							<view class="sum-title">
								<text class="sum-title-text">{{item.num}}</text>
							</view>
							<view class="info-text">{{item.text}}</view>
						</view>
						<image class="show-img" :src="item.showImg" mode="widthFix"></image>
					</template>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		onReady(){
			uni.getSystemInfo({
				//成功获取的回调函数，返回值为系统信息
				success: (sysinfo) => {
					this.height = sysinfo.statusBarHeight + 'px'
				}
			});
		},
		data() {
			return {
				height: 0,
				list: [{
						// "showImg": "../../static/imags/index/wanfa1.jpg",
						"showImg":"https://vkceyugu.cdn.bspapp.com/VKCEYUGU-c10b21d4-7d19-49e1-a189-59af5fd7f433/9bc78361-c050-4ef0-b25a-e85fc1803885.jpg",
						"num": "01.",
						"text": "听歌曲片段，选择正确的歌曲名称，即可获得基础奖励，猜对歌曲数越多，奖励越多"
					},
					{
						// "showImg": "../../static/imags/index/wanfa2.jpg",
						"showImg":"https://vkceyugu.cdn.bspapp.com/VKCEYUGU-c10b21d4-7d19-49e1-a189-59af5fd7f433/175f2c35-073f-4dd9-98e3-a85892c891ec.jpg",
						"num": "02.",
						"text": "点击翻倍按钮，更是可以获得3～ 5 倍的金额奖励，点击按钮次数越多， 翻倍金额越多"
					},
					{
						// "showImg": "../../static/imags/index/wanfa3.jpg",
						"showImg":"https://vkceyugu.cdn.bspapp.com/VKCEYUGU-c10b21d4-7d19-49e1-a189-59af5fd7f433/82140c59-bd13-4871-af0f-aaf75280626a.jpg",
						"num": "03.",
						"text": "猜对歌曲后，可以领取特殊关卡奖励，完成任务后可获得对应奖励，机会不可错过"
					},
					{
						// "showImg": "../../static/imags/index/wanfa4.jpg",
						"showImg":"https://vkceyugu.cdn.bspapp.com/VKCEYUGU-c10b21d4-7d19-49e1-a189-59af5fd7f433/f82c1950-5673-474a-b33d-537361011a39.jpg",
						"num": "04.",
						"text": "每日红包领取不断，每几分钟就会出现全新的红包，随时领取"
					}
				]
			}
		},
		methods: {
			goback() {
				uni.navigateBack()
			},
		}
	}
</script>

<style>
	page {
		background: radial-gradient(circle at 10px 10px,#F0EBCA 2px,#FFF9EB 0); 
		background-size: 30px 30px; //圆点间隔（自定义值） 第一值是左右间隔  第二个值是上下间隔
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
		background-color: rgb(102, 140, 255);
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
		background-color: rgb(102, 140, 255);
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

	.content-box {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.title {
		font-size: 50rpx;
		line-height: 80px;
		color: ##27365D;
		font-weight: bold;
		letter-spacing: 5rpx;
	}

	.wanfa-box {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 700rpx;
		padding: 20rpx;
		border-radius: 20rpx;
		background-color: #FFFFFF;
		margin:30rpx 0;
	}

	.wanfa-item {
		width: 650rpx;
		display: flex;
		flex-direction: row;
		margin:20rpx;
	}

	.show-img {
		width: 288px;
		height: auto;
	}

	.info-box {
		display: flex;
		flex-direction: column;
		margin: 0 20rpx;
		justify-content: center;
	}

	.sum-title {
		display: flex;
		width: 60px;
		height: 30px;
		border-radius: 20rpx;
		background-color: #FDFF2D;
	}

	.sum-title-text {
		width: 60px;
		text-align: center;
		font-size: 50rpx;
		line-height: 30px;
		color: #371E09;
		font-weight: 700;
	}

	.info-text {
		font-size: 30rpx;
		color: #473C32;
		margin-top: 20rpx;
		font-weight: 700;
	}
</style>
