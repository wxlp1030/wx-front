const {
	Controller
} = require('uni-cloud-router')
const createConfig = require('uni-config-center')
const uniPayConfig = createConfig({
	pluginId: 'uni-pay'
})
const global = require("globalunit");
const wxpay = require("wxpay");
module.exports = class AdminController extends Controller {
	async loadconfig() {
		console.log("this.ctx.data: ",this.ctx.data);
		if (!this.ctx.data.id) {
			return {
				errcode: 10201,
			};
		}
		var GAMENAME = await global.config.get('GAMENAME');
		var config = await this.db.collection(GAMENAME).doc(this.ctx.data.id).get();
		return {
			errcode: 0,
			config: config['data'][0]
		}
	}

	async setconfig() {
		if (!this.ctx.data.json) {
			return {
				errcode: 10201,
			};
		}
		var data = JSON.parse(this.ctx.data.json);
		console.log("datadata-----", data)
		var GAMENAME = await global.config.get('GAMENAME');
		for (let key in data) {
			if (!key || !data[key]) {
				continue;
			}
			for (let key1 in data[key]) {
				var obj = {}
				obj[key1] = data[key][key1]
				var res = await this.db.collection(GAMENAME).doc(key).update(obj)
				if (res.updated != 1) {
					await this.db.collection(GAMENAME).doc(key).set(obj)
				}
			}
		}
		return {
			errcode: 0,
			data:res
		};
	}
	//取消注销账户
	async openUser() {
		if (!this.ctx.data.openUserId) {
			return {
				errcode: 10001,
			};
		}
		var user = await global.UserLogic.loaduser(this.db, this.ctx.data.openUserId);
		if (user._id == 0 || user._id != this.ctx.data.openUserId) {
			return {
				errcode: 10005,
			};
		}

		var res = await this.ctx.uniID.openAccount({
			uid: user._id,
		});
		console.log("res:-------------- ", res);
		await user.save();
		await user.load();
		await global.QueueHelper.putLog(this.db, 'user_login', await user.toparam());

		return {
			errcode: 0,
			data: {
				user: await user.toparam(),
			}
		};
	}
	// 冻结账号
	async fenghao() {
		if (!this.ctx.data.fenghaoid) {
			return {
				errcode: 10001,
			};
		}
		var user = await global.UserLogic.loaduser(this.db, this.ctx.data.fenghaoid);
		console.log(user)
		if (user._id == 0 || user._id != this.ctx.data.fenghaoid) {
			return {
				errcode: 10005,
			};
		}
		if (user.accountstatus == 0 || user.accountstatus == '0') {
			user.accountstatus = 1;
		} else {
			user.accountstatus = 0;
		}
		await user.save();
		return {
			errcode: 0,
			data: {

			}
		};
	}


	// 提现
	async tixian() {
		if (!this.ctx.data.id || !this.ctx.data.type) {
			return {
				errcode: 10001,
			};
		}

		let res = await this.db.collection('withdrawrecord_log').doc(this.ctx.data.id).get();
		console.log(res)
		if (res['data'].length <= 0) {
			return {
				errcode: 10001,
			};
		}
		var data = res['data'][0];
		if (data['status'] != 0 && data['status'] != 3) {
			return {
				errcode: 10022,
			};
		}
		var uid = data['uid']
		var amount = data['count']
		var commission = data['commission']
		var realamount = Number(amount) - Number(commission);
		var index = data['index']
		console.log(realamount, '金额')
		var user = await global.UserLogic.loaduser(this.db, uid);
		if (user._id == 0) {
			return {
				errcode: 10005,
			};
		}

		var tixiantype = await global.config.get('tixiantype', 'type')
		if (this.ctx.data.type == 1) {
			// 同意提现
			if (tixiantype == 'zhifubao') {
				if (user.isfirstwithdraw == 1) {
					user.isfirstwithdraw = 0;
				}
				user.leijitixian = user.leijitixian + 1;
				user['tixianindex' + index] = 1
				var todaytasklogic = await global.TodayTaskLogic.loadtask(this.db, uid)
				todaytasklogic.tixian = todaytasklogic.tixian + 1
				await todaytasklogic.save()
				await user.save();
				await user.load();
				var up = await user.toparam();
				await this.db.collection('withdrawrecord_log').doc(this.ctx.data.id).update({
					status: 1
				});
			} else {

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
				console.log(' 实际金额' + Math.round(realamount * 100))
				let result = await api.transfers({
					partner_trade_no: partner, //订单号
					openid: user.openid,
					re_user_name: user.realname, //真实姓名
					amount: Math.round(realamount * 100),
					desc: '企业付款描述信息'
				});
				console.log(' ceshi jin lai  88888----->')
				console.log(result)

				if (result['return_code'] == 'SUCCESS' && result['result_code'] == 'SUCCESS') {
					if (user.isfirstwithdraw == 1) {
						user.isfirstwithdraw = 0;
					}
					user.leijitixian = user.leijitixian + 1;
					user['tixianindex' + index] = 1
					var todaytasklogic = await global.TodayTaskLogic.loadtask(this.db, uid)
					todaytasklogic.tixian = todaytasklogic.tixian + 1
					await todaytasklogic.save()
					await user.save();
					await user.load();
					var up = await user.toparam();
					await this.db.collection('withdrawrecord_log').doc(this.ctx.data.id).update({
						status: 1
					});

				} else {
					return {
						errcode: 10019,
					};
				}
			}
		} else if (this.ctx.data.type == 2) {
			// 拒绝提现
			await user.shangfen(data['count']);
			await user.save();
			await this.db.collection('withdrawrecord_log').doc(this.ctx.data.id).update({
				status: 2,
				msg: this.ctx.data.msg
			});
		} else {
			await this.db.collection('withdrawrecord_log').doc(this.ctx.data.id).update({
				status: 3
			});
		}
		return {
			errcode: 0,
			data: {

			}
		};
	}

	async createtask() {
		console.log(this.ctx.data)
		console.log(this.ctx.data.tasktype)
		// tasktype: 0, //0 猜歌任务   1 每日任务
		// login: 0, // 0 累计猜对  1 每日登陆
		// title: '', // 任务标题
		// num: 0, // 需要猜对的歌曲数
		// count: '', // 任务内容
		// rewardtype: 0, // 奖励类型   0 现金  1金币
		// coin: 0, // 奖励数量
		// tixian: 0
		if (!this.ctx.data.caozuo) {
			return {
				errcode: 10001,
				msg: 'caozuo'
			};
		}
		if (Number(this.ctx.data.tasktype) != 0 && Number(this.ctx.data.tasktype) != 1) {
			return {
				errcode: 10001,
				msg: 'tasktype'
			};
		}
		if (Number(this.ctx.data.login) > 4 || Number(this.ctx.data.login) < 0) {
			return {
				errcode: 10001,
				msg: 'login'
			};
		}
		if (!this.ctx.data.title) {
			return {
				errcode: 10001,
				msg: 'title'
			};
		}
		if (!this.ctx.data.num) {
			return {
				errcode: 10001,
				msg: 'num'
			};
		}
		if (Number(this.ctx.data.rewardtype) != 0 && Number(this.ctx.data.rewardtype) != 1) {
			return {
				errcode: 10001,
				msg: 'rewardtype'
			};
		}
		if (!this.ctx.data.coin) {
			return {
				errcode: 10001,
				msg: 'coin'
			};
		}
		if (Number(this.ctx.data.tixian) != 0 && Number(this.ctx.data.tixian) != 1) {
			return {
				errcode: 10001,
				msg: 'tixian'
			};
		}

		if (this.ctx.data.caozuo == 'change') {
			if (!this.ctx.data._id) {
				return {
					errcode: 10001,
					msg: '_id'
				};
			}
		}

		var data = {
			tasktype: Number(this.ctx.data.tasktype),
			login: Number(this.ctx.data.login),
			num: Number(this.ctx.data.num),
			title: this.ctx.data.title,
			count: this.ctx.data.count,
			rewardtype: Number(this.ctx.data.rewardtype),
			coin: Number(this.ctx.data.coin),
			tixian: Number(this.ctx.data.tixian),
		}
		if (this.ctx.data.caozuo == 'add') {
			await global.TaskLogic.createtask(this.db, data);
		}
		if (this.ctx.data.caozuo == 'change') {
			data['id'] = this.ctx.data._id
			var ok = await global.TaskLogic.changetask(this.db, data);
			if (ok == 'ng') {
				return {
					errcode: 10001,
				};
			}
		}
		return {
			errcode: 0,
			data: {

			}
		};
	}

	async deltask() {
		if (!this.ctx.data.id) {
			return {
				errcode: 10001,
			};
		}
		await this.db.collection('taskinfo').doc(this.ctx.data.id).remove();
		return {
			errcode: 0,
			data: {

			}
		};
	}

	async createaudio() {
		console.log(this.ctx.data)


		if (this.ctx.data.caozuo == 'change') {
			if (!this.ctx.data._id) {
				return {
					errcode: 10001,
					msg: '_id'
				};
			}
		}

		if (Number(this.ctx.data.correct) <= 0 || Number(this.ctx.data.correct) > 3) {
			return {
				errcode: 10001,
				msg: 'correct'
			};
			return;
		}

		if (this.ctx.data.caozuo == 'add') {
			await this.db.collection('songlist').add({
				url: this.ctx.data.url,
				daan1: this.ctx.data.daan1,
				daan2: this.ctx.data.daan2,
				daan3: this.ctx.data.daan3,
				correct: Number(this.ctx.data.correct),
				createtime: Math.floor(Date.now() / 1000)
			})
		}
		if (this.ctx.data.caozuo == 'change') {
			var ok = await this.db.collection('songlist').doc(this.ctx.data._id).update({
				url: this.ctx.data.url,
				daan1: this.ctx.data.daan1,
				daan2: this.ctx.data.daan2,
				daan3: this.ctx.data.daan3,
				correct: Number(this.ctx.data.correct)
			})
			if (ok.updated != 1) {
				await this.db.collection('songlist').doc(this.ctx.data._id).set({
					url: this.ctx.data.url,
					daan1: this.ctx.data.daan1,
					daan2: this.ctx.data.daan2,
					daan3: this.ctx.data.daan3,
					correct: Number(this.ctx.data.correct),
					createtime: Math.floor(Date.now() / 1000)
				})
			}
		}
		return {
			errcode: 0,
			data: {

			}
		};
	}

	async delaudio() {
		if (!this.ctx.data.id) {
			return {
				errcode: 10001,
			};
		}
		await this.db.collection('songlist').doc(this.ctx.data.id).remove();
		return {
			errcode: 0,
			data: {

			}
		};
	}

	async changehongbao() {

		var data = {}
		data[this.ctx.data.key] = {}
		data[this.ctx.data.key]['coin'] = Number(this.ctx.data.coin)
		data[this.ctx.data.key]['time'] = Number(this.ctx.data.time)
		console.log(data)
		await this.db.collection('gameconfig').doc('hongbao').update(data);
		return {
			errcode: 0,
			data: {

			}
		};
	}

	async changeroles() {
		if (!this.ctx.data.json) {
			return {
				errcode: 10001,
			};
		}
		console.log(this.ctx.data.json)
		var data = JSON.parse(this.ctx.data.json);
		await this.db.collection('gameconfig').doc('roles').update(data);

		return {
			errcode: 0,
			data: {

			}
		};
	}

	async gettixianrole() {
		var res = await this.db.collection('gameconfig').doc('tixian').get();
		console.log(res)
		if (res.data.length > 0) {
			var item = res.data[0];
			var num = 0
			for (var x in item) {
				if (x != '_id') {
					num += 1
				}
			}
			var arr = []
			for (var i = 1; i <= num; i++) {
				var data = item['index' + i]
				data['key'] = 'index' + i
				arr.push(data)
			}
			return {
				errcode: 0,
				data: {
					list: arr
				}
			};
		} else {
			return {
				errcode: 0,
				data: {
					list: []
				}
			};
		}
	}

	async changetixianrole() {

		var data = {}
		data[this.ctx.data.key] = {}
		data[this.ctx.data.key]['coin'] = Number(this.ctx.data.coin)
		data[this.ctx.data.key]['leijicaidui'] = Number(this.ctx.data.leijicaidui)
		data[this.ctx.data.key]['liandui'] = Number(this.ctx.data.liandui)
		data[this.ctx.data.key]['qiandao'] = Number(this.ctx.data.qiandao)
		data[this.ctx.data.key]['video'] = Number(this.ctx.data.video)
		console.log(data)
		await this.db.collection('gameconfig').doc('tixian').update(data);
		return {
			errcode: 0,
			data: {

			}
		};
	}
}
