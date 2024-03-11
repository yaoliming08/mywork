import { http } from "../base";

// 登录
export function login(data:any): Promise<LoginResponse> {
  return new Promise((resolve, reject) => {
    uni.login({
      success(res) {
        if (res.code) {
          http<LoginResponse>({
            url: "https://miniprogram.lixuepeng.cn/prod-api/analyseflow/operpt/analyseBillFlow/loginApplet",
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
