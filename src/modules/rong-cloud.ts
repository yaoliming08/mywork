import * as RongIMLib from '@rongcloud/imlib-v4'
import { IAReceivedMessage } from '@rongcloud/imlib-v4'
/**
 * 所有关于 RongRTC 和 RongCallLib的代码， 都没有类型， 具体只能去找融云的demo，或者这份代码
 * 已经尽量保持demo中的代码不变，无用的代码也是用注释来处理，而没有删除， 可以参考的价值更多
 * 没有必要去完整的写一个.d.ts文件，后续看融云的支持，如果能支持上来， 更新版本即可
 * 目前融云实时音视频， 仅支持 imlib-v4， 所以无法用最新的（当前是V5.6），后续如果支持上来了，可以考虑更新
 */
import RongRTC from '@/assets/rong/RongRTC-wechat-minip-3.2.4'
import RongCallLib from '@/assets/rong/RongCallLib-wechat-minip-3.2.4'
import { SCallMessage, SImageMessage, SMedicalRecordMessage, SMessage, SRecipeMessage, STextMessage, SVoiceMessage, ArticleMessage, InspectMessage, ReviewTipMessage, DiagnosisMessage, AuthSMedicalRecordMessage, TipMessage } from '@/model/message'

// console.log('RongIMClient', RongIMClient)
/**
 * 这个要独立出来， 方便历史消息构造
 */
import { useStore } from '@/stores/chat-consult'
import { chatManager } from '@/model/chat-manager'
import { computed, ref } from 'vue'


import { getRongId } from '@/request/chat/index'


/**
 * 
 * 重新导出融云的类型，避免其他模块直接引用融云的lib
 */
/**
 * 从融云收到的消息类型
 */
export type MessageFromRong = IAReceivedMessage
/**
 * 会话类型
 */
export type ConversationType = RongIMLib.ConversationType

export type CallVideo = {
  type: 'added' | 'removed' | 'leave'
  userId: string
  isLocal: boolean
  data: {
    uri: string
  }
}

export enum MediaType {
  Video = 2,
  Voice = 1,
}

export type CallCommand = {
  messageType: typeof RongCallLib.MessageType
  conversationType: RongIMLib.ConversationType
  targetId: string
  senderUserId: string
  content: { 
    mediaType: MediaType,
    status:number
   }
}
export function makeMessageByReceiveMessage(message: IAReceivedMessage): SMessage {
  const store = useStore()
  let msg = message.messageType
  // message.objectName
  switch (msg) {
    case 'RC:TxtMsg': {
      return STextMessage.fromReceivedMessage(message)
    }
    case 'RC:ImgMsg': {
      return SImageMessage.fromReceivedMessage(message)
    }
    case 'RC:HQVCMsg': {
      return SVoiceMessage.fromReceivedMessage(message)
    }
    case 'IFLY:FIRST_CASE': {
      return SMedicalRecordMessage.fromReceivedMessage(message)
    }
    case 'IFLY:PRE': {
      return SRecipeMessage.fromIReceivedMessageV2(message)
    }
    case 'IFLY:VIDEOS': {
        let content = message.content as any
        console.log(content,'音视频消息')
        let videoType: 'video' | 'voice'
        let videoData =  SCallMessage.makeLocalMessage(content.content, videoType)
        try {
          videoType = JSON.parse(content.extra).videoType == 2 ? 'video' : 'voice'
        } catch (error) {
          videoType = content.extra.videoType == 2 ? 'video' : 'voice'
        }
        try {
          if(content.extra.cmdType === 'PLAYBACK'){ 
            videoData = null
            console.log('videoData',videoData)
          }else{
            videoData  =  SCallMessage.makeLocalMessage(content.content, videoType)
          }
        } catch (error) {
          
        }

        try {
          if(JSON.parse(content.extra).cmdType === 'PLAYBACK'){ 
            videoData = null
          }else{
            videoData  =  SCallMessage.makeLocalMessage(content.content, videoType)
          }
        } catch (error) {
          // videoData = SCallMessage.makeLocalMessage(content.content, videoType)
        }
        
        console.log('111videoData',videoData)
        return videoData

      }
    case 'IFLY:ARTICLE': {
      return ArticleMessage.fromReceivedMessage(message)
    }
    case 'IFLY:INSPECT': {
      return InspectMessage.fromReceivedMessage(message)
    }

    case 'IFLY:MEDICAL_RECORD_TEXT': {
      return ReviewTipMessage.fromReceivedMessage(message)
    }

    case 'IFLY:DIAGNOSIS': {
      return DiagnosisMessage.fromReceivedMessage(message)
    }

    case 'IFLY:MEDICAL_RECORD_AUTH': {
      return AuthSMedicalRecordMessage.fromReceivedMessage(message)
    }

    case 'RC:CmdMsg': {
      console.log('自定义消息类型')
      const content: any = message.content
      const contentStr = JSON.parse(content.content)
      const { cmdType } = contentStr
      if (cmdType === 'CLOSE_CONSULT') { //医生结束咨询
        store.reloadConsult()
      } else if (cmdType === 'START_CONSULT') {  //开始咨询
        store.reloadConsult()
      } else if (cmdType === 'GIVE_REPLY_NUMBER') { //医生赠送消息类型
        return TipMessage.fromReceivedMessage(message)
      }else if(cmdType === 'ARRANGE_CONSULT'){  //视频还剩多少时间开始
        return TipMessage.fromReceivedMessage(message)
      }
      else {
        // store.reloadConsult()
      }
      // return SRecipeMessage.fromIReceivedMessageV2(message);
    }

    default: {
      console.log('不能识别的消息类型', message)
    }
  }
}

