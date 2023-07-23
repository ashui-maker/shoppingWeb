<script setup>
// import { useRouter } from "vue-router"
// import login_img from "../assets/image/login-img.png";
// import { useLoginStore } from "../stores/login";
import { getUserMessage } from "../api/login"
import { reactive } from "vue";
import { useRouter } from "vue-router"

let router = useRouter();
// const head_img = "http://47.115.51.185/uploads/store/comment/20221201/3b44706a906a708cc8e0622ec9ec794b.jpg"

let user = reactive({
    data: []

})
//获取用户数据
// const getUser = () => {
getUserMessage().then((res) => {
    console.log("res", res)
    user.data = res
    console.log("用户数据==>", user.data)
})
// }
const goSetting = () => {
    router.push({
        path: "/setting",
        
    });
}
</script>
<template>
    <!-- <h2>我的页面</h2> -->
    <!-- <div class="content-body"> -->
    <div class="content">
        <div class="my-header">
            <img class="head-img" :src="user.data.avatar">
            <div class="information">
                <p class="my-name">{{ user.data.nickname }} </p>
                <p class="my-member">{{ user.data.vip_name }}</p>
                <!-- <br> -->
                <p class="my-id">ID: {{ user.data.uid }}  <van-icon name="edit" /></p>
            </div>

            <div><van-icon name="setting-o" size="18" color="white" class="setting-icon" @click="goSetting"/></div>
        </div>
        <div class="my-count">
            <div class="my-count-item">我的余额
                <div class="num">{{ user.data.now_money }}</div>
            </div>
            <p class="my-count-p"></p>
            <div class="my-count-item">当前佣金
                <div class="num">{{ user.data.commissionCount }}</div>
            </div>
            <p class="my-count-p"></p>
            <div class="my-count-item">优惠券
                <div class="num">{{ user.data.extractTotalPrice }}</div>
            </div>
        </div>
        <div class="my-order">
            <p class="my-order-left">我的订单</p>
            <p class="my-order-right">全部订单<van-icon name="arrow" /></p>
        </div>
        <div class="order-detail">
            <div class="order-detail-item">
                <van-image src="src\assets\image\my_order1.png" class="order-detail-item-img"></van-image>
                <p>待付款</p>
            </div>
            <div class="order-detail-item">
                <van-image src="src\assets\image\my_order2.png" class="order-detail-item-img"></van-image>
                <p>待发货</p>
            </div>
            <div class="order-detail-item">
                <van-image src="src\assets\image\my_order3.png" class="order-detail-item-img"></van-image>
                <p>待收获</p>
            </div>
            <div class="order-detail-item">
                <van-image src="src\assets\image\my_order4.png" class="order-detail-item-img"></van-image>
                <p>待评价</p>
            </div>
            <div class="order-detail-item">
                <van-image src="src\assets\image\my_order5.png" class="order-detail-item-img"></van-image>
                <p>售后/退款</p>
            </div>
        </div>
        <div class="my-service">
            <p>我的服务</p>
        </div>
        <div class="my-service-detail">
            <van-grid :border="false" :column-num="4">
                <van-grid-item><van-icon name="user-o" color="red" size="26" />
                    <p>会员中心</p>
                </van-grid-item>
                <van-grid-item><van-icon name="point-gift-o" color="red" size="26" />
                    <p>砍价记录</p>
                </van-grid-item>
                <van-grid-item><van-icon name="friends-o" color="red" size="26" />
                    <p>我的推广</p>
                </van-grid-item>
                <van-grid-item><van-icon name="after-sale" color="red" size="26" />
                    <p>我的余额</p>
                </van-grid-item>
                <van-grid-item><van-icon name="guide-o" color="red" size="26" />
                    <p>地址信息</p>
                </van-grid-item>
                <van-grid-item><van-icon name="star-o" color="red" size="26" />
                    <p>我的收藏</p>
                </van-grid-item>
                <van-grid-item><van-icon name="balance-pay" color="red" size="26" />
                    <p>优惠券</p>
                </van-grid-item>
                <van-grid-item><van-icon name="friends-o" color="red" size="26" />
                    <p>联系客服</p>
                </van-grid-item>
            </van-grid>
        </div>
        <div style="margin-top: 100px;">
            <!-- <button @click="token" style="border: 1px solid black;float: bottom: ;;">点击查看token</button> -->
           
        </div>
    </div>
    <br>
    <!-- </div> -->
