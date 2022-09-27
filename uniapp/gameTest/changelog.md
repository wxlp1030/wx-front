## 1.3.3（2022-08-11）
- 删除重复的初始化云数据库
## 1.3.2（2022-08-11）
- 修复权限问题导致下载页无法下载的问题
## 1.3.1（2022-08-08）
- 更新依赖插件
## 1.3.0（2022-08-08）
- 新增[uni统计2.0 详见](https://uniapp.dcloud.net.cn/uni-stat-v2.html)
- 升级前最好将旧版备份，其中 `uni-portal`、`uni-upgrade-center` 插件备份并移出 `uni_modules` 目录
- `db_init.json`初始化数据库时，老项目的菜单表`opendb-admin-menus`，已经有数据了，此时key冲突的数据无法插入，需要手工合并。
 - 如果老项目没有改动过menus和权限，那么可以删掉老表，重新初始化
 - 如果老项目的menus菜单改动过，需要把uni统计和项目管理的若干页面再合并到菜单数据表里
## 1.2.8（2022-07-20）
- 微信小程序端新增[格子广告](https://uniapp.dcloud.io/component/ad-grid.html)
- 在[uniCloud web控制台](https://unicloud.dcloud.net.cn/login)找到云数据库gameconfig表，找到_id 为`adpid`的记录新增格子广告配置，`"mpGridAdpid":1111111111`，可在[有奖猜歌游戏管理后台](https://ext.dcloud.net.cn/plugin?id=4825)配置成自己的广告位id
## 1.2.7（2022-06-07）
- 修复激励视频回调透传参数为空的问题
## 1.2.6（2022-05-30）
- 删除多余图片
## 1.2.5（2022-05-26）
- 更新插件三方依赖
## 1.2.4（2022-05-26）
- 支持微信小程序
- 激励视频广告和插屏广告替换为组件，同时支持App和uni-ad微信小程序广告（在uni-ad后台可申请开通），详见文档[激励视频广告组件](https://uniapp.dcloud.io/component/ad-rewarded-video.html#%E6%BF%80%E5%8A%B1%E8%A7%86%E9%A2%91%E5%B9%BF%E5%91%8A)、[插屏广告组件](https://uniapp.dcloud.io/component/ad-interstitial.html)，[uni-ad支持微信小程序广告](https://uniapp.dcloud.io/component/ad-weixin.html)
- 优化邀请好友奖励配置，将`database`--> `db_init.json` --> `gameconfig`下 _id 为`rewardFen`这条记录在[uniCloud web控制台](https://unicloud.dcloud.net.cn/login)找到云数据库gameconfig表添加。
- 更新uni-id版本，更新文档
## 1.2.3（2022-04-19）
- 更新static目录下的资源图片
## 1.2.2（2022-04-08）
- 修复转盘不显示内容的问题
## 1.2.1（2022-04-06）
- 新增激励视频回调
- 在[uniCloud web控制台](https://unicloud.dcloud.net.cn/login)云数据库新建`videocallback`表，uniAD后台配置`rewarded-video-callback`云函数激励视频回调，`common/uni-config-center/uni-ad/config.json`配置开通激励视频回调后生成的`Security key`
## 1.2.0（2022-03-18）
- 更新文档
## 1.1.9（2022-03-18）
- 首页新增[插屏广告](https://uniapp.dcloud.io/api/a-d/interstitial.html)
- 在[uniCloud web控制台](https://unicloud.dcloud.net.cn/login)找到云数据库gameconfig表，找到_id 为`adpid`的记录新增插屏广告配置，`"interstitialAdpid":1111111113`，可在[有奖猜歌游戏管理后台](https://ext.dcloud.net.cn/plugin?id=4825)配置成自己的广告位id
## 1.1.8（2022-03-17）
- 优化广告位、自动绑定上下级、去应用市场评价、提现方式的配置项，均在[有奖猜歌游戏管理后台](https://ext.dcloud.net.cn/plugin?id=4825)配置
- 重新上传所有云函数和公共模块，将database--> db_init.json --> gameconfig下 _id 为`adpid`、`gotomarket`、`download`、`tixiantype`这四条记录在[uniCloud web控制台](https://unicloud.dcloud.net.cn/login)找到云数据库gameconfig表，依次添加记录。
## 1.1.7（2022-01-07）
- 通过`getTemp`优化联表查询，提升性能，[详情](https://uniapp.dcloud.io/uniCloud/unicloud-db?id=collection)
## 1.1.6（2021-12-30）
- 删除多余文件
## 1.1.5（2021-12-24）
- 优化【意见反馈】，admin管理后台可在【意见反馈列表】回复，app端在【我的消息】查看回复内容
## 1.1.4（2021-12-10）
- 修复猜歌明文答案的问题
- 修复使用腾讯云设置头像失败的问题
- 修复使用腾讯云app下载页点击下载失败的问题
## 1.1.3（2021-12-03）
- 新增【注销账号】功能。用户注销账号后，不可使用同样的用户标识（手机号、邮箱、微信账号等）进行注册或登录。在admin管理端可对已注销账号的用户【恢复注销账号】
- 新增【意见反馈】使用uni-feedback插件，在admin管理端可看到意见反馈列表
- 邀请好友分享弹窗，支持监听返回操作(如：物理返回，全面屏手机侧滑)关闭分享弹窗
- 修改错误的`scene`值`WXSenceTimeline`(分享到朋友圈)更正为`WXSceneTimeline`
## 1.1.2（2021-10-29）
- 修改广告位配置信息
## 1.1.1（2021-10-29）
- 新增自动绑定上下级关系，邀请好友成功后获得奖励，配置信息详见文档说明
## 1.1.0（2021-10-14）
- 一键登录，需要手动勾选同意《账号服务和隐私政策协议》
- 新增【去评价】打开应用市场评分界面
- 新增启动时权限策略及提示信息配置
- 微信提现去除notify_url配置项
- manifest中去除不必要权限
- 文档更新，提供**有奖猜歌官网**，[预览地址](https://static-f4cb9299-7a3a-40d0-b168-61319ddf09cc.bspapp.com/)
## 1.0.9（2021-07-16）
- 更新许可协议
## 1.0.8（2021-05-27）
- 新增支付统一配置uni-pay
## 1.0.7（2021-05-22）
- 补充登录图标
## 1.0.6（2021-05-22）
- 优化登录按钮
- 新增登录页勾选协议
- 新增《服务协议和隐私政策》弹框
## 1.0.5（2021-05-11）
- 补充almost-lottery文件
## 1.0.4（2021-05-11）
- 修复转盘指针和金额不对应问题
- 更换苹果登录图标
- 新增绑定微信
## 1.0.3（2021-05-06）
- 新增uni-share分享菜单
## 1.0.2（2021-04-29）
- 新增升级中心
- 更新文档
- 替换歌曲存储地址（建议将歌曲放到自己的云存储）
## 1.0.1（2021-04-28）
- 修复提现规则设置问题
## 1.0.0（2021-04-25）
- 初始化提交