export function isCmdMessage(msg: IAReceivedMessage) {
  return msg.messageType == 'RC:CmdMsg'
}

// let caller: RCCallClient

type InitRongOption = {
  appKey: string
  onCmdMessage: (msg: IAReceivedMessage) => void
  onMessage: (msg: SMessage) => void //
  onCall?: (command: CallCommand) => void
  onReady?: (video: CallVideo) => void
  onHangup?: () => void
}

let initRongOption: InitRongOption = null
let rongCallLib: any = null

export function mute() {
  /**
   * 融云的人说， 这个是给房间里其他人发通知： 这边静音了
   * 但是我并没有收到这个消息， 先调用一下吧，暂时没有效果
   *
   * -------------引用融云回复
   * 小程序的 call 没有上报这个状态，如果您业务层需要，可以通过给对端发一条自定义消息实现
   * -------------
   */
  rongCallLib.mute()
}
export function unmute() {
  rongCallLib.unmute()
}

export function accept({ callingType, conversationType }: { callingType: call.CallType; conversationType: RongIMLib.ConversationType }): Promise<void> {
  console.log('accent2222222222')
  // const { conversationType, targetId, inviteUserIds, mediaType }
  return new Promise((resolve, reject) => {
    const mediaType = callingType.startsWith('video') ? MediaType.Video : MediaType.Voice
    console.log('accept', { mediaType, conversationType })
    rongCallLib.accept(
      {
        conversationType: conversationType,
        targetId: chatManager.docUserId,
        inviteUserIds: [chatManager.docUserId],
        mediaType,
      },
      function (error: any) {
        error ? reject(error) : resolve(undefined)
      },
    )
  })
}

export function hangup(conversationType: RongIMLib.ConversationType): Promise<void> {
  return new Promise(resolve => {
    rongCallLib.hungup(
      {
        conversationType: conversationType,
        targetId: chatManager.docUserId,
      },
      function (error: any) {
        if (error) {
          console.warn('hungup', error)
        }
        resolve(undefined)
      },
    )
  })
}

/**
 * 初始化融云： 连接， 注册回调什么的
 * @param option
 * @returns
 */
