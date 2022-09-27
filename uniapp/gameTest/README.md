## 介绍

有奖猜歌游戏是一款基于uni-app、uniCloud、uniAD 开发的小游戏，通过猜歌曲、观看广告赚取现金奖励。

本游戏基本特征如下：
- 玩家可以通过猜歌、做任务等方式直接获取现金奖励
- 玩家可以通过猜歌、拆红包、做任务等方式获取金币奖励，当金币累积到一定数量可以兑换现金
- 玩家可以通过做带有抽奖字样的任务获取现金抽奖次数
- 现金抽奖次数可以通过大转盘获取不等额的现金
- 玩家每猜对一首歌曲，会显示连对，连续猜对会有更多奖励，并可以通过观看激励视频广告获取不同倍数的奖励
- 玩家猜错歌曲可以通过观看激励视频广告复活一次，否则连对奖励会重置，不能得到任何奖励
- 当达成一定条件玩家可以从游戏现金账户提现不等额的现金


## 体验地址


#### 安卓体验包下载地址：[Android安装包](https://vkceyugu.cdn.bspapp.com/VKCEYUGU-c26ec39a-f602-435d-b8bb-0453aa221eb0/0eac5540-272d-417d-b5f8-329a3dfa792e.apk)
#### 微信小程序体验：

<img src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-f184e7c3-1912-41b2-b81f-435d1b37c7b4/9644b21a-b23f-4062-b9a9-bc145de708ff.jpg" style="max-width:10vw"></img>


