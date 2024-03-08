import { http } from "../base";


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


export function getCodeImg(data:any): Promise<LoginResponse> {
  return new Promise((resolve, reject) => {
    http<LoginResponse>({
      url: "http://124.220.49.71:8080/taxInfo/getLoginQr",
      data,
    }).then((response) => {
      console.log(response, "返回参数");
 
      resolve(response);
    });

  });
}



export function getImgState(data:any): Promise<LoginResponse> {
  return new Promise((resolve, reject) => {
    http<LoginResponse>({
      url: `http://124.220.49.71:8080/taxInfo/queryQrStatus?uuid=${data.uuid}`,
      data,
      method:'get',
      loading:false
    }).then((response) => {
      console.log(response, "返回参数");
 
      resolve(response);
    });

  });
}




