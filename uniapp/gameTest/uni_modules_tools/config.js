// "文件路径" : {"键名":"改成什么"}
{
	"/manifest.json": {
		"appid": "your appid",
		"app-plus": {
			"distribute": {
				"ios": {
					"capabilities": {
						"entitlements": {
							"com.apple.developer.associated-domains": [""]
						}
					}
				},
				"sdkConfigs": {
					"oauth": {
						"weixin": {
							"appid": "your appid",
							"appsecret": "your appsecret",
							"UniversalLinks": "your UniversalLinks"
						},
					},
					"share": {
						"weixin": {
							"appid": "your appid",
							"UniversalLinks": "your UniversalLinks"
						}
					},
				}
			}
		}
	},
	"/uni_modules/uni-config-center/uniCloud/cloudfunctions/common/uni-config-center/uni-pay/config.json": {
		"app": {
			"weixin": {
				"appid": "填写你的开放平台APP的唯一标识appid，详见：https://pay.weixin.qq.com/wiki/doc/api/tools/mch_pay.php?chapter=4_3",
				"mchid": "填写你的商户id",
				"partnerKey": "填写你的安全密钥"
			}
		}
	},
	"/uni_modules/uni-config-center/uniCloud/cloudfunctions/common/uni-config-center/uni-id/config.json": {
		"app-plus": {
			"oauth": {
				"weixin": {
					"appid": "填写来源微信开放平台https://open.weixin.qq.com/创建的应用的appid",
					"appsecret": "填写来源微信开放平台https://open.weixin.qq.com/创建的应用的appsecret"
				},
				"apple": {
					"bundleId": "苹果开发者后台获取的bundleId"
				}
			}
		},
		"mp-weixin": {
			"oauth": {
				"weixin": {
					"appid": "my weixin appid",
					"appsecret": "my weixin appsecret"
				}
			}
		},
		"service": {
			"sms": {
				"name": "my app name",
				"codeExpiresIn": 300,
				"smsKey": "my smsKey",
				"smsSecret": "my smsSecret"
			},
			"univerify": {
				"appid": "当前应用的appid，使用云函数URL化，此项必须配置",
				"apiKey": "apiKey在开发者中心获取，开发者中心：https://dev.dcloud.net.cn/uniLogin/index?type=0，文档：https://ask.dcloud.net.cn/article/37965",
				"apiSecret": "apiSecret 在开发者中心获取，开发者中心：https://dev.dcloud.net.cn/uniLogin/index?type=0，文档：https://ask.dcloud.net.cn/article/37965"
			}
		}
	}
}
