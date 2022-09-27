<template>
	<view>
        <view :style="{'width':'100%','height':height}" class="liuhai"></view>
        <view class="appbar" :style="{'top':height}">
        	<view class="lefticon" @tap="goback"></view>
        	<span>修改昵称</span>
        </view>
        <view :style="{'width':'100%','height':height}"></view>
        <view style="width: 100%;height: 90rpx;"></view>
		<view class="phone">
			<view class="titile">昵称</view>
			<view class="inputbox">
				<input type="text" placeholder="请输入昵称" class="input" v-model="name" maxlength="6">
			</view>
		</view>
		<view style="width: 725rpx;height: 2rpx;background-color: #DDDDDD;margin: 0 auto;"></view>
		<view class="tijiao animate__animated" hover-class="animate__pulse" @tap="tijiao">确认修改</view>
	</view>
</template>

<script>
	export { default } from "./nickname.js";
</script>

<style>
	@import url("./nickname.css");
</style>