export function initRong(option: InitRongOption): Promise<void> {
  if (initRongOption != null) {
    initRongOption = option
    return
  }
  let timer: any
  initRongOption = option
  RongIMLib.init({ appkey: option.appKey })
  // console.log(rongCallLib)
  // const Events = RongIMClient.Events
  RongIMLib.getInstance().watch({
    conversation: function (event) {
      // let updatedConversationList = event.updatedConversationList; // 更新的会话列表
      // console.log('更新会话汇总:', updatedConversationList);
    },
    message(event) {
      console.log('获取发送来的消息体message', event)
      let item = event.message
      if (isCmdMessage(item)) {
        if (chatManager.docUserId && chatManager.docUserId === item.targetId ){
          initRongOption.onCmdMessage(item)
        }
      } else {
        if (item.messageType !== 'RC:ReadNtf' && item.messageType !== 'RC:TypSts') {  //已读消息暂时不识别
          if (chatManager.docUserId && chatManager.docUserId === item.targetId ) {   //需要在聊天页面 并且需要是当前聊天页面咨询的医生
            console.log('在聊天界面获取到当前医生的消息并对当前医生的消息做出处理',item)
            clearTimeout(timer);
            timer = setTimeout(() => {
              sendReadConversation(item.messageUId, String(item.sentTime))
            }, 3000)
            initRongOption.onMessage(makeMessageByReceiveMessage(item))
          }

        }

      }
    },
    status: function (event) {
      let status = event.status;
      console.log('连接状态码返回:', status);
    }
  })

  rongCallLib = RongCallLib.init({
    timeout: 20000,
    RongIMLib: RongIMLib,
    RongRTC: RongRTC,
  })

  rongCallLib.videoWatch(function (video: CallVideo) {
    console.log('监听到一条音视频消息', video)

    /**
     * 视频已经准备好了  -- onReady
     */
    // videoWatcher.notify(result)
    // console.log(result)
    const { type, userId, data } = video
    // const { streams } = this.data
    // console.log('onVideoChange =>', type, userId)

    switch (type) {
      case 'removed':
        // 这个消息忽略就好
        // this.removeMember(userId)
        break
      case 'added':
        // 直接扔到外层去处理
        initRongOption.onReady(video)
        // if (video.isLocal) {
        //   this.setData({ pusher: video })
        //   return
        // }
        // streams[userId] = data
        // this.setData({ streams })
        break
    }
  })
  rongCallLib.commandWatch(function (message: CallCommand) {

    // commandWatcher.notify(message)
    // const { Call, ConversationType } = app.getService()
    const { messageType, conversationType, targetId, senderUserId, content } = message
    const MessageType = RongCallLib.MessageType
    console.log( '聊天过程commandWatch监听获取到消息',message, messageType, targetId, senderUserId, content)

    switch (messageType) {
      case MessageType.AcceptMessage:
        /**
         * 这是对方接收的消息，可以忽略
         */
        // this.setStatus(Status.TALKING)
        break
      case MessageType.SummaryMessage:
        /**
         * 这是挂断消息，可以忽略
         */
        // this.setStatus(Status.FREE)


        if(+content.status === 5 ){
          console.log('我方超时未接听')
          isClearCall.value = true
        }

        break
      case MessageType.InviteMessage:
        /**
         * 这是别人打进来的，需要发送通知到回调里面去 -- onCall
         */
        initRongOption.onCall(message)

        if(chatManager.docUserId !== message.targetId){
          getRongId(message.targetId)
        }


        






        

        // this.setData({
        //   callin: true,
        //   crtTargetId: targetId,
        //   crtConversationType: conversationType,
        // })
        // const userIds = [senderUserId, ...content.inviteUserIds]
        // this.setMembers(userIds)
        // const index = MediaTypes.findIndex(item => item.type === content.mediaType)
        // this.setMediaTypeIndex(index)
        // this.setStatus(Status.WAITING)
        break
      case MessageType.HungupMessage:
        // 挂断消息， 发送消息到回调 -- onHangup
        console.log('收到一个挂断消息',chatManager.docUserId)
        if(chatManager.docUserId){
          initRongOption.onHangup()
        }
        //v3版本对方挂断之后，己方也需要调用一下hangup， 否则融云状态置不过来， 对方重拨会提示“对方忙”
        hangup(conversationType)
  
        // if (conversationType === ConversationType.PRIVATE) {
        //   this.hungup()
        //   return
        // }
        // this.removeMember(senderUserId)
        break
      case MessageType.MemberModifyMessage:
        /**
         * 多人视频通话才有用，忽略就好
         */
        // const { crtMembers, free } = this.data
        // const { inviteUserIds, existedMemberStatusList } = content

        // // 被中途邀请进房间
        // if (free) {
        //   const index = MediaTypes.findIndex(item => item.type === content.mediaType)
        //   this.setMediaTypeIndex(index)
        //   this.setData({
        //     callin: true,
        //     crtTargetId: targetId,
        //     crtConversationType: conversationType,
        //   })
        //   this.setMembers([...inviteUserIds, ...existedMemberStatusList.map(item => item.userId)])
        //   this.setStatus(Status.WAITING)
        //   return
        // }
        // // 有其他人被邀请进入房间
        // this.setMembers([...crtMembers, ...inviteUserIds])
        break
    }
  })

  // const config = {
  //   timeout: 20000,
  //   RongIMLib: RongIMClient,
  //   RongRTC: RongRTC,
  // }
  // const rongCallLib = RongCallLib.init(config)

  // const videoWatcher = function (result) {
  //   const { type, userId, data, isLocal } = video

  //   switch (type) {
  //     case 'added':
  //       if (video.isLocal) {
  //         // 将 data.url 中的 rtmp 地址赋值给 live-pusher 组件
  //       } else {
  //         // 将 data.rul 中的 rtmp 地址赋值给 live-player 组件
  //       }
  //       break
  //     case 'removed':
  //       // 移除指定 live-player or live-pusher
  //       break
  //   }
  // }
  // rongCallLib.videoWatch(videoWatcher)
  // RongIMClient.setConnectionStatusListener({
  //   onChanged(status) {
  //     switch (status) {
  //       case ConnectionStatus["CONNECTED"]:
  //       case 0:
  //         console.log("连接成功");
  //         break;

  //       case ConnectionStatus["CONNECTING"]:
  //       case 1:
  //         console.log("连接中");
  //         break;
  //       case ConnectionStatus["DISCONNECTED"]:
  //       case 2:
  //         console.log("当前用户主动断开链接");
  //         break;

  //       case ConnectionStatus["NETWORK_UNAVAILABLE"]:
  //       case 3:
  //         console.log("网络不可用，准备重连");

  //         break;

  //       case ConnectionStatus["CONNECTION_CLOSED"]:
  //       case 4:
  //         console.log("未知原因，连接关闭");
  //         break;

  //       case ConnectionStatus["KICKED_OFFLINE_BY_OTHER_CLIENT"]:
  //       case 6:
  //         console.log("用户账户在其他设备登录，本机会被踢掉线");
  //         break;

  //       case ConnectionStatus["DOMAIN_INCORRECT"]:
  //       case 12:
  //         console.log("当前运行域名错误，请检查安全域名配置");
  //         break;
  //     }
  //   },
  // });

  // const imClient: IMClient = RongIMClient.getInstance();

  // 参考官网文档，第二个参数可以不给
  // const rtcClient: RCRTCClient = imClient.install(rtcInstaller, undefined);

  // CallLib 客户端初始化
  // CallLib 全局变量定义为 RCCall，使用 CDN 文件集成时，示例如下：
  // const caller = imClient.install(RCCall.installer)
  // caller = imClient.install(callInstaller, {
  //   // rtcClient 实例 （必填）
  //   rtcClient,
  //   /**
  //    * 被动收到邀请 （收到一个远端发起的新会话）, 会产生一个新的 session 对象 （必填）
  //    */
  //   onSession(session: RCCallSession) {
  //     console.log("收到电话");
  //     option.onCall(session.getMediaType(), session);
  //     /**
  //      * **收到新的 session 后需要立即注册事件监听**
  //      */
  //     session.registerSessionListener({
  //       onMemberModify(sender, iviteUsers, session) {
  //         console.log("用户发生变化", sender, iviteUsers, session);
  //       },
  //       onMediaModify(sender, mediaType, session) {
  //         console.log("媒体发生变化", sender, mediaType, session);
  //       },
  //       onAudioMuteChange(muteUser, session) {
  //         console.log("音频静音", muteUser, session);
  //       },
  //       onVideoMuteChange(muteUser, session) {
  //         console.log("视频静音", muteUser, session);
  //       },
  //       /**
  //        * 当远端用户已开始响铃，表示对方已收到呼叫请求
  //        * @param sender 已响铃的用户
  //        * @param session 当前的 session 对象
  //        */
  //       async onRinging(sender: ISenderInfo, session: RCCallSession) {
  //         const { userId } = sender;
  //       },
  //       /**
  //        * 当远端用户同意接听
  //        * @param sender 远端用户
  //        * @param session 当前的 session 对象
  //        */
  //       onAccept(sender: ISenderInfo, session: RCCallSession) {
  //         const { userId } = sender;
  //       },
  //       /**
  //        * 当有远端用户挂断
  //        * @param sender 远端用户
  //        * @param reason 挂断的原因
  //        * @param session 当前的 session 对象
  //        */
  //       onHungup(
  //         sender: ISenderInfo,
  //         reason: RCCallEndReason,
  //         session: RCCallSession
  //       ) {
  //         const { userId } = sender;
  //       },
  //       /**
  //        * 本端资源或远端资源已获取
  //        * @param track 本端资源或远端资源, track 不可设置成 Vue 组件的响应式数据
  //        * @param session 当前的 session 对象
  //        */
  //       onTrackReady(track: RCTrack, session?: RCCallSession) {
  //         // track.isLocalTrack() 是否为本地资源
  //         // track.isAudioTrack() 是否为音频
  //         // track.isVideoTrack() 是否为视频
  //         // track.getUserId()    产生该 track 的用户id
  //         // 播放音频。如果为远端音频，建议直接播放。如为本端音频，建议不播放，以减少回音。
  //         option.onReady(session.getMediaType(), track);
  //         // if (track.isAudioTrack() && !track.isLocalTrack()) {
  //         //   // track.play()
  //         // }

  //         // 视频在对应的容器里播放
  //         // if (track.isVideoTrack() && !track.isLocalTrack()) {
  //         //   option.onReady(session.getMediaType(), track)
  //         //   // const video = document.getElementById('video' + user.userId) as HTMLVideoElement
  //         //   // track.play(video)
  //         // }
  //       },
  //     });
  //   },

  /**
   *  以下三条只要满足一条，就会触发onSessionClose
   *  1、本端用户自己主动挂断
   *  2、服务端把本端用户踢出 RTC 房间
   *  3、房间里小于2个人
   *
   *  @param {RCCallSession} session 被结束的 session 对象
   *  @param summaryInfo 结束一个 session 的后汇总信息
   */
  //   onSessionClose(session: RCCallSession, summaryInfo?: IEndSummary) {
  //     //
  //     console.log("会话关闭");
  //     option.onHangup();
  //   },
  // });
}


