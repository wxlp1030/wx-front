<template>
    <view style="background-color: #FFFDE8;">
        <view class="bgimg"></view>
        <view :style="{'width':'100%','height':height}" class="liuhai"></view>
        <view class="appbar" :style="{'top':height}">
        	<view class="lefticon" @tap="goback"></view>
        	<span>提现记录</span>
        </view>
        <view :style="{'width':'100%','height':height}"></view>
        <view style="width: 100%;height: 110rpx;"></view>

        <unicloud-db
            v-if="uid"
            ref="udb"
            v-slot:default="{ data, loading, error, options }"
            orderby="createtime desc"
            collection="withdrawrecord_log"
            :where="`uid=='${uid}'`"
            field=""
        >
            <view>
                <view class="tixianbox" v-for="(item, index) in data" :key="index" v-if="data.length != 0">
                    <view class="title" v-if="item.index==1">新手专享提现</view>
                    <view class="title" v-if="item.index==2">幸运提现</view>
                    <view class="money">
                        <view class="left">{{ getmsg(item.status) }}  <span v-if="item.msg!='' && item.status == 2">({{item.msg}})</span></view>
                        <view class="left" style="text-align: right;color: #FF5600;width: 20%;">{{ item.count }}元</view>
                    </view>
                    <view class="title" style="color: #4D69BF;">{{ item.createtime | timeStamp }}</view>
                </view>
                <view class="wuxiaoxi" v-if="data.length == 0">
                    <text class="wenzi">暂无数据</text>
                </view>
            </view>
        </unicloud-db>
    </view>
</template>

<script>
export default {
    data() {
        return {
            height:0,
            uid:null
        };
    },
    onLoad(option) {
        var self = this;
        uni.getSystemInfo({
        	//成功获取的回调函数，返回值为系统信息
        	success: (sysinfo) => {
        		console.log('返回值为系统信息',sysinfo)
                self.height = sysinfo.statusBarHeight + 'px'
        	},
        	complete: () => {}
        });
        uni.getStorage({
            key: 'uni_id_token',
            success: function(res) {
                // console.log(res.data);
                self.token = res.data
            }
        });
        uni.getStorage({
            key: 'uid',
            success: function(res) {
                // console.log(res.data);
                self.uid = res.data
            }
        });
    },
    filters: {
        timeStamp: function(value) {
            //具体到时分秒
            if (!value) return '';
            value = value * 1000;
            var date = new Date(value); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
            var year = date.getFullYear();
            var month = ('0' + (date.getMonth() + 1)).slice(-2);
            var sdate = ('0' + date.getDate()).slice(-2);
            var hour = ('0' + date.getHours()).slice(-2);
            var minute = ('0' + date.getMinutes()).slice(-2);
            var second = ('0' + date.getSeconds()).slice(-2);
            // 拼接
            var result = year + '-' + month + '-' + sdate + ' ' + hour + ':' + minute + ':' + second;
            // 返回
            return result;
        }
    },
    methods: {
        goback() {
            uni.navigateBack();
        },
        getmsg(type){
            if(type == 0){
                return '提现审核中'
            }else if(type == 1){
                return '提现成功'
            }else if(type == 2){
                return '提现拒绝'
            }else if(type == 3){
                return '打款中'
            }
        }
    }
};
</script>

<style>
* {
    font-family: 'font-test' !important;
}
.bgimg {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: -3;
    background-color: #fffde8;
}
.liuhai {
    position: fixed;
    left: 0;
    top: 0;
    z-index: 999;
    background-color: #5f7ff5;
}
.appbar {
    width: 100%;
    height: 90rpx;
    position: fixed;
    left: 0;
    background-color: #5f7ff5;
    line-height: 90rpx;
    text-align: center;
    font-size: 35rpx;
    color: #ffffff;
    z-index: 999;
}

.appbar .lefticon {
    width: 57rpx;
    height: 58rpx;
    background-image: url(../../static/imags/set/fh.png);
    background-size: cover;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 30rpx;
    margin: auto;
}

.tixianbox {
    width: 720rpx;
    height: auto;
    background-color: #d7e1ff;
    border: 2px solid #435ba2;
    margin: 0 auto;
    padding: 30rpx 25rpx 37rpx;
    border-radius: 20rpx;
    margin-bottom: 20rpx;
}
.tixianbox .tishi {
    color: #4d69bf;
    font-weight: bold;
    font-size: 35rpx;
}
.tixianbox .money {
    width: 100%;
    height: auto;
    overflow: hidden;
}
.tixianbox .money .left {
    float: left;
    width: 80%;
    line-height: 80rpx;
    font-weight: bold;
    font-size: 35rpx;
    color: #24325a;
}
.wuxiaoxi{
	display: flex;
	justify-content: center;
}
.wenzi{
	font-size:30rpx;
	line-height:60px;
	color: #666666;
}
</style>
