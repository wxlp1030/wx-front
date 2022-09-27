<template>
	<view>
		<view class="top">
			<view :style="{'width':'100%','height':height}"></view>
			<view class="toptitle">
				<view class="iconview">
					<image src="../../static/imags/index/jb.png" class="jbimg"></image>
					<view class="box">{{coin}}</view>
				</view>

				<view class="iconview iconviewhb">
					<image src="../../static/imags/index/hb.png" class="jbimg1"></image>
					<view class="box">{{money}}元</view>
				</view>
			</view>
			
			<view class="tabbar">
				<view class="tabbartop">
					<view class="caige" v-if="checkindex==1" @tap="checktab(0)">
						<image class="tabbar-img" src="../../static/imags/renwu/cgrw1.png"></image>
					</view>
					<view class="meiri" v-if="checkindex==1" @tap="checktab(1)">
						<image class="tabbar-img" src="../../static/imags/renwu/mrrw1.png"></image>
					</view>
					<view class="caige1" v-if="checkindex==0" @tap="checktab(0)">
						<image class="tabbar-img" src="../../static/imags/renwu/cgrw.png" mode=""></image>
					</view>
					<view class="meiri1" v-if="checkindex==0" @tap="checktab(1)">
						<image class="tabbar-img" src="../../static/imags/renwu/mrrw.png"></image>
					</view>
				</view>
				<image src="../../static/imags/renwu/db1.png" mode="widthFix" class="tabimg"
					style="width: 700rpx;height: 29rpx;" v-if="checkindex==1"></image>
				<image src="../../static/imags/renwu/db.png" mode="widthFix" class="tabimg"
					style="width: 700rpx;height: 29rpx;" v-if="checkindex==0"></image>
			</view>
		</view>
		<view class="zhanwei"></view>
		<view style="height: 300rpx;width: 100%;"></view>
		
		
		
		
		<!-- 邀请 -->
		<!-- #ifdef APP-PLUS -->
		<view class="inviteBox" v-if="checkindex==0">
			<view class="inviteTitleBox">
				<text class="inviteTitle">邀请有奖</text>
				<image src="../../static/imags/renwu/lqjl.png" mode="widthFix" 
					class="inviteImg" @tap="toInvite">
				</image>
			</view>
			<view class="inviteCountBox">
				<view @click="toInviteFriends" class="inviteCountItem mr">
					<text class="inviteCount">{{inviteCount}}</text>
					<text class="inviteTip">邀请好友人数</text>
				</view>
				<view @click="toInviteReward" class="inviteCountItem">
					<text class="inviteCount">{{inviteFen/1000}}</text>
					<text class="inviteTip">已获得奖励(元)</text>
				</view>
			</view>
		</view>
		<!-- #endif -->
		<view style="height: 40rpx;width: 100%;" v-if="firstjiangli==0 && checkindex==0"></view>
		
		<!-- 提现 -->
		<view v-if="firstjiangli==0 && checkindex==0" class="caige-box">
			<image class="caige-img" src="../../static/imags/renwu/lsdk.png" mode="widthFix"></image>
			<view class="caige-content">
				<view class="caige-title">距离提现0.3元还差{{5-leijicaiduigequ}}个题</view>
				<view class="caige-info">
					<view class="caige-process">
						<view class="process" :style="{width: (leijicaiduigequ/5*390) + 'rpx'}"></view>
					</view>
					<image class="caige-btn-img" @click="gomine" src="../../static/imags/renwu/txan.png"></image>
					
				</view>
			</view>
		</view>
		
		<!-- 抽奖 -->
		<view v-if="checkindex==0" class="caige-box">
			<image class="caige-img" src="../../static/imags/renwu/lsdk.png" mode="widthFix"></image>
			<view class="caige-content">
				<view class="caige-title">距离下次现金抽奖还差{{choujiangProgress}}个题</view>
				<view class="caige-info">
					<view class="caige-process-box">
						<view class="caige-process">
							<view class="process"
								:style="{width: choujiangProgressWidth + 'rpx'}">
							</view>
						</view>
						<view class="caige-tips">猜歌即可抽奖！机会多多、金额不限！</view>
					</view>
					<image class="caige-btn-img" @click="gomine" src="../../static/imags/renwu/txan.png"></image>
				</view>
			</view>
		</view>
		
		<!-- 猜歌任务 -->
		<view v-if="checkindex==0">
			<view class="caigebox1" v-for="(item,index) in list" :key="index">
				<view class="topbox">
					<view class="title">{{item.title}}</view>
					<view class="tixianjihui" v-if="item.tixian==1">
						<image class="tixianjihui-img" src="../../static/imags/renwu/txjh.png" mode="widthFix"></image>
					</view>
					<view class="jindu">{{item.wancheng}}/{{item.num}}</view>
					<view class="jindubarbox">
						<view class="jindubar" :style="{width: ((item.wancheng/item.num)*125) + 'rpx'}"></view>
					</view>
				</view>
				<view class="bottombox">
					<view class="hongbao">
						<view class="count">{{item.count}}</view>
						<view :class="item.count==''?'image image1':'image'">
							<image class="img" src="../../static/imags/renwu/jb1.png" style="width: 47rpx;height: 47rpx;"
								v-if="item.rewardtype==1"></image>
							<image class="img" src="../../static/imags/index/hb.png" style="width: 41rpx;height: 47rpx;"
								v-if="item.rewardtype==0"></image>
							<view class="money">{{item.coin>10000?item.coin/10000+'万':item.coin}}</view>
						</view>
					</view>
					<view class="buttom">
						<image class="but-img" src="../../static/imags/renwu/lqjl.png" mode="" v-if="item.status==1"
							@tap="lingqujiangli(item,index)"></image>
						<image class="but-img" src="../../static/imags/renwu/wwc.png" mode="" v-if="item.status==0"></image>
						<image class="but-img" src="../../static/imags/renwu/ylq.png" mode="" v-if="item.status==2"></image>
					</view>
				</view>
			</view>
		</view>
		
		<!-- 签到 -->
		<view class="qiandaobox" v-if="checkindex==1">
			<view class="jinriqiandao">
				<image src="../../static/imags/renwu/jrqd.png" mode="widthFix" class="img1"></image>
				<image src="../../static/imags/renwu/lqjl.png" mode="widthFix" class="img2" @click="qiandaojiangli">
				</image>
			</view>
			<view class="qiandaojindubox">
				<view class="qiandaojindubar">
					<progress :percent="percent" backgroundColor="#4D69BF" activeColor="#F95300" border-radius="20" />
				</view>
				<view class="qiandaoitembox">
					
					<view class="item" v-for="(item,index) in jianglilist" :key="index">
						<view class="coin"
							:class="[item.status==1 || item.status==3 ? 'coin1':'', item.status==2? 'coinred':'']"
							v-if="index<4">+{{item.coin}}</view>
						<view class="quanqin" v-if="index>=4">全勤奖</view>
						<image src="../../static/imags/renwu/jb.png" v-if="item.status==1 || item.status==3 && index<4"
							class="jinbi"></image>
						<image src="../../static/imags/renwu/jb1.png" v-if="item.status==0 || item.status==2 && index<4"
							class="jinbi"></image>
						<image src="../../static/imags/renwu/lw.png" v-if="index==4" class="liwu"></image>
						<view class="status"
							:class="[item.status==1 || item.status==3?'status1':'',item.status==2?'coinred':'']">
							{{qiandaoStatusText(item)}}
						</view>
					</view>
				</view>
			</view>
		</view>
		
		<!-- 视频任务 -->
		<view class="caigebox1" v-if="checkindex==1">
			<view class="topbox">
				<view class="title">观看视频{{needvido}}次</view>
				<view class="jindu">{{seevideojindu}}/{{needvido}}</view>
				<view class="jindubarbox">
					<view class="jindubar" :style="{'width':seevideojinduwidth}"></view>
				</view>
			</view>
			<view class="bottombox">
				<view class="hongbao">
					<view class="hongbao">
						<view style="height: 30rpx;"></view>
						<view class="count">今日累计观看视频{{needvido}}次可获得幸运提现</view>
					</view>
				</view>
				<view class="buttom">
					<view class="videobutton" @click="showAd('video')" v-if="!videobutton">看视频</view>
					<view class="videobutton" v-if="videobutton">{{videobutton}}</view>
				</view>
			</view>
		</view>
		
		<!-- 每日任务 -->
		<view v-if="checkindex==1">
			<view class="caigebox1" v-for="(item,index) in list1" :key="index">
				<view class="topbox">
					<view class="title">{{item.title}}</view>
					<view class="tixianjihui" v-if="item.tixian==1">
						<image class="tixianjihui-img" src="../../static/imags/renwu/txjh.png" mode="widthFix"></image>
					</view>
					<view class="jindu">{{item.wancheng}}/{{item.num}}</view>
					<view class="jindubarbox">
						<view class="jindubar" :style="{width: ((item.wancheng/item.num)*125) + 'rpx'}"></view>
					</view>
				</view>
				<view class="bottombox">
					<view class="hongbao">
						<view class="hongbao">
							<view class="count">{{item.count}}</view>
							<view :class="item.count==''?'image image1':'image'">
								<image class="img" src="../../static/imags/renwu/jb1.png" style="width: 47rpx;height: 47rpx;"
									v-if="item.rewardtype==1"></image>
								<image class="img" src="../../static/imags/index/hb.png" style="width: 41rpx;height: 47rpx;"
									v-if="item.rewardtype==0"></image>
								<view class="money">{{item.coin>10000?item.coin/10000+'万':item.coin}}</view>
							</view>
						</view>
					</view>
					<view class="buttom">
						<image class="but-img" src="../../static/imags/renwu/lqjl.png" mode="" v-if="item.status==1"
							@tap="lingqujiangli(item,index)"></image>
						<image class="but-img" src="../../static/imags/renwu/wwc.png" mode="" v-if="item.status==0"></image>
						<image class="but-img" src="../../static/imags/renwu/ylq.png" mode="" v-if="item.status==2"></image>
					</view>
				</view>
			</view>
		</view>

		<view class="tishibox" v-if="checkindex==0">
			听万歌，领万元<br>
			猜对指定首歌曲后，解锁下一个红包奖励
		</view>
		
		<!-- #ifdef MP-WEIXIN -->
		<view style="width: 750rpx;justify-content: center;display: flex;">
			<!-- 格子广告 -->
			<ad v-if="adpidInfo.mpGridAdpid" :adpid="adpidInfo.mpGridAdpid" @load="adLoad" @error="adError"></ad>
		</view>
		<!-- #endif -->
		
		
		<!-- 获得奖励 -->
		<uni-popup ref="popup" :maskClick="false">
			<view class="huodemoney">
				<image class="huodemoney-img" src="../../static/imags/index/kuang.png"></image>
				<image class="huodemoney-close" src="../../static/imags/index/x.png" @click="closepopup"></image>
				<view style="width: 100%;height: 300rpx;"></view>
				<view class="huodemoney-content">
					<view class="title">获得奖励<span class="text">{{taskinfo.coin}}</span>{{taskinfo.type}}</view>
					<view style="width: 100%;height: 100rpx;"></view>
					<view class="huodemoney-button" @click="showAd('taskjiangli')">
						<image class="huodemoney-button-img" src="../../static/imags/index/anc.png"></image>
						<view class="huodemoney-button-text">看视频获得{{videofanbei.min}}-{{videofanbei.max}}倍奖励</view>
					</view>
				</view>
			</view>
		</uni-popup>
		<view class="toast" v-if="showtoastdialog">{{toasttitle}}</view>
		
		<!-- 激励视频 -->
		<ad-rewarded-video ref="rewardedVideoRen" v-if="adpidInfo.renwuRewardAdpid"
			:adpid="adpidInfo.renwuRewardAdpid"
			:url-callback="urlCallback" :disabled="true" :preload="false" :loadnext="false"
			v-slot:default="{loading, error}" @close="onadRewardedClose" @load="onadRewardedLoad"
		>
		</ad-rewarded-video>
		
		
		
	</view>
</template>

<script>
	export {
		default
	}
	from "./renwu.js";
</script>

<style>
	@import url("./renwu.css");
</style>
