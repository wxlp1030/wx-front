"use strict";var e=require("../../common/vendor.js");const t={props:{newsItem:{type:Object,default:function(e){return{}}}},methods:{click(){this.$emit("click")},close(e){e.stopPropagation(),this.$emit("close")}}};var s=e._export_sfc(t,[["render",function(t,s,m,n,i,c){return e.e({a:e.t(m.newsItem.title),b:1===m.newsItem.article_type||2===m.newsItem.article_type?1:"",c:m.newsItem.image_list||m.newsItem.image_url},m.newsItem.image_list||m.newsItem.image_url?e.e({d:m.newsItem.image_url},m.newsItem.image_url?{e:1===m.newsItem.article_type||2===m.newsItem.article_type?1:"",f:m.newsItem.image_url}:{},{g:m.newsItem.image_list},m.newsItem.image_list?{h:e.f(m.newsItem.image_list,((e,t,s)=>({a:e.url,b:t})))}:{},{i:2===m.newsItem.article_type?1:"",j:1===m.newsItem.article_type?1:""}):{},{k:1===m.newsItem.article_type||2===m.newsItem.article_type?2===m.newsItem.article_type?"row":"row-reverse":"column",l:e.t(m.newsItem.source),m:e.t(m.newsItem.comment_count),n:e.t(m.newsItem.datetime),o:e.o(((...e)=>c.close&&c.close(...e))),p:e.o(((...e)=>c.click&&c.click(...e)))})}],["__scopeId","data-v-63cb9c64"]]);wx.createComponent(s);
