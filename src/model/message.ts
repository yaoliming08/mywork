import { MessageFromRong } from '@modules/rong-cloud'

import { chatManager } from './chat-manager'
import { sendHQVoiceMessage, sendImageMessage, sendTextMessage } from '@/modules/rong-cloud'
import { getImgBase64 } from '@common/img-to-base64'
import { httpUpload } from '@/request/base'
import { getCurrentInstance } from 'vue'
import { postModifyReplyNumber } from '@/request/chat/index'
export type SMessageType = 'text' | 'image' | 'voice' | 'recipe' | 'medical-record' | 'call' | 'article' | 'inspect' | 'medical-text' | 'diagnosis' | 'auth-medical' | 'limit-message' | 'tip-message'
/**
 * 基本消息类型
 */
export abstract class SMessage {
  sendError = false
  readonly type: SMessageType
  content = ''
  // readonly component: any
  sender: call.User = null
  senderUserId = ''
  targetId = ''
  /**
   * 消息uid， 作为消息的唯一标识 -- 如果需要做针对性的功能，也许能用到 -- 比如撤回，引用等
   */
  messageUId = ''
  async resend() {
    if (!this.sendError) {
      return
    }
    try {
      const msg = await this.doSend()
      this.messageUId = msg.messageUId
      this.sendError = false
      getCurrentInstance().proxy.$forceUpdate()
    } catch (e) {
      console.error(e)
      // Toast.fail('发送失败')
    }
  }
  protected abstract doSend(): Promise<MessageFromRong>
  async send() {
    console.log('基本消息类型发送消息')
    try {
      const msg = await this.doSend()
      this.messageUId = msg.messageUId
      console.log('sended发送消息', msg)
    } catch (e) {
      this.sendError = true
      // Toast.fail('发送失败')
      console.error(e)
    }

    if(chatManager.patReplyRemainNumber !== -1){
      postModifyReplyNumber({
        consultId:chatManager.consultId
      })
      chatManager.patReplyRemainNumber = chatManager.patReplyRemainNumber - 1
    }
   

  }
}

/**
 * 图片消息
 */
export class SImageMessage extends SMessage {
  protected async doSend() {
    const res = await sendImageMessage(this.targetId, this.content, this.thumbnail)
    return res
  }
  readonly type: SMessageType = 'image'
  // readonly component = markRaw(ImgMessageVue)
  thumbnail = ''
  static async fromLocalImg(tmpImg: string) {
    const model = new SImageMessage()
    let base64 = await getImgBase64(tmpImg)
    base64 = base64.split('base64,').pop() as string

    const uploadRes = await httpUpload({
      url: tmpImg,
    })

    // model.imgFile = file;
    model.content = uploadRes.obj.attaFileUrl
    model.thumbnail = base64
    model.messageUId = ''
    model.targetId = chatManager.docUserId
    model.sender = chatManager.patUser
    return model
  }
  static fromReceivedMessage(img: MessageFromRong) {
    const model = new SImageMessage()
    const content: any = img.content
    model.thumbnail = content.content // content 是base64 缩略图
    model.content = content.imageUri // uri 是原图url
    model.sender = chatManager.findUser(img.senderUserId)
    model.targetId = img.targetId
    model.messageUId = img.messageUId
    return model
  }
}

/**
 * 文字消息
 */

export class STextMessage extends SMessage {
  protected async doSend() {
    console.log(this.targetId,this.content,'发送给医生的id')
    const res = await sendTextMessage(this.targetId, this.content)
    return res
  }
  // private static count = 1
  static makeSelfMessage(text: string): SMessage {
    const model = new STextMessage()
    model.content = text
    model.sender = chatManager.patUser
    model.messageUId = ''
    model.targetId = chatManager.docUserId
    return model
  }
  // /**
  //  * 构造一条本地消息， 设置特定的发起人
  //  * @param text
  //  * @param userId
  //  * @param uid
  //  * @returns
  //  */
  // static makeLocalMessage(text: string, userId: string, uid: string = 'text-message' + STextMessage.count++) {
  //   const model = new STextMessage()
  //   model.content = text
  //   model.sender = chatManager.patUser
  //   model.messageUId = uid
  //   model.targetId = chatManager.docUserId
  //   return model
  // }

  readonly type: SMessageType = 'text'
  // readonly component: any = markRaw(TextMessageVue)
  static fromReceivedMessage(text: MessageFromRong) {
    const model = new STextMessage()
    const content: any = text.content
    model.content = content.content
    model.sender = chatManager.findUser(text.senderUserId)
    model.messageUId = text.messageUId
    model.targetId = text.targetId
    // model.senderUserId = text.senderUserId
    return model
  }
}
/**
 * 声音消息
 */
export class SVoiceMessage extends SMessage {
  duration = 0

