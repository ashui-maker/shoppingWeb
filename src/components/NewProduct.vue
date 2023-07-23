<script setup>
// 导入商品条组件
import HotProduct from "./HotProduct.vue";
import { defineProps } from "vue";

let hots = defineProps({
    hot: Array,
});
</script>

<template>
    <div class="custom-body">
        <van-cell value="更多" is-link>
            <!-- 使用 title 插槽来自定义标题 -->
            <!-- <div class="custom-body"> -->
            <template #title>
                <span class="custom-title">首发新品</span>
                <span class="custom-span">NEW~</span>
            </template>

        </van-cell>
    </div>
    <div class="new-item">
        <HotProduct :hots="hots.hot" :isBorder="true"></HotProduct>
    </div>
</template>

<style scoped>
.custom-body {
    width: 100%;
    height: 40px;
    /* margin: 0 0 2.5px; */
    /* border: 1px solid black; */
    /* margin-left: 15px; */
}

.custom-title {
    margin-right: 4px;
    vertical-align: middle;
    font-weight: 700;
    color: black;
    /* border: 1px solid black; */
    margin-top: 5px;
    font-size: 15px;
}

.custom-span {
    color: red;
    font-size: 12px;
    font-weight: 700;
    margin-bottom: 5px;
    transform: translateY(-10px);
    /* padding: 5px 2px; */
    /* border: 1px solid black; */
}

.new-item {
    height: 180px;
    width: 345px;
    display: flex;
    overflow: auto;
    margin-left: 15px;
}
.new-item::-webkit-scrollbar{
    display: none;
    /* margin-top: 10px; */
}
</style>
