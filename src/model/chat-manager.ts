import Male from '@/assets/img/default-avatar-male.png'
// import { SMessage } from '@/model/message'
import { reactive ,ref ,Ref} from 'vue'
function formatGender(gender: string) {
  if (gender == 'M') {
    return '男'
  }
  if (gender == 'F') {
    return '女'
  }
  return gender
}

class ChatManager {
  patUser: call.PatUser = null
  docUser: call.User = null
  consultId:string=null
  patUserId:string=null
  patReplyRemainNumber:number
  // const messageLists = ref([]) as Ref<SMessage[]>
  messageList:any = []
  get docUserId() {
    return this.docUser?.userId
  }
  isCurrentUser(userId: string): boolean {
    return this.patUser?.userId == userId 
  }

  findUser(id: string) {
    if (this.patUser?.userId == id) {
      return this.patUser
    }
    return this.docUser
  }
  loadUsers(res: Consult.OrderInfo) {
    const { userDocVo, userPat, consultInfo: consult } = res
    /**
     *  不用chatManager的话，无法做到响应式
     * 这就是个单例， 就这么用吧
     */
    chatManager.patUser = {
      userId: userPat.id,
      sex: formatGender(consult.consulterGender),
      // 暂时没有用户图片， 用默认的
      photo: userPat.patAvatar || Male,
      name: consult.consulterName,
      age: consult.consulterAge,
    }
    chatManager.docUser = {
      userId: userDocVo.hosId + '-' + userDocVo.jobNo ,   //与医生端沟通 三端打通   todo 后续后端添加字段 
      // userId: '1002' + '-' + userDocVo.jobNo ,   //与医生端沟通 三端打通   todo 后续后端添加字段 
      // userId: userDocVo.id ,   //与医生端沟通 三端打通   todo 后续后端添加字段 

      name: userDocVo.docName,
      photo: userDocVo.docAvatar || Male,
      id:userDocVo.id
      
    }
    chatManager.consultId = consult.id
    chatManager.patReplyRemainNumber = consult.patReplyRemainNumber
  }

  initManager(){


    chatManager.consultId = null
    chatManager.patReplyRemainNumber = null
    chatManager.docUser = null
    chatManager.patUser = null
    chatManager.messageList = []
  }




}

export const chatManager = reactive(new ChatManager())
