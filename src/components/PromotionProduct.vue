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
let promo = defineProps({
    promo: Array,
});

console.log("促销的数据==>", promo);
</script>

<template>
    <van-cell title-style="font-weight:700;font-size:15px" value-class="value-right" title="促销单品" is-link value="更多" />

    <div class="promition">
        <div class="promotion-item" v-for="item in promo.promo" :key="item.id" @click="changeDetail(item.id)">
            <div class="promotion-item-left">
                <van-image class="promotion-item-left-img" :src="item.image"></van-image>
            </div>
            <div class="promotion-item-right">
                <!-- <div class="promotion-item-right-head"> -->
                <div class="promotion-item-right-title">{{ item.store_name }}</div>
                <div class="promotion-item-right-price">促销价: ￥{{ item.price }}</div>
                <!-- </div> -->
                <div class="promotion-item-right-bottom">
                    <span class="promotion-item-right-bottom-span1">日常价: ￥ {{ item.ot_price }}</span>
                    <span class="promotion-item-right-bottom-span2">仅剩{{ item.stock }}{{ item.unit_name }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.value-right {
    font-size: 12px;
    color: #333333;
}

.promotion-item {
    width: 345px;
    height: 125px;
    display: flex;
    margin-left: 12px;
    border-bottom: 0.5px solid #f2ebeb;
}


.promotion-item-left-img {
    width: 94px;
    height: 94px;
    margin-top: 15px;    
}

.promotion-item-right {
    width: 236px;
    height: 86px;
    margin-left: 15px;
    margin-top: 15px;    
}

.promotion-item-right-title {
    width: 236px;
    height: 20px;
    margin-top: 5px;
    font-size: 15px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.promotion-item-right-price {
    width: 117px;
    height: 23px;
    line-height: 23px;
    margin-top: 15px;
    display: flex;
    font-size: 12px;
    background: linear-gradient(90deg,#ff6248 0,#ff3e1e);;
    color: white;
    padding: 0px 9px;
    border-top-left-radius: 15px;
    border-bottom-right-radius: 15px;
    box-sizing: border-box;
}

.promotion-item-right-bottom {
    width: 236px;
    height: 16px;
    margin-top: 10px;
    color: #999999;
    font-size: 12px;
    justify-content: space-between;
}

.promotion-item-right-bottom-span1 {
    float: left;
    text-decoration: line-through;
}

.promotion-item-right-bottom-span2 {
    float: right;

}
</style>