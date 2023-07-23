<script setup>
import { reactive } from "vue";
import { getUserMessage } from "../../api/login"
import { useRouter } from "vue-router";
let router = useRouter();

let user = reactive({
    data: []

})
// let phone =  user.data.phone
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
</script>
<template>
<div class="content">
    <p class="content-phone"><span>当前手机号:{{ user.data.phone }}</span></p>
</div>
</template>
<style scoped>
.content-phone{
    height:20px;
    width: 100%;
    margin-top: 20px;
    text-align: center;
    font-weight: 300;
}
.content-phone span{
    
    font-weight: 700;
}
</style>