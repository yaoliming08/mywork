import { defineStore } from 'pinia'
import { Md5 } from 'ts-md5'
import { MD5_PASSWORD } from '@/request/base'

export const useStore = defineStore('config', () => {
  const configStore = {} as Config

  function initConfig() {
    // 获取配置文件配置项
    // 获取系统配置
    const params = {
      areaCode: 'default_h5',
      channel: '31',
      oper: '127.0.0.1',
      paramType: '5',
      random: '1234',
      spid: '1001',
      version: '2.5',
      service: 'smarthos.enviroment.config.info',
    }

    const config2 = uni.request({
      url: '/app',
      method: 'POST',
      data: params,
      header: {
        sign: Md5.hashStr(Md5.hashStr(MD5_PASSWORD) + JSON.stringify(params)),
      },
      success({ data }: { data: any }) {
        configStore.hosId = data.obj.hosId
        ;(configStore.database = data.obj.jsonValue), (configStore.buryChannel = data.obj.buryChannel)
      },
    })

    return Promise.all([config2])
  }

  return {
    config: configStore,
    initConfig,
  }
})
