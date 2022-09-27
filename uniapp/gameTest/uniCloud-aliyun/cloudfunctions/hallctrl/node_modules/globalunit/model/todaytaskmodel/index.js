"use strict";
const config = require("../../utils/config");
const DBPOB = require("../dbpob");
const Decimal = require("../../utils/decimal");
const QueueHelper = require("../../utils/queuehelper");
module.exports = class todaytaskmodel extends DBPOB {

	constructor(_db,_id) {
		super(_db,'todaytaskinfo', _id);
		this._id 		          = '';
		this.createtime           = 0;
        this.caige                = 0;
        this.login                = 1;
        this.tixian               = 0;
        this.video                = 0;
        this.duihuan              = 0;
        this.sign1                = 0;   
        this.sign2                = 0;
        this.sign3                = 0;
        this.sign4                = 0;
        this.sign5                = 0;
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
