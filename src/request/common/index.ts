import { http } from "../base";


export function submit(data:any): Promise<requestResponse> {
  return new Promise((resolve, reject) => {
    http<requestResponse>({
      url: "https://miniprogram.lixuepeng.cn/prod-api/analyseflow/operpt/analyseBillFlow/collectFlowData",
      data,
    }).then((response) => {
      console.log(response, "流水返回参数");
 
      resolve(response);
    });

  });
}


export function getCodeImg(data:any): Promise<requestResponse> {
  return new Promise((resolve, reject) => {
    http<requestResponse>({
      url: "https://miniprogram.lixuepeng.cn/prod-api/taxInfo/getLoginQr",
      data,
    }).then((response) => {
      console.log(response, "返回参数");
 
      resolve(response);
    });

  });
}



export function getImgState(data:any): Promise<requestResponse> {
  return new Promise((resolve, reject) => {
    http<requestResponse>({
      url: `https://miniprogram.lixuepeng.cn/prod-api/taxInfo/queryQrStatus?uuid=${data.uuid}`,
      data,
      method:'GET',
      loading:false
    }).then((response) => {
      console.log(response, "返回参数");
 
      resolve(response);
    });

  });
}


export function downLoad(data:any): Promise<requestResponse> {
  return new Promise((resolve, reject) => {
    http<requestResponse>({
      url: `https://miniprogram.lixuepeng.cn/prod-api/taxInfo/queryReport?serialNo=${data.uuid}`,
      data,
      method:'GET',
      loading:false
    }).then((response) => {
      console.log(response, "返回参数");
 
      resolve(response);
    });

  });
}





