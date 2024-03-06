declare namespace call {
  export type CallType =
    | 'video-callin' // callin 是打进来的-等待中状态， callout是打出去的-等待中状态， ing是通话中， 空表示结束了/未开始
    | 'voice-callin'
    | 'voice-callout'
    | 'video-callout'
    | 'video-ing'
    | 'voice-ing'
    | ''
  export interface User {
    userId: string
    sex?: string
    age?: number
    photo: string
    token?: string
    name?: string
    id?:string
  }

  export interface PatUser extends User {
    sections?: {
      chiefComplaint?: string
    }
  }
}
