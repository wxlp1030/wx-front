<template>
	<view>
		<view :style="{'width':'100%','height':height}" class="liuhai"></view>
		<view class="appbar" :style="{'top':height}">
			<view class="lefticon" @tap="goset"></view>
			<span>听万歌 领万元</span>
		</view>
		<view :style="{'width':'100%','height':height}"></view>
		<view style="width: 100%;height: 110rpx;"></view>
		<!-- 账户信息 -->
		<view class="zhanghu">
			<view style="width: 100%;height: 10rpx;"></view>
			<view class="zhanghubiaoti">
				<view class="title">现金账户（元）</view>
				<view class="title" style="text-align: right;">金币账户</view>
			</view>
			<view style="width: 100%;height: 34rpx;"></view>
			<view class="coinbox">
				<view class="coin">{{ user.fen }}元</view>
				<view class="coin" style="text-align: right;border-left: 2px solid #4D69BF;">{{ user.coin }}金币</view>
			</view>
			<view style="width: 100%;height: 22rpx;"></view>
			<view class="duihuanbox">
				<view class="wenzi">{{ duihuan }}金币=1元</view>
				<view class="button" @tap="coin2fen">
					<image src="../../static/imags/set/dhxj.png"></image>
				</view>
			</view>
		</view>
		<view style="width: 100%;height: 18rpx;"></view>
		
		<!-- 抽奖 -->
		<view class="caige-box">
			<image class="caige-img" src="../../static/imags/set/bg1.png" mode="widthFix"></image>
			<view class="caige-content">
				<view class="caige-title">
					距离下次抽奖还差
					<span style="color: #FFBF00;">{{needsongNum}}</span>
					个题(剩余可抽奖次数{{ user.tixiannum }}次)
				</view>
				<view class="caige-info">
					<view class="caige-process">
						<view class="jindutiaobox">
							<view class="jindutiao"
								:style="{ width: needsongProcess + 'rpx' }">
							</view>
						</view>
						<view class="caige-tips">猜歌即可抽奖！机会多多、金额不限！</view>
					</view>
					<image @click="openrole" class="qiaodao-img" src="../../static/imags/set/ljtx.png"></image>
				</view>
			</view>
		</view>
		
		<!-- 签到 -->
		<view class="caige-box">
			<image class="caige-img" src="../../static/imags/set/bg1.png" mode="widthFix"></image>
			<view class="caige-content">
				<view class="caige-title">签到</view>
				<view class="caige-info" style="margin-top: 15rpx;">
					<view class="yiqiandao">您已连续签到{{user.lianxuqiandao}}天</view>
					<image @click="qiandao" class="qiaodao-img" src="../../static/imags/index/qiandao.png"></image>
				</view>
			</view>
		</view>
		<view style="width: 100%;height: 18rpx;"></view>
		
		<!-- 常规提现 -->
		<view class="tixianbox">
			<view class="tixianbiaoti">
				<view class="title">常规提现</view>
				<view class="img" @tap="tixianjilu">
					<image src="../../static/imags/set/txjl.png" style="width: 105rpx;height: 33rpx;"></image>
				</view>
			</view>
			<view style="width: 100%;height: 23rpx;"></view>
			<view class="moneybox">
				<view @tap="checkindex = index" :class="checkindex == index ? 'checkactive item' : 'item'"
					v-for="(item, index) in list" :key="index">
					{{ item.coin }}元
					<view class="biaoqian" v-if="item.index<3">{{item.index==1?'新手':'幸运'}}</view>
				</view>
			</view>
			<view class="tixian">
				<image src="../../static/imags/set/tx.png" mode="" @click="tixian"></image>
			</view>
		</view>
		<view style="width: 100%;height: 23rpx;"></view>
		
		<view class="shuoming">
			<view>0.3元提现说明：</view>
         <view>新手专享，猜对5首歌曲即可领取</view>
			<view>[当前已经猜对歌曲数]：{{ user.leijicaiduigequ }}首</view>
			<view>[当前连续猜对歌曲数]：{{ user.leijiliandui }}首</view>
			<view>[当前累计观看视频数]：{{ user.leijikanshiping }}首</view>
		</view>
		<view style="width: 100%;height: 23rpx;"></view>

		<!-- 提现规则 -->
		<view class="shuoming">
			<view v-for="(item,index) in list" :key="index">
				<view v-if="item.index==1">{{item.coin}}元提现说明：新手专享，猜对5首歌曲即可领取</view>
				<view v-if="item.index==2">幸运{{item.coin}}元提现说明：每天观看{{item.video}}次激励视频<span v-if="item.liandui>0">连对{{item.liandui}}首歌</span>即可领取</view>
				<view v-if="item.index>2 && item.index<10">
					{{item.coin}}元提现说明：<span v-if="item.liandui>0">连对{{item.liandui}}首歌且</span>
					<span v-if="item.video>0">累计观看视频{{item.video}}次且</span>
					<span v-if="item.qiandao>0">连续签到{{item.qiandao}}天且</span>
					<span v-if="item.leijicaidui>0">累计猜对{{item.leijicaidui}}首歌且</span>
					仅可提现1次。
				</view>
				<view v-if="item.index>9">
					{{item.coin}}元提现说明：<span v-if="item.liandui>0">连对{{item.liandui}}首歌且</span>
					<span v-if="item.video>0">累计观看视频{{item.video}}次且</span>
					<span v-if="item.qiandao>0">连续签到{{item.qiandao}}天且</span>
					<span v-if="item.leijicaidui>0">累计猜对{{item.leijicaidui}}首歌</span>
				</view>
			</view>
		</view>
		<view style="width: 100%;height: 23rpx;"></view>
		
		<!-- 注意事项 -->
		<view class="shuoming1">
			注意事项：
			<br />
			1.由于微信提现支付需要实名制，非实名制用户账号无法支持提现，请务必将提现的微信号进行实名认证
			<br />
			2.单笔提现金额最低0.3元，最高2000元
			<br />
			3.提现申请通常1-3个工作日内审核到账，请您耐心等待，体谅一下客服妹子哦
			<br />
			4.0.3元提现是新人专享福利，每个账号可享受一次
			<br />
			5.如发现作弊，外挂等违规手段获取奖励，平台有权判定获得奖励无效
			<br />
		</view>
		<view style="width: 100%;height: 23rpx;"></view>
		
		<!-- 抽奖弹框 -->
		<uni-popup ref="role">
			<almost-lottery
				:lotterySize="lotteryConfig.lotterySize" 
				:strFontSize="lotteryConfig.fontsize"
				:canvasMarginOutside="lotteryConfig.canvasMarginOutside"
				:strMarginOutside="lotteryConfig.marginOutside"
				:lotteryBg="lotteryConfig.lotteryBg"
				:ringCount="2" 
				:duration="1" 
				:prizeList="prizeList" 
				:prizeIndex="prizeIndex"
				@reset-index="prizeIndex = -1" 
				@draw-start="handleDrawStart" 
				@draw-end="handleDrawEnd"
				@finish="handleDrawFinish"
				v-if="prizeList.length" />
			<view style="width: 100%;height: 100rpx;margin:15px 0;" @tap="closerole"></view>
			<view class="roletitle">每次现金抽奖机会，均可随机抽取一次现金红包</view> 
		</uni-popup>
		<view class="toast" v-if="showtoastdialog">{{ toasttitle }}</view>
		
		<!-- 获得现金奖励 -->
		<uni-popup ref="huodetixian">
			<view class="huodemoney">
				<image class="huodemoney-img" src="../../static/imags/index/kuang.png"></image>
				<image class="huodemoney-close" src="../../static/imags/index/x.png" 
					@tap="closehuodetixian(1)"></image>
				<view class="huodemoney-content">
					<view class="title">
						获得现金奖励
						<span>{{rolecoin}}</span>
						元
					</view>
					<view class="title1" style="font-size: 30rpx;">当前可抽奖次数为<span
							style="color: #F95300;">{{user.tixiannum}}次</span> <span v-if="user.tixiannum<=0">获得更多抽奖机会</span>
					</view>
					<view class="huodemoney-button" @tap="closehuodetixian(2)">
						<image class="huodemoney-button-img" src="../../static/imags/index/anc.png"></image>
						<view class="huodemoney-button-text">{{user.tixiannum>0?'继续抽奖':'继续猜歌'}}</view>
					</view>
				</view>
			</view>
		</uni-popup>
		
	</view>
</template>

<script>
	export {
		default
	}
	from './mine.js';
</script>

<style>
	@import url('./mine.css');
</style>