  protected async doSend() {
    const res = await sendHQVoiceMessage(this.targetId, this.content, this.duration)
    return res
  }
  static async fromLocalVoice(recordTmpUrl: string, duration: number) {
    const model = new SVoiceMessage()
    let uploadRes = await httpUpload(
      {
        url: recordTmpUrl,
      },
      'AUDIO',
    )
    model.sender = chatManager.patUser
    model.content = uploadRes.obj.attaFileUrl
    model.duration = duration
    model.targetId = chatManager.docUserId
    model.messageUId = ''
    return model
  }
  readonly type: SMessageType = 'voice'
  static fromReceivedMessage(voiceMessage: MessageFromRong) {
    const model = new SVoiceMessage()
    const content: any = voiceMessage.content
    model.content = content.remoteUrl
    model.duration = content.duration
    model.sender = chatManager.findUser(voiceMessage.senderUserId)
    model.messageUId = voiceMessage.messageUId
    model.targetId = voiceMessage.targetId
    // model.senderUserId = text.senderUserId
    return model
  }
}

export type CallIcon = 'video' | 'voice'

export class SCallMessage extends STextMessage {
  icon: CallIcon
  type: SMessageType = 'call'
  private static countCall = 0
  static makeLocalMessage(text: string, icon: CallIcon, uid: string = 'call-message' + SCallMessage.countCall++) {
    const model = new SCallMessage()
    model.content = text
    model.icon = icon
    model.sender = chatManager.docUser
    model.messageUId = uid
    model.targetId = chatManager.patUser?.userId
    // model.senderUserId = store.currentUserId
    return model
  }
}

/**
 * 推送过来的病历消息体
 */
interface MedicalRecordVo {
  compatAge: 18
  compatName: '左子祺'
  contractId: '3012991221695005327'
  diagnosisName: '急性上呼吸道感染'
  diseaseDescription: '发热1天。'
  documentId: '3012991222760358549'
  group: false
  isSignature: 'true'
  patientSexCode: 'M'
  patientSexDesc: '男'
  signatureId: '580246896640'
  signatureTime: 1664433100620
  visitStatusCode: '3'
}
/**
 * 病历消息
 */
export class SMedicalRecordMessage extends SMessage {
  type: SMessageType = 'medical-record'
  medicalRecord: MedicalRecordVo = null
  protected doSend(): Promise<MessageFromRong> {
    throw new Error('不应该发送病历消息')
  }
  static readonly objectName = 'IFLY:FIRST_CASE'
  // readonly component = markRaw(MedicalRecordVue)
  static fromReceivedMessage(msg: MessageFromRong) {
    const content: any = msg.content
    const contentStr = content?.content
    const model = new SMedicalRecordMessage()
    /**
     * 病历消息，不可能是患者自己发送的
     */
    model.sender = chatManager.docUser
    model.messageUId = msg.messageUId
    model.targetId = msg.targetId
    console.log('contnets', contentStr)
    if (contentStr) {
      const mr: MedicalRecordVo = JSON.parse(contentStr)
      model.medicalRecord = mr
    } else {
      console.error('病历消息格式不正确', content)
      throw new Error('病历消息格式不正确')
    }
    return model
  }
}
/**
 * 处方数据体
 */
interface Recipe {
  adviceId: 580209618945
  adviceTime: 1664423940000
  comPatientAge: '18'
  comPatientName: '左鹏'
  comPatientSexDesc: '男'
  contractId: '3012952865854469074'
  diagnoseDesc: '偏头痛(ICD-10:G43.900)'
  doctorName: '石袁康'
  documentId: '3012952867477664732'
  group: false
  patientAge: 'null'
  patientName: '石袁康'
  patientSexCode: 'M'
  patientSexDesc: '男'
  visitNo: '580209233920'
  visitStatusCode: '3'
}
interface RecipeExtra {
  businessId: '580209233920'
  contractId: '3012952865854469074'
  businessType: 'ORDER'
}
/**
 * 处方消息
 */
export class SRecipeMessage extends SMessage {
  type: SMessageType = 'recipe'
  protected doSend(): Promise<MessageFromRong> {
    throw new Error('不应该发送处方消息')
  }
  recipe: Recipe
  extra: RecipeExtra
  static readonly objectName = 'IFLY:PRE'
  // readonly component = markRaw(RecipeMessageVue)
  static fromIReceivedMessageV2(msg: MessageFromRong) {
    const content: any = msg.content
    const contentStr = content?.content
    const extraStr = content?.extra
    const model = new SRecipeMessage()

    model.sender = chatManager.findUser(msg.senderUserId)
    model.messageUId = msg.messageUId
    model.targetId = msg.targetId
    if (contentStr && extraStr) {
      const mr: Recipe = JSON.parse(contentStr)
      const extra: RecipeExtra = JSON.parse(extraStr)
      model.recipe = mr
      model.extra = extra
    } else {
      console.error('处方消息格式不正确', content)
      throw new Error('处方消息格式不正确')
    }
    return model
  }
}


