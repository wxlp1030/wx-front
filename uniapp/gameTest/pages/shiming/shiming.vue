<template>
	<view>
        <view :style="{'width':'100%','height':height}" class="liuhai"></view>
        <view class="appbar" :style="{'top':height}">
        	<view class="lefticon" @tap="goback"></view>
        	<span>实名认证</span>
        </view>
        <view :style="{'width':'100%','height':height}"></view>
        
        <view style="width: 100%;height: 90rpx;"></view>
		<view class="phone">
			<view class="titile">姓名</view>
			<view class="inputbox">
				<input type="text" placeholder="请输入真实姓名" class="input" v-model="name">
			</view>
		</view>
		<view style="width: 725rpx;height: 2rpx;background-color: #DDDDDD;float: right;"></view>
		
		<view class="phone">
			<view class="titile">身份证号</view>
			<view class="inputbox">
				<input type="text" placeholder="请输入身份证号码" class="input" v-model="idcard">
			</view>
		</view>
		<view style="width: 725rpx;height: 2rpx;background-color: #DDDDDD;float: right;"></view>
		<view class="tijiao animate__animated" hover-class="animate__pulse" @tap="tijiao">提交</view>
	</view>
</template>

<script>
	export { default } from "./shiming.js";
</script>

<style>
	@import url("./shiming.css");
</style>
