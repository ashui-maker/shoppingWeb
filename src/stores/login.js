import { defineStore } from 'pinia';
import {ref} from "vue";

const useLoginStore = defineStore("login",()=>{
    //声明基本token变量
    let token = ref("")
    //改变token值
    const changeToken = (message) =>{
        token.value = message
        console.log("pinia.tokem==>",token.value);
        //存储token到浏览器中
        localStorage.setItem("token",message);
    };
    const tokens = () => {
        token.value = ""
        //先去查看token.value
        // if(token.value) return token.value
        //页面刷新 / 回退页面token值不存在
        //获取浏览器token
        let myToken = localStorage.getItem("token")
        //判断浏览器中缓存是否含有token
        token.value = myToken ? myToken : ""
        return token.value
    }
    const removeToken = () =>{
        changeToken("")
    }
    return{
        token,
        changeToken,
        tokens,
        removeToken
    }
});
export {useLoginStore}