</template>
<style scoped>
.content {
    width: 100%;
    height: 100%;
    background-color: #f5f5f5;
    overflow: hidden;
}

.my-header {
    width: 375px;
    height: 130px;
    box-sizing: border-box;
    /* position: fixed; */
    background-color: #e93323;
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;
    display: flex;
    /* margin-bottom: 10px; */
    padding: 15px 15px;
}

.head-img {
    width: 60px;
    height: 60px;
    border-radius: 50%;
}

.information {
    display: flex;
    width: 250px;
}

.my-name {
    color: white;
    font-size: 16px;
    margin-top: 10px;
    margin-left: 10px;
}

.my-member {
    width: 76px;
    height: 18px;
    background-color: #ba291c;
    font-size: 12px;
    margin-top: 10px;
    margin-left: 10px;
    color: white;
    text-align: center;
    line-height: 18px;
    border-radius: 9px;
    /* margin-right: 100px; */

}

.my-id {
    height: 20px;
    width: 80px;
    position: relative;
    left: -118px;
    top: 33px;
    font-size: 13px;
    color: #ffffff99;
    /* margin-left: 100px; */
}

.setting-icon {
    float: right;
    position: relative;
    right: -15px;
    top: 10px;
}

.my-count {
    width: 355px;
    height: 70px;
    background-color: white;
    display: flex;
    margin: 0px 10px;
    border-radius: 3px;
    position: relative;
    top: -36px;
}

.my-count-item {
    width: 33%;
    text-align: center;
    /* display: flex; */
    /* justify-content: center; */
    margin-top: 14px;
    font-size: 13px;
    color: #aaaaaa;
}

.my-count-p {
    margin-top: 15px;
    height: 40px;
    width: 1px;
    background-color: #e3e2e2;
}

.num {
    font-size: 18px;
    color: black;
    margin-top: 10px;

}

.my-order {
    width: 335px;
    height: 44px;
    background-color: white;
    position: relative;
    top: -28px;
    margin: 0px 10px;
    padding: 0px 10px;
    line-height: 44px;
    border-radius: 3px;
}

.my-order-left {
    float: left;
    font-size: 15px;
}

.my-order-right {
    float: right;
    font-size: 13px;
    color: #666666;
}

.order-detail {
    width: 355px;
    height: 80px;
    background-color: white;
    margin: 0px 10px;
    /* margin-top: -47.5px; */
    display: flex;
    position: relative;
    top: -27.5px;
    border-radius: 3px;
}

.order-detail-item {
    width: 71px;
    height: 46px;
    /* margin: 10px 0; */
    padding: 10px 0;
    text-align: center;
}

.order-detail-item-img {
    width: 24.5px;
    height: 21px;
    position: relative;
    top: 5px;
}

.order-detail-item p {
    font-size: 13px;
    position: relative;
    top: 15px;
}

.my-service {
    width: 335px;
    height: 44px;
    background-color: white;
    padding: 0px 10px;
    margin: 0px 10px;
    position: relative;
    top: -19px;
    line-height: 44px;
    font-size: 15px;
    border-radius: 3px;
}

.my-service-detail {
    width: 355px;
    height: 150px;
    margin: 0 10px;
    border-radius: 3px;
    position: relative;
    top: -18px;
    font-size: 13px;
}
.my-service-detail p{
    margin-top: 10px;
}
</style>