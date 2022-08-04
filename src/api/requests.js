// 对于axios进行二次封装
import axios from 'axios'
// 引入进度条   start()进度条开始   done()进度条结束
import nProgress from 'nprogress';
// 引入进度条样式
import 'nprogress/nprogress.css'
// 引入store模块
import store from '@/store'

// 利用axios对象的方法create，去创建一个axios实例
// request就是axios，进行实例化配置
const requests = axios.create({
    // 配置对象
    // 基础路径：发请求的时候，路径当中会出现api
    baseURL: '/api',
    // 代表请求超过的时间5S
    timeout: 5000,
});
// 请求拦截器：在发送请求之前，请求拦截器可以检测到，可以在请求发送之前做一些事情
requests.interceptors.request.use((config) => {
    // config：配置对象，对象里面有一个属性很重要，header请求头
    // 进度条开始动
    // console.log(store);

    //请求头存储游客用户信息uuid 
    if (store.state.detail.uuid_token) {
        // 给请求头添加字段(userTempId)
        config.headers.userTempId = store.state.detail.uuid_token;
    }

    // 请求头存储token
    if (store.state.user.token) {
        config.headers.token = store.state.user.token;
    }

    nProgress.start();
    return config
})
// 响应拦截器：服务器响应数据回来以后，响应拦截器可以检测到，可以做一些事情
requests.interceptors.response.use((res) => {
    // 成功的回调函数：
    // 进度条结束
    nProgress.done();
    return res.data;
}, (error) => {
    // 响应失败的回调函数
    return Promise.reject(new Error('failed'));
});

// 对外暴露
export default requests