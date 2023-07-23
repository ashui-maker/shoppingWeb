<script setup>
import { showSuccessToast, showToast } from "vant";
import { useLoginStore } from "../../stores/login";
import { useRouter } from "vue-router";
import { ref, reactive } from "vue";
import { changeName } from "../../api/home"
import { getUserMessage } from "../../api/login"
let logins = useLoginStore();

// 实例化当前页面的路由
let router = useRouter();
ref
// 拿到传递过来的ids值

const unLogin = () => {
    logins.removeToken()
    showSuccessToast("退出登录成功")
    router.push({
        path: "/",

    });
}

let user = reactive({
    data: []

})
//获取用户数据
const getUser = () => {
    getUserMessage().then((res) => {
        console.log("res", res)
        user.data = res
        console.log("用户数据==>", user.data)
        if (user.data.msg == "请登录") {
            router.push({
                path: "/login",

            });
        }
    })
}
getUser()
// const head_img = "http://47.115.51.185/uploads/store/comment/20221201/3b44706a906a708cc8e0622ec9ec794b.jpg"
// console.log("用户名字",user.data.nickname);
//修改名字
let username = ref("")
const changeInfo = () => {
    getUser() 
    changeName(user.data.avatar, username.value).then((res) => {
        if (res.status == 200) {
            showToast("修改成功")
        }
    })
    getUser()   
}
const changePsd = () =>{
    router.push({
        path:"./changepsw",
    })
}
</script>
<template>
    <div class="setting-content">
        <div class="setting-header">
            <p>管理我的账号</p>
            <div class="account-info">
                <img :src="user.data.avatar" class="head-img" />
                <div class="user_info">
                    <p class="user-info-name">{{ user.data.nickname }}</p>
                    <p class="user-info-id">绑定手机号： {{ user.data.phone }}</p>
                </div>
                <p class="user-info-now">当前账号</p>
            </div>
        </div>
        <div class="user-name">
            <van-field v-model="username" name="昵称" label="昵称" :model-value="user.data.nickname" input-align="right"
                class="user-name-info" />
            <!-- <p class="user-name-left">昵称</p>
            <input class="user-name-right" placeholder="`${{user.data.nickname }}`"/> -->
        </div>
        <div class="user-id">
            <p class="user-id-left">ID号</p>
            <p class="user-id-right">{{ user.data.uid }}
                <svg t="1689214464781" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
                    p-id="1471" width="17" height="17">
                    <path
                        d="M916.210526 1024 107.789474 1024C78.012632 1024 53.894737 999.855158 53.894737 970.105263L53.894737 485.052632C53.894737 455.275789 78.012632 431.157895 107.789474 431.157895L188.631579 431.157895 188.631579 323.368421C188.631579 144.761263 333.419789 0 512 0 690.580211 0 835.368421 144.761263 835.368421 323.368421L835.368421 431.157895 916.210526 431.157895C945.987368 431.157895 970.105263 455.275789 970.105263 485.052632L970.105263 970.105263C970.105263 999.855158 945.987368 1024 916.210526 1024ZM781.473684 323.368421C781.473684 174.538105 660.830316 53.894737 512 53.894737 363.169684 53.894737 242.526316 174.538105 242.526316 323.368421L242.526316 431.157895 781.473684 431.157895 781.473684 323.368421ZM916.210526 485.052632 835.368421 485.052632 188.631579 485.052632 107.789474 485.052632 107.789474 970.105263 916.210526 970.105263 916.210526 485.052632ZM512 592.842105C526.874947 592.842105 538.947368 604.914526 538.947368 619.789474L538.947368 835.368421C538.947368 850.243368 526.874947 862.315789 512 862.315789 497.125053 862.315789 485.052632 850.243368 485.052632 835.368421L485.052632 619.789474C485.052632 604.914526 497.125053 592.842105 512 592.842105Z"
                        fill="#8a8a8a" p-id="1472"></path>
                </svg>
            </p>
        </div>
        <div class="user-phone">
            <p class="user-phone-left">手机号码</p>
            <p class="user-phone-right">{{ user.data.phone }}
                <svg t="1689214464781" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
                    p-id="1471" width="17" height="17">
                    <path
                        d="M916.210526 1024 107.789474 1024C78.012632 1024 53.894737 999.855158 53.894737 970.105263L53.894737 485.052632C53.894737 455.275789 78.012632 431.157895 107.789474 431.157895L188.631579 431.157895 188.631579 323.368421C188.631579 144.761263 333.419789 0 512 0 690.580211 0 835.368421 144.761263 835.368421 323.368421L835.368421 431.157895 916.210526 431.157895C945.987368 431.157895 970.105263 455.275789 970.105263 485.052632L970.105263 970.105263C970.105263 999.855158 945.987368 1024 916.210526 1024ZM781.473684 323.368421C781.473684 174.538105 660.830316 53.894737 512 53.894737 363.169684 53.894737 242.526316 174.538105 242.526316 323.368421L242.526316 431.157895 781.473684 431.157895 781.473684 323.368421ZM916.210526 485.052632 835.368421 485.052632 188.631579 485.052632 107.789474 485.052632 107.789474 970.105263 916.210526 970.105263 916.210526 485.052632ZM512 592.842105C526.874947 592.842105 538.947368 604.914526 538.947368 619.789474L538.947368 835.368421C538.947368 850.243368 526.874947 862.315789 512 862.315789 497.125053 862.315789 485.052632 850.243368 485.052632 835.368421L485.052632 619.789474C485.052632 604.914526 497.125053 592.842105 512 592.842105Z"
                        fill="#8a8a8a" p-id="1472"></path>
                </svg>
            </p>
        </div>
        <div class="user-password">
            <p class="user-password-left">密码</p>
            <p class="user-password-right" @click="changePsd">点击修改密码 <van-icon name="arrow" /></p>
        </div>
        <button class="save-change" @click="changeInfo">保存修改</button>
        <button class="out-login" @click="unLogin">退出登录</button>
    </div>
