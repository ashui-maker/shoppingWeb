<script setup>
import { getUserCart,changeCartNum } from "../api/home";
// import {addCart} from "../api/home"
import { ref, reactive } from "vue";
const carts = reactive({
    data: [],
});
//商品总价
let totalNum = ref(0)
//获取购物车数据
const getCartList = () => {
    getUserCart().then((re) => {
        console.log("拿到购物车所有数据==>", re);
        carts.data = re.valid
        // console.log(carts.data);
        totalNum.value = 0
        for (let i = 0; i < carts.data.length; i++) {
            totalNum.value += carts.data[i].truePrice * carts.data[i].cart_num
        }
        return totalNum
    });
};

let number = ref(0)
// let indexNum = ref(0)
//商品数量加减
const numSub = (id) => {
    getCartList();

    for(let i = 0;i<carts.data.length;i++){
        if(id == carts.data[i].id){
            number.value = carts.data[i].cart_num;
            number.value--;
        }
    }
    changeCartNum( number.value,id);
    getCartList();
}
const numPlus = (id) => {
    getCartList();
    
    for(let i = 0;i<carts.data.length;i++){
        if(id == carts.data[i].id){
            number.value = carts.data[i].cart_num;
            number.value++;
        }
    }
    changeCartNum(number.value,id);
    getCartList();
}

getCartList();
</script>

<template>
    <div class="cart">
        <div class="cart-header">
            <span class="cart-header-item">
                <p><van-icon name="passed" /> 100%正品保证</p>
                <p><van-icon name="passed" /> 所有商品精挑细选</p>
                <p><van-icon name="passed" /> 售后无忧</p>
            </span>
        </div>
        <div class="cart-num">
            <p>购物数量 <span class="cart-number"> {{ carts.data.length }}</span></p>
            <button>管理</button>
        </div>
        <!-- <van-checkbox-group v-model="checked" ref="checkboxGroup"> -->
        <div class="cart-item" v-for="item in carts.data" :key="item.id">
            <div class="cart-item-left">
                <van-checkbox  v-model="carts.data" icon-size="20px" 
                checked-color="red">
            </van-checkbox>
                <div class="item-img-box"><van-image class="cart-item-img" :src="item.productInfo.image"></van-image>
                </div>
            </div>
            <div class="cart-item-right">
                <p class="cart-item-right-title">{{ item.productInfo.store_name }}</p>
                <p class="cart-item-right-nature">属性:{{ item.productInfo.attrInfo.suk }}</p>
                <div class="cart-item-right-price">
                    <p>￥{{ item.truePrice }}</p>
                    <div class="content-num-span">
                        <p class="content-num-span-item" @click="numSub(item.id)"> - </p>
                        <p class="content-num-span-item">{{ item.cart_num }}</p>
                        <p class="content-num-span-item" @click="numPlus(item.id)"> + </p>
                    </div>
                </div>
            </div>
        </div>
        <div class="footer">
            <van-checkbox name="a" class="footer-icon" v-model="carts.data[index]" checked-color="#e93323"
                icon-size="18px">全选</van-checkbox>
            <p class="total-price">￥{{ totalNum }}</p>
            <button class="footer-but">立即下单</button>
        </div>
    </div>
</template>
<style scoped>
.cart {
    width: 100%;
    height: 38.5rem;
    background-color: #f5f5f5;
    /* border: 1px solid white; */
    overflow: scroll;
}

.cart-header {
    width: 100%;
    height: 38px;
    display: flex;
    font-size: 12px;
    color: #8c8c8c;
    line-height: 38px;
}

.cart-header-item {
    display: flex;
}

.cart-header-item p {
    margin-left: 26.5px;
}

.cart-num {
    width: 100%;
    height: 40px;
    background: white;
}

.cart-num p {
    font-size: 14px;
    float: left;
    position: relative;
    left: 15px;
    line-height: 40px;
}

.cart-number {
    color: #fc4141;
}

.cart-num button {
    font-size: 13px;
    width: 55px;
    height: 24px;
    float: right;
    position: relative;
    right: 15px;
    top: 10px;
    color: #282828;
    background: #f4f4f4;
    border: 0.5px solid #949494;
    border-radius: 3px;
    /* line-height: 15px; */
}

.cart-item {
    width: 100%;
    height: 105px;
    background-color: white;
    margin-top: 9px;
    box-sizing: border-box;
    padding: 12.5px 0;
    display: flex;
}

.cart-item-left {
    display: flex;
    margin-left: 15px;
}

.item-img-box {
    width: 80px;
    height: 80px;
    margin-left: 15px;
    border-radius: 5px;
    /* border: 1px solid black; */
}

.cart-item-img {
    width: 80px;
    height: 80px;
    border-radius: 5px;
    /* border: 1px solid black; */
}

.cart-item-right {
    width: 222px;
    height: 77px;
    margin-left: 12px;
}

.cart-item-right-title {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 14px;
}

.cart-item-right-nature {
    font-size: 12px;
    color: #868686;
    margin-top: 15px;

}

.cart-item-right-price {
    margin-top: 20px;
    display: flex;
    width: 100%;
    /* width: 80px; */
    position: relative
}

.content-num-span {
    width: 99px;
    height: 22px;
    font-size: 22.5px;
    text-align: center;
    display: flex;
    /* float: right; */
    position: absolute;
    right: 0
        /* position: relative;
    left: 37px;
    bottom: 7px; */
}

.content-num-span-item {
    width: 33%;
    border: 1px solid #d8d7d7;
    color: #a4a4a4;
}

.content-num-span :nth-child(2) {
    color: black;
    font-size: 15px;
    display: flex;
    text-align: center;
    flex-direction: column;
    position: relative;
    line-height: 22px;
}

.footer {
    height: 48px;
    width: 373px;
    position: absolute;
    bottom: 50px;
    z-index: 100;
    display: flex;
    font-size: 15px;
    color: #fc4141;
    background-color: #fcfcfc;
    /* padding: 0 10px; */
}

.footer-icon {
    margin-left: 12px;
}

.total-price {
    width: 70px;
    overflow: hidden;
    margin: 17px 0;
    margin-left: 110px;
}

.footer-but {
    width: 113px;
    height: 35px;
    background-color: #e93323;
    color: white;
    border: 1px solid white;
    border-radius: 17.5px;

    margin: 5.5px;
    /* margin-left: 135px; */
}</style>