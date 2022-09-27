<template>
	<view>
		<view :style="{'width':'100%','height':height}"></view>
		<view class="toptitle">
			<view class="iconview" @tap="gomine">
				<image src="../../static/imags/index/jb.png" class="jbimg"></image>
				<text class="box">{{user.coin}}</text>
			</view>

			<view class="iconview iconviewhb" @tap="gomine">
				<image src="../../static/imags/index/hb.png" class="jbimg1"></image>
				<view class="box">{{user.fen}}元</view>
			</view>
			<!-- #ifdef APP-PLUS -->
			<view class="iconright" @tap="toshare" style="margin-left: 10rpx;">
				<image class="iconright-img" src="../../static/imags/index/unishare.png"></image>
			</view>

			<view class="iconright" @tap="howplay">
				<image class="iconright-img" src="../../static/imags/index/zmw.png"></image>
			</view>
			<view class="iconright" style="margin-right:10rpx;" @tap="hongbaodialog=!hongbaodialog">
				<image class="iconright-img" src="../../static/imags/index/chb.png"></image>
				<view class="hongbaonum">{{canlingqu}}</view>
			</view>
			<!-- #endif -->

			<!-- #ifdef MP-WEIXIN -->
			<view class="iconright" style="margin-right:110px;" @tap="hongbaodialog=!hongbaodialog">
				<image class="iconright-img" src="../../static/imags/index/chb.png"></image>
				<view class="hongbaonum">{{canlingqu}}</view>
			</view>
			<!-- #endif -->
		</view>
		<view :class="hongbaodialog?'centerbox centerbox1':'centerbox'">
			<view class="top" v-if="!hongbaodialog">
				<view class="wenzi">
					第
					<span class="wenzi-text">{{user.index}}</span>
					首
				</view>
				<view class="wenzi" style="float: right;">
					猜对歌曲数:
					<span>{{user.leijicaiduigequ}}</span>
				</view>
			</view>
			<view class="videoimg" v-if="!hongbaodialog">
				<player @change="audioPlayFn" />
			</view>
			<view style="width: 100%;height: 386rpx;" v-if="!hongbaodialog"></view>
			<view class="hongbaobox" v-if="hongbaodialog">
				<view class="hongbao" v-for="(item,index) in hblist" :key="index" @tap="linghongbao(item)">
					<span>{{item.chai}}</span>
				</view>
			</view>
			<view class="caiduige">
				<view class="wenzi">
					继续猜对<span
						class="wenzi-text">{{user.tixiancaidui>allsong?1:allsong-user.tixiancaidui}}</span>首歌，可再次<span>现金抽奖</span>哦
				</view>
				<image class="caiduige-img" src="../../static/imags/index/hb.png"></image>
			</view>

			<view class="caiduige">
				<view class="progress">
					<view class="progressbar"
						:style="{width: (user.tixiancaidui>allsong?(1/allsong*504):(user.tixiancaidui/allsong*504)) + 'rpx'}">
					</view>
				</view>
				<view class="jindu">
					<span class="jindutiao">{{user.tixiancaidui}}/</span>{{allsong}}
				</view>
			</view>
		</view>

		<view style="width: 100%;height: 9rpx;" v-if="!hongbaodialog"></view>
		<view class="miaoshu">
			<image class="miaoshu-img" src="../../static/imags/index/caige.png"></image>
		</view>

		<!-- 猜歌选项 -->
		<view class="cai-button-box">
			<view class="cai-button" @tap="dati(1)">
				<view class="cai-but">{{songinfo.daan1}}
				</view>
			</view>
		</view>
		<view class="cai-button-box">
			<view class="cai-button" @tap="dati(2)">
				<view class="cai-but">{{songinfo.daan2}}
				</view>
			</view>
		</view>
		<view class="cai-button-box">
			<view class="cai-button" @tap="dati(3)">
				<view class="cai-but">{{songinfo.daan3}}
				</view>
			</view>
		</view>

		<!-- 获得现金奖励 -->
		<uni-popup ref="popup" :maskClick="false">
			<view class="huodemoney">
				<image class="huodemoney-img" src="../../static/imags/index/kuang.png"></image>
				<image class="huodemoney-close" src="../../static/imags/index/x.png" @tap="closepopup"></image>
				<view class="huodemoney-content">
					<view class="title" style="font-size: 30rpx;">
						当前已连对<span> {{user.leijiliandui}} </span>首，获得连对奖励<span>{{hongbao}}</span>元</view>
					<view class="title1">距离下次现金抽奖，<br>还差
						<span style="color: #F95300;">{{user.tixiancaidui>allsong?1:allsong-user.tixiancaidui}}</span>首歌曲
					</view>
					<view class="huodemoney-button" @tap="closepopup">
						<image class="huodemoney-button-img" src="../../static/imags/index/anc.png"></image>
						<view class="huodemoney-button-text">继续猜歌</view>
					</view>
				</view>
			</view>
		</uni-popup>

		<!-- 获得抽奖 -->
		<uni-popup ref="huodetixian" :maskClick="false">
			<view class="huodemoney">
				<image class="huodemoney-img" src="../../static/imags/index/kuang.png"></image>
				<image class="huodemoney-close" src="../../static/imags/index/x.png" @tap="closehuodetixian"></image>
				<view class="huodemoney-content">
					<view class="title">恭喜你获得一次现金抽奖机会</view>
					<view class="title1" style="font-size: 30rpx;">当前账户余额:<span
							style="color: #F95300;">{{user.fen}}</span>元
					</view>
					<view class="huodemoney-button" @tap="gomine">
						<image class="huodemoney-button-img" src="../../static/imags/index/anc.png"></image>
						<view class="huodemoney-button-text">立即抽奖</view>
					</view>
				</view>
			</view>
		</uni-popup>

		<!-- 猜歌答案 -->
		<uni-popup ref="caigepopup" :maskClick="false">
			<!-- 猜错 -->
			<view class="caigepopup" v-if="!caigejieguo">
				<view style="width: 100%;height: 200rpx;"></view>
				<image v-if="failImg" class="img" :src="failImg"></image>
				<view class="title1 title">
					{{'继续猜对'+(user.tixiancaidui>allsong?1:allsong-user.tixiancaidui)+'首歌曲，可以现金抽奖哦'}}
				</view>
				<view class="title1 title">看视频复活连对</view>
				<view style="width: 100%;height: 100rpx;"></view>
				<image src="../../static/imags/index/btn2.png" class="buttonimg" @click="showAd('fuhuo')"></image>
				<view style="width: 100%;height: 30rpx;"></view>
				<view class="tishi" @tap="closecaigepopup">{{time>0?time+'s':'下一首，继续赚钱'}}</view>
			</view>
			<!-- 猜对 -->
			<view class="caigepopup" v-if="caigejieguo">
				<view style="width: 100%;height: 200rpx;"></view>
				<view class="liandui">
					<image class="liandui-img" src="../../static/imags/index/liandui.png"></image>
					<view class="num">x{{user.leijiliandui}}</view>
				</view>
				<view class="title">{{'+'+hongbao}}<span style="font-size: 31rpx;">金币</span></view>
				<view style="width: 100%;height: 40rpx;"></view>
				<view class="title1 title">
					{{'继续猜对'+(lianduijiangli.song-user.liandui)+'首歌曲，最高可得'+lianduijiangli.fen+'元现金奖励'}}
				</view>
				<view style="width: 100%;height: 100rpx;"></view>
				<view class="buttonimg buttonimg1" @click="showAd('caiduijiangli')">
					看视频获得{{videofanbei.min}}-{{videofanbei.max}}倍奖励
				</view>
				<view style="width: 100%;height: 30rpx;"></view>
				<view class="tishi" @tap="closecaigepopup">{{time>0?time+'s':'下一首，继续赚钱'}}</view>
			</view>
		</uni-popup>

		<!-- 未接 -->
		<view class="videodialog" v-if="videodialog">
			<image src="../../static/imags/index/hbs.png" class="hbs"></image>
			<view class="title">看视频辛苦啦</view>
			<view class="title1">获得翻倍奖励1.73元</view>
		</view>

		<!-- 拆红包 -->
		<uni-popup ref="hongbaopopup" :maskClick="false">
			<view class="hongbaopopup">
				<view style="width: 100%;height: 200rpx;"></view>
				<image v-if="winImg" class="img" :src="winImg"></image>
				<view class="coin">+{{hongbaocoin}}金币</view>
				<view style="width: 100%;height: 40rpx;"></view>
				<view class="buttonimg buttonimg1" @click="showAd('hongbaofanbei')">
					看视频获得{{videofanbei.min}}-{{videofanbei.max}}倍奖励
				</view>
				<view style="width: 100%;height: 30rpx;"></view>
				<view class="close-box">
					<view v-if="time>0" class="tishi">{{time}}</view>
					<image v-else src="../../static/imags/index/gb.png" class="close" @click="closehongbaopopup">
					</image>
				</view>
				<view style="width: 100%;height: 10rpx;"></view>
				<view class="bannervideo">
					<ad v-if="adpidInfo.hongbaoBannerAdpid" :adpid="adpidInfo.hongbaoBannerAdpid" @load="onload"
						@close="onclose" @error="onerror"></ad>
				</view>
			</view>
		</uni-popup>

		<!-- 激励视频 -->
		<ad-rewarded-video ref="rewardedVideo" v-if="adpidInfo.fuhuoRewardAdpid" :adpid="adpidInfo.fuhuoRewardAdpid"
			:url-callback="urlCallback" :disabled="true" :preload="false" :loadnext="false"
			v-slot:default="{loading, error}" @close="onadRewardedClose" @load="onadRewardedLoad">
		</ad-rewarded-video>


		<!-- 插屏 -->
		<ad-interstitial ref="interstitial" v-if="adpidInfo.interstitialAdpid" :adpid="adpidInfo.interstitialAdpid"
			:loadnext="true" v-slot:default="{loading, error}" @load="onadload" @close="onadclose" @error="onaderror">
		</ad-interstitial>

	</view>
</template>

<script>
	export {
		default
	}
	from "./index.js";
</script>

<style>
	@import url("./index.css");
</style>
