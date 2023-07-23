<script setup>
import { defineProps } from "vue";
import { useRouter } from "vue-router"
let router = useRouter();
const changeDetail = (id) =>{
    router.push({
        path:"/detail",
        query:{
            ids:id,
        },
    });
}
let hots = defineProps({
    hots: Array,
    isBorder: Boolean,
});

console.log("hots ==> ", hots.hots);
</script>

<template>
    <div class="product">
        <div class="product-items" v-for="item in hots.hots" :key="item.id" :class="{ active: isBorder }" @click="changeDetail(item.id)"> 
            <van-image class="product-img" :src="item.image"></van-image>

            <div class="product-item">
                <p class="product-item-title">{{ item.store_name }}</p>
                <p class="product-item-price">￥{{ item.price }}</p>
            </div>
        </div>
    </div>
</template>

<style scoped>
.product-img {
    width: 100px;
    height: 100px;
}

.product {
    display: flex;
    color: black;
    height: 175px;

}
.product-items{
    height: 165px;
    /* border: 1px solid #1c1b1b; */
    /* background: red */
}
.product>div {
    /* border: 1px solid red; */

    width: 120px;
    height: 150px;

    /* background: white; */
}

.product-item-title {
    width: 100px;
    height: 17px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 13px;
    margin-top: 6px;
}

.product-item-price {
    color: red;
    font-size: 14px;
    width: 51px;
    height: 16px;
}

.product>div.active {
    border: 1px solid #e2e0e0;
    padding: 8px;
    border-radius: 8px;
    margin-right: 10px;
    margin-bottom: 10px;
    margin-top: 10px;
    text-align: center;
}
.product>div.active>.product-item>.product-item-price{
    text-align: center;
    margin: 0px auto;
    font-weight: 700;
}
</style>