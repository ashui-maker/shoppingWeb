import axios from "axios";
import { useLoginStore } from "../stores/login"
import pinia from "../stores/index";
let logins = useLoginStore(pinia)
//创建axios请求实例
let _axios = axios.create({
    baseURL: "http://47.115.51.185/",
});


// 数据响应之前的拦截
_axios.interceptors.request.use(
    // 请求成功发送给后端的数据
    function (config) {
        // 当 pinia 中含有token 每一次请求都添加上
        if (logins.tokens()) {
            config.headers = {
                "Authori-zation": "Bearer " + logins.tokens(),
            };
        }
        return config;
    },
    // 请求失败发送给用户的报错信息
    function (error) {
        return Promise.reject(error);
    }
);

// 数据响应之后的拦截
_axios.interceptors.response.use(
    // 返回给用户的数据
    function (data) {
        // 处理响应之后的数据
        if (data.data) {
            if (data.data.data) return data.data.data;
            return data.data;
        }
        return data;
    },
    // 数据返回失败发送给用户的报错信息
    function (error) {
        return Promise.reject(error);
    }
);

export default _axios;