**如果不喜欢折腾音乐版权问题，也有简单的猜字谜项目模板。[https://ext.dcloud.net.cn/plugin?id=7996](https://ext.dcloud.net.cn/plugin?id=7996)**


###  DCloud网赚游戏交流群，欢迎大家加入！

交流群1：645630288（已满）   <a target="_blank" href="https://qm.qq.com/cgi-bin/qm/qr?k=LzE3YTjyZ0bSVbsYjohkfA3Qzlp5rlMV&jump_from=webapi"><img border="0" src="//pub.idqqimg.com/wpa/images/group.png" alt="DCloud网赚游戏交流群" title="DCloud网赚游戏交流群"></a>

交流群2：711753236   <a target="_blank" href="https://qm.qq.com/cgi-bin/qm/qr?k=UVxKKUluBQUz6xBcYBxJHbaSANFBzjwZ&jump_from=webapi"><img border="0" src="//pub.idqqimg.com/wpa/images/group.png" alt="DCloud网赚游戏2群" title="DCloud网赚游戏2群"></a>

加群时请备注你的DCloud appid，[什么是DCloud appid说明](https://ask.dcloud.net.cn/article/35907)。


游戏界面如下：

![图片链接](https://vkceyugu.cdn.bspapp.com/VKCEYUGU-70e7b78f-aa81-491b-8e2c-27950d1f7c43/2b378cff-bf62-46e0-9738-f498c84955cb.png)
![图片链接](https://vkceyugu.cdn.bspapp.com/VKCEYUGU-70e7b78f-aa81-491b-8e2c-27950d1f7c43/cdef9e9c-2743-485c-a978-7bcfd3aacb71.png)


## 项目优势

1. 对于只懂js的开发者，可以独立从事网赚、零撸创业。前端到后端都是js，源码拿走就能用
2. 本项目基于serverless，永远不必担心服务器扛不住、不必为服务器开发技术不到位而操心、不必为运维操心、不必打各种补丁、不必做硬件扩容、不必管ddos攻击...
	这么好的服务器，会很贵吗？答案是：uniCloud的阿里云版完全免费。而腾讯云版的价格也远低于传统云的虚拟机。
3. DCloud提供从技术、到二开（由授权合作伙伴提供二次开发）、到变现、到运营的一条龙创业辅助。

网赚创业，从这里开始！


## 项目构成


前端基于uni-app开发，后端基于[uniCloud](https://uniapp.dcloud.net.cn/uniCloud/README)开发

整个有奖猜歌游戏，有2个项目，复用同一个uniCloud空间。一个项目是App端，另一个项目是管理端。

管理端面向开发商的运营人员使用，设置游戏参数，查看玩家日志，审批提现等，**admin管理后台是另外插件**: [https://ext.dcloud.net.cn/plugin?id=4825](https://ext.dcloud.net.cn/plugin?id=4825)

本插件即为App端，面向手机用户使用，功能包括：
- 有奖猜歌游戏全部由 uni-app 开发，熟悉 uni-app 开发的同学可以直接上手修改源码
- 账户系统：基于[uni-id](https://uniapp.dcloud.net.cn/uniCloud/uni-id)的账户体系，登陆注册一应俱全。
- 广告变现系统：包括开屏、激励视频、信息流。激励视频广告，是网赚行业价值链的顶端。详见[uni-ad广告联盟](https://uniad.dcloud.net.cn/)
- 防刷系统：前端代码加密、客户端证书校验、模拟器/root/网络代理识别 [详见](https://uniapp.dcloud.net.cn/api/a-d/rewarded-video?id=%e5%ae%89%e5%85%a8%e6%b3%a8%e6%84%8f)
- 支付结算系统：计算用户收益，及用户的上线收益，支持用户提现、微信自动转账。它基于[uniPay](https://uniapp.dcloud.net.cn/uniCloud/unipay)


### 【猜歌游戏规则说明】：

[猜歌游戏规则说明](http://static-3469aac7-a663-4c5d-8ee8-94275f8c09ab.bspapp.com/markdown-share-docs/f3b0a520be295af7b8360e3a269b30e1/)


### 【正式商用部署流程(完整版)】：
[正式商用部署流程(完整版)](http://static-3469aac7-a663-4c5d-8ee8-94275f8c09ab.bspapp.com/markdown-share-docs/cd1d9aa27af8845e932908f4818c736b/)


#### 一键更新此插件

一键更新此插件：在项目根目录package.json右键点击，“从插件市场更新”。

> 注意：更新合并时，去掉勾选 `uni_modules` --》 `uni-config` --》 `uniCloud` --》 ... --》 `uni-id`和 `uni-pay`，以及`manifest.json`，防止配置文件被重置，需要重新配置。更新后注意检查其他配置文件。


为了方便快速体验此游戏，本文档部署流程分为：**真机体验快速部署流程**（尽量减少各项配置，目的快速完成部署体验此游戏）和**正式商用部署流程**（需要申请各项配置，等待审核周期长），请根据自身需求选择。


## 真机体验快速部署流程


### 1. 开通uniCloud

- 开通uniCloud：本项目是云端一体的，它的云端代码需要部署在uniCloud云服务空间里，需要开通uniCloud。在[https://unicloud.dcloud.net.cn/](https://unicloud.dcloud.net.cn/)登录，按云厂商要求进行实名认证。
- 在uniCloud认证通过后，创建一个服务空间给本项目使用。选择阿里云或腾讯云均可。[参考](https://uniapp.dcloud.net.cn/uniCloud/price)
- 使用HBuilderX 3.1以上版本（最好是最新版），把本项目导入到HBuilderX中，在项目根目录uniCloud上点右键菜单，关联服务空间 -> 选择之前创建的服务空间


#### 2. 开通App一键登陆

App登录分一键登陆和微信登录两种方式。初期体验时在微信申请登录很麻烦，可以先开通一键登陆快速体验。一键登陆是运营商提供的、比短信验证码更方便、更安全、更便宜的方案。[详见](https://uniapp.dcloud.net.cn/univerify)。

- manifest.json -> App模块配置 -> OAuth（登录鉴权）-> 一键登录，点击后面的`开通配置`
- 在随后打开的web界面中，同意协议，并点击充值按钮充值。如只是测试，可以只充值1元钱。
- 如果你已经确定包名，则可以在web界面点击“添加应用”，提交审核。这个是正式打包必须的。真机运行可以跳过此环节。
- 记住页面上展示的`apiKey`和`apiSecret`，下一步需要用到。



#### 3. uni-id里配置一键登录

打开文件 `uniCloud` --> `cloudfunctions` --> `common` -->  `uni-config-center` -->  `uni-id` --> `config.json`，

找到如下节点：`service` --> `univerify`，填写`appid`、`apiKey`和 `apiSecret`。`appid`就是`manifest`里的`appid`。`apiKey`和`apiSecret`则是从上一步的web界面得来的。


#### 4. 初始化数据库和上传云函数
 
方式一：
- 在项目`uniCloud`目录-->`database`-->`db_init.json`文件，右键选择 “初始化云数据库”。
- 在`database`目录，右键选择 “上传所有数据集合Schema及扩展校验函数”。
- 在`uniCloud` -> `cloudfunctions`目录右键，选择 “上传所有云函数、公共模块及actions”。


方式二：
- 在项目`uniCloud`目录右键，选择“运行云服务空间初始化向导”，点击“下一步”，点击“开始部署”。



#### 5. 真机运行

到此为止，就可以真机运行跑起来了。使用一键登录，就可以开始体验有奖猜歌游戏。

这里运行的广告，是测试广告位，不会产生真实收益。

如果你要商用，还得申请各种资质。具体见下一章文档。

注意：真机运行需要制作自定义基座，制作后选择运行到自定义基座。[什么是自定义调试基座及使用说明](https://ask.dcloud.net.cn/article/35115)



## 正式商用部署流程

在完成真机运行的基础之上，可继续如下流程。

### 准备工作

有奖猜歌游戏投入运营前，需完成如下准备工作：

首先确定App的应用名称、包名、证书，后续在各个三方服务申请时，都需要包名和证书摘要。并且注意在HBuilderX中打包时，必须使用相同的包名和证书。

应用名称在`manifest`里设置，注意不要包含“游戏”字样，否则上架应用商店时可能会被要求提供游戏版号。请以应用的名义上架。

- 申请软件著作权：开通广告必须要求软著。加入DCloud软著优惠加急申请QQ专用群：893532138
- 申请uniAD：开通增强广告，申请激励视频的广告位，详见[uniAD官网](https://uniad.dcloud.net.cn)
- 申请一键登录：在 manifest.json -> App模块配置 -> OAuth（登录鉴权）-> 一键登录，点击后面的`开通配置`，在打开的web页面添加应用，充值。
- 申请微信登录：在**微信开放平台**申请移动应用，获得的appid和appsecret，用于微信登录、微信分享。[微信开放平台](https://open.weixin.qq.com/)
> 申请要求提供应用官网，如果还是没有官网的同学，可加入网赚游戏交流群，群号：645630288，私信群管理【DCloud_Anne】提供你的HBuilder账号和appid，**申请有奖猜歌游戏官网模板**。[有奖猜歌官网预览地址](https://static-f4cb9299-7a3a-40d0-b168-61319ddf09cc.bspapp.com)
- 提现方式有两种选择：微信企业付款到零钱和个人支付宝批量转账方式。**暂时无法开通微信商户支付的用户可选择个人支付宝方式转账**。选择微信提现方式，需要申请微信提现：用于将网赚激励直接打款到手机用户的微信零钱中。在微信商户平台申请，需要完成企业资质认证，在产品中心，开通企业付款到零钱功能：微信官方要求需要有90天注册时长，近30天连续业务流水，并状态良好的账号方可开通。[微信支付商户平台](https://pay.weixin.qq.com/)。



微信 appid 申请步骤：[https://ask.dcloud.net.cn/article/208](https://ask.dcloud.net.cn/article/208)。

iOS平台微信SDK配置通用链接：[https://ask.dcloud.net.cn/article/36445](https://ask.dcloud.net.cn/article/36445)。

Android平台云端打包证书使用说明：[https://ask.dcloud.net.cn/article/35985](https://ask.dcloud.net.cn/article/35985)


以上业务都有审核周期，请提前处理。


#### 开通广告所需条件

1. 开通快手广告：需要提供软著和合作授权书（授权书在uniAD申请后台获取，需要签字盖章上传）
2. 开通优量汇广告：需要上架应用商店和软著
3. 开通穿山甲广告：需要具备公司资质，需要上架和软著
4. 百度百青藤广告联盟：支持开屏、插屏、激励视频广告，请使用HBuilder3.4.0版本以上进行打包，[开通百度广告，空包签名教程](https://ask.dcloud.net.cn/article/39710)
5. 华为广告联盟（Android平台）： 包括开屏、信息流、插屏、激励视频广告，请使用HBuilder3.4.0版本以上进行打包
6. 互动游戏：已开通优量汇、穿山甲、快手其中一个，即可去uni—AD后台申请开通，需要3-5个工作日才有反馈结果。[互动游戏详见](https://uniapp.dcloud.net.cn/api/a-d/interactive)
7. 开通sigmob：无上架要求，无需软著，仅支持激励视频。在uni-AD后台点击申请，[sigmob打包配置详见](https://uniapp.dcloud.net.cn/api/a-d/rewarded-video?id=manifest)
8. [uni-ad支持微信小程序广告](https://uniapp.dcloud.io/component/ad-weixin.html)，在uni-ad后台可申请开通


> 注： Sigmob属于小型广告联盟，收益偏低。如有条件，还需开通优量汇，快手等广告渠道以便提高收益
> 
> HBuilderX3.4.0+已支持自动配置插屏广告（无需额外开发）。在应用启动或应用后台切到前台的场景时，开屏广告展示过后进入到应用内立即展示插屏广告。您可在uniAD后台“APP增强广告开屏管理”中配置该功能开启或者关闭。
> 
> 华为广告需开发者在华为应用市场上架，且华为广告目前只展示在华为手机上。华为广告的收益相对较高，但华为广告接入标准较严，如应用不符合平台接入标准会被拒审。
> 
> 为了广告收益最大化，uniAD建议您的应用至少要开通3家以上广告渠道（能多开就多开），只有开通3家以上广告渠道后优化算法才能有效启动。



有奖猜歌游戏开发完成后，需要开通广告，推荐流程为：申请软著 -> 开通快手广告 ->上架应用市场 -> 开通优量汇广告 ->若有公司资质可开通穿山甲广告。



### 配置参数

先部署有奖猜歌前端项目，再到[有奖猜歌游戏管理后台](https://ext.dcloud.net.cn/plugin?id=4825)自行配置广告位和游戏相关参数


#### 1. manifest.json配置

完成如下配置：


- App模块配置 --> OAuth（登录鉴权）--> 勾选微信登录 --> 填写`appid`、`appsecret`、`ios平台通用链接`。
- App模块配置 --> Share（分享）--> 勾选`微信分享`，填写`appid`、如需在iOS平台使用还需要配置通用链接，填写`ios平台通用链接`。
- App模块配置 --> OAuth（登录鉴权）勾选`苹果登录`，[IOS苹果授权登录参考文档](https://ask.dcloud.net.cn/article/36651)。如不发布到Appstore，不需要配置此项
- App常用其他设置  --> 填写关联域Associated Domains  [参考教程](https://ask.dcloud.net.cn/article/36393)。如不发布到Appstore，不需要配置此项
- 微信小程序配置  --> 填写微信小程序AppID（请在微信开发者工具中获取）
- 源码视图中 --> `app-plus` --> `privacy` 设置`服务协议和隐私政策`弹框，将协议链接替换成你自己的。



#### 2. uni-id配置

在项目目录`uniCloud`--> `cloudfunctions`--> `common`--> `uni-config-center`--> `uni-id`--> `config.json`文件里：

- 微信登录填写`app-plus` --> `oauth`--> `weixin`，填写`appid` 、`appsecret`, 在微信开放平台查看，[微信开放平台](https://open.weixin.qq.com/)

- 苹果登录需要配置，`app-plus`-->  `oauth`-->  `apple`，填写包名`bundleId`
- 微信小程序端，`mp-weixin`-->  `oauth`-->  `weixin`，填写微信小程序的`appid`、`appsecret`

```js
	"app-plus": {
		"oauth": {
			"weixin": {//app端微信登录 ，填写`appid` 、`appsecret`
				"appid": "",
				"appsecret": ""
			},
			"apple": {//苹果登录，填写包名
				"bundleId": ""
			}
		}
	},
	"mp-weixin": {
		"oauth": {
			"weixin": {//微信小程序，填写小程序appid、appsecret
				"appid": "",
				"appsecret": ""
			}
		}
	}
```


#### 3. 提现方式配置


提现方式有两种方式：支付宝个人批量转账和微信企业付款到零钱，可自行按需选择，在[有奖猜歌游戏管理后台](https://ext.dcloud.net.cn/plugin?id=4825)--> 提现设置 --> 提现方式配置
- zhifubao：支付宝提现方式（个人支付宝转账）
- weixin：微信提现方式（需开通微信商户支付）
- **暂时无法开通微信商户支付的用户可选择个人支付宝方式转账**


**支付宝方式**

- 提现要求：用户需要在app端，在设置页面完成实名认证和支付宝账号绑定
- 提现操作，详见[有奖猜歌游戏管理后台](https://ext.dcloud.net.cn/plugin?id=4825)


**微信方式**

- 提现要求：用户需要在app端，在设置页面完成实名认证，在提现页面绑定微信
- 确保已开通微信支付商户，企业付款到零钱功能。
- 在项目目录`uniCloud`--》 `cloudfunctions`--》 `common`--》`uni-config-center` --》 `uni-pay` --》`config.json`文件内，配置如下：

```js
	{
		"app":{
			"weixin" : {
				"appid" : "wxxxxxxxxxxxxxxx",//公众号id
				"mchid" : "00000000000",//商户id
				"partnerKey" : "xxxxxxxxxxxxxxxxxxxxx"//安全密钥
			}
		}
	}
```


**替换apiclient_cert.p12证书**

微信支付接口中，涉及资金回滚的接口会使用到API证书，包括退款、撤销接口。商家在申请微信支付成功后，收到的相应邮件后，可以按照指引下载API证书，也可以按照以下路径下载：微信商户平台(pay.weixin.qq.com)-->账户中心-->账户设置-->API安全。[更多内容详见](https://pay.weixin.qq.com/wiki/doc/api/tools/mch_pay.php?chapter=4_3)

将 `hallctrl`--> `controller`目录下的`apiclient_cert.p12`和 `uni-admin`--> `controller` 目录下的`apiclient_cert.p12`替换成从你自己微信商户平台下载的API证书。


教程参考，[微信App支付功能申请](https://uniapp.dcloud.net.cn/api/plugins/payment?id=app%e5%b9%b3%e5%8f%b0%e6%94%af%e4%bb%98%e6%b5%81%e7%a8%8b)



#### 4. 激励视频回调配置

激励视频广告可以支持广告服务器到业务服务器的回调，用于业务系统判断是否提供奖励给观看广告的用户。配置服务器回调后，当用户成功看完广告时，广告服务器会访问配置的云函数，通知用户完成观看激励视频。

相对来讲服务器回调将更加安全，可以依赖**广告平台的反作弊机制**来避免用户模拟观看广告完成的事件。[详见](https://uniapp.dcloud.io/api/a-d/rewarded-video?id=callback)


你需要在[uni-ad系统](https://uniad.dcloud.net.cn/)的激励视频广告位，点击**配置激励视频**，出现以下界面，选择服务空间，选择激励视频回调云函数`videocallvack`，保存。


![](https://vkceyugu.cdn.bspapp.com/VKCEYUGU-76586474-6a55-40d8-acf3-2f62ed4ec503/4766f8a1-bcaf-43d3-8b6d-282bbe1aa681.jpg)


选择已配置好的广告位，展开可查看到`Security key`，如下：


![](https://vkceyugu.cdn.bspapp.com/VKCEYUGU-76586474-6a55-40d8-acf3-2f62ed4ec503/c5cbc783-99cc-4936-924a-c91976c7af87.jpg)


在`uniCloud`--》`cloudfunctions`--》`common` --》`uni-config-center` --》`uni-ad` --》`config.json`文件配置`Security key`如下：

```js

{
	"fuhuoSecuritykey":"猜歌复活奖励视频，uniad 后台开通激励视频回调后生成的Security key",
	"renwuSecuritykey":"做任务看视频，uniad 后台开通激励视频回调后生成的Security key"
}
```


在`uni-config-center`目录，右键‘上传公共模块’



#### 5. 上传云函数和公共模块
 

- 在`uniCloud` -> `cloudfunctions`目录右键，选择 “上传所有云函数、公共模块及actions”。



#### 6. 自动绑定上下级关系

通过发送携带专属邀请码的下载页给同伴或用户安装App，能够自动发展下级好友、以及绑定新用户从属关系。

1. 在猜歌游戏前端项目--》manifest.json--》h5配置--》运行的基础路径，配置`/download/`，用于托管下载页面，在[有奖猜歌游戏管理后台](https://ext.dcloud.net.cn/plugin?id=4825)--> 参数管理 --> 下载页设置，填写分销裂变下载页域名，格式例如`static-XXXXXX-XXXX.bspapp.com/download`或`xxx.com/download`

![](https://vkceyugu.cdn.bspapp.com/VKCEYUGU-3469aac7-a663-4c5d-8ee8-94275f8c09ab/7dbe0a54-553f-4869-a4aa-860630f7fb89.jpg)
	
2. 在`uniCloud`--》`database`--》`opendb-app-versions.schema.json`，开启读取权限，将read：false改为 **read：true** ，右键'上传此DB schema'

![](https://vkceyugu.cdn.bspapp.com/VKCEYUGU-3469aac7-a663-4c5d-8ee8-94275f8c09ab/afeff62c-e852-418d-bc06-2ddc7c5a0da6.jpg)

3. 增加应用版本名称和应用版本号信息，打包app成功后，在admin管理后台--》升级中心--》发布新版。

4. 因浏览器跨域问题，发行H5站点时需[uniCloud web控制台](https://unicloud.dcloud.net.cn/)，`跨域配置`配置安全域名，允许该域名跨域访问云函数服务器。

5. 发行分销裂变下载页：点击`发行`--》`上传网站到服务器`--》点`上传`（未开通前端网页托管需要点击`开通托管`，去[uniCloud web控制台](https://unicloud.dcloud.net.cn/)，`前端网页托管`--》`点击开通`）


**注意事项**

- 本项目需要HBuilderX 3.1.22+ 以上版本
- 配置分销裂变下载页的域名：在[uniCloud web控制台](https://unicloud.dcloud.net.cn/)，`前端网页托管`--》`参数配置`，找到默认域名或者配置网站域名，用默认域名（访问次数有限制），上线**一定要配置自己购买的域名**。




#### 7. 隐私政策弹框


根据工业和信息化部关于开展APP侵害用户权益专项整治要求，App提交到应用市场必须满足以下条件：

- 应用启动运行时需弹出隐私政策协议，说明应用采集用户数据
- 应用不能强制要求用户授予权限，即不能“不给权限不让用”
- 如不希望应用启动时申请“读写手机存储”和“访问设备信息”权限，请参考：https://ask.dcloud.net.cn/article/36549


配置弹出“隐私协议和政策”：在项目的`manifest.json`--> `源码视图`--> `app-plus`--> `privacy` 节点，添加一下代码片段，修改文字内容，替换服务协议和隐私政策链接。

```js
	"privacy" : {
		"prompt" : "template",
		"template" : {
			"title" : "服务协议和隐私政策",
			"message" : "  请你务必审慎阅读、充分理解“服务协议”和“隐私政策”各条款，包括但不限于：为了更好的向你提供服务，我们需要收集你的设备标识、操作日志等信息用于分析、优化应用性能。<br/>  你可阅读<a href=\"https://ask.dcloud.net.cn/protocol.html\">《服务协议》</a>和<a href=\"https://ask.dcloud.net.cn/protocol.html\">《隐私政策》</a>了解详细信息。如果你同意，请点击下面按钮开始接受我们的服务。",
			"buttonAccept" : "同意",
			"buttonRefuse" : "暂不同意"
		}
	}
```


登录页服务协议和隐私政策配置：

在项目目录 `components`--> `uni-agreements` --> `uni-agreements.vue` --> `agreements` --> `url`替换成自己的《用户服务协议》和《隐私政策》链接。


**隐私权政策协议模板**，可参考[Android平台隐私与政策提示框配置方法](https://ask.dcloud.net.cn/article/36937)文章附件。

**不同细分领域的App隐私政策模板**，可参考使用，[APP隐私政策模板](https://docs.getui.com/templet/)

[Android平台 uni-app(5+ app) 应用上架应用市场合规指南](https://ask.dcloud.net.cn/article/39073)


**注意**

- 最新的华为应用市场要求，隐私政策提示框上接受按钮的文本，**必须为“同意”**而不能是其他有歧义的文字。
- 配置后提交云端打包后生效。理论上绝大部分和manifest.json生效相关的配置均需要提交云打包后生效。


#### 8. APP云打包

IOS和Android云打包，配置正确的包名，勾选广告，打包。

注意：打包安卓或者苹果时，需要在开发者中心后台一键登录中配置相应平台的Android 包名或IOS BundleId 。


## 二次开发

如果你需要二开，获取本项目的图片的psd原图，则需按照以下步骤申请：

-  在[DCloud开发者中心](https://dev.dcloud.net.cn/)，完成账号的企业实名认证。
-  使用在HBuilderX中注册的邮箱，发邮件到uniad@dcloud.io，说明企业是否有此类网赚游戏的成功案例经验做出简单介绍说明，以及公司的具体信息（包含：企业名、法人、联系方式）
-  审核需要3-5个工作日，请耐心等待，会有专人回复邮件，谢谢！


## 微信小程序上线


微信小程序上线注意事项：

- 在HBuilderX运行到微信小程序时，勾选“运行时是否压缩代码” 
<img style="max-width:260px;height:auto;" src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-c26ec39a-f602-435d-b8bb-0453aa221eb0/7dd6cc24-c267-4411-88fa-a8d65cd00807.jpg"></img>
- 如果体积超过2M，删除无用文件或图片（插件市场版本体积不会超出） 
- 在微信小程序管理后台--》开发--》开发管理--》开发设置--》服务器域名，设置合法域名，[详见](https://uniapp.dcloud.io/uniCloud/quickstart.html#useinmp)
	- 阿里云：api.bspapp.com
	- 腾讯云：tcb-api.tencentcloudapi.com
	- 服务空间默认域名或者自定义域名，![](https://vkceyugu.cdn.bspapp.com/VKCEYUGU-c26ec39a-f602-435d-b8bb-0453aa221eb0/018fdb87-c9b1-451f-b4c2-4de268d463d3.jpg)
- 在[uni-ad后台](https://uniad.dcloud.net.cn)可申请开通[微信小程序广告](https://uniapp.dcloud.io/component/ad-weixin.html)，[微信小程序插件申请](https://uniapp.dcloud.io/component/ad-weixin.html#%E5%BE%AE%E4%BF%A1%E5%B0%8F%E7%A8%8B%E5%BA%8F%E6%8F%92%E4%BB%B6%E7%94%B3%E8%AF%B7)
- 在猜歌游戏admin端配置相关广告位



## 上架说明


**Android上架注意：**

- 应用名称不要包含“游戏”、“网赚”字样，否则上架应用商店时可能会被要求提供游戏版号，请以应用的名义上架。
- 大部分应用市场，上架需要提供计算机软件著作权证书，软著中应用名称，与提交的应用名称需要一致。（DCloud软著申请QQ群：893532138），软著纸质版拿到后记得去申请电子软著。
- 各应用市场上架应用资质未达到的，或者暂时没有软著的，可以先上架AppStore和谷歌Googlplay商店。
- 最新的华为应用市场要求，隐私政策提示框上接受按钮的文本，**必须为“同意”**而不能是其他有歧义的文字。
- 应用登录功能，默认不勾选同意隐私权限是响应安卓应用市场的规范；请勿修改该逻辑。
- [Android应用市场上架应用合规指南](https://ask.dcloud.net.cn/article/39073)，上架前务必仔细查看，并配置相关权限，以免因此被驳回。




**IOS上架注意：**

- 上架AppStore，可在**国外注册苹果开发者账号，审核相对松一些**。猜歌用国外账号上架不会提到版权问题，可轻松上架。
- 不要提到网赚游戏，看广告有收益等内容，第一版上架建议先**关闭和广告、红包、赚钱、奖励相关内容**，否则审核会因引导用户看广告，大概率被驳回。
- 不要有应用内购，兑换现金、提现等内容。
- 上架前，若有第三方微信登录，同时也要求提供苹果登录，(目前此项目Android和IOS登录图标是两种样式，IOS端登录图标已统一成AppStore按钮规范)，也可自行替换其他符合苹果登录的规范按钮，[详见Buttons](https://appleid.apple.com/signinwithapple/button)。
- 上架苹果注意歌曲版权问题，可自行寻找一些无版权歌曲，词曲著作权保护期在作者有生之年以及去世之后的50年12月30日内，超过此期限后之后就不再受法律保护，这些歌的原版词、曲均已进入公有领域，可以免费使用。
- 若上架IOS因歌曲版权问题被驳回，需写一份歌曲版权说明，证明歌曲不涉及侵权并与苹果公司无关，上架时提交到附件。
- 建议初版提交暂不开放广告等相关功能，通过后再通过wgt资源包完成广告模块更新。



**ios上架重要配置**

- `manifest.json`--》`源码视图`--》搜索`ios`，删除以下配置，如果不删除，**将会被苹果驳回，务必删除此项**

```html
	"UIBackgroundModes": ["audio"]
```

- 第一版本提交审核，不要展示广告。
- 第二次提交审核时，勾选广告模块，页面不展示，等待审核通过后用wgt方式更新广告内容。需要在manifest配置**开启广告标识（IDFA）**和在**App Store Connect 配置 “App 隐私”**，详见[https://ask.dcloud.net.cn/article/36107](https://ask.dcloud.net.cn/article/36107)



### AppStore猜歌大富翁已正式上线，下载地址：[猜歌大富翁](https://apps.apple.com/cn/app/%E7%8C%9C%E6%AD%8C%E5%A4%A7%E5%AF%8C%E7%BF%81/id1566509933)

猜歌大富翁初版未开放广告等相关功能，现版本已通过wgt资源包完成广告模块更新，欢迎下载体验！



**更多**

- 如果你已经拿到软著，还未上架应用市场，可去uni-ad后台申请开通快手广告。
- 如果你已上架成功某一家应用市场，去[uni-ad官网](https://uniad.dcloud.net.cn/login)，先开通优量汇广告，再开通穿山甲广告。
- 已开通优量汇、穿山甲、快手其中一个，即可去uni-AD后台申请开通互动游戏广告位，自行增加互动游戏展示。
- 可选上架应用渠道包括：谷歌Googleplay、AppStore、vivo、华为、应用宝、魅族、应用汇、酷安市场、360、taptap应用市场、4399、卓易市场、安智市场、乐商店、百度应用市场（只能进行优量汇审核）。





## 其他说明

本项目由DCloud委托大连一家外包公司开发，该公司同时承接二开定制工作。如有二开需求，请加QQ群：645630288。

如果你不想养太多开发人员，可以每月支付几千维护费，让二开公司帮你运维。更低成本进行创业。

DCloud正在寻找更多行业服务商，开发各种基于uniCloud的项目，如论坛、阅读、短视频.... 由DCloud出资，开发完毕后上架插件市场，然后行业合作伙伴可持续接二开的项目。有意成为uniCloud行业服务商的公司或个人可以联系bd@dcloud.io。[详见](https://ask.dcloud.net.cn/article/38878)



初始化歌曲库，是由大连外包公司提供给开发者测试使用，商用中如需更丰富的歌曲库，请自行获取版权歌曲，并上传admin后台。可从如下方式获取：

1. **有部分版权已过保护期的老歌曲目名单，有需要的可加入有奖猜歌游戏交流群，QQ群号：645630288，私信群管理员DCloud_Anne获取。**
2. 某宝、某度查找
2. QQ搜索，加一些无版权音乐分享群
3. 网站查找：[全球10大免费高质量无版权音乐网站](https://baijiahao.baidu.com/s?id=1670258908263550190&wfr=spider&for=pc)
4. 如果有大批量的歌曲需求，建议您对接腾讯云的曲库接口: [腾讯歌曲曲库接口](https://cloud.tencent.com/product/ame?fromSource=gwzcw.3471691.3471691.3471691&utm_medium=cpc&utm_id=gwzcw.3471691.3471691.3471691)

初始化测试歌曲目前存在DCloud云储存下，建议将测试歌曲下载并上传到自己的云存储中，替换`database`--> `db_init.json` --> `songlist`--> `data` 中歌曲地址url

```html
 "songlist": {
	"data": [
		{
			"url": "",//填写你自己的歌曲存储地址
			"daan1": "夜空中最亮的星",
			"daan2": "牧马城市",
			"daan3": "一吻天荒",
			"correct": 1,
			"createtime": 1617851118
		}
	]
 }
```




## FAQ：常见问题


1. 本项目代码可以商用，无需为DCloud付费。但不能把本项目的代码改造用于非`uni-app`和`uniCloud`的技术体系。即，不能将后台改成php、java等其他后台，这将违反使用许可协议。
2. 广告费用或cpm不会因为使用本项目代码而下降，本项目不扣分成。正常接入`uni-ad`就好。
3. 真机调试，一键登录失败，HBuilderX控制台报错：
```js
[本地调试]"[hallctrl]返回结果：" {"code":4001,"message":"errCode: 4001 | errMsg: 获取手机号码失败：uni一键登录 apiKey 不存在"} 
```

解决方案：选择**连接云端云函数**

![](https://vkceyugu.cdn.bspapp.com/VKCEYUGU-3469aac7-a663-4c5d-8ee8-94275f8c09ab/47acab90-6800-417f-b8a1-805cc056f814.jpg)
4. 欢迎加入有奖猜歌游戏交流群，QQ群号：645630288，加群时请备注你的DCloudAppId，[什么是DCloud appid说明](https://ask.dcloud.net.cn/article/35907)。