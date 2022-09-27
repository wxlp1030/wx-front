<template>
	<view style="background-color: #FFFDE8;">
		<view class="bgimg"></view>
        <view :style="{'width':'100%','height':height}" class="liuhai"></view>
        <view class="appbar" :style="{'top':height}">
        	<view class="lefticon" @tap="goback"></view>
        	<span>{{title}}</span>
        </view>
        <view :style="{'width':'100%','height':height}"></view>
		<view style="width: 100%;height: 110rpx;"></view>
		
		<view class="wenzi">{{count}}</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				height:0,
				title:"",
				count:"欢迎使用猜歌游戏，为了更好的给用户提供服务，在用户使用猜歌游戏服务前，请用户仔细阅读用户服务协议。"
			}
		},
		onLoad(option) {
			var self = this
            uni.getSystemInfo({
            	//成功获取的回调函数，返回值为系统信息
            	success: (sysinfo) => {
            		console.log('返回值为系统信息')
            		console.log(sysinfo)
                    self.height = sysinfo.statusBarHeight + 'px'
            	},
            	complete: () => {}
            });
			if(option.type == 'xieyi'){
				self.title = "用户协议"
			}else{
				self.title = "隐私政策"
			}
		},
		methods: {
			goback(){
				uni.navigateBack()
			},
		}
	}
</script>

<style>
.bgimg{
	position: fixed;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
	z-index: -3;
	background-color: #FFFDE8;
}
.liuhai{
	position: fixed;
	left: 0;
	top: 0;
	z-index: 999;
	background-color: #5F7FF5;
}
.appbar{
	width: 100%;
	height: 90rpx;
	position: fixed;
	left: 0;
	background-color: #5F7FF5;
	line-height: 90rpx;
	text-align: center;
	font-size: 35rpx;
	color: #FFFFFF;
	z-index: 999;
}

.appbar .lefticon{
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
.wenzi{
	width: 700rpx;
	height: auto;
	line-height: 1.5em;
	margin: 0 auto;
}
</style>