</template>
<style scoped>
.setting-content {
    width: 100%;
    height: 666px;
    background-color: #f5f5f5;
    overflow: hidden;
}

.setting-header {
    width: 100%;
    height: 111px;
    background-color: white;
    padding: 20px 15px;
}

.account-info {
    width: 345px;
    height: 80px;
    /* padding: ; */
    margin-top: 20px;
    border: 1px solid red;
    background-color: #fff9f9;
    border-radius: 10px;
    display: flex;
}

.head-img {
    width: 48px;
    height: 48px;
    /* border: 1px solid black; */
    border-radius: 50%;
    margin: 15px 0;
    margin-left: 15px;
}

.user-info-name {
    font-size: 15px;
    margin-top: 23px;
    margin-left: 10px;
}

.user-info-id {
    font-size: 12px;
    color: #999999;
    margin-top: 9px;
    margin-left: 10px;
}

.user-info-now {
    float: right;
    font-size: 13px;
    width: 70px;
    height: 24px;
    background-color: #fde5e4;
    color: #fc4141;
    line-height: 24px;
    text-align: center;
    position: relative;
    left: 52px;
    border-top-right-radius: 9px;
    border-bottom-left-radius: 9px;
}

.user-name {
    width: 360px;
    height: 21.6px;
    margin-top: 6px;
    padding: 15px 15px 15px 0px;
    background-color: white;
    border-bottom: 1px solid #ecebeb;
}

.user-name-info {
    color: #999999;
    font-size: 16px;
}

.user-id {
    width: 360px;
    height: 21.6px;
    /* margin-top: 6px; */
    padding: 15px 15px 15px 0px;
    background-color: white;
    border-bottom: 1px solid #ecebeb;

}

.user-id-left {
    float: left;
    margin-left: 15px;
    font-size: 16px;
}

.user-id-right {
    float: right;
    color: #999999;
    font-size: 16px;
}

.user-phone {
    width: 360px;
    height: 21.6px;
    /* margin-top: 6px; */
    padding: 15px 15px 15px 0px;
    background-color: white;
    border-bottom: 1px solid #ecebeb;

}

.user-phone-left {
    float: left;
    margin-left: 15px;
    font-size: 16px;
}

.user-phone-right {
    float: right;
    color: #999999;
    font-size: 16px;
}

.user-password {
    width: 360px;
    height: 21.6px;
    /* margin-top: 6px; */
    padding: 15px 15px 15px 0px;
    background-color: white;
    border-bottom: 1px solid #ecebeb;

}

.user-password-left {
    float: left;
    margin-left: 15px;
    font-size: 16px;
}

.user-password-right {
    float: right;
    color: #999999;
    font-size: 16px;
}

.save-change {
    width: 345px;
    height: 45px;
    background-color: #e93323;
    color: white;
    margin: 38px 15.1px 0px;
    border: 1px solid white;
    border-radius: 26px;
}

.out-login {
    width: 345px;
    height: 45px;
    background-color: #f5f5f5;
    color: #ff3700;
    border: 1px solid #ff3700;
    border-radius: 26px;
    margin: 15px 15.1px 35px;
}
</style>