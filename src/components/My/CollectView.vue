<script setup>
import { getCollsect, cancelCollect } from "../../api/home";
import { reactive } from "vue";
import { showToast } from "vant";
import { useRouter } from "vue-router";
let collect = reactive({
    data: [],
});

// 获取所有的用户收藏
const getUserCollect = () => {
    getCollsect().then((re) => {
        // console.log("所有收藏==>", re);
        collect.data = re;
    });
};
getUserCollect();
// 删除收藏
const delCollect = (ids) => {
    cancelCollect(ids).then((re) => {
        if (re.status == 200) {
            showToast("取消收藏成功");
            getUserCollect();
        }
    });
};

// 声明路由
let router = useRouter();
// 去到详情页面
const changeDetail = (ids) => {
    router.push({
        path: "/detail",
        query: {
            ids: ids,
        },
    });
};
</script>

<template>
    <div class="collect">
        <div class="collect-item" @click="changeDetail(item.pid)" v-for="item in collect.data" :key="item.id">
            <van-image class="collect-item-img" :src="item.image"></van-image>

            <div class="collect-item-right">
                <div class="collect-item-right-title">{{ item.store_name }}</div>
                <div class="collect-item-right-bottom">
                    <span class="collect-item-right-price">￥{{ item.price }}</span>
                    <span class="collect-item-right-del" @click="delCollect(item.pid)">删除</span>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.collect-item {
    width: 360px;
    height: 87px;
    margin-left: 15px;
    padding-right: 15px;
    display: flex;
    align-items: center;
    /* background-color: skyblue; */
    margin-top: 4px;
    border-bottom: 1px solid #eee;
}
.collect-item-img {
    width: 65px;
    height: 65px;
}
.collect-item-right {
    margin-left: 8px;
}
.collect-item-right-title {
    width: 267.5px;
    height: 19px;
    font-size: 14px;
    color: #282828;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    transform: translateY(-13px);
}
.collect-item-right-bottom {
    transform: translateY(16px);
    position: relative;
}
.collect-item-right-price {
    width: 60px;
    color: red;
    font-size: 13px;
}
.collect-item-right-del {
    font-size: 13px;
    border: 1px solid #ccc;
    width: 55px;
    height: 21px;
    position: absolute;
    right: 0px;
    bottom: 0px;
    text-align: center;
    line-height: 21px;
}
</style>
