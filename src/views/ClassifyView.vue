<script setup>
import { getCalssify } from "../api/home"
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";

const value = ref("");
const active = ref(0);


const classify = reactive({
    data: [],
});

getCalssify().then((re) => {
    console.log("分类页面所有的数据==> ", re);
    classify.data = re;
});
let productHeight = ref(0)
let C = ref()
const A = (index) => {
    if (index == 0) {
        productHeight.value = 0
        return
    }
    let titleHeight = 43;
    let b = 0
    for (let i = 0; i < index; i++) {
        C.value = classify.data[i ].children.length;
       
        b += C.value
    }
    let D = (b / 3) * 96
    if (index >= 1) {
        productHeight.value = D + titleHeight * index + "px";
        console.log(productHeight.value)
    }
}
// 声明路由
let router = useRouter();
const toSearch = () =>{
  router.push("./search")
}
</script>
<template>
    <div class="classify-box">
        <van-search v-model="value" placeholder="搜索商品的信息" shape="round" @click="toSearch"/>
        <div class="classify">
            <van-sidebar class="classify-left" v-model="active" style="--van-sidebar-selected-text-color:red;--van-sidebar-selected-border-color:red;
            --van-sidebar-selected-border-height:100%;--van-sidebar-selected-border-width:1.5px">
                <van-sidebar-item class="classify-left-item" :title="item.cate_name" v-for="item in classify.data"
                    @click="A($event)" :key="item.id" />
            </van-sidebar>
            <div class="classify-right">
                <div class="classify-items" v-for="items in classify.data" :key="items.id"
                    :style="{ transform: ` translateY(-${productHeight})`}" >
                    <p class="classify-right-title">{{ items.cate_name }}</p>
                    <div class="classify-item">
                        <div class="classify-right-item" v-for="item in items.children" :key="item.id">
                            <van-image class="classify-right-item-image" :src="item.pic"></van-image>
                            <p>{{ item.cate_name }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
.classify-box {
    height: 589px;
    /* overflow: hidden; */
    /* background-color: skyblue; */
}

.classify-left {
    width: 90px;
    height: 589px;
    background-color: #f7f7f7;
    float: left;
    line-height: 40px;
    text-align: center;
    border: 1px solid white;
}
.classify-items{
    transition: all 0.3s;
}
.classify-left-item {
    width: 100%;
    height: 40px;
    padding: 10px;
    /* line-height: 40px; */
    font-size: 13px
}

.classify-right {
    width: 271px;
    height: 589px;
    /* background: red; */
    float: left;
    overflow: scroll;
    /* border: 1px solid black; */
    box-sizing: border-box;
    transition: all 0.3s;
    /* transform: translate(all 0.3s); */
}

/* .classify-right.active1{
    transform: translateY(-158px);
} */
.classify-item {
    display: flex;
    flex-wrap: wrap;
}

.classify-right-title {
    width: 56px;
    height: 19px;
    margin: 12px auto;
    font-size: 14px;
    color: black;
    font-weight: 700;
    position: relative;
}

.classify-right-title::before {
    content: "";
    display: inline-block;
    width: 50px;
    height: 1px;
    background: #999;
    position: absolute;
    top: 50%;
    margin-top: -3.5px;
    left: -100%;
}

.classify-right-title::after {
    content: "";
    display: inline-block;
    width: 50px;
    height: 1px;
    background: #999;
    position: absolute;
    top: 50%;
    margin-top: -3.5px;
    right: -100%;
}

.classify-right>div {
    display: flex;
    flex-wrap: wrap;
}

.classify-right-item {
    width: 88.5px;
    height: 88px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    margin-top: 8px;
}

.classify-right-item-image {
    width: 60px;
    height: 60px;
}

.classify-right-item p {
    width: 60px;
    text-align: center;
    font-size: 12px;
}
</style>
