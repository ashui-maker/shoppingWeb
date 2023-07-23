<script setup>
import hotbg from "../assets/image/index-bg.7128c2eb.png"
import HotProduct from "../components/HotProduct.vue";


import { defineProps } from "vue";

let hot = defineProps({
    hot: Array,
});

</script>
<template>
    <div class="home-hotlist">
        <div class="home-hotlist-head" :style="{ background: `url(${hotbg}) center center / cover` }">

            <div class="home-hotlist-head-text">
                <span class="label-1">热门榜单</span>
                <span class="label-2">根据销量、搜索、好评等综合得出</span>
            </div>
            <span class="label-3">更多<van-icon name="arrow" /></span>
        </div>
        <div class="home-hotlist-foot">
            <HotProduct :hots="hot.hot"></HotProduct>
        </div>

    </div>
</template>
<style scoped>
.home-hotlist {
    width: 375px;
    height: 208px;
    /* border: 1px solid rgb(247, 245, 245); */

}

.home-hotlist-head {
    width: 373px;
    height: 107px;
    border: 0.5px solid rgb(247, 245, 245);
    color: #ffffff;
    display: flex;
    /* margin-top: 5px; */
    justify-content: space-between;
}

.home-hotlist-head-text {

    margin-left: 10px;
    /* margin-top: 15px; */
    margin: 15px 0px 0px;
    padding: 0px 15px;

}

.label-1 {
    font-size: 15px;
    font-weight: 700;
}

.label-2 {
    font-size: 12px;
    /* font-weight: 700; */
    margin-left: 10px;
}

.label-3 {
    font-size: 13px;
    margin-right: 10px;
    margin-top: 15px;
}

.home-hotlist-foot {
    width: 345px;
    height:145px;
    background: white;
    margin-top: -67px;
    margin-left: 10px;
    border-radius: 8px;
    padding-left:  10px;
    padding-top: 10px;
    box-shadow: 0px -1px 0px 0px #f4f2f2,
        /*上边阴影 */
        -0.2px 0px 0px 0px #f4f2f2,
        /*左边阴影  */
        0.2px 0px 0px 2px #f4f2f2,
        /*右边阴影 */
        0px 1px 0px 0px #f4f2f2;
    /*下边阴影 */
}</style>