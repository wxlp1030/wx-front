<template>
	<view class="coin-box" :style="{'animation-delay':delay+'s'}">
		<view class="coin" :style="{'animation-delay':time +'s'}">
			<view class="front"></view>
			<view class="backgroud backgroud-front"></view>
			<view class="back"></view>
		</view>
	</view>
</template>

<script>
export default {
	props:{
		delay:{
			type:String,
			default:'0'
		}
	},
	computed:{
		time(){
			return this.delay + Math.ceil(Math.random()*2);
		}
	},
	data() {
		return {}
	}
}
</script>

<style lang="scss">

.coin-box {
	height: 22px;
	width: 22px;
	-webkit-animation: ani 2s infinite;
	-webkit-animation-timing-function: linear;
	animation-delay:1s;
	opacity: 0;
	transform: translateY(0);
}
.coin-box .coin {
	height: 22px;
	width: 22px;
	position: absolute;
	-webkit-transform-style: preserve-3d;
	-webkit-transform-origin: 50%;
	-webkit-animation: spin 0.6s infinite;
	-webkit-animation-timing-function: linear;
}
.coin .front,
.coin .back, 
.backgroud {
	position: absolute;
	height: 22px;
	width: 22px;
	border-radius: 50%;
	background-size: cover;
	box-sizing: border-box;
}
.coin .front {
	-webkit-transform: translateZ(1px);
}
.coin .back {
	-webkit-transform: translateZ(-1px);
}

.backgroud {
	background-color: #f29830;
}
.backgroud.backgroud-front {
	-webkit-transform: translateZ(0px);
}

@-webkit-keyframes spin {
	from {
		-webkit-transform: rotateY(0deg);
	}
	to {
		-webkit-transform: rotateY(360deg);
	}
}
@-webkit-keyframes ani {
	0% {
		transform: translateY(0);
		opacity: 0;
	}
	20%{
		-webkit-transform: translateY(-75px) scale(1.2);
		opacity: 1;
	}
	25%{
		-webkit-transform: translateY(-75px) scale(1.2);
		opacity: 1;
	}
	32%{
		-webkit-transform: translateY(-75px) scale(1.3);
		opacity: 0;
	}
	100% {
		-webkit-transform: translateY(-75px) scale(1);
		opacity: 0;
	}
}

.coin .front ,.coin .back{
	background-image: url(../../static/imags/player/coin.png);
	background-position: 50%;
	background-size: 100%;
	background-repeat: no-repeat;
}

</style>