/**
 * 文章消息
 */
export class ArticleMessage extends SMessage {
  type: SMessageType = 'article'
  contentStr:any
  protected doSend(): Promise<MessageFromRong> {
    throw new Error('不应发文章消息')
  }
  static readonly objectName = 'IFLY:ARTICLE'
  static fromReceivedMessage(msg: MessageFromRong) {
    const content: any = msg.content
    const model = new ArticleMessage()
     model.sender = chatManager.docUser
    model.messageUId = msg.messageUId
    model.targetId = msg.targetId
    model.contentStr = JSON.parse( content?.content )
    return model
  }
}

/**
 * 检查消息检验消息
 */
export class InspectMessage extends SMessage {
  type: SMessageType = 'inspect'
  contentStr:any
  protected doSend(): Promise<MessageFromRong> {
    throw new Error('不应该发检查消息')
  }
  static readonly objectName = 'IFLY:INSPECT'
  static fromReceivedMessage(msg: MessageFromRong) {
    const content: any = msg.content
    const model = new InspectMessage()
    model.sender = chatManager.docUser
    model.messageUId = msg.messageUId
    model.targetId = msg.targetId
    model.contentStr = JSON.parse( content?.content )
    return model
  }
}


/**
 * 病历文本消息
 */
export class ReviewTipMessage extends SMessage {
  type: SMessageType = 'medical-text'
  contentStr:any
  protected doSend(): Promise<MessageFromRong> {
    throw new Error('错误消息')
  }
  static readonly objectName = 'RC:VCInvite'
  static fromReceivedMessage(msg: MessageFromRong) {
    const content: any = msg.content
    const model = new ReviewTipMessage()
    model.sender = chatManager.docUser
    model.messageUId = msg.messageUId
    model.targetId = msg.targetId
    model.contentStr = JSON.parse( content?.content )
    return model
  }
}



/**
 * 疾病百科
 */
export class DiagnosisMessage extends SMessage {
  type: SMessageType = 'diagnosis'
  contentStr:any
  protected doSend(): Promise<MessageFromRong> {
    throw new Error('不应该疾病百科')
  }
  static readonly objectName = 'IFLY:DIAGNOSIS'
  static fromReceivedMessage(msg: MessageFromRong) {
    const content: any = msg.content
    const model = new DiagnosisMessage()
    model.sender = chatManager.docUser
    model.messageUId = msg.messageUId
    model.targetId = msg.targetId
    model.contentStr = JSON.parse( content?.content )
    return model
  }
}



/**
 * 历史病历授权
 */
export class AuthSMedicalRecordMessage extends SMessage {
  type: SMessageType = 'auth-medical'
  contentStr:any
  protected doSend(): Promise<MessageFromRong> {
    throw new Error('不应该发历史病历授权')
  }
  static readonly objectName = 'IFLY:MEDICAL_RECORD_AUTH'
  static fromReceivedMessage(msg: MessageFromRong) {
    const content: any = msg.content
    const model = new AuthSMedicalRecordMessage()
    model.sender = chatManager.docUser
    model.messageUId = msg.messageUId
    model.targetId = msg.targetId
    model.contentStr = JSON.parse( content?.content )
    return model
  }
}



/**
 * 消息限制功能
 */
export class  limitMessage  extends SMessage {
  type: SMessageType = 'limit-message'
  contentStr:any
  protected doSend(): Promise<MessageFromRong> {
    throw new Error('不应该发送限制消息功能')
  }
  static readonly objectName = 'IFLY:DIAGNOSIS'
  static fromReceivedMessage(msg: MessageFromRong) {
    const content: any = msg.content
    const model = new limitMessage()
    model.sender = chatManager.docUser
    model.messageUId = msg.messageUId
    model.targetId = msg.targetId
    model.contentStr = JSON.parse( content?.content )

    return model
  }
}

/**
 * 提示推送类型
 */
export class TipMessage extends SMessage {
  type: SMessageType = 'tip-message'
  contentStr:any
  protected doSend(): Promise<MessageFromRong> {
    throw new Error('不应该发推送消息提醒')
  }
  static readonly objectName = 'GIVE_REPLY_NUMBER'
  static fromReceivedMessage(msg: MessageFromRong) {
    const content: any = msg.content
    const model = new TipMessage()
    model.sender = chatManager.docUser
    model.messageUId = msg.messageUId
    model.targetId = msg.targetId
    model.content =  JSON.parse( content?.content).content
    model.contentStr = JSON.parse( content?.content )
    // chatManager.patReplyRemainNumber =  +model.content
    console.log(chatManager.patReplyRemainNumber,'剩余2399933333')
    return model
  }
}


