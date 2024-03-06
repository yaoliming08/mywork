export default {
  wxab5a03f4955ccf56: {
    // 开发版
    develop: {
      baseApi: 'https://zlwyl-dev.iflyhealth.com/apigateway',
      webUrl: 'https://zlwyl-dev.iflyhealth.com/ty_wechat/',
      // baseApi:  'https://zlwyl-test.iflyhealth.com/apigateway',
      // webUrl: 'https://zlwyl-test.iflyhealth.com/ty_wechat/',
      yyid: 'zzslyy',
      templateId: ['ibWumv6zCBDtV8kvZjwEgRK-a8HSjOVmpVnZP_9WE2Q', 'zA8cCKE-rAm9hRn-2pB-TgDR46pTIPXuWp4sQGG-bZQ'],
      // opdTemplateId: 'zA8cCKE-rAm9hRn-2pB-TgDR46pTIPXuWp4sQGG-bZQ',
      openVConsole: 'on',
    },
    // 体验版
    trial: {
      baseApi: 'https://zlwyl-test.iflyhealth.com/apigateway',
      webUrl: 'https://zlwyl-test.iflyhealth.com/ty_wechat/',
      yyid: 'zzslyy',
      templateId: ['ibWumv6zCBDtV8kvZjwEgRK-a8HSjOVmpVnZP_9WE2Q', 'zA8cCKE-rAm9hRn-2pB-TgDR46pTIPXuWp4sQGG-bZQ'],
      // opdTemplateId: 'zA8cCKE-rAm9hRn-2pB-TgDR46pTIPXuWp4sQGG-bZQ',
      openVConsole: 'on',
    },
    // 正式版
    release: {
      baseApi: 'https://zzslyy.xfzhyy.com/apigateway',
      webUrl: 'https://zzslyy.xfzhyy.com/ty_wechat/',
      yyid: 'zzslyy',
      templateId: ['ibWumv6zCBDtV8kvZjwEgRK-a8HSjOVmpVnZP_9WE2Q', 'zA8cCKE-rAm9hRn-2pB-TgDR46pTIPXuWp4sQGG-bZQ'],
      // opdTemplateId: 'zA8cCKE-rAm9hRn-2pB-TgDR46pTIPXuWp4sQGG-bZQ',
      openVConsole: 'off',
    },
  },
  zzslyy: {
    develop: {
      yyid: 'zzslyy',
    },
  },
} as Config

type Config = Record<string, Record<string, Record<string, any>>>
