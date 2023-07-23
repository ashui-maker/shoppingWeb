<script setup>
import recommentIcon from "../../assets/image/优品推荐图标.png";
import { defineProps, reactive } from "vue";

let recomment = defineProps({
    good_list: Array,
});

let arr = reactive({
    data: []
});
// 切割数据 将18个推荐商品数据切割为三个
// eslint-disable-next-line vue/no-setup-props-destructure
arr.data = recomment.good_list;

// 获取到前面六个值
let newArr1 = arr.data.slice(0, 6);
let newArr2 = arr.data.slice(6, 12);
let newarr3 = arr.data.slice(12, 18);

let newArr = [];
newArr.push(newArr1);
newArr.push(newArr2);
newArr.push(newarr3);
console.log(newArr);
</script>

<template>
    <div class="recomment">
        <p class="recomment-title">
            <van-image class="recomment-title-icon" :src="recommentIcon"></van-image>
            <span>优品推荐</span>
            <van-image class="recomment-title-icon" :src="recommentIcon"></van-image>
        </p>

        <van-swipe class="my-swipe" :autoplay="3000" indicator-color="#F00">
            <van-swipe-item class="my-swipe-item" v-for="(item, index) in newArr" :key="index">
                <div class="recomment-item" v-for="recom in item" :key="recom.id">
                    <van-image class="recomment-item-img" :src="recom.image"></van-image>
                    <div class="recomment-item-name">{{ recom.store_name }}</div>
                    <div class="recomment-item-price">￥{{ recom.price }}</div>
                </div>
            </van-swipe-item>
        </van-swipe>
    </div>
</template>

<style scoped>
.recomment{
    background-color: white;
}
.recomment-title {
    font-size: 15px;
    color: red;
    width: 110px;
    height: 20px;
    margin:  20px auto;
    display: flex;
    align-items: center;
    /* margin-top: ; */
    transform: translateY(10px);
    /* border: 1px solid black; */
}
.recomment-title span {
    margin: 0 10px;
}
.recomment-title-icon {
    width: 15px;
    height: 15px;
}

.my-swipe .van-swipe-item {
    color: #fff;
    font-size: 20px;
    height: 95vw;
    /* background-color: #39a9ed; */
}
.my-swipe-item {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
}
.recomment-item {
    width: 29vw;
    height: 40vw;
    /* border: 1px solid red; */
}
.recomment-item-img {
    width: 107.5px;
    height: 107.5px;
    border-radius: 3px;
}
.recomment-item-name {
    width: 107.5px;
    height: 17px;
    color: black;
    font-size: 13px;
    margin-top: 6px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
.recomment-item-price {
    width: 107.5px;
    height: 15px;
    color: red;
    font-size: 13px;
}
</style>

<style>
.van-swipe__indicator {
    background: #686666;
}
</style>
