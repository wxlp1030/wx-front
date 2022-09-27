<template>
	<view>
		<view :style="{'width':'100%','height':height}" class="liuhai"></view>
		<view class="appbar" :style="{'top':height}">
			<view class="lefticon" @tap="goback"></view>
			<span>设置</span>
		</view>
		<view :style="{'width':'100%','height':height}"></view>

		<view style="width: 100%;height: 110rpx;"></view>
		<view class="box">
			<view class="itembox">
				<view class="left">头像</view>
				<view class="right">
					<image :src="user.avatar" class="avatar" mode="aspectFill" @tap="changeavatar"></image>
				</view>
			</view>
			<image src="../../static/imags/set/xx.png" class="xian"></image>
			<view class="itembox" @tap="gopage('nickname')">
				<view class="left">昵称</view>
				<view class="right">
					<image src="../../static/imags/set/sj.png" class="jiantou"></image>
				</view>
				<view class="right">
					{{user.nickname.length>6?user.nickname.substring(0,6)+'...':user.nickname}}
				</view>
			</view>
			<!-- #ifdef APP-PLUS -->
			<image src="../../static/imags/set/xx.png" class="xian"></image>
			<view class="itembox" @tap="gopage('zhifubao')">
				<view class="left">支付宝</view>
				<view class="right">
					<image src="../../static/imags/set/sj.png" class="jiantou"></image>
				</view>
				<view class="right">
					{{user.zhifubao==""?'未绑定':user.zhifubao}}
				</view>
			</view>
			<!-- #endif -->
			<image src="../../static/imags/set/xx.png" class="xian"></image>
			<view class="itembox">
				<view class="left">邀请码</view>
				<view class="right" @click="copyCode">
					<text>{{user.inviteCode}} </text>
					<text class="copyCode">复制</text>
				</view>
			</view>
			<!-- #ifdef APP-PLUS -->
			<image src="../../static/imags/set/xx.png" class="xian"></image>
			<view class="itembox" @tap="loginByWeixin" v-if="user.openid==''">
				<view class="left">绑定微信</view>
				<view class="right">
					<image src="../../static/imags/set/sj.png" class="jiantou"></image>
				</view>
			</view>
			<image src="../../static/imags/set/xx.png" class="xian" v-if="user.openid==''"></image>
			<view class="itembox" @tap="gopage('shiming')">
				<view class="left">实名认证</view>
				<view class="right">
					<image src="../../static/imags/set/sj.png" class="jiantou"></image>
				</view>
			</view>

			<image src="../../static/imags/set/xx.png" class="xian"></image>
			
			<view class="itembox" @tap="bingphone">
				<view class="left">绑定手机</view>
				<view class="right">
					<image src="../../static/imags/set/sj.png" class="jiantou"></image>
				</view>
				<view class="right" v-if="user.phone!=0">
					{{(user.phone+'').substr(0, 3)}}{{user.phone!=0?'****':''}}{{(user.phone+'').substr((user.phone+'').length - 4)}}
				</view>
			</view>
			<image src="../../static/imags/set/xx.png" class="xian"></image>
			
			
			<view class="itembox" @tap="checkVersion">
				<view class="left">检查更新</view>
				<view class="right">
					<image src="../../static/imags/set/sj.png" class="jiantou"></image>
				</view>
				<view class="right">
					{{version}}
				</view>
			</view>

			<image src="../../static/imags/set/xx.png" class="xian"></image>
			<view class="itembox" @tap="toFeedback">
				<view class="left">意见反馈</view>
				<view class="right">
					<image src="../../static/imags/set/sj.png" class="jiantou"></image>
				</view>
			</view>
			
			<image src="../../static/imags/set/xx.png" class="xian"></image>
			<view class="itembox" @tap="toMsg">
				<view class="left">我的反馈</view>
				<view class="right">
					<image src="../../static/imags/set/sj.png" class="jiantou"></image>
				</view>
			</view>
			
			<image src="../../static/imags/set/xx.png" class="xian"></image>
			<view class="itembox" @tap="gopage('xieyi')">
				<view class="left">用户协议</view>
				<view class="right">
					<image src="../../static/imags/set/sj.png" class="jiantou"></image>
				</view>
			</view>

			<image src="../../static/imags/set/xx.png" class="xian"></image>
			<view class="itembox" @tap="gopage('yinsi')">
				<view class="left">隐私条款</view>
				<view class="right">
					<image src="../../static/imags/set/sj.png" class="jiantou"></image>
				</view>
			</view>

			<image src="../../static/imags/set/xx.png" class="xian"></image>
			<view class="itembox" @tap="gopage('aboutus')">
				<view class="left">关于我们</view>
				<view class="right">
					<image src="../../static/imags/set/sj.png" class="jiantou"></image>
				</view>
			</view>
			
			<image src="../../static/imags/set/xx.png" class="xian"></image>
			<view class="itembox" @tap="gotoMarket">
				<view class="left">去评价</view>
				<view class="right">
					<image src="../../static/imags/set/sj.png" class="jiantou"></image>
				</view>
			</view>
			<image src="../../static/imags/set/xx.png" class="xian"></image>
			<view class="itembox" @tap="closeUserFn">
				<view class="left">注销账号</view>
				<view class="right">
					<image src="../../static/imags/set/sj.png" class="jiantou"></image>
				</view>
			</view>
			<!-- #endif -->
		</view>

		<view style="width: 100%;height: 65rpx;"></view>
		<view class="loginout" @tap="loginout"></view>
	</view>
</template>

<script>
	export {
		default
	}
	from "./set.js";
</script>

<style>
	@import url("./set.css");
</style>
