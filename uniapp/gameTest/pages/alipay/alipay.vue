<template>
	<view>
		<view :style="{'width':'100%','height':height}" class="liuhai"></view>
		<view class="appbar" :style="{'top':height}">
			<view class="lefticon" @tap="goback"></view>
			<span>绑定支付宝</span>
		</view>
		<view :style="{'width':'100%','height':height}"></view>
		<view style="width: 100%;height: 90rpx;"></view>
		<view class="phone">
			<view class="titile">支付宝号</view>
			<view class="inputbox">
				<input type="text" placeholder="请输入支付宝号" class="input" v-model="zhifubao">
			</view>
		</view>
		<view style="width: 725rpx;height: 2rpx;background-color: #DDDDDD;float: right;"></view>
		<view class="tijiao animate__animated" hover-class="animate__pulse" @tap="tijiao">提交</view>
	</view>
</template>

<script>
	export { default } from "./alipay.js";
</script>

<style>
	@import url("./alipay.css");
</style>
