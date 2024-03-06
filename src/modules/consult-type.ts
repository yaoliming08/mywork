/**
 * 咨询名称
 */
export const ConsultTypeRecord: Record<ConsultType, string> = {
  // 图文
  ONE2ONEPIC: '图文咨询',
  // 视频
  VIDEO: '视频咨询',
  // 语音
  TELEPHONE: '语音咨询',
  // 养生
  HEALTH: '养生咨询',
  // 用药
  MEDICATION: '用药咨询',
}
/**
 * 咨询类型
 */
export type ConsultType =
  // 图文
  | 'ONE2ONEPIC'
  // 视频
  | 'VIDEO'
  // 语音
  | 'TELEPHONE'
  // 养生
  | 'HEALTH'
  // 用药
  | 'MEDICATION'
/**
 * 咨询价格查询参数
 */
export const ConsultPriceKey: Record<ConsultType, string> = {
  // 图文
  ONE2ONEPIC: 'ONE2ONEPIC_PRICE',
  // 视频
  VIDEO: 'VIDEO_PRICE',
  // 语音
  TELEPHONE: 'TELEPHONE_PRICE',
  // 养生
  HEALTH: 'ONE2ONEPIC_PRICE',
  // 用药
  MEDICATION: 'ONE2ONEPIC_PRICE',
}
