<template>
	<view>
		<view style="height: 250rpx;"></view>
		<image src="../../static/imags/login/logo.png" class="logoimg" mode="widthFix"></image>
		<view class="buttonbox">
			<!-- #ifdef MP-WEIXIN -->
			<view class="wchatlogin" @click="loginByWeixinMini"></view>
			<!-- #endif -->
			
			<view class="applelogin" v-if="providerList.includes('apple')" @tap="loginByApple"></view>
			
			<!-- #ifdef APP-PLUS -->
			<view class="wchatlogin" :class="platform == 'android'? 'wchatlogin':'ios-wchatlogin'"
				@tap="loginByWeixin"></view>
			<!-- #endif -->
			
			<view class="phonelogin" :class="platform == 'android'? 'phonelogin':'ios-phonelogin'"
				v-if="providerList.includes('univerify')" @tap="loginByUniverify"></view>
		</view>
		<!-- #ifdef APP-PLUS -->
		<uni-agreements @setAgree="agree = $event"></uni-agreements>
		<!-- #endif -->
	</view>
</template>

<script>
	export { default } from "./login.js";
</script>

<style>
	@import url("./login.css");
</style>
