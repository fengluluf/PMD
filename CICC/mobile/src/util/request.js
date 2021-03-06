import axios from 'axios'
import Vue from '../main.js'
import {baseUrl} from '../config'
const qs = require('qs');
const bUrl = process.env.NODE_ENV  === "production"?baseUrl:'/api';

// 请求拦截
axios.interceptors.request.use(res => {
    return res
},error =>{
    return  Promise.reject(error.response)
})

// 响应拦截
axios.interceptors.response.use(res => {
    if(res.data.resultCode !==200){
        Vue.Toast(res.data.resultMessage)
    }
    return res
},error =>{
    let res = error.response 
    let msg = res.data.resultMessage || "服务器异常"

    Vue.Toast(msg)
   
    return  Promise.reject(res)
})


function createRequestConfig(api,{method, headers,patterns, params, data}){
    let url  = api;
    let methods = method || 'GET'; // 默认get请求
    let header = headers || {};
    // 解析路径匹配参数
    if(patterns && patterns.length){
        for(let i=0; i < patterns.length; i++){
            url = url.replace(`{${i}}`,patterns[i])
        }
    }

    // 添加userId
    let userId = localStorage.getItem("userIdPMD");
    if(data){
        data.userId = userId;
    }
    if(params&&header["Content-Type"] !== 'application/x-www-form-urlencoded'){
        params.userId = userId;
    }
    
    // 处理application/x-www-form-urlencoded 请求
    if(data&&header["Content-Type"] == 'application/x-www-form-urlencoded'){  // application/x-www-form-urlencoded
        data = qs.stringify(data)
    }
    
    return  axios.request({
        baseURL:  bUrl,
        url,
        method: methods.toLowerCase(),
        params: params, 
        data:data,
        headers: header,
        timeout:10000,
    });
}


export default function request(api,config = {}){

  const { method, headers ,patterns, params, data} = config;
  //patterns匹配路径参数（数组）， params GET请求参数（对象）, data


  // 配置默认header信息
  axios.defaults.headers.post['ACCEPT'] = 'application/json';
  axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'
  return createRequestConfig(api,{method, headers, patterns, params, data})

}