"use strict";

function merge(dest, src) {
	if (typeof(dest) == "undefined") {
		src = {};
	}
}

function array_merge_recursive_distinct(array1, array2) {
	let merged = array1;

	for (let key in array2) {
		console.log(key, array2[key]);
		if (typeof(array2[key]) == 'object' && typeof(merged[key]) != "undefined" && typeof(merged[key]) == 'object') {
			merged[key] = array_merge_recursive_distinct(merged[key], array2[key]);
		} else {
			if (typeof(array2[key]) == 'object') {
				let obj = $.extend({}, merged[key], array2[key]);
				merged[key] = obj;
			} else {
				merged[key] = array2[key];
			}
		}
	}

	return merged;
}

let GAMECONFIG = {
	config: {},
	loadTime: 1611986779252
}

module.exports = class Config {
	constructor() {
		// ...
	}

	static data() {
		return {
			"GAMENAME": 'gameconfig',
			"fangda": 1000,
			"errmsg": {
				"e10001": '参数错误',
				"e10002": '注册验证码过期',
				"e10003": '手机号已经注册过',
				"e10004": '当前手机号未注册',
				"e10005": '玩家信息不匹配或账号已注销',
				"e10006": '密码错误',
				"e10007": '上级不存在，参数错误',
				"e10008": '账号已冻结',
				"e10009": '不能绑定自己',
				"e10010": '当前手机号已被绑定',
				"e10011": '邀请码设置失败',
				"e10012": '苹果登录校验不通过',
				"e10013": '一键登录失败',
				"e10014": '未到领奖时间，请稍后',
				"e10015": '曲库歌曲不足，请联系管理员',
				"e10016": '今日观看视频次数已达上限',
				"e10017": '提现金额不足,请确认',
				"e10018": '已经申请,请勿重复申请',
				"e10019": '微信提现失败',
				"e10020": '暂未实名',
				"e10021": '提现金额错误',
				"e10022": '提现记录已经审核,请勿重复审核',
				"e10023": '提现次数不足，请猜歌增加提现机会',
				"e10024": '任务不存在，请刷新重试',
				"e10025": '任务已完成，不可重复领取',
				"e10026": '未达到领取条件，再接再厉',
				"e10027": '次数不足，请先猜歌',
				"e10028": '金币不足',
				"e10029": '未到领取时间',
				"e10030": '今日已签到',
				"e10031": '未满足提现条件',
				"e10032": '今日已提现，请明天再来',
				"e10052": '请先绑定支付宝',
				"e10053": '请先绑定微信',
				"e30010": '此账号已注销',
				"e60302": "微信绑定失败，此微信账号已被绑定",
			},
			"todayqiandao": {
				"sign1": 200,
				"sign2": 400,
				"sign3": 600,
				"sign4": 800,
				"sign5": 1000,
			},
			"liandui": {
				"song": 10,
				'fen': 10
			},
			"tixiannum": {
				"liandui": 5
			},
			"caigehongbao": {
				"min": 1,
				"max": 10
			},
			"globalinfo": {
				"videocount": 15
			},
			"duihuan": {
				"coin": 10000
			},
			"adpid":{
				"fuhuoRewardAdpid": 1507000689,//猜歌复活看激励视频
				"renwuRewardAdpid": 1507000689, //做任务看激励视频，激励视频测试广告位（adpid）为：1507000689，仅用于HBuilderX标准基座真机运行测试，不会产生真实收益。
				"hongbaoBannerAdpid": 1111111111, //拆红包下方， 信息流测试广告位（adpid）为：1111111111，仅用于HBuilderX标准基座真机运行测试，不会产生真实收益。
				"interstitialAdpid":1111111113 //首页插屏广告
			},
			"gotomarket":{
				"iosMarketId": "id1566509933",//appStore下载地址最后id
				"androidMarketUrl":"http://zhushou.360.cn/detail/index/soft_id/4594699"//Android上架应用市场的下载链接
			},
			"download":{//裂变分享功能需配置以下几项
				"logo": {
					"extname": "png",
					"name": "logo.png",
					"url": "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-c26ec39a-f602-435d-b8bb-0453aa221eb0/75bceebf-a97a-4402-a89f-081bd41a30ee.png"
				},
				"appname": "有奖猜歌",
				"slogan":"歌曲猜不停，与喜欢的音乐不期而遇",
				"company":"数字天堂（北京）网络技术有限公司",
				"domainname":""//分销裂变下载页的域名
			},
			"tixiantype": { //配置支付类型  zhifubao：支付宝提现方式   weixin：微信提现方式
				"type": 'weixin'
			},
			// 邀请好友成功奖励配置
			"rewardFen": {
				"money": 5000, //注意单位：5000=5元 邀请好友下载app，注册成功，并实名认证后，发放邀请奖励。
			},
			// 提现手续费
			"withdraw": {
				"commission": 3, // 提现手续费比例
			},
			"roles": {
				"role1": 10,
				"role2": 20,
				"role3": 30,
				"role4": 40,
				"role5": 50,
				"role6": 60,
				"role7": 70,
				"role8": 80,
				"gailv1": 10, //千分比
				"gailv2": 10, //千分比
				"gailv3": 10, //千分比
				"gailv4": 10, //千分比
				"gailv5": 10, //千分比
				"gailv6": 10, //千分比
				"gailv7": 10, //千分比
				"gailv8": 10, //千分比
			},
			"hongbao": {
				"red1": {
					"coin": 100,
					"time": 10
				},
				"red2": {
					"coin": 100,
					"time": 10
				},
				"red3": {
					"coin": 100,
					"time": 10
				},
				"red4": {
					"coin": 100,
					"time": 10
				},
				"red5": {
					"coin": 100,
					"time": 10
				},
				"red6": {
					"coin": 100,
					"time": 10
				},
				"red7": {
					"coin": 100,
					"time": 10
				},
				"red8": {
					"coin": 100,
					"time": 10
				},
				"red9": {
					"coin": 100,
					"time": 10
				},
				"red10": {
					"coin": 100,
					"time": 10
				},
			},
			"videofanbei": {
				"min": 3,
				"max": 5
			},
			"tixian": {
				"index1": {
					"coin": 0.3,
					"liandui": 0,
					"video": 0,
					"qiandao": 0,
					"leijicaidui": 0
				},
				"index2": {
					"coin": 0.3,
					"liandui": 0,
					"video": 15,
					"qiandao": 0,
					"leijicaidui": 0
				},
				"index3": {
					"coin": 0.5,
					"liandui": 30,
					"video": 0,
					"qiandao": 3,
					"leijicaidui": 0
				},
				"index4": {
					"coin": 1,
					"liandui": 50,
					"video": 20,
					"qiandao": 5,
					"leijicaidui": 0
				},
				"index5": {
					"coin": 2,
					"liandui": 80,
					"video": 30,
					"qiandao": 10,
					"leijicaidui": 0
				},
				"index6": {
					"coin": 10,
					"liandui": 200,
					"video": 100,
					"qiandao": 15,
					"leijicaidui": 0
				},
				"index7": {
					"coin": 50,
					"liandui": 200,
					"video": 400,
					"qiandao": 20,
					"leijicaidui": 0
				},
				"index8": {
					"coin": 100,
					"liandui": 800,
					"video": 600,
					"qiandao": 50,
					"leijicaidui": 0
				},
				"index9": {
					"coin": 200,
					"liandui": 1200,
					"video": 0,
					"qiandao": 80,
					"leijicaidui": 0
				},
				"index10": {
					"coin": 500,
					"liandui": 0,
					"video": 0,
					"qiandao": 100,
					"leijicaidui": 3000
				},
				"index11": {
					"coin": 1000,
					"liandui": 0,
					"video": 0,
					"qiandao": 150,
					"leijicaidui": 5000
				},
				"index12": {
					"coin": 2000,
					"liandui": 0,
					"video": 0,
					"qiandao": 200,
					"leijicaidui": 8000
				},
			}
		}
	}

	static async loadconfig() {
		var dbconfig = {};
		var db = uniCloud.database();
		var gamename = this.data().GAMENAME;
		var data = this.data();

		//点评：这要循环查询20多次库，会导致云函数执行超时
		for (let key in data) {
			var cursor = await db.collection('gameconfig').doc(key).get();
			if (JSON.stringify(cursor) != '{}' && cursor.data && cursor.data[0]) {
				var tmp = {};
				for (let key1 in cursor.data[0]) {
					if (key1 != "_id") {
						tmp[key1] = cursor.data[0][key1];
					}
				}
				dbconfig[key] = tmp;
			}
		}
		return dbconfig;
	}
	/**
	 * 一次性加载所有游戏配置信息
	 */
	static async loadAllConfig() {
		let now = new Date().getTime()
		//全局加载，每隔5分钟刷新一次，适用于云函数单实例、多并发的情况
		if (now - GAMECONFIG.loadTime > 1000 * 60 * 5) {
			console.log("config expired,load again");
			var dbconfig = {};
			var db = uniCloud.database();

			let dataInDb = await db.collection('gameconfig').get();

			if (dataInDb && dataInDb.data && dataInDb.data.length > 0) {
				for (var i = 0; i < dataInDb.data.length; i++) {
					let tmp = {};
					for (let key in dataInDb.data[i]) {
						if (key != "_id") {
							tmp[key] = dataInDb.data[i][key];
						}
					}
					// console.log("装载：",dataInDb.data[i]['_id']);
					dbconfig[dataInDb.data[i]['_id']] = tmp;
				}
			}

			GAMECONFIG.config = dbconfig
			GAMECONFIG.loadTime = now

			return dbconfig;
		} else {
			// console.log("loadAllConfig,use config in cache");
		}
		return GAMECONFIG.config
	}

	static async get() {
		// 考虑性能 暂时注释
		// var d = await this.loadconfig();
		//换个写法 - by chb
		// console.log("config get arguments",arguments);
		var d = await this.loadAllConfig();
		// console.log("loadAllConfig success");
		for (let key in arguments) {
			let k = arguments[key];
			if (typeof(d[k]) == "undefined") {
				d = null;
				break;
			}
			d = d[k];
		}
		if (typeof(d) != "undefined" && JSON.stringify(d) != '{}' && d != null) {
			return d;
		}

		var d = this.data();
		for (let key in arguments) {
			let k = arguments[key];
			if (typeof(d[k]) == "undefined") {
				d = null;
				break;
			}
			d = d[k];
		}
		console.assert(typeof(d) != "undefined", "没有找到相关的配置" + arguments[0]);
		return d;
	}

}
