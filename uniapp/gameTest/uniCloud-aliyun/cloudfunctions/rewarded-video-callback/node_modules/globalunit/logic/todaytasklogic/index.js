"use strict";
const config = require("../../utils/config");
const todaytaskmodel = require("../../model/todaytaskmodel");
const Utils = require("../../utils/utils");
module.exports = class todaytasklogic {
    static async getkey(id) {
        var key = id + ':dialytask:' + Utils.today();
        return key;
    }
    static async loadtask(db, uid) {
        var key = await this.getkey(uid);
        var task = new todaytaskmodel(db, key);
        await task.load();
        if(task._id == ""){
            task._id = key
            await task.save();
        }
        return task;
    }
}
