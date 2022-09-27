'use strict';
const global = require("globalunit");
const uniADConfig = require('uni-config-center')({
	pluginId: 'uni-ad'
}).config()
const crypto = require('crypto');
const db = uniCloud.database();
const dbCmd = db.command
let ip = null
async function nextFn(data, user) {
	console.log("data:------------ ", data);

	var todaytasklogic = await global.TodayTaskLogic.loadtask(db, data.userId)
	todaytasklogic.video = todaytasklogic.video + 1
	await todaytasklogic.save()

	user.leijikanshiping = user.leijikanshiping + 1
	console.log("user.leijikanshiping:---- ", user.leijikanshiping);


	var videofanbei = await global.config.get("videofanbei");
	console.log("videofanbei:-------- ", videofanbei);
	console.log("data.extra: -------", data.extra);

	var beishu = await global.utils.getRandom(videofanbei['min'] - 1, videofanbei['max'] - 1);
	beishu = Math.floor(beishu)
	console.log("beishu: ------", beishu);
	var num = 0
	var todayseevideo = 0
	var jianglitype = 'coin'
	var coin = user.shangcijiangli


	console.log("coin:-------- ", coin);

	//写自己的业务逻辑
	switch (data.extra) {

		case "fuhuo":
			user.liandui = user.liandui1
			user.liandui1 = 0
			user.leijiliandui = user.leijiliandui1
			user.leijiliandui1 = 0
			break;
		case "video":
			todayseevideo = todaytasklogic.video
			console.log('todayseevideo----', todayseevideo)
			break;
		case "caiduijiangli":
			if (user.jianglitype == 'coin') {
				num = coin * (beishu + 1)
				user.shangcoin(coin * beishu)
			}
			break;
		case "hongbaofanbei":
			if (user.jianglitype == 'coin') {
				num = coin * (beishu + 1)
				user.shangcoin(coin * beishu)
			}
			break;
		case "taskjiangli":
			num = coin * (beishu + 1)
			if (user.jianglitype == 'coin') {
				user.shangcoin(coin * beishu)
			} else if (user.jianglitype == 'fen') {
				user.shangfen(coin * beishu)
				jianglitype = 'fen'
			}
			break;
		default:
			break;
	}

	const increasecoins = coin * beishu
	console.log("coin * beishu:--- increasecoins:----- ", increasecoins);


	if (data.extra === "fuhuo") {
		const resdata1 = await db.collection('videocallback').where({"transId": data.transId}).update({
			liandui: user.liandui,
			leijiliandui: user.leijiliandui
		})
		
	} else if (data.extra === "video"){
		await db.collection('videocallback').where({"transId": data.transId}).update({
			todayseevideo
		})
	}else{
		await db.collection('videocallback').where({"transId": data.transId}).update({
			coin,
			beishu,
			increasecoins,
			jianglitype: user.jianglitype
		})
	}


	user.shangcijiangli = 0
	user.jianglitype = ''
	await user.save()
	await user.load()

	return {
		"isValid": true //如果不返回，广点通会2次调用本云函数
	}
}


exports.main = async (event, context) => {
	ip = context.CLIENTIP;

	console.log("uniADConfig: -----", uniADConfig);

	const {
		path,
		queryStringParameters
	} = event;

	console.log('event : --------------', event);
	//event为客户端上传的参数

	const data = {
		adpid: event.adpid,
		platform: event.platform,
		provider: event.provider,
		transId: event.trans_id,
		sign: event.sign,
		userId: event.user_id,
		extra: event.extra,
	}
	// 注意::必须验签请求来源
	const transId = event.trans_id;
	//去uni-config-center通过adpid获取secret
	// const secret = uniADConfig[event.adpid]
	
	const {fuhuoSecuritykey,renwuSecuritykey} = uniADConfig // uniad 后台开通激励视频回调后生成的 secret
	
	
	console.log("event.sign:------- ", event.sign);
	
	
	if(event.extra === 'taskjiangli' || event.extra === 'video'){
		const sign1 = crypto.createHash('sha256').update(`${renwuSecuritykey}:${transId}`).digest('hex');
		console.log("sign1: -----------", sign1);
		if (event.sign !== sign1) {
			console.log('验签失败');
			return null;
		}
	}else{
		const sign2 = crypto.createHash('sha256').update(`${fuhuoSecuritykey}:${transId}`).digest('hex');
		console.log("sign2: -----------", sign2);
		if (event.sign !== sign2) {
			console.log('验签失败');
			return null;
		}
	}
	
	

	if (event.user_id == null || event.user_id == undefined) {
		return false;
	}
	// 验证玩家信息
	var user = await global.UserLogic.loaduser(db, event.user_id);

	if (user._id == 0 || user._id != event.user_id) {
		return {
			errcode: 10005,
		};
	}

	//删除两天前的数据
	var time = Math.floor(Date.now() / 1000) - 48 * 3600;
	const removeRes = await db.collection("videocallback").where({createtime: dbCmd.lt(time)}).remove()
	console.log("removeRes:----- ", removeRes);

	const addVideocallback = await db.collection('videocallback').add({
		createtime: Math.floor(Date.now() / 1000),
		uid: event.user_id,
		type: event.extra,
		transId: event.trans_id
	})
	console.log("addVideocallback: ",addVideocallback);

	//自己的逻辑
	try {
		return await nextFn(data, user)
	} catch (e) {
		console.error(e)
		return {
			"isValid": false
		}
	}
};