/**
 * 是否清楚音视频聊天
 * isClearCall
 * @
 */
export const isClearCall = ref(false)


export function disconnect() {
  RongIMLib.getInstance()?.disconnect()
}

const extra = computed(() => {
  const store = useStore()
  return JSON.stringify({
    businessId: store.consultId,
    businessType: 'ORDER',
    chatType: 'ZLW'
  })
})

/**
 * 发送文本消息
 * @param {*} targetId
 * @param {*} content
 */
export async function sendTextMessage(targetId: string, content: string): Promise<IAReceivedMessage> {
  // const conversation = {
  //   conversationType: ConversationType.PRIVATE,
  //   targetId,
  // }
  const conversation = RongIMLib.getInstance().Conversation.get({
    targetId,
    type: RongIMLib.CONVERSATION_TYPE.PRIVATE,
  })
  let result = await conversation.send({
    messageType: RongIMLib.MESSAGE_TYPE.TEXT,
    content: {
      content,
      extra: extra.value,
    },
  })
  return result
  // 这个是v5的写法
  // 实例化待发送消息，RongIMLib.TextMessage 为内置文本型消息
  // const message = new RongIMClient.TextMessage({ content })
  // let result = await RongIMClient.sendMessage(conversation, message)
  // console.log('send result', result)
  // if (result.code == 0) {
  //   return result.data
  // }
  // throw new Error(result.msg)
}

