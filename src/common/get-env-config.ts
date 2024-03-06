import globalConfig from '../../config'
/**
 * 读取配置，根据当前环境（开发板，体验版和正式版）和小程序appid，来读取最外层config.ts中的配置
 * @param key
 * @returns
 */
export function getEnvConfig<T = string>(key: string): T {
  const accountInfo = uni.getAccountInfoSync()
  const result = globalConfig[accountInfo.miniProgram.appId][accountInfo.miniProgram.envVersion][key]
  return result
}
