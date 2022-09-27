"use strict";
const config = require("../../utils/config");
const DBPOB = require("../dbpob");
const Decimal = require("../../utils/decimal");
const QueueHelper = require("../../utils/queuehelper");
module.exports = class taskmodel extends DBPOB {

	constructor(_db,_id) {
		super(_db,'taskinfo', _id);
		this._id 		         = '';
		this.createtime          = 0;
		this.tasktype            = 0;  //0 猜歌任务   1 每日任务
        this.login               = 0;  // 0 累计猜对  1 每日登陆  2提现 3看视频  4 金币兑换现金
        this.title               = ''; // 任务标题
        this.num                 = 0;  // 需要猜对的歌曲数
        this.count               = ''  // 任务内容
        this.rewardtype          = 0   // 奖励类型   0 现金  1金币
        this.coin                = 0   // 奖励数量
        this.tixian              = 0   // 是否有提现机会   0 没有  1有
	}

	async save() 
	{
		//字段单独处理
		await this.preservation();
	}
	
	async toparam()
	{
		var data = this.toarray();
		//截取数据
		// var fangda = await config.get('fangda') || 1000;
		// data['fen'] = data['fen']/fangda;
  //       data['coin'] = data['coin']/fangda;
		data['id'] = this._id
		return data;
	}
	
}
