import axios from "./axios"
//登录功能
const login = (tel, password) => {
    return axios({
        method:"post",
        url:"/api/login",
        data:{
            account:tel,
            code:"",
            password:password,
        }
    })
}
//注册功能，获取验证码的key
const getKey = () =>{
    return axios({
        method:'get',
        url:"/api/verify_code"
    })
}
//获取注册的二维码
const getCodes = (key,tel) => {
    return axios({
        method:"post",
        url:"/api/register/verify",
        data:{
            code:"",
            key:key, //页面key
            phone:tel, //手机号
            type:"register",
        }
    })
}
//通过二维码注册账号
const registers = (tel,code,password) => {
    return axios({
        method:"post",
        url:"api/register",
        data:{
            account:tel,
            captcha:code,
            password:password,
            apread:null,
        }
    })
}
//获取用户的数据
const getUserMessage = () => {
    return axios({
        method:"get",
        url:"/api/user"
    })
}
export { login,getKey,getCodes,registers,getUserMessage}