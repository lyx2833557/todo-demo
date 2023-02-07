// import axios from "axios";
// 1.封装axios
// 直接对axios进行封装
// 2创建一个新的axios实例
import axios from 'axios';
// axios.create()会创建一个axios实例
const request = axios.create({
    //创建的时候需要提供一些参数
    //1 请求基地址
    baseURL: 'http://localhost:3008',
    // 请求超时的时间
    timeout: 1000,
    // 请求头设置
    // headers: {'X-Custom-Header': 'foobar'}
  });
  // 我们后端返回的数据全部放在res.data内，
  // 可以使用相应拦截器控制axios 请求的返回值
  // 相应拦截器：拦截axios请求回来的响应，处理完之后在返回
  request.interceptors.response.use(function(res){
    return res.data
  })
  export default request