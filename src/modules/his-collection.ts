import { toQuery } from '@/common/record-to-query'
import { http } from '@/request/base'
import { useStore } from '@stores/config'
import { Md5 } from 'ts-md5'

export function getCollectParams(consultInfo: Consult.ConsultInfo) {
  return toQuery({
    // 订单id
    regno: consultInfo.id,
    // 患者姓名
    name: consultInfo.consulterName,
    // 患者性别
    sex: consultInfo.consulterGender,
    // 患者年龄
    age: consultInfo.consulterAge,
    // 患者ID
    hisId: consultInfo.compatId,
    // 回调地址
    callbackUrl: `/pages/order/matching?id=${consultInfo.id}&consultType=${consultInfo.consultType}`,
  })
}

export async function getHisCollectionUrl(params: HisCollectionParams) {
  const configStore = useStore()
  let { url, remarks } = await http<{ url: string; remarks: string }>({
    service: 'smarthos.medicalHistoryCollection.config.info',
    data: {
      hosId: configStore.config.hosId,
    },
  })
  const callbackUrl = decodeURIComponent(params.callbackUrl)
  console.log(callbackUrl)
  // 生成sign
  const sign = Md5.hashStr(`default${params.regno}${params.hisId}${callbackUrl}${remarks}`)
  const searchFrom = {
    deptcode: 'default',
    regno: params.regno,
    hisid: params.hisId,
    name: params.name,
    sex: formatSex(params.sex),
    age: params.age,
    device: 'web',
    callback: callbackUrl,
    sign,
    redirect: 'replace',
  }
  return url + '?' + toQuery(searchFrom)
}

function formatSex(sex: Sex) {
  const map: Record<Sex, 1 | 2 | 3> = {
    M: 1,
    F: 2,
    N: 3,
  }
  return map[sex]
}
