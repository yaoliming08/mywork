import request from '@/utils/request'

// 登录方法
export function login(data) {
  return request({
    url: 'user/index/login',
    headers: {
      isToken: false
    },
    method: 'post',
    data: data
  })
}


// 获取字典值
export function gerCodeList(key) {
  return request({
    url: `system/dict/data/type/${key}`,
    headers: {
      isToken: false
    },
    method: 'get',
  })
}




// 获取用户企业信息
export function getUserCenterInfo(data) {
  return request({
    url: 'user/dtshareEnterprise/auth/getEnterprise',
    method: 'post',
    data: data
  })
}



// 获取用户企业信息
export function getAuthList(data) {
  return request({
    url: 'user/dtshareResDemand/auth/list',
    method: 'post',
    data: data
  })
}





// 获取资源和资源下的指标
export function getDtresAndQuota(data) {
  return request({
    url: 'user/index/getDtresAndQuota',
    method: 'post',
    data: data
  })
}


// 获取该用户是否有已申请的需求
export function authCheck(data) {
  return request({
    url: 'user/dtshareResDemand/auth/check',
    method: 'post',
    data: data
  })
}







// 注册方法
export function register(data) {
  return request({
    url: 'user/index/register',
    headers: {
      isToken: false
    },
    method: 'post',
    data: data
  })
}

// 企业用户认证
export function submit(data) {
  return request({
    url: 'user/dtshareEnterprise/auth/addEnterprise',
    headers: {
      isToken: false
    },
    method: 'post',
    data: data
  })
}


// 交换密钥接口
export function authSubmit(data) {
  return request({
    url: 'user/dtshareResDemand/auth/sbumit',
    headers: {
      isToken: false
    },
    method: 'post',
    data: data
  })
}


// 企业用户认证
export function AuthAdd(data) {
  return request({
    url: 'user/dtshareResDemand/auth/add',
    headers: {
      isToken: false
    },
    method: 'post',
    data: data
  })
}


// 上传图片接口
export function uploadFileApi(data) {
  return request({
    url: 'user/file/upload',
    method: 'post',
    data: data
  })
}





// 刷新方法
export function refreshToken() {
  return request({
    url: '/auth/refresh',
    method: 'post'
  })
}

// 获取用户详细信息
export function getInfo() {
  return request({
    url: '/system/user/getInfo',
    method: 'get'
  })
}

// 退出方法
export function logout() {
  return request({
    url: '/auth/logout',
    method: 'delete'
  })
}

// 获取验证码
export function getCodeValueData(data) {
  return request({
    url: 'user/sms/sendCode',
    headers: {
      isToken: false
    },
    method: 'post',
    data: data
  })
}


// 获取验证码图片
export function getCodeImg(data) {
  return request({
    url: 'user/sms/generateValidateCode',
    headers: {
      isToken: false
    },
    method: 'post',
    data: data
  })
}