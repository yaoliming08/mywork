interface LoginResponse {
  miniOpenid: string
  userPhone: string
  token: string
  unionId: string
  sessionKey: string
  refreshToken:string,
  imId:string,
  imName:string,
  msg:string
}


interface LoginQuery {
  openId: string
  token: string
  refreshToken:string,
}

