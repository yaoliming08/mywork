import BaseClass from './BaseClass'

export default class Commpat extends BaseClass {
  // id
  id: string
  // 就诊人姓名
  commpatName: string
  // 就诊人年龄
  commpatAge: number
  // 就诊人性别
  commpatGender: Sex
  // 就诊人身份证号
  commpatIdcard: string
  // 默认就诊人
  defaultUser: boolean
}