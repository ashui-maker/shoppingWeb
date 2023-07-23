<script setup>
import { getHome } from "../api/home";
import { reactive } from "vue";
import ProductView from "../components/ProductView.vue";
import HotView from "../components/HotView.vue";
import NewProduct from "../components/NewProduct.vue";
import PromotionProduct from "../components/PromotionProduct.vue";
import { useRouter } from "vue-router";

//声明搜索关键词
// let value = ref("")
//存储首页所有数据
let home = reactive({
  data: []

})
let imagePath = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHwAAAAcCAYAAACj6tvkAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA4RpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQyIDc5LjE2MDkyNCwgMjAxNy8wNy8xMy0wMTowNjozOSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDphNmVhODdiZC0zYWY5LTEzNDYtYjYyYy1hZGE1MDVmMDUxMTIiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QzVEMDQxOUYxRjhDMTFFOUIwQkJCMEMyMkY3MzdBQUQiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QzVEMDQxOUUxRjhDMTFFOUIwQkJCMEMyMkY3MzdBQUQiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTggKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6ODk2ZWFjMGYtNDI3MC0yZDRlLThiYTItYjE4OTA2YzRiOWVlIiBzdFJlZjpkb2N1bWVudElEPSJhZG9iZTpkb2NpZDpwaG90b3Nob3A6MDg3NDQyZTItM2M1ZC1iNDRkLTljYmUt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";
// let backgroundImg = "public/index-bg.7128c2eb.png"
//首页获取数据
getHome().then((res) => {
  console.log("res ==>", res)
  home.data = res
  console.log("首页数据===>", home.data);
})
// 声明路由
let router = useRouter();
// 八个功能模块
const func = (name) => {
    console.log("我点击了 " + name + " 功能模块");
    if (name == "我的收藏") {
        // 跳转到收藏页面
        router.push("/collect");
    }
    if (name == "商品分类") {
        // 跳转到收藏页面
        router.push("/classify");
    }
};
const active = (index) => {
  return "active" + index;
}
const toSearch = () =>{
  router.push("./search")
}
</script>


<template>
  <div class="home">
    <div class="home-search">
      <van-image class="home-search-img" src="src/assets/image/ef7e2b395c2530647be1a8c2996df91b.png"></van-image>
      <van-search class="home-search-input" placeholder="搜索商品" shape="round" @click="toSearch"/>
    </div>
    <div class="home-banner">
      <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white" style="height: 185px">
        <van-swipe-item v-for="item in home.data.banner" :key="item.id">
          <van-image :src="item.pic" style="height: 185px;"></van-image>
        </van-swipe-item>
      </van-swipe>
    </div>
    <div class="home-func">
      <van-grid square icon-size="45px">
        <van-grid-item v-for="value in home.data.menus" :key="value.id" :icon="value.pic" :text="value.name"
          @click="func(value.name)" />
      </van-grid>
    </div>
    <div class="home-news">
      <div class="home-news-left"><img class="home-news-left-img" :src="imagePath"></div>
      <div class="home-news-right">
        <van-notice-bar :scrollable="false" background="white" color="black" mode="link" style="width: 100%;">
          <van-swipe vertical class="notice-swipe" :autoplay="3000" :touchable="false" :show-indicators="false">
            <van-swipe-item v-for="item in home.data.roll" :key="item.id">{{ item.info }}</van-swipe-item>
          </van-swipe>
        </van-notice-bar>
      </div>
    </div>
    <!-- 快速选择 -->
    <div class="home-select">
      <van-cell title="快速选择" title-style="font-weight:900" is-link value="更多" />

      <div class="home-select-product" v-if="home.data.info">
        <div class="home-select-product-item" v-for="(item, index) in home.data.info.fastList" :key="item.id">
          <van-image :src="item.pic" class="home-select-product-item-img"></van-image>
          <p class="home-select-product-item-p" :class="active(index % 3)">{{ item.cate_name }}</p>
        </div>
      </div>
    </div>
    <!-- 分割线 -->
    <p style="width: 345px; height: 1px; background: #ccc; margin: 18px auto"></p>
    <!-- 精品推荐 -->
    <div class="home-recomment">
      <van-cell title="精品推荐" title-style="font-weight:900" is-link value="更多" />
      <van-swipe class="home-recomment-swipe" v-if="home.data.info">
        <van-swipe-item v-for="item in home.data.info.bastBanner" :key="item.id">
          <van-image class="home-recomment-swipe-img" :src="item.img"></van-image>
        </van-swipe-item>
        <template #indicator="{ active, total }">
          <div class="custom-indicator">
            <span v-for="(item2, index) in total" :class="{ active1: index == active }" :key="item2"></span>
          </div>
        </template>
      </van-swipe>
    </div>
    <ProductView :proArr="home.data.info.bastList" v-if="home.data.info"></ProductView>
    <!-- <HotView ></HotView> -->
    <HotView :hot="home.data.benefit" v-if="home.data.benefit"></HotView>
    <NewProduct style="margin-top: 160px" :hot="home.data.info.firstList" v-if="home.data.info"></NewProduct>
    <p style="width: 345px; height: 1px; background: #ccc; margin: 18px auto"></p>

    <div class="home-Promotion">
      <PromotionProduct :promo="home.data.benefit"></PromotionProduct>
    </div>
  </div>
