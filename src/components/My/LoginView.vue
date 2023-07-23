<script setup>
import { ref } from "vue"
import { login } from "../../api/login";
import { getKey,getCodes} from "../../api/login";

import { showSuccessToast, showFailToast } from "vant";
import { useLoginStore } from "../../stores/login";
import login_img from "../../assets/image/login-img.png";
import { useRouter } from "vue-router"
import { reactive } from "vue";

// import { defineProps } from "vue";
let router = useRouter();

let logins = useLoginStore();
console.log("login", logins.token)
let key = ref("");
// 页面进入,触发获取key值
getKey().then((res) => {
    console.log("res==>", res);
    key.value = res.key;
});
const tel = ref("");
const password = ref("")
const onSubmit = (values) => {
    console.log("submit", values)
    login(tel.value, password.value).then((res) => {
        console.log("登录后的数据==>", res);
        if (res.token) {
            showSuccessToast("登录成功");
            logins.changeToken(res.token)
            router.push("/my")
        } else {
            showFailToast("登录失败", res.token)
        }
    })
    // const changeToken = (message) => {
    //     token.value = message
    //     console.log("pinia.token==>",token.value)
    //     localStorage.setItem("token",message)
    // }
}
// let flag = false
let flag = reactive({
    decide: true
})
const change = (Boolean) => {
    flag.decide = Boolean; //重要处
    console.log(flag.decide)
}
const register = () => {
    router.push({
        path: "/register",

    });
}

const getCode = () => {
    getCodes(key.value, tel.value).then((res) => {
        console.log(res);
    });
};
</script>

<template>
    <div class="login-body">
        <div class="login-header">
            <img class="login-img" :src="login_img">
        </div>
        <div class="login-footer">
            <div class="login-footer-title">
                <p class="count-login" @click="change(true)">账号登录</p>
                <p class="quick-login" @click="change(false)">快速登录</p>
            </div>
            <div class="login-content" v-show="flag.decide === true">
                <van-form @submit="onSubmit">
                    <van-cell-group inset>
                        <!-- <van-icon name="manager-o" /> -->
                        <van-field class="login-input" v-model="tel" name="手机号"  label="手机号" placeholder="输入手机号码"
                            label-width="45px" :rules="[{ required: true, message: '请填写手机号' }]" />
                        <van-field class="login-input" v-model="password" type="password" name="密码" label="密码"
                            label-width="45px" placeholder="填写登录密码" :rules="[{ required: true, message: '请填写密码' }]" />
                    </van-cell-group>
                    <div style="margin: 16px;">
                        <van-button class="login-button" round block type="primary" native-type="submit">
                            登录
                        </van-button>
                        <p class="register">没有账号？<span @click="register()">立即注册</span></p>
                    </div>
                </van-form>
            </div>
            <div class="login-content" v-show="flag.decide === false">
                <van-form @submit="onSubmit">
                    <van-cell-group inset>
                        <van-field class="login-input" v-model="tel" name="手机号" label="手机号" placeholder="输入手机号码"
                            label-width="45px" :rules="[{ required: true, message: '请填写手机号' }]" />
                        <van-field class="login-input" v-model="password" type="password" name="验证码" label="验证码"
                            label-width="45px" placeholder="输入验证码" :rules="[{ required: true, message: '请填写验证码' }]" />
                        <button class="login-code" @click="getCode">获取验证码</button>
                    </van-cell-group>
                    <div style="margin: 16px;">
                        <van-button class="login-button" round block type="primary" native-type="submit" @click="getCode">
                            登录
                        </van-button>
                        <p class="register">没有账号？<span @click="register">立即注册</span></p>
                    </div>
                </van-form>
            </div>
        </div>
    </div>
</template>
<style scoped>
/* *{
    background-image: linear-gradient(180deg,#eb5447 0,#ff8e3b);
} */
.login-body {
    background-image: linear-gradient(180deg, #eb5447 0, #ff8e3b);
    width: 100%;
    height: 100%;
    position: fixed;
    background-size: 100% 100%;
}

.login-header {
    width: 82px;
    height: 82px;
    border-radius: 50%;
    background: #fbdeda;
    margin: 35px 145px;
}

.login-img {
    width: 82px;
    height: 82px;
    border-radius: 50%;
}

.login-footer {
    /* display: flex; */
    background-color: #ffffff;
    width: 280px;
    height: 290px;
    margin: 10px 32px 0px;
    padding: 22.5px 15px 0px;
    border-radius: 10px;
}

.login-footer-title {
    width: 280px;
    height: 31.4px;
    font-size: 18px;
    font-weight: 700;
    /* text-align: center; */
    margin-left: 17px;
    /* line-height: 21.4px; */
    line-height: 31px;
    display: flex;
}

.count-login {
    margin-left: 30px;
}

.quick-login {
    margin-left: 40px;
}

.login-input {
    line-height: 35px;
    border-bottom: #191817;
}

.login-code {
    width: 75px;
    height: 25px;
    font-size: 12px;
    color: white;
    background-color: #f35446;
    border-radius: 15px;
    border: 1px solid white;
    position: relative;
    left: 160px;
    bottom: 45px;
}

.login-button {
    font-size: 17px;
    font-weight: 700;
    border: 1px solid rgb(250, 247, 247);
    background: linear-gradient(#f35447 0, #ff8e3c);

}

.register {
    font-size: 15px;
    color: #cccccc;
    text-align: center;
    margin-top: 5px;
}

span {
    color: #fc4141;
}</style>