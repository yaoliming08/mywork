declare namespace Consult {
  export class ConsultInfo {
    id: string
    channel: string
    // 就诊人Id
    compatId: string
    consulterName: string
    consulterIdcard: string
    // 用户ID
    patId: string
    hosId: string
    /**
     * 问诊状态：-3 未付款取消 -1 已取消 0 待支付 1 待受理 2 待处理 3 进行中 4 待评价 6 已结束
     */
    consultStatus: string
    consultType: string
    consultContent: string
    consulterGender: string
    consulterAge: number
    createTime: number
    payFee: number
    openRecipeFlag: boolean
    collectStatus?: "0" | "1"
    payTime: number
    patReplyRemainNumber:number
    lasterStatus:boolean
  }

  export interface DocVo {
    aiRecommendQaSwitch: boolean
    consultCanReplyNumber: number
    continuationCanReplyNumber: number
    defRecipeType: string
    deptId: string
    deptName: string
    docCardPic: string
    docCertNo: string
    docGender: string
    docAvatar: string
    docName: string
    docNamePy: string
    docRecipeAuthority: string
    docResume: string
    docSkill: string
    docStatus: string
    docTitle: string
    docType: string
    famous: false
    firstOrgCode: string
    firstOrgName: string
    hosId: string
    hosName: string
    id: string
    isRecommend: false
    jobNo: string
    medicalHistoryCollectionSwitch: false
    nation: string
    nationality: string
    oauthCa: false
    pharType: string
    pracCertDate: string
    pracCertNo: string
    pracType: string
    subDocType: string
    wechatWelcomePic: string
  }

  export interface PatVo {
    blackListStatus: false
    id: string
    patAge: number
    patAvatar: string
    patGender: string
    patName: string
    patStatus: string
  }

  export interface OrderInfo {
    attaList: Attachment[]
    consultInfo: ConsultInfo
    userDocVo: DocVo
    userPat: PatVo
    // 支付剩余时间
    payWaitSeconds: number
  }

  export interface PatHisInfo {
    age?: number
    attachments?: any[]
    collectStatus?: string
    deptCode?: string
    deptName?: string
    device?: string
    hisPatientId?: string
    hospitalCode?: string
    hospitalName?: string
    name?: string
    registrationNo?: string
    sex?: string
    sections?: {
      allergyHistory: string
      assistantExam: string
      chiefComplaint: string
      pastHistory: string
      personalHistory: string
      physicalExam: string
      operationHistory: string
      presentHistory: string
      familyHistory: string
      transfusion: string
      menstrualHistory: string
      vaccineHistory: string
      epidemicHistory: string
      infectHistory: string
      martialHistory: string
    }
  }
}
