"use strict";
var QueueHelper = require("../queuehelper");
module.exports = class utils {
	
    static getHours(){
        var myDate = new Date();
        return myDate.getHours();
    }
    
	static today() {
		return new Date().setHours(0, 0, 0, 0);
	}
	
	static tomorrow() {
		var today = this.today();
		var tomorrow = today+24*60*60*1000;
		return tomorrow;
	}
	
	static getRandom(min, max) {
		min = Math.ceil(min);
		max = Math.floor(max);
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}
	
	static random(lower, upper) {
		return Math.floor(Math.random() * (upper - lower)) + lower;
	}

	static sprintf()
	{
	    var arg = arguments,
	        str = arg[0] || '',
	        i, n;
	    for (i = 1, n = arg.length; i < n; i++) {
	        str = str.replace(/%s/, arg[i]);
	    }
	    return str;
	}
    
    static generateMixed(n){
        var chars = ['0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
        var res = "";
        for(var i = 0; i < n ; i ++) {
            var id = Math.ceil(Math.random()*35);
            res += chars[id];
        }
        return res;
    }
}
