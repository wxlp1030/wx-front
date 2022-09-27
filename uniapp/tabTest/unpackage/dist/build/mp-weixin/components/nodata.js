"use strict";var t=require("../common/vendor.js");const e={name:"nodata",data:()=>({textTypes:{none:"暂无网络"},isConnected:!1,networkType:"none"}),mounted(){this.isIOS="ios"===t.index.getSystemInfoSync().platform,t.index.onNetworkStatusChange((t=>{this.isConnected=t.isConnected,this.networkType=t.networkType})),t.index.getNetworkType({success:t=>{this.networkType=t.networkType}})},methods:{retry(){this.$emit("retry")},async openSettings(){"none"!=this.networkType||this.openSystemSettings()},openAppSettings(){this.gotoAppSetting()},openSystemSettings(){this.isIOS?this.gotoiOSSetting():this.gotoAndroidSetting()},network(){var t=null,e=plus.ios.newObject("CTCellularData"),n=e.plusGetAttribute("restrictedState");return 0==n?(t=null,console.log("StateUnknown")):2==n?(t=1,console.log("已经开启了互联网权限:NotRestricted")):1==n&&(t=2,console.log("Restricted")),plus.ios.deleteObject(e),t},gotoAppSetting(){if(this.isIOS){var t=plus.ios.import("UIApplication").sharedApplication(),e=plus.ios.import("NSURL"),n=e.URLWithString("app-settings:");t.openURL(n),plus.ios.deleteObject(n),plus.ios.deleteObject(e),plus.ios.deleteObject(t)}else{var o=plus.android.importClass("android.content.Intent"),i=plus.android.importClass("android.provider.Settings"),s=plus.android.importClass("android.net.Uri"),r=plus.android.runtimeMainActivity(),p=new o;p.setAction(i.ACTION_APPLICATION_DETAILS_SETTINGS);var a=s.fromParts("package",r.getPackageName(),null);p.setData(a),r.startActivity(p)}},gotoiOSSetting(){var t=plus.ios.import("UIApplication").sharedApplication(),e=plus.ios.import("NSURL"),n=e.URLWithString("App-prefs:root=General");t.openURL(n),plus.ios.deleteObject(n),plus.ios.deleteObject(e),plus.ios.deleteObject(t)},gotoAndroidSetting(){var t=plus.android.importClass("android.content.Intent"),e=plus.android.importClass("android.provider.Settings"),n=plus.android.runtimeMainActivity(),o=new t(e.ACTION_SETTINGS);n.startActivity(o)}}};var n=t._export_sfc(e,[["render",function(e,n,o,i,s,r){return t.e({a:t.t(s.textTypes[s.networkType]),b:"none"!=s.networkType},"none"!=s.networkType?{c:t.o(((...t)=>r.retry&&r.retry(...t)))}:{},{d:"none"==s.networkType},"none"==s.networkType?{e:t.o(((...t)=>r.openSettings&&r.openSettings(...t)))}:{})}]]);wx.createComponent(n);
