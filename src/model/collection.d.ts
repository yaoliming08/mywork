type Sex = 'F' | 'M' | 'N'

/**
 * 病史采集参数
 */
interface HisCollectionParams {
  // 订单id
  regno: string,
  // 患者行
  name: string,
  // 患者性别
  sex: Sex,
  // 患者年龄
  age: number,
  // 患者ID
  hisId: string,
  // 回调地址
  callbackUrl: string
}