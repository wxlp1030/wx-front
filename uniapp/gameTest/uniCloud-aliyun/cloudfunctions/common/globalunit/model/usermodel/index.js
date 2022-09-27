"use strict";
const config = require("../../utils/config");
const DBPOB = require("../dbpob");
const Decimal = require("../../utils/decimal");
const QueueHelper = require("../../utils/queuehelper");
module.exports = class usermodel extends DBPOB {

    constructor(_db, _id) {
        super(_db, 'userinfo', _id);
        this._id = 0;
        this.createtime = 0;
        this.phone = 0;
        this.sex = 0;
        this.password = '';
        this.realname = ''; // 真实姓名
        this.nickname = ''; // 昵称
		  this.avatar = '';
        // this.avatar = 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-f184e7c3-1912-41b2-b81f-435d1b37c7b4/536fbc2c-31f0-41e1-9d51-3c4fb82f27c0.png';
        this.shangji = 0;
        this.bindtime = 0;
        this.level = 0;
        this.coin = 0; // 金币
        this.accountstatus = 0; // 玩家状态 是否封号，暂留  0未封号, 1封号
        this.lastlogintime = 0;
        this.isauthentication = 0; // 是否实名认证
        this.isjihuo = 0; // 是否激活
        this.idcard = ''; // 身份证号
        this.fen = 0; // 可以提现的金额
        this.weixinid = ''; // 微信号
        this.qqid = ''; // QQ号
        this.isfirstwithdraw = 1; // 是否首次提现
        this.ip = ""; // ip 地址
        this.zhifubao = '';
        this.openid = ''; // 微信openid
        this.lastonlinetime = 0; // 最后一次在线时间
        this.inviteCode = '' // 新增自己邀请码

        this.firstjiangli    = 0 //首次领取5首歌奖励
        this.leijicaiduigequ = 0; // 累计猜对歌曲
        this.leijitixian = 0; // 累计提现
        this.leijikanshiping = 0; //累计看视频
        this.leijiduihuan = 0; //累计金币兑换现金次数
        this.leijiliandui = 0; //累计连对
        this.leijiliandui1 = 0; //连续猜对断开零时存数据
        
        this.lianxuqiandao  = 0; //连续签到天数
        this.qiandaotime = 0; //签到时间

        this.index = 1; //猜歌第几首
        this.liandui = 0; //连续猜对多少首歌曲
        this.liandui1 = 0; //连续猜对断开零时存数据
        this.tixiannum = 0; //可以提现次数 
        this.tixiancaidui = 0; //提现猜对的歌曲数

        this.shangcijiangli = 0; //上次奖励
        this.jianglitype = ''; //奖励类型

        for (var i = 1; i <= 10; i++) {
            this['hongbaotime' + i] = 0
        }
        
        for (var i = 1; i <= 12; i++) {
            this['tixianindex' + i] = 0
        }
    }

    async save() {
        //字段单独处理
        await this.preservation({
            fen: 1,
            coin: 1,
        });
    }

    async toparam() {
        var data = this.toarray();
        //截取数据
        var fangda = await config.get('fangda') || 1000;
        data['fen'] = data['fen'] / fangda;
        data['coin'] = data['coin'] / fangda;
        data['id'] = this._id
        return data;
    }

    async shangcoin(coin, goldname = 'coin') {
        var fangda = await config.get('fangda') || 1000;
        coin = coin * fangda;
        coin = Math.floor(coin);

        const dbCmd = this._db.command;
        var obj = {};
        obj[goldname] = dbCmd.inc(coin);
        let res = await this._db.collection(this._table).doc(this._docId).update(obj);
    }


    async xiacoin(coin, goldname = 'coin') {
        var fangda = await config.get('fangda') || 1000;
        coin = coin * fangda;
        coin = Math.floor(coin);

        const dbCmd = this._db.command;
        const transaction = await this._db.startTransaction();
        var obj = {};
        obj[goldname] = dbCmd.inc(-coin);
        try {
            let dbdata = await transaction.collection(this._table).doc(this._docId).get();
            if (dbdata.data) {
                let has = dbdata.data[goldname];
                if (has - coin >= 0) {
                    let res = await transaction.collection(this._table).doc(this._docId).update(obj);

                    await transaction.commit();
                    return {
                        ok: 'ok'
                    };
                } else {
                    return {
                        ok: 'ng'
                    };
                }
            } else {
                return {
                    ok: 'ng'
                };
            }
        } catch (e) {
            await transaction.rollback()
            return {
                ok: 'ng'
            };
        }
    }

    async shangfen(fen, goldname = 'fen') {
        var fangda = await config.get('fangda') || 1000;
        fen = fen * fangda;
        fen = Math.floor(fen);

        const dbCmd = this._db.command;
        var obj = {};
        obj[goldname] = dbCmd.inc(fen);
        let res = await this._db.collection(this._table).doc(this._docId).update(obj);
    }



    async xiafen(fen, goldname = 'fen') {
        var fangda = await config.get('fangda') || 1000;
        fen = fen * fangda;
        fen = Math.floor(fen);

        const dbCmd = this._db.command;
        const transaction = await this._db.startTransaction();
        var obj = {};
        obj[goldname] = dbCmd.inc(-fen);
        try {
            let dbdata = await transaction.collection(this._table).doc(this._docId).get();
            if (dbdata.data) {
                let has = dbdata.data[goldname];
                if (has - fen >= 0) {
                    let res = await transaction.collection(this._table).doc(this._docId).update(obj);

                    await transaction.commit();
                    return {
                        ok: 'ok'
                    };
                } else {
                    return {
                        ok: 'ng'
                    };
                }
            } else {
                return {
                    ok: 'ng'
                };
            }
        } catch (e) {
            await transaction.rollback()
            return {
                ok: 'ng'
            };
        }
    }

}
