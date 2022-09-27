"use strict";
const config = require("../../utils/config");
const usermodel = require("../../model/usermodel");
module.exports = class userlogic {
	static async loaduser(db,uid) {
		var user = new usermodel(db,uid);
		//先装载
		await user.load();
		return user;
	}
}