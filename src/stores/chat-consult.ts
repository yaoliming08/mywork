import { defineStore } from 'pinia'
import { ConsultInfoLive } from '@/request/chat'

import Male from '@/assets/img/default-avatar-male.png'
import Female from '@/assets/img/default-avatar-female.png'
import { computed, ref, Ref } from 'vue'
import { http } from '@/request/base'
import { chatManager } from '@/model/chat-manager'

export const useStore = defineStore('chat-consult', () => {
  // 用户登录token
  const appKey = ref('')


  const consultId = ref('')

  const consultInfo = ref<Consult.ConsultInfo>(null)

  function timeCount() {
    if (consultInfo.value.consultStatus === '3') {  //初始化的时候调用 每隔15秒发送一次
        console.log('开始定时...每过15秒执行一次刷新')
        ConsultInfoLive(consultInfo.value.id)
    } 
  }


  async function reloadConsult() {
    const result = await http<Consult.OrderInfo>({
      service: 'smarthos.consult.details',
      data: { consultId: consultId.value },
    })
    const { consultInfo: consult, userPat } = result
    consultInfo.value = consult
    chatManager.patReplyRemainNumber  = consult.patReplyRemainNumber
  }

  async function init(id: string = consultId.value) {
    consultId.value = id
    const result = await http<Consult.OrderInfo>({
      service: 'smarthos.consult.details',
      data: { consultId: id },
    })
    chatManager.loadUsers(result)
    // result.consultInfo.consultStatus = '3'
    result.userDocVo = {} as Consult.DocVo
    const { userDocVo, userPat, consultInfo: consult } = result

    chatManager.patReplyRemainNumber  = consult.patReplyRemainNumber
    // console.log(consultInfo:consult)
    consultInfo.value = consult

    console.log('>>>> 用户信息加载到了',result)
    interface TokenRes {
      appKey: '0vnjpoad0l4az'
      code: 200
      token: 'o1Yycxsv0jt5BgOTsyXQ9hueMYlhaIx7jTe39VEOrtRyochaLhqObg==@kfc7.cn.rongnav.com;kfc7.cn.rongcfg.com'
      userId: '577083256832'
    }
    const res = await http<TokenRes>({
      service: '/im/v1/pt/user/tokens',
      data: {
        id: userPat.id,
        name: consult.consulterName,
      },
    })
    if (res.code == 200) {
      appKey.value = res.appKey
      console.log(appKey.value,'appKey值')
    } else {
      throw new Error('获取用户token失败。')
    }
    chatManager.patUser.token = res.token
    try {
      const res2 = await http<Consult.PatHisInfo[]>({
        service: 'smarthos.collect.medical.history',
        data: {
          hospitalCode: result.consultInfo.hosId,
          // hospitalCode: result.userDocVo.hosId + '-' + result.userDocVo.jobNo,  
          registrationNo: id,
        },
      })
      chatManager.patUser.sections = res2[0].sections
    } catch (e) {
      //
    }
  }

  return {
    reloadConsult,
    consultId,
    consultInfo,
    appKey,
    init,
    timeCount
  }
})
