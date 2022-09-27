<template>
	<view class="player-box" @click="change">
		<view class="pointer-box">
			<image class="pointer-base" src="../../static/imags/player/dizuo.png" mode="aspectFill"></image>
			<view class="pointer-image" :class="{'active-infinite':play}">
				<image  :class="{'active-play':play}" src="../../static/imags/player/pointer.png" mode=""></image>
			</view>
		</view>
		<view v-if="play" class="coin-box">
			<gold-coin class="coin-box" delay="0.3"></gold-coin>
			<gold-coin class="coin-box" delay="0.8"></gold-coin>
			<gold-coin class="coin-box" delay="1.2"></gold-coin>
			<gold-coin class="coin-box" delay="1.5"></gold-coin>
		</view>
		<view class="backgroud" :class="{active:play}" ></view> 
	</view>
</template>

<script>
import goldCoin from './gold-coin.vue'
export default {
	components:{
		goldCoin
	},
	data() {
		return {
			play:true
		}
	},
	created() {},
	methods:{
		change(){
			this.play = !this.play
			this.$emit('change',this.play)
		}
	}
}
</script>

<style>
.player-box {
	width: 150px;
	height: 150px;
	position: relative;
	border-radius: 50%;
	box-shadow: 0px 3px 5px 0px rgba(227,172,159,1);
	background-color: #0F0D3C;
}
.pointer-box {
	position: absolute;
	left: -38px;
	top: -22px;
	z-index: 2;
	width: 51px;
	height: 51px;
}
.pointer-base {
	width: 100%;
	height: 100%;
}
.pointer-image {
	position: absolute;
	left: 15px;
	top: 26px;
	width: 60px;
	height: 120px;
	transform-origin: 10px 8px;
	transform:rotate(25deg);
	transition: all 0.6s;
}
.pointer-image image {
	position: absolute;
	left: 0;
	top: 0px;
	width: 60px;
	height: 120px;
	transform-origin: 10px 8px;
}
.active-play {
	animation: pointer 2.5s linear infinite;
}
.active-infinite {
	transform:rotate(-2deg);
}
.coin-box {
	position: absolute;
	left: 0;
	top: 0;
	right: 0;
	bottom: 0;
	margin: auto;
	z-index: 3;
}

.backgroud {
	z-index: 0;
	width: 100%;
	height: 100%;
	background-color: #333;
	border-radius: 50%;
	background: url(../../static/imags/player/suspend.png);
	background-size: 100%;
	background-repeat: no-repeat;
}
.active {
	background: url(../../static/imags/player/chassis.png);
	background-size: 100%;
	background-repeat: no-repeat;
	/* transform: rotate(-90deg); */
	animation: spin 6s linear infinite;
}
@keyframes spin {
	to {
		transform: rotate(1turn);
	}
}
@keyframes pointer{
	0%{
		transform:rotate(0deg);
	}
	
	10%{
		transform:rotate(1deg);
	}
	
	30%{
		transform:rotate(-1deg);
	}
	
	50%{
		transform:rotate(1deg);
	}
	
	70%{
		transform:rotate(0deg);
	}
	
	90%{
		transform:rotate(-2deg);
	}
	100%{
		transform:rotate(0deg);
	}
}
</style>
