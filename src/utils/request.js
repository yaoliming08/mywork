// http.js
import axios from 'axios';

import {
  ElNotification,
  ElMessageBox,
  ElMessage,
  ElLoading,
} from "element-plus";
 
const http = axios.create({
  baseURL: '/dtshare/prod-api',
  timeout: 1000,
  // 可以添加更多配置...
});
 
// 请求拦截
http.interceptors.request.use(
  config => {
    // 可以在这里添加例如token等请求头
    if (localStorage.getItem("token")) {
      config.headers['token'] = localStorage.getItem("token");
      console.log(config.headers,999999999,localStorage.getItem("token"))
    }


    const formData = new FormData();
    for (const key in config.data) {
      if(config.data[key] !== null && config.data[key] !== undefined)
      formData.append(key, config.data[key]);
    }
    config.data = formData;
  


    
    return config;
  },
  error => {
    // 请求错误处理
    return Promise.reject(error);
  }
);
 
// 响应拦截
http.interceptors.response.use(
  response => {
    // 对响应数据做处理，例如只返回data部分



    if(response.data.respData.code === "000000"){
      return response.data.respBody || {};
    }else{
      ElMessage({ message: response.data.respData.message, type: "warning" });

      if(response.data.respData.code === "208"){
        localStorage.setItem("token", '');
        localStorage.setItem("userInfo", '');

        location.href = "/home";

      }



      return response.data.respBody;
    }



  },
  error => {
    // 响应错误处理
    return Promise.reject(error);
  }
);
 
export default http;