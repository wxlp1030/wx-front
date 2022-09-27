"use strict";
const config = require("../../utils/config");
const taskmodel = require("../../model/taskmodel");
const Utils = require("../../utils/utils");
module.exports = class tasklogic {
    static async loadtask(db, id) {
        var task = new taskmodel(db, id);
        //先装载
        await task.load();
        return task;
    }

    static async createtask(db, data) {
        var id = Date.now() + Utils.generateMixed(10);
        var task = await this.loadtask(db, id);
        if (task._id == "") {
            task._id = id;
        }
        task.createtime = Math.floor(Date.now() / 1000);
        
        task.tasktype            = data.tasktype;  //0 猜歌任务   1 每日任务
        task.login               = data.login;  // 0 累计猜对  1 每日登陆
        task.title               = data.title; // 任务标题
        task.num                 = data.num;  // 需要猜对的歌曲数
        task.count               = data.count  // 任务内容
        task.rewardtype          = data.rewardtype   // 奖励类型   0 现金  1金币
        task.coin                = data.coin   // 奖励数量
        task.tixian              = data.tixian
        await task.save();
    }
    
    static async changetask(db, data){
        var task = await this.loadtask(db, data['id']);
        if (task._id == "") {
            return 'ng'
        }
        task.tasktype            = data.tasktype;  //0 猜歌任务   1 每日任务
        task.login               = data.login;  // 0 累计猜对  1 每日登陆
        task.title               = data.title; // 任务标题
        task.num                 = data.num;  // 需要猜对的歌曲数
        task.count               = data.count  // 任务内容
        task.rewardtype          = data.rewardtype   // 奖励类型   0 现金  1金币
        task.coin                = data.coin   // 奖励数量
        task.tixian              = data.tixian
        await task.save();
        return 'ok'
    }
    
    static async getalltask(db,type){
        var dbCmd = db.command
        let res = await db.collection('taskinfo').where({tasktype:dbCmd.eq(type)}).get();
        if(res.data && res.data.length > 0){
            return res.data;
        }else{
            return [];
        }
    }
}