</template>
<style scoped>
.home-search {
  width: 100%;
  height: 49px;
  display: flex;
  align-items: center;
}

.home-search-img {
  width: 63.5px;
  height: 22.5px;
  float: left;
  margin-left: 25px;
}

.home-search-input {
  width: 278px;
  height: 32px;
}

.my-swipe .van-swipe-item {
  color: #fff;
  font-size: 20px;
  line-height: 185px;
  text-align: center;
  background-color: #39a9ed;
}

.home-news {
  display: flex;
  align-items: center;
  width: 100%;
  height: 38.5px;
  box-shadow: 1px 1px 10px #e7e6e6;
  /* 开启怪异盒子模型 : 无论填了了什么属性,原有元素盒子的宽高不变 */
  box-sizing: border-box;
  height: 38.5px;
  padding: 0px 15px;
  /* background-color: #39a9ed; */
}

.home-news-left {
  position: relative;
}

.home-news-left::after {
  content: "";
  display: inline-block;
  width: 1px;
  height: 14px;
  background: #ccc;
  position: absolute;
  top: 50%;
  transform: translateY(-50%) translateX(12px);
  /* 定位的层级 */
  z-index: 66;
}

.home-news-left-img {
  width: 62px;
  height: 14px;
}

.home-news-right {
  float: left;
  width: 266px;
  font-size: 12px;
  color: #d6d8d9;
  /* margin-top: 20px; */
}

.notice-swipe {
  width: 100%;
  height: 38.5px;
  line-height: 40px;
  margin-left: 5px;
}

/* 快速选择的样式 */
.home-select {
  margin-top: 6px;
}

/* active 与 p 不能有空格,这是并集选择器 */
.home-select-product-item p.active0 {
  border-bottom: 2px solid green;
}

/* ! important 提高元素的权重: 样式重复,优先显示有权重的样式 */
.home-select-product-item p.active1 {
  border-bottom: 2px solid skyblue !important;
}

.home-select-product-item p.active2 {
  border-bottom: 2px solid red !important;
}

.home-select-product {
  height: 123px;
  width: 345px;
  display: flex;
  overflow: auto;
  margin-left: 10px;
  /* border: 1px solid red; */

}
.home-select-product::-webkit-scrollbar{
  display: none;
}
.home-select-product-item {
  width: 90px;
  height: 121.6px;
  margin-left: 10px;
}

.home-select-product-item-img {
  width: 90px;
  height: 90px;
}

.home-select-product-item-p {
  width: 90px;
  height: 30px;
  line-height: 29px;
  text-align: center;
  font-size: 10px;
  border-left: 0.5px solid #ece3e369;
  border-right: 0.5px solid #ece3e369;
}
</style>
<style>
.van-swipe__track {
  font-size: 12px;
}

.van-cell__value {
  color: black;
}

.fengexian {
  height: 1px;
  width: 100%;
  background: #ccc;
  margin-top: 15px;
}

.custom-indicator {
  position: absolute;
  /* 50% 宽度 是父元素宽度的一半 */
  left: 50%;
  /* 50% 宽度 是子元素宽度的一半 */
  transform: translateX(-50%);

  bottom: 46px;
}

.custom-indicator span {
  display: inline-block;
  width: 3.5px;
  height: 3.5px;
  border-radius: 50%;
  background: rgb(239, 141, 123);
  margin: 0 3px;
}

/* 被激活的类名 */
.custom-indicator span.active1 {
  width: 10px;
  border-radius: 20px;
  background: tomato;

}

.home-recomment-swipe-img {
  height: 130px;
}

.home-recomment-swipe {
  height: 200px;
  width: 345px;
  margin: 0 auto;
}
</style>