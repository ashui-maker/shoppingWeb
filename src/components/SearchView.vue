<script setup></script>
<template>
    <div class="search-header">
        <van-search v-model="value" placeholder="点击搜索商品" shape="round" class="search-header-box" />
        <p class="search-header-text">搜索</p>
    </div>
    <div class="hot-search">
        <p class="hot-search-p">热门搜索</p>
        <div class="hot-search-gather">
            <div class="hot-search-item">吸尘器</div>
            <div class="hot-search-item">加湿器</div>
            <div class="hot-search-item">马桶</div>
            <div class="hot-search-item">热水器</div>
        </div>
    </div>
</template>
<style scoped>
.search-header {
    width: 100%;
    height: 33px;
    /* padding: 10px; */
}

.search-header-box {
    float: left;
    width: 325px;
}

.search-header-text {
    /* float: right */
    position: relative;
    top: 20px;
    font-size: 15px;
}

.hot-search {
    width: 100%;
    height: 77px;
    margin-top: 40px;
}

.hot-search-p {
    font-size: 14px;
    color: #999999;
    margin: 25px 15px 12.5px;
}
.hot-search-gather{
    padding: 0px 5px;
    display: flex;
}
.hot-search-item{
    width: 60px;
    height: 30px;
    border: 1px solid rgb(167, 166, 166);
    font-size: 13px;
    color: #454545;
    text-align: center;
    line-height: 30px;
    margin-left: 10px;
}
</style>