/**
 * 发送图片消息 -- 这边不封装上传的过程了， 因为存在重新发送的可能，外部去处理上传的逻辑，避免上传两次
 * @param targetId
 * @param content
 * @returns
 */

export async function sendImageMessage(targetId: string, imageUri: string, thumbnail: string): Promise<IAReceivedMessage> {
  let base64 = thumbnail
  base64 = base64.split('base64,').pop() as string

  const conversation = RongIMLib.getInstance().Conversation.get({
    targetId,
    type: RongIMLib.CONVERSATION_TYPE.PRIVATE,
  })
  let result = await conversation.send({
    messageType: RongIMLib.MESSAGE_TYPE.IMAGE, // 'RC:ImgMsg'
    content: {
      content: base64, // // 压缩后的 base64 略缩图, 用来快速展示图片
      imageUri: imageUri, // 上传到服务器的 url. 用来展示高清图片
      extra: extra.value,
    },
  })
  return result
  // 这个是v5的写法
  // const message = new RongIMClient.ImageMessage({ content: base64, imageUri })
  // const conversation = {
  //   conversationType: RongIMClient.ConversationType.PRIVATE,
  //   targetId,
  // }
  // let result = await RongIMClient.sendMessage(conversation, message)
  // console.log('send result', result)
  // if (result.code == 0) {
  //   return result.data
  // }
  // throw new Error(result.msg)
}
/**
 * 发送语音消息
 * @param targetId
 * @param recorderRes
 * @returns
 */
