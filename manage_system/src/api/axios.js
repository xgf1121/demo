import axios from 'axios'
import config from '../config'
const baseUrl = process.env.NOOE_ENV === 'development' ? config.baseUrl.dev : config.baseUrl.pro

class HttpRequest {
  constructor(baseUrl){
    this.baseUrl = baseUrl
  }
  getInsideConfig() {
    const config = {
      baseUrl: this.baseUrl,
      header: {}
    }
    return config
  }
  //拦截器
  interceptors(instance){
    // 添加请求拦截器
    instance.interceptors.request.use(function(config){ 
    //在请求发送之前做一些事情
      return config 
    },function(error){ 
      // 做一些请求错误的事情
      return Promise .reject(error );   
    });
    // 添加响应拦截器
    instance.interceptors.response.use(function(response) { 
      // console.log(response);
      // 对响应数据执行操作
      return response;   
    }, function ( error ) { 
      console.log(error);
    // 对响应错误执行操作
      return Promise .reject(error) ;   
    });
  }
  //请求
  request(options) {
    const instance = axios.create()
    options = {...this.getInsideConfig(), ...options }
    this.interceptors(instance)
    return instance(options)
  }
}

export default new HttpRequest(baseUrl)