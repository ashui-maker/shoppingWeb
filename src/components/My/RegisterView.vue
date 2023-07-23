<script setup>
import { getKey, getCodes, registers } from "../../api/login";
import { ref } from "vue";
import login_img from "../../assets/image/login-img.png";
import { useRouter } from "vue-router"

let router = useRouter();

// 页面的key: 为了确保验证码一分钟只能发送一次
let key = ref("");
const tel = ref(""); // 手机号
const password = ref(""); // 密码
const code = ref(""); // 验证码

// 页面进入,触发获取key值
getKey().then((res) => {
    console.log("res==>", res);
    key.value = res.key;
});

// 获取验证码
const getCode = () => {
    getCodes(key.value, tel.value).then((res) => {
        console.log(res);
    });
};

// 注册方法
const onSubmit = (values) => {
    console.log("submit", values);
    registers(tel.value, code.value, password.value).then((re) => {
        console.log(re);
        router.push({
            path: "/login",

        });
    });
};
const login = () => {
    router.push({
        path: "/login",

    });
}
</script>

<template>
    <div class="register">
        <div class="register-header">
            <img class="login-img" :src="login_img">
        </div>
        <div class="register-footer">
            <div class="register-footer-title">
                <p class="count-register">注册账号</p>

            </div>
            <van-form @submit="onSubmit">
                <van-cell-group inset>
                    <van-field v-model="tel" name="电话号码" label="电话号码" placeholder="电话号码" label-width="56px"
                        :rules="[{ required: true, message: '请填写电话号码' }]" />
                    <van-field v-model="code" name="验证码" label="验证码" placeholder="验证码" label-width="45px"
                        :rules="[{ required: true, message: '请填写验证码' }]" />


                    <van-field v-model="password" type="password" name="密码" label="密码" placeholder="密码" label-width="45px"
                        :rules="[{ required: true, message: '请填写密码' }]" />
                    <button class="rigester-code" @click="getCode">获取验证码</button>
                </van-cell-group>
                <div style="margin: 16px">
                    <van-button class="register-but" round block type="primary" native-type="submit"> 提交 </van-button>
                    <p class="register-1">已有账号？<span @click="login">立即登录</span></p>

                </div>
            </van-form>
        </div>
    </div>
</template>
<style scoped>
.register {
    background-image: linear-gradient(180deg, #eb5447 0, #ff8e3b);
    width: 100%;
    height: 100%;
    position: fixed;
    background-size: 100% 100%;
}

.register-header {
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

.register-footer {
    background-color: #ffffff;
    width: 280px;
    height: 290px;
    margin: 10px 32px 0px;
    padding: 22.5px 15px 0px;
    border-radius: 10px;
}

.register-footer-title {
    width: 100%;
    height: 31.4px;
    font-size: 18px;
    font-weight: 700;
    text-align: center;
    /* margin-left: 17px; */
    /* line-height: 21.4px; */
    line-height: 31px;

}

.rigester-code {
    width: 75px;
    height: 25px;
    font-size: 12px;
    color: white;
    background-color: #f35446;
    border-radius: 15px;
    border: 1px solid white;
    position: relative;
    left: 160px;
    bottom: 80px;

}

.register-but {
    font-size: 17px;
    font-weight: 700;
    border: 1px solid rgb(250, 247, 247);
    background: linear-gradient(#f35447 0, #ff8e3c);
}

.register-1 {
    font-size: 15px;
    color: #cccccc;
    text-align: center;
    margin-top: 5px;
}

span {
    color: #fc4141;
}</style>
