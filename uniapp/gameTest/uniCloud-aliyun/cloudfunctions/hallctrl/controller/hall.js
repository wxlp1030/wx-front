const {
	Controller
} = require('uni-cloud-router')
const createConfig = require('uni-config-center')
const uniPayConfig = createConfig({
	pluginId: 'uni-pay'
})
// const uniID = require('uni-id')
const global = require("globalunit");
const wxpay = require("wxpay");
const db = uniCloud.database();
module.exports = class HallController extends Controller {
	async geturl() {
		console.log('123')
		return {
			errcode: 0,
			url: "url"
		};
	}
	
	async getconfig() {
		var getConfigInfo = await global.config.get(this.ctx.data.typeId);
		return {
			errcode: 0,
			getConfigInfo
		}
	}
	
	async getadpid() {
		var getAdpidInfo = await global.config.get("adpid");
		return {
			errcode: 0,
			getAdpidInfo
		}
	}
	//注销账号
	async closeUser() {
		if (!this.ctx.data.uid) {
			return {
				errcode: 10001,
			};
		}
		var user = await global.UserLogic.loaduser(this.db, this.ctx.data.uid);
		if (user._id == 0) {
			return {
				errcode: 10005,
			};
		}
		var res = await this.ctx.uniID.closeAccount({
			uid: user._id,
		});

		await user.save();
		return {
			errcode: 0,
			user: await user.toparam()
		};
	}
	async bindWeixin() {
		if (!this.ctx.data.uid || !this.ctx.data.code) {
			return {
				errcode: 10001,
			};
		}
		var user = await global.UserLogic.loaduser(this.db, this.ctx.data.uid);
		if (user._id == 0) {
			return {
				errcode: 10005,
			};
		}
		const res = await this.ctx.uniID.bindWeixin({
			uid: this.ctx.data.uid,
			code: this.ctx.data.code
		})
		if (res.code != 0) {
			return {
				errcode: 60302,
			};
		}
		user.openid = res.openid
		await user.save();
		return {
			errcode: 0,
			user: await user.toparam()
		};
	}

	async loginByWeixin() {
		if (!this.ctx.data.code) {
			return {
				errcode: 10001
			};
		}

		//微信登录
		var res = await this.ctx.uniID.loginByWeixin({
			code: this.ctx.data.code,
		});

		console.log('微信回执---->', res);
		if (res.code === 10006) {
			return {
				errcode: 30010
			};
		}

		if (res.code != 0) {
			return {
				errcode: 10005
			};
		}

		if (!res.openid) {
			return {
				errcode: 10005
			};
		}

		var user = await global.UserLogic.loaduser(this.db, res.uid);
		console.log("user: ",user._id);
		
		if(this.ctx.data.userInfo){
			var userInfo = this.ctx.data.userInfo
			console.log("userInfo: ",userInfo);
			user.nickname = userInfo.nickName;
			user.avatar = userInfo.avatarUrl;
			user.sex = userInfo.gender;
		}
		
		//首次需要创建
		if (user._id == 0) {
			user._id = res.uid;
			user.createtime = Math.floor(Date.now() / 1000);
			await user.save();
			await user.load();
		}
		console.log('初始化玩家成功')
		var user = await global.UserLogic.loaduser(this.db, res.uid);
		if (user._id == 0) {
			return {
				errcode: 10005,
			};
		}

		//查看是否账号异常或封号
		if (user.accountstatus == 1 || user.accountstatus == "1") {
			return {
				errcode: 10008,
			};
		}

		//查看是否有邀请码
		if (user.inviteCode == '') {
			console.log("res", user._id)
			var res1 = await this.ctx.uniID.setUserInviteCode({
				uid: user._id,
			});
			if (res1.code != 0) {
				return {
					errcode: 10011,
				};
			}
			user.inviteCode = res1['myInviteCode'];
		}
		user.openid = res.openid;
		var clientIp = this.ctx.context.CLIENTIP;
		user.ip = clientIp;
		user.lastlogintime = Math.floor(Date.now() / 1000);
		user.lastonlinetime = Math.floor(Date.now() / 1000);
		await user.save();
		await user.load();
		var todaytasklogic = await global.TodayTaskLogic.loadtask(this.db, res.uid)
		todaytasklogic.login = todaytasklogic.login + 1
		await todaytasklogic.save()

		return {
			errcode: 0,
			data: {
				user: await user.toparam(),
				token: res.token,
			}
		};
	}

	async loginByApple() {
		var params = this.ctx.data
		if (!params['identityToken']) {
			return {
				errcode: 10001,
			};
		}
		const verifyApple = await this.ctx.uniID.verifyAppleIdentityToken({
			identityToken: params['identityToken']
		})
		console.log(verifyApple, "登录参数")
		if (verifyApple.code != 0) {
			return {
				errcode: 10012
			};
		}
		console.log("Apple登录校验verifyAppleIdentityToken: ", verifyApple);
		var res = await this.ctx.uniID.loginByApple(params)
		console.log("Apple登录返回 ", res);

		if (res.code === 10006) {
			return {
				errcode: 30010
			};
		}

		var user = await global.UserLogic.loaduser(this.db, res.uid);
		//首次需要创建
		if (user._id == 0) {
			user._id = res.uid;
			user.nickname = res.userInfo.nickname;
			user.sex = 1;
			user.createtime = Math.floor(Date.now() / 1000);
			await user.save();
		}
		console.log('初始化玩家成功')
		var user = await global.UserLogic.loaduser(this.db, res.uid);
		if (user._id == 0) {
			return {
				errcode: 10005,
			};
		}

		//查看是否账号异常或封号
		if (user.accountstatus == 1 || user.accountstatus == "1") {
			return {
				errcode: 10008,
			};
		}

		//查看是否有邀请码
		if (user.inviteCode == '') {
			console.log("res", user._id)
			var res1 = await this.ctx.uniID.setUserInviteCode({
				uid: user._id,
			});
			if (res1.code != 0) {
				return {
					errcode: 10011,
				};
			}
			user.inviteCode = res1['myInviteCode'];
		}
		var clientIp = this.ctx.context.CLIENTIP;
		user.ip = clientIp;
		user.lastlogintime = Math.floor(Date.now() / 1000);
		user.lastonlinetime = Math.floor(Date.now() / 1000);
		await user.save();
		await user.load();
		var todaytasklogic = await global.TodayTaskLogic.loadtask(this.db, res.uid)
		todaytasklogic.login = todaytasklogic.login + 1
		await todaytasklogic.save()
		return {
			errcode: 0,
			data: {
				user: await user.toparam(),
				token: res.token,
			}
		};
	}

	async loginByUniverify() {
		var params = this.ctx.data
		var res = await this.ctx.uniID.loginByUniverify(params)
		if (res.code === 10006) {
			return {
				errcode: 30010
			};
		}

		if (res.code != 0) {
			return {
				errcode: 10013
			};
		}
		var user = await global.UserLogic.loaduser(this.db, res.uid);
		console.log("user:--------- ", user);
		//首次需要创建
		if (user._id == 0) {
			user._id = res.uid;
			user.sex = 1;
			user.createtime = Math.floor(Date.now() / 1000);
			await user.save();
		}
		console.log('初始化玩家成功')
		var user = await global.UserLogic.loaduser(this.db, res.uid);
		if (user._id == 0) {
			return {
				errcode: 10005,
			};
		}

		//查看是否账号异常或封号
		if (user.accountstatus == 1 || user.accountstatus == "1") {
			return {
				errcode: 10008,
			};
		}

		//查看是否有邀请码
		if (user.inviteCode == '') {
			console.log("res", user._id)
			var res1 = await this.ctx.uniID.setUserInviteCode({
				uid: user._id,
			});
			if (res1.code != 0) {
				return {
					errcode: 10011,
				};
			}
			user.inviteCode = res1['myInviteCode'];
		}
		var clientIp = this.ctx.context.CLIENTIP;
		user.ip = clientIp;
		user.lastlogintime = Math.floor(Date.now() / 1000);
		user.lastonlinetime = Math.floor(Date.now() / 1000);
		user.phone = res.mobile;
		await user.save();
		await user.load();
		var todaytasklogic = await global.TodayTaskLogic.loadtask(this.db, res.uid)
		todaytasklogic.login = todaytasklogic.login + 1
		await todaytasklogic.save()
		return {
			errcode: 0,
			data: {
				user: await user.toparam(),
				token: res.token,
			}
		};
	}

	async setuserinfo() {
		if (!this.ctx.data.uid) {
			return {
				errcode: 10001,
			};
		}

		var user = await global.UserLogic.loaduser(this.db, this.ctx.data.uid);
		if (user._id == 0) {
			return {
				errcode: 10005,
			};
		}

		if (user.accountstatus == 1 || user.accountstatus == "1") {
			return {
				errcode: 10008,
			};
		}

		if (this.ctx.data.nickname) {
			user.nickname = this.ctx.data.nickname
		}
		if (this.ctx.data.avatar) {
			user.avatar = this.ctx.data.avatar
		}
		if (this.ctx.data.sex) {
			user.sex = this.ctx.data.sex
		}
		if (this.ctx.data.zhifubao) {
			user.zhifubao = this.ctx.data.zhifubao
		}
		await user.save();
		await user.load();
		return {
			errcode: 0,
			data: {
				user: await user.toparam()
			}
		};
	}

	async getuserinfo() {
		if (!this.ctx.data.uid) {
			return {
				errcode: 10001,
			};
		}

		var user = await global.UserLogic.loaduser(this.db, this.ctx.data.uid);
		if (user._id == 0) {
			return {
				errcode: 10005,
			};
		}

		if (user.accountstatus == 1 || user.accountstatus == "1") {
			return {
				errcode: 10008,
			};
		}

		return {
			errcode: 0,
			data: {
				user: await user.toparam(),
				needsong: await global.config.get('tixiannum', 'liandui'),
				duihuan: await global.config.get('duihuan', 'coin'),
			}
		};
	}

	async bindMobile() {
		var params = this.ctx.data.params
		if (!this.ctx.data.uid || !params) {
			return {
				errcode: 10001,
			};
		}
		console.log('参数', params)
		var user = await global.UserLogic.loaduser(this.db, this.ctx.data.uid);
		if (user._id == 0) {
			return {
				errcode: 10005,
			};
		}

		const res = await this.ctx.uniID.bindMobile({
			uid: this.ctx.data.uid,
			type: 'univerify',
			openid: params.openid,
			access_token: params.access_token
		})
		console.log("短信", res)
		if (res.code != 0 || res.code == 60101) {
			return {
				errcode: 10010,
			};
		}

		user.phone = res.mobile;
		await user.save();
		return {
			errcode: 0,
			phone: res.mobile,
			res: res
		};
	}

	async bindshangji() {
		if (!this.ctx.data.uid || !this.ctx.data.inviteCode) {
			return {
				errcode: 10001,
			};
		}

		// 验证玩家信息
		var user = await global.UserLogic.loaduser(this.db, this.ctx.data.uid);
		console.log("user: ", user);
		if (user._id == 0) {
			return {
				errcode: 10005,
			};
		}
		// 已经含有邀请人
		if (user.shangji != 0) {
			return {
				errcode: 10010,
			};
		}

		// 验证邀请人信息 
		var cmd = await this.db.collection('uni-id-users').where({
			my_invite_code: this.ctx.data.inviteCode,
		}).get();
		console.log("验证邀请人信息", cmd)
		// 实在是不知数据格式了
		if (!cmd.data || cmd.data.length <= 0) {
			return {
				errcode: 10005,
			};
		}

		var sjuid = cmd.data[0]._id;
		var sjuser = await global.UserLogic.loaduser(this.db, sjuid);
		if (sjuser._id == 0) {
			return {
				errcode: 10005,
			};
		}

		const res = await this.ctx.uniID.acceptInvite({
			uid: user._id,
			inviteCode: this.ctx.data.inviteCode,
		});

		if (res.code != 0) {
			return {
				errcode: 10001,
			}
		}

		// 邀请人与被邀请人重复
		if (sjuid == user._id) {
			return {
				errcode: 10009,
			};
		}

		//这里需要判断上级是否死循环

		//绑定上级
		if (user._id != 0 && sjuid != 0) {
			user.shangji = sjuid;
			user.bindtime = Math.floor(Date.now() / 1000)

			console.log("user.shangji:邀请当前用户的人--------------- ", user.shangji);
			console.log("user._id:当前登录账号--------------- ", user._id);
			//user._id当前登录账号    user.shangji邀请当前用户的人
			//绑定成功，给邀请者user.shangji加人数
			let res = await db.collection('userinfo').doc(user.shangji).update({
				inviteCount: db.command.inc(1), //累计邀请人数+1
			})

			await user.save();
			await user.load();
		}
		return {
			errcode: 0,
			data: {
				user: await user.toparam()
			}
		};
	}
	//身份验证
	async authentication() {
		if (!this.ctx.data.uid || !this.ctx.data.idcard || !this.ctx.data.realname) {
			return {
				errcode: 10001,
			};
		}
		var user = await global.UserLogic.loaduser(this.db, this.ctx.data.uid);
		console.log("user: ",user);
		if (user._id == 0) {
			return {
				errcode: 10005,
			};
		}
	
		if (user.idcard != '') {
			return {
				errcode: 30001,
			};
		}
	
		if (user.realname != '') {
			return {
				errcode: 30001,
			};
		}
	
		user.idcard = this.ctx.data.idcard;
		user.realname = this.ctx.data.realname;
		user.isauthentication = 1;
		
		if(user.shangji){
			var getRewardFen = await global.config.get("rewardFen");
			console.log("getRewardFen: ",getRewardFen);
			
			//绑定成功，给邀请者user.shangji加钱
			let res = await db.collection('userinfo').doc(user.shangji).update({
				fen: db.command.inc(getRewardFen.money),
				inviteFen: db.command.inc(getRewardFen.money)
			})
			console.log("res---------------: ", res);
			
			if (res.updated) {
				let {data: userinfoRes} = await db.collection('userinfo').where({'_id': user.shangji}).get()
				console.log("userinfoRes: ", userinfoRes);
				
				await db.collection('rewardinfo').add({
					user_id: user.shangji,
					xiajinickname: user.nickname,
					xiajiavatar: user.avatar,
					comment: "邀请好友奖励",
					fen: getRewardFen.money, //奖励金额
					balance: userinfoRes[0].fen, //总余额
					create_date: Date.now() //奖励时间
				})
			}
		}
		
		await user.save()
		await user.load()
	
		return {
			errcode: 0,
			data: {
				user: await user.toparam()
			}
		};
	}
	// 获取上级信息
	async getshangji() {
		if (!this.ctx.data.uid) {
			return {
				errcode: 10001,
			}
		}

		var user = await global.UserLogic.loaduser(this.db, this.ctx.data.uid);
		if (user._id == 0) {
			return {
				errcode: 10005,
			}
		}

		if (user.shangji == 0) {
			return {
				errcode: 10007,
			}
		}

		var sjuser = await global.UserLogic.loaduser(this.db, user.shangji);
		if (sjuser._id == 0) {
			return {
				errcode: 10005,
			}
		}

		return {
			errcode: 0,
			data: {
				user: await sjuser.toparam(),
			},
		};
	}

	async gettaskinfo() {
		//type 猜歌任务 0   每日任务1
		if (!this.ctx.data.uid) {
			return {
				errcode: 10001,
				msg: 'uid'
			};
		}

		if (Number(this.ctx.data.type) != 0 && Number(this.ctx.data.type) != 1) {
			return {
				errcode: 10001,
				msg: this.ctx.data.type
			};
		}

		// 验证玩家信息
		var user = await global.UserLogic.loaduser(this.db, this.ctx.data.uid);
		if (user._id == 0) {
			return {
				errcode: 10005,
			};
		}
		var u = await user.toparam();

		var alltask = await global.TaskLogic.getalltask(this.db, this.ctx.data.type)
		var todaytask = {}
		var todaytasklogic;
		var todayseevideo = 0
		// 每日任务1
		if (this.ctx.data.type == 1) {
			todaytasklogic = await global.TodayTaskLogic.loadtask(this.db, this.ctx.data.uid)
			// console.log("todaytasklogic:------ ",todaytasklogic);
			todaytask = await todaytasklogic.toparam();
			todayseevideo = todaytasklogic.video
		}
		var arr = [];
		for (var i = 0; i < alltask.length; i++) {
			var item = alltask[i];
			item['status'] = 0
			if (this.ctx.data.type == 0) {
				if (alltask[i]['login'] == 0) {
					item['wancheng'] = u['leijicaiduigequ']
				}
				if (alltask[i]['login'] == 2) {
					item['wancheng'] = u['leijitixian']
				}
				if (alltask[i]['login'] == 3) {
					item['wancheng'] = u['leijikanshiping']
				}
				if (alltask[i]['login'] == 4) {
					item['wancheng'] = u['leijiduihuan']
				}
				if (u.hasOwnProperty(alltask[i]['_id'])) {
					item['status'] = 2
				}
			} else {
				if (alltask[i]['login'] == 0) {
					item['wancheng'] = todaytask['caige']
				}
				if (alltask[i]['login'] == 1) {
					item['wancheng'] = todaytask['login']
				}
				if (alltask[i]['login'] == 2) {
					item['wancheng'] = todaytask['tixian']
				}
				if (alltask[i]['login'] == 3) {
					item['wancheng'] = todaytask['video']
				}
				if (alltask[i]['login'] == 4) {
					item['wancheng'] = todaytask['duihuan']
				}
				if (todaytask.hasOwnProperty(alltask[i]['_id'])) {
					item['status'] = 2
				}
			}
			if (item['status'] == 0 && item['wancheng'] >= alltask[i]['num']) {
				item['status'] = 1
			}
			if (item['wancheng'] >= alltask[i]['num']) {
				item['wancheng'] = alltask[i]['num']
			}
			arr.push(item)
		}
		var jianglilist = []
		if (this.ctx.data.type == 1) {
			var now = await global.utils.getHours()
			now = Number(now) + 8
			console.log(now, "现在时间")
			if (now >= 22) {
				for (var i = 1; i <= 4; i++) {
					if (todaytask['sign' + i] == 0) {
						todaytasklogic['sign' + i] = 3
					}
				}
				if (todaytasklogic['sign5'] == 0) {
					todaytasklogic['sign5'] = 2
				}
			} else if (now >= 20) {
				for (var i = 1; i <= 3; i++) {
					if (todaytask['sign' + i] == 0) {
						todaytasklogic['sign' + i] = 3
					}
				}
				if (todaytasklogic['sign4'] == 0) {
					todaytasklogic['sign4'] = 2
				}
			} else if (now >= 16) {
				for (var i = 1; i <= 2; i++) {
					if (todaytask['sign' + i] == 0) {
						todaytasklogic['sign' + i] = 3
					}
				}
				if (todaytasklogic['sign3'] == 0) {
					todaytasklogic['sign3'] = 2
				}
			} else if (now >= 12) {
				if (todaytasklogic['sign1'] == 0) {
					todaytasklogic['sign1'] = 3
				}
				if (todaytasklogic['sign2'] == 0) {
					todaytasklogic['sign2'] = 2
				}
			} else if (now >= 8) {
				if (todaytasklogic['sign1'] == 0) {
					todaytasklogic['sign1'] = 2
				}
			}

			var qiandaocoin = await global.config.get('todayqiandao');
			jianglilist = [{
					"coin": qiandaocoin['sign1'],
					"time": 8,
					"status": todaytasklogic['sign1'] // 0 未领取  1 已领取 2可以领取 3已过期
				},
				{
					"coin": qiandaocoin['sign2'],
					"time": 12,
					"status": todaytasklogic['sign2']
				},
				{
					"coin": qiandaocoin['sign3'],
					"time": 16,
					"status": todaytasklogic['sign3']
				},
				{
					"coin": qiandaocoin['sign4'],
					"time": 20,
					"status": todaytasklogic['sign4']
				},
				{
					"coin": qiandaocoin['sign5'],
					"time": 22,
					"status": todaytasklogic['sign5']
				}
			]
		}

		return {
			errcode: 0,
			data: {
				user: u,
				list: arr,
				jianglilist: jianglilist,
				needsong: await global.config.get('tixiannum', 'liandui'),
				videofanbei: await global.config.get("videofanbei"),
				todayseevideo: todayseevideo,
				needvido: await global.config.get("tixian", "index2", "video"),
			}
		}
	}

	async sign() {
		if (!this.ctx.data.uid) {
			return {
				errcode: 10001,
				msg: 'uid'
			};
		}
		// 验证玩家信息
		var user = await global.UserLogic.loaduser(this.db, this.ctx.data.uid);
		if (user._id == 0) {
			return {
				errcode: 10005,
			};
		}
		var todaytasklogic = await global.TodayTaskLogic.loadtask(this.db, this.ctx.data.uid)
		var todaytask = await todaytasklogic.toparam();
		var now = await global.utils.getHours()
		now = Number(now) + 8
		console.log('现在时间', now)
		var coin = 0
		var qiandaocoin = await global.config.get('todayqiandao');
		if (now >= 22) {
			if (todaytasklogic['sign5'] != 0) {
				return {
					errcode: 10014,
				};
			}
			for (var i = 1; i <= 4; i++) {
				if (todaytask['sign' + i] == 0) {
					todaytasklogic['sign' + i] = 3
				}
			}
			coin = qiandaocoin['sign5'];
			todaytasklogic['sign5'] = 1
		} else if (now >= 20) {
			if (todaytasklogic['sign4'] != 0) {
				return {
					errcode: 10014,
				};
			}
			for (var i = 1; i <= 3; i++) {
				if (todaytask['sign' + i] == 0) {
					todaytasklogic['sign' + i] = 3
				}
			}
			coin = qiandaocoin['sign4'];
			todaytasklogic['sign4'] = 1
		} else if (now >= 16) {
			if (todaytasklogic['sign3'] != 0) {
				return {
					errcode: 10014,
				};
			}
			for (var i = 1; i <= 2; i++) {
				if (todaytask['sign' + i] == 0) {
					todaytasklogic['sign' + i] = 3
				}
			}
			coin = qiandaocoin['sign3'];
			todaytasklogic['sign3'] = 1
		} else if (now >= 12) {
			if (todaytasklogic['sign2'] != 0) {
				return {
					errcode: 10014,
				};
			}
			if (todaytasklogic['sign1'] == 0) {
				todaytasklogic['sign1'] = 3
			}
			coin = qiandaocoin['sign2'];
			todaytasklogic['sign2'] = 1
		} else if (now >= 8) {
			if (todaytasklogic['sign1'] != 0) {
				return {
					errcode: 10014,
				};
			}
			coin = qiandaocoin['sign1'];
			todaytasklogic['sign1'] = 1
		}
		var jianglilist = [{
				"coin": qiandaocoin['sign1'],
				"time": 8,
				"status": todaytasklogic['sign1'] // 0 未领取  1 已领取 2可以领取 3已过期
			},
			{
				"coin": qiandaocoin['sign2'],
				"time": 12,
				"status": todaytasklogic['sign2']
			},
			{
				"coin": qiandaocoin['sign3'],
				"time": 16,
				"status": todaytasklogic['sign3']
			},
			{
				"coin": qiandaocoin['sign4'],
				"time": 20,
				"status": todaytasklogic['sign4']
			},
			{
				"coin": qiandaocoin['sign5'],
				"time": 22,
				"status": todaytasklogic['sign5']
			}
		]
		await user.shangcoin(coin)
		await user.load()
		var u = await user.toparam();
		await todaytasklogic.save()
		return {
			errcode: 0,
			data: {
				user: u,
				jianglilist: jianglilist
			}
		}
	}

	async getsong() {
		if (!this.ctx.data.uid) {
			return {
				errcode: 10001,
				msg: 'uid'
			};
		}
		// 验证玩家信息
		var user = await global.UserLogic.loaduser(this.db, this.ctx.data.uid);
		if (user._id == 0) {
			return {
				errcode: 10005,
			};
		}
		var count = await this.db.collection('songlist').count();
		console.log("count：", count)
		var total = count.total
		if (total < user.index) {
			return {
				errcode: 10015,
			};
		}
		var res = await this.db.collection('songlist').skip(user.index - 1).limit(1).get();
		var song = res.data[0]
		//新增修复明文答案
		if (song['correct']) {
			delete song['correct'];
		}

		var allhongbao = await global.config.get('hongbao')

		for (var i = 1; i <= 10; i++) {
			allhongbao['red' + i]['lingqu'] = user['hongbaotime' + i]
		}
		return {
			errcode: 0,
			data: {
				user: await user.toparam(),
				song: song,
				needsong: await global.config.get('tixiannum', 'liandui'),
				hongbao: allhongbao,
				videofanbei: await global.config.get("videofanbei"),
				lianduijiangli: await global.config.get('liandui')
			}
		}
	}

	async dati() {
		if (!this.ctx.data.uid || !this.ctx.data.id || !this.ctx.data.daan) {
			return {
				errcode: 10001,
			};
		}
		if (Number(this.ctx.data.daan) <= 0 || Number(this.ctx.data.daan) > 3) {
			return {
				errcode: 10001,
				msg: 'daan'
			};
			return;
		}
		// 验证玩家信息
		var user = await global.UserLogic.loaduser(this.db, this.ctx.data.uid);
		if (user._id == 0) {
			return {
				errcode: 10005,
			};
		}
		var count = await this.db.collection('songlist').count();
		console.log("count", count)
		var total = count.total
		if (total < user.index) {
			return {
				errcode: 10015,
			};
		}
		var res = await this.db.collection('songlist').skip(user.index - 1).limit(1).get();
		var songdata = res.data[0]
		if (songdata._id != this.ctx.data.id) {
			return {
				errcode: 10001,
			};
		}
		// var res = await this.db.collection('songlist').doc(this.ctx.data.id).get();
		var correct = Number(songdata.correct)
		var result = "error"
		var tixianjihui = false
		var hongbao = 0;
		var hongbaotype = "";
		if (Number(this.ctx.data.daan) == correct) {
			// 答对了
			result = "correct"
			user.liandui = user.liandui + 1
			user.leijiliandui = user.leijiliandui + 1
			user.tixiancaidui = user.tixiancaidui + 1
			user.leijicaiduigequ = user.leijicaiduigequ + 1

			var tixianneedsong = await global.config.get('tixiannum', 'liandui')
			if (tixianneedsong <= user.tixiancaidui) {
				user.tixiannum = user.tixiannum + 1
				user.tixiancaidui = 0
				tixianjihui = true
			} else {
				// 猜歌获得现金红包
				var lianduihongbao = await global.config.get('liandui')
				var needliandui = lianduihongbao['song']
				if (needliandui <= user.liandui) {
					hongbaotype = "liandui"
					user.liandui = 0
					hongbao = await global.utils.getRandom(0, lianduihongbao['fen']);
					user.jianglitype = 'fen'
					user.shangfen(hongbao)
				} else {
					var caigehongbao = await global.config.get('caigehongbao')
					var time1 = caigehongbao['min']
					var time2 = caigehongbao['max']
					hongbao = await global.utils.getRandom(time1, time2);
					hongbaotype = "putong"
					user.jianglitype = 'coin'
					user.shangcoin(hongbao)
				}
				hongbao = Math.floor(hongbao * 100) / 100
				user.shangcijiangli = hongbao
			}

			var todaytasklogic = await global.TodayTaskLogic.loadtask(this.db, this.ctx.data.uid)
			todaytasklogic.caige = todaytasklogic.caige + 1
			await todaytasklogic.save()
		} else {
			// 答错了
			result = "error"
			user.liandui1 = user.liandui
			user.liandui = 0

			user.leijiliandui1 = user.leijiliandui
			user.leijiliandui = 0
		}
		user.index = user.index + 1
		if (user.firstjiangli == 0) {
			if (user.leijicaiduigequ >= 5) {
				user.firstjiangli = 1
				await user.shangfen(0.3)
			}
		}
		await user.save()
		await user.load()
		return {
			errcode: 0,
			data: {
				user: await user.toparam(),
				result: result,
				tixianjihui: tixianjihui,
				hongbao: hongbao,
				hongbaotype: hongbaotype
			}
		}
	}

	async getvideocount() {
		if (!this.ctx.data.uid) {
			return {
				errcode: 10001,
			};
		}
		// 验证玩家信息
		var user = await global.UserLogic.loaduser(this.db, this.ctx.data.uid);
		if (user._id == 0) {
			return {
				errcode: 10005,
			};
		}
		var videocount = await global.config.get('globalinfo', 'videocount')
		var todaytasklogic = await global.TodayTaskLogic.loadtask(this.db, this.ctx.data.uid)
		
		if (todaytasklogic.video >= videocount) {
			return {
				errcode: 10016,
			};
		}
		return {
			errcode: 0
		}
	}
	//激励视频回调后处理
	async getadvideocallback() {
		if (!this.ctx.data.uid) {
			return {
				errcode: 10001,
			};
		}
		// 验证玩家信息
		var user = await global.UserLogic.loaduser(this.db, this.ctx.data.uid);
		if (user._id == 0) {
			return {
				errcode: 10005,
			};
		}
		
		const {data:adRes} = await db.collection("videocallback").orderBy("createtime", "desc").where({uid:this.ctx.data.uid}).limit(1).get()
		
		// console.log("adRes:-------- ",adRes);
		
		return {
			errcode: 0,
			data: {
				user: await user.toparam(),
				beishu: adRes[0]? adRes[0].beishu : 0,
				num: adRes[0]? adRes[0].num : 0,
				increasecoins:adRes[0]? adRes[0].increasecoins : 0,
				jianglitype: adRes[0]? adRes[0].jianglitype : "",
				todayseevideo:adRes[0]? adRes[0].todayseevideo : 0
			}
		}
	}
	//old
	async videocallback() {
		if (!this.ctx.data.uid || !this.ctx.data.type) {
			return {
				errcode: 10001,
			};
		}
		// 验证玩家信息
		var user = await global.UserLogic.loaduser(this.db, this.ctx.data.uid);
		if (user._id == 0) {
			return {
				errcode: 10005,
			};
		}
		var todaytasklogic = await global.TodayTaskLogic.loadtask(this.db, this.ctx.data.uid)
		todaytasklogic.video = todaytasklogic.video + 1
		await todaytasklogic.save()
		user.leijikanshiping = user.leijikanshiping + 1
		var videofanbei = await global.config.get("videofanbei");
		var beishu = await global.utils.getRandom(videofanbei['min'] - 1, videofanbei['max'] - 1);
		beishu = Math.floor(beishu)
		var num = 0
		var jianglitype = 'coin'
		if (this.ctx.data.type == 'fuhuo') {
			user.liandui = user.liandui1
			user.liandui1 = 0
			user.leijiliandui = user.leijiliandui1
			user.leijiliandui1 = 0
		} else if (this.ctx.data.type == 'caiduijiangli') {
			// var fen = user.shangcijiangli
			// if (user.jianglitype == 'fen') {
			//     var beishu = await global.utils.getRandom(2, 4);
			//     beishu = Math.floor(beishu)
			//     user.shangfen(fen * beishu)
			// }
			var coin = user.shangcijiangli
			if (user.jianglitype == 'coin') {
				num = coin * (beishu + 1)
				user.shangcoin(coin * beishu)
			}
		} else if (this.ctx.data.type == 'hongbaofanbei') {
			var coin = user.shangcijiangli
			if (user.jianglitype == 'coin') {
				num = coin * (beishu + 1)
				user.shangcoin(coin * beishu)
			}
		} else if (this.ctx.data.type == 'taskjiangli') {
			var coin = user.shangcijiangli
			num = coin * (beishu + 1)
			if (user.jianglitype == 'coin') {
				user.shangcoin(coin * beishu)
			} else if (user.jianglitype == 'fen') {
				user.shangfen(coin * beishu)
				jianglitype = 'fen'
			}
		} else {

		}
		user.shangcijiangli = 0
		user.jianglitype = ''
		await user.save()
		await user.load()
		return {
			errcode: 0,
			data: {
				user: await user.toparam(),
				beishu: beishu,
				num: num,
				jianglitype: jianglitype
			}
		}
	}

	//微信提现
	async withdraw() {
		console.log("this.ctx.data: ----",this.ctx.data);
		if (!this.ctx.data.uid || !this.ctx.data.item) {
			return {
				errcode: 10001,
			};
		}
		var index = parseInt(this.ctx.data.item.index)
		console.log("index: ",index);
		if (index > 13 && index < 1) {
			return {
				errcode: 10021,
			};
		}
		var item = await global.config.get('tixian', 'index' + index);
		console.log(item)
		var amount = Number(item['coin'])
		var liandui = Number(item['liandui'])
		var video = Number(item['video'])
		var qiandao = Number(item['qiandao'])
		var leijicaidui = Number(item['leijicaidui'])

		var user = await global.UserLogic.loaduser(this.db, this.ctx.data.uid);
		
		
		if (user._id == 0 || user._id != this.ctx.data.uid) {
			return {
				errcode: 10005,
			};
		}
		if(this.ctx.context.PLATFORM != 'mp-weixin'){
			if (user.realname == '') {
				return {
					errcode: 10020,
				};
			}
		}

		if (user.leijikanshiping < video || user.leijiliandui < liandui || user.leijicaiduigequ < leijicaidui ||
			user.lianxuqiandao < qiandao) {
			return {
				errcode: 10031,
			};
		}

		var todaytasklogic = await global.TodayTaskLogic.loadtask(this.db, this.ctx.data.uid)
		// console.log("todaytasklogic: ",todaytasklogic);
		if (todaytasklogic.tixian != 0) {
			return {
				errcode: 10032,
			};
		}

		// 判断是不是首次提现   首次不收手续费
		var commissionbili = 0;
		if (user.isfirstwithdraw == 0) {
			commissionbili = await global.config.get("withdraw", "commission") / 100;
		}

		var commission = Math.floor(amount * commissionbili * 100) / 100;
		var realamount = amount - commission;
		var fangda = await global.config.get("fangda");
		if (user.fen < amount * fangda) {
			return {
				errcode: 10017,
			};
		}

		var tixiantype = await global.config.get('tixiantype', 'type')
		console.log("tixiantype:---------------- ",tixiantype);

		if (tixiantype == 'zhifubao') {
			if (user.zhifubao == '') {
				return {
					errcode: 10052,
				};
			}
			const res = await this.db.collection('withdrawrecord_log').where({
				uid: this.ctx.data.uid,
				status: 0,
			}).get();

			if (res.data && res.data.length > 0) {
				return {
					errcode: 10018,
				};
			}

			await user.xiafen(amount);
			if (user.isfirstwithdraw == 1) {
				user.isfirstwithdraw = 0;
			}
			await user.save();
			await user.load();
			var up = await user.toparam();
			// 提交申请
			var msg = {
				"uid": this.ctx.data.uid,
				"count": amount,
				"commission": commission,
				"balance": up["fen"],
				"status": 0,
				"index": index,
				"msg": "",
				"type": "zhifubao",
				"createtime": Math.floor(Date.now() / 1000),
			};

			await global.QueueHelper.putLog(this.db, "withdrawrecord_log", msg);
		} else {
			if (user.openid == '') {
				return {
					errcode: 10053,
				};
			}
			if (index != 1) {
				// 判断是否已经申请提现
				const res = await this.db.collection('withdrawrecord_log').where({
					uid: this.ctx.data.uid,
					status: 0,
				}).get();

				if (res.data && res.data.length > 0) {
					return {
						errcode: 10018,
					};
				}

				await user.xiafen(amount);
				if (user.isfirstwithdraw == 1) {
					user.isfirstwithdraw = 0;
				}
				await user.save();
				await user.load();
				var up = await user.toparam();
				// 提交申请
				var msg = {
					"uid": this.ctx.data.uid,
					"count": amount,
					"commission": commission,
					"balance": up["fen"],
					"status": 0,
					"index": index,
					"msg": "",
					"type": "wechat",
					"index": index,
					"createtime": Math.floor(Date.now() / 1000),
				};
				await global.QueueHelper.putLog(this.db, "withdrawrecord_log", msg);
			} else {
				// TODO : 微信提现接口  返回成功之后  扣用户fen
				// 通过code获取openid
				if (user.isfirstwithdraw == 0) {
					return {
						errcode: 10019,
					};
				}
				
				if(this.ctx.context.PLATFORM != 'mp-weixin'){
					if (user.realname == '') {
						return {
							errcode: 10020,
						};
					}
				}
				
				const config = {
					appid: uniPayConfig.config("app.weixin.appid"), //公众号id
					mchid: uniPayConfig.config("app.weixin.mchid"), //商户id
					partnerKey: uniPayConfig.config("app.weixin.partnerKey"), //安全密钥
					pfx: wxpay.fs.readFileSync(wxpay.path.resolve(__dirname, "apiclient_cert.p12")),
					notify_url: "",
					spbill_create_ip: 'IP地址'
				};

				// const api = new tenpay(config);
				// 调试模式(传入第二个参数为true, 可在控制台输出数据)
				const api = new wxpay.tenpay(config, true);

				let date = Date.now();
				let rund = Math.ceil(date / 1000);
				let partner = rund + '' + user.inviteCode;
				console.log(' ceshi jin lai  99999--partner--->' + partner)
				let result = await api.transfers({
					partner_trade_no: partner, //订单号
					openid: user.openid,
					re_user_name: user.realname || "", //真实姓名
					amount: amount * 100,
					desc: '企业付款描述信息'
				});
				console.log(' ceshi jin lai  88888----->')
				console.log(result)

				if (result['return_code'] == 'SUCCESS' && result['result_code'] == 'SUCCESS') {
					await user.xiafen(amount);
					if (user.isfirstwithdraw == 1) {
						user.isfirstwithdraw = 0;
					}
					todaytasklogic.tixian = todaytasklogic.tixian + 1
					await todaytasklogic.save()
					user.leijitixian = user.leijitixian + 1;
					user['tixianindex' + index] = 1
					await user.save();
					await user.load();
					var up = await user.toparam();
					var msg = {
						"uid": this.ctx.data.uid,
						"count": amount,
						"commission": commission,
						"balance": up["fen"],
						"status": 1,
						"msg": "",
						"type": "wechat",
						"createtime": Math.floor(Date.now() / 1000),
					};

					await global.QueueHelper.putLog(this.db, "withdrawrecord_log", msg);
				} else {
					return {
						errcode: 10019,
					};
				}
			}
		}

		return {
			'errcode': 0,
			"data": {
				"user": await user.toparam(),
				"amount": amount,
				"commission": commission
			}
		};
	}

	async taskjiangli() {
		if (!this.ctx.data.uid || !this.ctx.data.id) {
			return {
				errcode: 10001,
			};
		}

		var user = await global.UserLogic.loaduser(this.db, this.ctx.data.uid);
		if (user._id == 0) {
			return {
				errcode: 10005,
			};
		}
		var u = await user.toparam();
		var taskinfo = await global.TaskLogic.loadtask(this.db, this.ctx.data.id);
		console.log(await taskinfo.toparam())
		if (taskinfo._id == "" || taskinfo._id == 0) {
			return {
				errcode: 10024,
			};
		}
		if (taskinfo.tasktype == 0) {
			// 累计任务
			if (u.hasOwnProperty(taskinfo._id)) {
				return {
					errcode: 10025,
				};
			}
			// 0 累计猜对  1 每日登陆  2提现 3看视频  4 金币兑换现金
			if (taskinfo.login == 0) {
				if (user.leijicaiduigequ < taskinfo.num) {
					return {
						errcode: 10026,
					};
				}
			}
			if (taskinfo.login == 2) {
				if (user.leijitixian < taskinfo.num) {
					return {
						errcode: 10026,
					};
				}
			}
			if (taskinfo.login == 3) {
				if (user.leijikanshiping < taskinfo.num) {
					return {
						errcode: 10026,
					};
				}
			}
			if (taskinfo.login == 4) {
				if (user.leijiduihuan < taskinfo.num) {
					return {
						errcode: 10026,
					};
				}
			}
			user[taskinfo._id] = 1
			user.shangcijiangli = taskinfo.coin
			if (taskinfo.rewardtype == 0) {
				user.jianglitype = 'fen'
				user.shangfen(taskinfo.coin)
			} else {
				user.jianglitype = 'coin'
				user.shangcoin(taskinfo.coin)
			}
			if (taskinfo.tixian == 1) {
				user.tixiannum = user.tixiannum + 1
			}
		} else {
			// 每日任务
			var todaytasklogic = await global.TodayTaskLogic.loadtask(this.db, this.ctx.data.uid)
			var tasklogic = await todaytasklogic.toparam();
			if (tasklogic.hasOwnProperty(taskinfo._id)) {
				return {
					errcode: 10025,
				};
			}
			// 0 累计猜对  1 每日登陆  2提现 3看视频  4 金币兑换现金
			if (taskinfo.login == 0) {
				if (todaytasklogic.caige < taskinfo.num) {
					return {
						errcode: 10026,
					};
				}
			}
			if (taskinfo.login == 1) {
				if (todaytasklogic.login < taskinfo.num) {
					return {
						errcode: 10026,
					};
				}
			}
			if (taskinfo.login == 2) {
				if (todaytasklogic.tixian < taskinfo.num) {
					return {
						errcode: 10026,
					};
				}
			}
			if (taskinfo.login == 3) {
				if (todaytasklogic.video < taskinfo.num) {
					return {
						errcode: 10026,
					};
				}
			}
			if (taskinfo.login == 4) {
				if (todaytasklogic.duihuan < taskinfo.num) {
					return {
						errcode: 10026,
					};
				}
			}
			todaytasklogic[taskinfo._id] = 1
			await todaytasklogic.save()
			user.shangcijiangli = taskinfo.coin
			if (taskinfo.rewardtype == 0) {
				user.jianglitype = 'fen'
				user.shangfen(taskinfo.coin)
			} else {
				user.jianglitype = 'coin'
				user.shangcoin(taskinfo.coin)
			}
			if (taskinfo.tixian == 1) {
				user.tixiannum = user.tixiannum + 1
			}
		}
		await user.save();
		await user.load();
		return {
			errcode: 0,
			data: {
				user: await user.toparam(),
				type: taskinfo.rewardtype == 0 ? 'fen' : 'coin',
				coin: taskinfo.coin
			}
		}
	}

	async getrole() {
		if (!this.ctx.data.uid) {
			return {
				errcode: 10001,
			};
		}

		var user = await global.UserLogic.loaduser(this.db, this.ctx.data.uid);
		if (user._id == 0) {
			return {
				errcode: 10005,
			};
		}
		var roles = await global.config.get('roles');
		return {
			errcode: 0,
			data: {
				user: await user.toparam(),
				role: roles
			}
		}
	}

	async role() {
		if (!this.ctx.data.uid) {
			return {
				errcode: 10001,
			};
		}

		var user = await global.UserLogic.loaduser(this.db, this.ctx.data.uid);
		if (user._id == 0) {
			return {
				errcode: 10005,
			};
		}

		if (user.tixiannum <= 0) {
			return {
				errcode: 10027,
			};
		}

		var roles = await global.config.get('roles');
		var arr = [];
		for (var i = 1; i <= 8; i++) {
			var data = {
				"index": i - 1,
				"coin": roles['role' + i]
			};
			var count = Math.floor(roles['gailv' + i]);
			for (var j = 0; j < count; j++) {
				arr.push(data)
			}
		}
		arr.sort(function(a, b) {
			return Math.random() > .5 ? -1 : 1;
		});
		console.log(arr)
		var index = Math.ceil(Math.random() * arr.length);
		var item = arr[index]
		console.log(item)
		var coin = item['coin']
		await user.shangfen(coin)
		user.tixiannum = user.tixiannum - 1
		await user.save();
		await user.load();
		return {
			errcode: 0,
			data: {
				user: await user.toparam(),
				index: item['index'],
				fen: coin
			}
		}
	}

	async duihuan() {
		if (!this.ctx.data.uid) {
			return {
				errcode: 10001,
			};
		}

		var user = await global.UserLogic.loaduser(this.db, this.ctx.data.uid);
		if (user._id == 0) {
			return {
				errcode: 10005,
			};
		}
		var u = await user.toparam()
		var needcoin = await global.config.get('duihuan', 'coin')
		if (u['coin'] < needcoin) {
			return {
				errcode: 10028,
			};
		}
		user.leijiduihuan = user.leijiduihuan + 1
		await user.save()
		var todaytasklogic = await global.TodayTaskLogic.loadtask(this.db, this.ctx.data.uid)
		todaytasklogic.duihuan = todaytasklogic.duihuan + 1
		await todaytasklogic.save()
		await user.xiacoin(needcoin);
		await user.shangfen(1)
		await user.load()
		return {
			errcode: 0,
			data: {
				user: await user.toparam()
			}
		}
	}

	async linghongbao() {
		if (!this.ctx.data.uid || !this.ctx.data.index) {
			return {
				errcode: 10001,
			};
		}

		var user = await global.UserLogic.loaduser(this.db, this.ctx.data.uid);
		if (user._id == 0) {
			return {
				errcode: 10005,
			};
		}
		var u = await user.toparam()
		var lingqutime = user['hongbaotime' + this.ctx.data.index]
		var allhongbao = await global.config.get('hongbao')
		var coin = allhongbao['red' + this.ctx.data.index]['coin']
		var jiange = allhongbao['red' + this.ctx.data.index]['time']
		var now = Math.floor(Date.now() / 1000)
		if (lingqutime + jiange * 60 - now > 0) {
			return {
				errcode: 10029,
			};
		}
		user['hongbaotime' + this.ctx.data.index] = now
		user.shangcijiangli = coin
		user.jianglitype = 'coin'
		await user.shangcoin(coin)
		await user.save()
		await user.load()
		for (var i = 1; i <= 10; i++) {
			allhongbao['red' + i]['lingqu'] = user['hongbaotime' + i]
		}
		return {
			errcode: 0,
			data: {
				user: await user.toparam(),
				coin: coin,
				hongbao: allhongbao
			}
		}
	}

	async loadmine() {
		if (!this.ctx.data.uid) {
			return {
				errcode: 10001,
			};
		}

		var user = await global.UserLogic.loaduser(this.db, this.ctx.data.uid);
		if (user._id == 0) {
			return {
				errcode: 10005,
			};
		}

		if (user.accountstatus == 1 || user.accountstatus == "1") {
			return {
				errcode: 10008,
			};
		}

		var lastqiandaotime = user.qiandaotime
		var now = global.utils.today();
		console.log(now)
		if (lastqiandaotime != 0) {
			if (lastqiandaotime + 24 * 3600 * 1000 < now) {
				user.qiandaotime = 0
				user.lianxuqiandao = 0
				await user.save();
				await user.load();
			}
		}

		var tixian = await global.config.get('tixian')
		var tixianlist = []
		for (var i = 1; i <= 12; i++) {
			var item = tixian['index' + i]
			item['index'] = i
			if (user['tixianindex' + i] == 0) {
				tixianlist.push(item)
			}
		}
		// console.log(tixianlist)
		return {
			errcode: 0,
			data: {
				user: await user.toparam(),
				needsong: await global.config.get('tixiannum', 'liandui'),
				duihuan: await global.config.get('duihuan', 'coin'),
				tixianlist: tixianlist
			}
		};
	}

	async signin() {
		if (!this.ctx.data.uid) {
			return {
				errcode: 10001,
			};
		}

		var user = await global.UserLogic.loaduser(this.db, this.ctx.data.uid);
		if (user._id == 0) {
			return {
				errcode: 10005,
			};
		}

		if (user.accountstatus == 1 || user.accountstatus == "1") {
			return {
				errcode: 10008,
			};
		}

		var lastqiandaotime = user.qiandaotime
		var now = global.utils.today();
		if (lastqiandaotime + 24 * 3600 * 1000 > now) {
			return {
				errcode: 10030,
			};
		}
		if (lastqiandaotime != 0) {
			if (lastqiandaotime + 24 * 3600 * 1000 < now) {
				user.qiandaotime = now
				user.lianxuqiandao = 1
			} else {
				user.qiandaotime = now
				user.lianxuqiandao = user.lianxuqiandao + 1
			}
		} else {
			user.qiandaotime = now
			user.lianxuqiandao = 1
		}
		await user.save();
		await user.load();
		return {
			errcode: 0,
			data: {
				user: await user.toparam()
			}
		};
	}
}
