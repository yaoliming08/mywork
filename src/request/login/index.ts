import { http } from "../base";

// 登录
export function login(data:any): Promise<LoginResponse> {
  return new Promise((resolve, reject) => {
    uni.login({
      success(res) {
        console.log(res,'1111111111')
        if (res.code) {
          http<LoginResponse>({
            url: "http://124.220.49.71:8080/analyseflow/operpt/analyseBillFlow/loginApplet",
            // url: "http://110.42.239.134:9080/prod-api/auth/login",
            data: {
              password: data.password,
              userName: data.userName,
            },
          }).then((response) => {
            console.log(response, "登录返回参数");
            uni.setStorageSync('isLogin', true);
            resolve(response);
          });
        }
      },
    });
  });
}
