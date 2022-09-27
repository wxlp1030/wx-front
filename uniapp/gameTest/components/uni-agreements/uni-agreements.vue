<template>
	<view class="root">
		<checkbox-group @change="setAgree" class="checkbox-group">
			<checkbox  style="transform: scale(0.8);" />
			<text>同意</text>
		</checkbox-group>
		<view v-for="(agreement,index) in agreements" :key="index" class="agreement-box">
			<text class="agreement" @click="navigateTo(agreement)">{{agreement.title}}</text>
			<text class="hint" v-if="hasAnd(agreements,index)">和</text>
		</view>
	</view>
</template>

<script>
	export default {
		name: "uni-agreements",
		computed:{
			agreements(){
				return [
					{
						"title": "用户服务协议", //协议名称
						"url": "https://ask.dcloud.net.cn/protocol.html" //对应的网络链接
					},
					{
						"title": "隐私政策",
						"url": "https://ask.dcloud.net.cn/protocol.html"
					}
				]
			}
		},
		data() {
			return {
				isAgree:false,
				
			}
		},
		methods: {
			navigateTo({
				url,
				title
			}) {
				uni.navigateTo({
					url: '/pages/common/webview/webview?url=' + url + '&title=' + title,
					success: res => {},
					fail: () => {},
					complete: (e) => {
						console.log("e: ",e);
					}
				});
			},
			hasAnd(agreements,index){
				return agreements.length-1>index
			},
			setAgree(e){
				this.isAgree = !this.isAgree
				this.$emit('setAgree',this.isAgree)
			}
		}
	}
</script>

<style>
	* {
		display: flex;
	}

	.root {
		display: flex;
		width:750rpx;
		align-items: center;
		justify-content: center;
		flex-direction: row;
		font-size: 28rpx;
		color: #8a8f8b;
		position: absolute;
		bottom: 20px;
		left:0px;
	}
	.agreement-box,.checkbox-group{
		display: flex;
		align-items: center;
	}
	.agreement {
		color: #9f7fc0;
	}
	.hint{
		font-size: 28rpx;
		color: #8a8f8b;
	}
</style>
