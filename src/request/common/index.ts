import { http } from "../base";

// 登录
export function submit(data:any): Promise<LoginResponse> {
  return new Promise((resolve, reject) => {
    http<LoginResponse>({
      url: "http://124.220.49.71:8080/analyseflow/operpt/analyseBillFlow/collectFlowData",
      data,
    }).then((response) => {
      console.log(response, "流水返回参数");
 
      resolve(response);
    });

  });
}