export async function sendHQVoiceMessage(targetId: string, content: string, duration: number): Promise<IAReceivedMessage> {
  const conversation = RongIMLib.getInstance().Conversation.get({
    targetId,
    type: RongIMLib.CONVERSATION_TYPE.PRIVATE,
  })
  let result = await conversation.send({
    messageType: RongIMLib.MESSAGE_TYPE.HQ_VOICE, // 'RC:HQVCMsg'
    content: {
      remoteUrl: content, // 音频 url, 建议格式: aac
      duration: duration, // 音频时长
      type: 'mp3',
      extra: extra.value,
    },
  })

  return result
  // 这个是v5的写法
  // const message = new RongIMClient.HQVoiceMessage({
  //   remoteUrl: content,
  //   duration,
  // })
  // const conversation = {
  //   conversationType: RongIMClient.ConversationType.PRIVATE,
  //   targetId,
  // }

  // let result = await RongIMClient.sendMessage(conversation, message)
  // if (result.code == 0) {
  //   return result.data
  // }
  // throw new Error(result.msg)
}
/**
 * 连接融云 -- 相当于登录qq， 没登陆发不了消息
 * @param user
 * @returns
 */
export function connectRong(imId: string): Promise<void> {
  console.log('connectRong', imId)
  return RongIMLib.getInstance()
    .connect({ token: imId })
    .then(res => {
      console.log('初始化融云链接成功', res)
    })
}
/**
 * 融云获取历史消息
 * @param targetId
 * @returns
 */

export async function getHis(targetId: string): Promise<IAReceivedMessage[]> {
  var conversation = RongIMLib.getInstance().Conversation.get({
    targetId,
    type: RongIMLib.CONVERSATION_TYPE.PRIVATE,
  })
  try {
    let result = await conversation.getMessages({
      timestamp: 0,
      count: 120,
      order: 0,
    })
    var list = result.list // 历史消息列表
    console.log(list, '获取到的历史', targetId)
    return list
  } catch (e) {
    return []
  }
}
/**
 * 发送已读消息回执
 * @param targetId
 */
export function sendReadConversation(messageUId: string, sentTime: string) {
  // let userId = chatManager.docUserId
  let con = RongIMLib.getInstance().Conversation.get({
    targetId: chatManager.docUserId,
    type: RongIMLib.ConversationType.PRIVATE,
  })
  con.read().then(() => {
    con.send({
      messageType: 'RC:ReadNtf',
      content: {
        messageUId: messageUId,
        lastMessageSendTime: sentTime,
        type: '1'
      },
    }).then(function (message) {
      console.log('发送已读通知消息成功', message);
    });
  })
}
