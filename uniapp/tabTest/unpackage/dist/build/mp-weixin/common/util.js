"use strict";exports.friendlyDate=function(o){var n=Date.now(),r=Math.floor((n-o)/1e3),t=Math.floor(r/60),e=Math.floor(t/60),a=Math.floor(e/24),h=Math.floor(a/30),f=Math.floor(h/12),l="",u=0;return f>0?(l="year",u=f):h>0?(l="month",u=h):a>0?(l="day",u=a):e>0?(l="hour",u=e):t>0?(l="minute",u=t):(l="second",u=0===r?r=1:r),{year:"%n% 年前",month:"%n% 月前",day:"%n% 天前",hour:"%n% 小时前",minute:"%n% 分钟前",second:"%n% 秒前"}[l].replace("%n%",u)};
