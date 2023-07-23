<script setup>
import { RouterView, useRoute } from 'vue-router'
let route = useRoute()
</script>

<template>
  <router-view />
  <van-tabbar route active-color="red" :placeholder="true" v-if="route.meta.isTab">
    <van-tabbar-item replace to="/" icon="wap-home-o">首页</van-tabbar-item>
    <van-tabbar-item replace to="/classify" icon="apps-o">分类</van-tabbar-item>
    <van-tabbar-item replace to="/cart" icon="cart-o">购物车</van-tabbar-item>
    <van-tabbar-item replace to="/my" icon="user-o">我的</van-tabbar-item>
  </van-tabbar>
</template>

<style scoped></style>
