<script setup>
import { useRoute, useRouter } from "vue-router";
import { getDetail, addCollect, getCollsect, cancelCollect, addCart, getUserCart, } from "../../api/home";
import { reactive, ref } from "vue";

import { showToast } from "vant";

// 导入组件
import RecommenView from "./RecommontView.vue";

// 实例化当前页面的路由
let route = useRoute();
// 实例化全局路由
let router = useRouter();

// 拿到传递过来的ids值
let ids = route.query.ids;

// 声明接收详情的所有数据
let detail = reactive({
    data: [],
});

// 获取vip图片
import vipPath from "../../assets/image/vip.png";

// 根据传递过来的id值获取对应的商品数据
getDetail(ids).then((res) => {
    detail.data = res;

    console.log("detail 详情的数据==>", detail.data);
});

// 定义一个值,判断收藏的状态
let iconBoolean = ref(true);

// 添加收藏
const addCollects = () => {
    // 需要先判断用户有没有登录
    let myToken = localStorage.getItem("token");
    if (!myToken) {
        router.push("/login");
        return;
    }
    // 用户登录,含有token,触发收藏的方法 ids 就是页面路由能拿到的ids
    addCollect(ids).then((re) => {
        console.log("收藏之后的回调==>", re);
        if (re.status == 200) {
            iconBoolean.value = !iconBoolean.value;
        }
    });
};

// 先去获取 当前活用所有收藏的数据,判断此时这个商品是否已经
const getUserCollect = () => {
    getCollsect().then((re) => {
        console.log("用户所有的收藏数据==>", re);
        // 进行一次循环判断,如果有一个用户收藏的pid与当前query 的ids一致,表示
        // 当前商品属于收藏转态
        // js some(function(数组的每一项,数组的每一项的下标,数组本身){})
        // 作用: return 条件表达式来判断
        let newIconboolean = re.some((item) => {
            return item.pid == ids;
        });
        // 对当前商品是否属于收藏状态的判断
        if (newIconboolean) {
            iconBoolean.value = false;
        } else {
            iconBoolean.value = true;
        }
    });
};
getUserCollect();

// 取消收藏
const cancelCollects = () => {
    // 用户通过query 传递进来的值
    cancelCollect(ids).then((re) => {
        console.log("取消收藏之后的值==> ", re);
        if (re.status == 200) {
            showToast("取消收藏成功");
            getUserCollect();
        }
    });
};

// 购物车代码
const show = ref(false);

const changeShow = () => {
    // 需要在弹层显示的时候才可以去触发加入购物车的axios请求
    if (show.value) {
        addCart(number.value, ids).then((re) => {
            if (re.cartId) {
                showToast("加入购物车成功");
                getUserCarts();
            } else {
                showToast(re.msg);
            }
        });
    }
    show.value = !show.value;
};

let number = ref(1);

// 获取用户所有的购物车的数据
const getUserCarts = () => {
    getUserCart().then((re) => {
        console.log("用户购物车的数据==> ", re);
        cartCount.value = re.valid.length;
    });
};
getUserCarts();
let cartCount = ref(0);

// 去到购物车
const changePathCart = () => {
    router.push("/cart");
};
</script>

<template>
    <div class="detail">
        <!-- 轮播部分 -->
        <van-swipe class="detail-swipe" v-if="detail.data.storeInfo">
            <van-swipe-item v-for="item in detail.data.storeInfo.slider_image" :key="item">
                <van-image class="detail-swipe-imge" :src="item"></van-image>
            </van-swipe-item>
            <template #indicator="{ active, total }">
                <div class="custom-indicator">{{ active + 1 }}/{{ total }}</div>
            </template>
        </van-swipe>

        <!-- 产品的信息 -->
        <div class="detail-product" v-if="detail.data.storeInfo">
            <div class="detail-product-price">
                ￥<span>{{ detail.data.storeInfo.price }}</span>
                <span class="detail-product vipPrice">￥{{ detail.data.storeInfo.vip_price }}</span>
                <van-image class="detail-product-img" :src="vipPath"></van-image>
                <van-icon class="detail-product-share" name="share-o" size="20" />
            </div>

            <div class="detail-product-title">{{ detail.data.storeInfo.store_name }}</div>

            <div class="detail-product-text">
                <!-- 空格符号 ==> &nbsp; -->
                <span>原价:￥{{ detail.data.storeInfo.ot_price }}</span>
                <span>库存:{{ detail.data.storeInfo.stock }}{{ detail.data.storeInfo.unit_name }}</span>
                <span>销量:{{ detail.data.storeInfo.ficti }} {{ detail.data.storeInfo.unit_name }}</span>
            </div>
        </div>

        <!-- 评论部分 -->
        <p style="height: 10px; background: rgb(243 240 240)"></p>
        <div class="detail-comment">
            <span>用户评价(0)</span>

            <div class="detail-comment-message">
                <span style="color: red">0%</span>
                <span>好评率 </span>
            </div>
        </div>
        <p style="height: 10px; background: rgb(243 240 240)"></p>

        <!-- 优品推荐 -->
        <RecommenView :good_list="detail.data.good_list" v-if="detail.data.good_list"></RecommenView>

        <p style="height: 10px; background: rgb(243 240 240)"></p>
        <p style="line-height: 43px; text-align: center; color: black; background: white; font-size: 15px">产品介绍</p>
        <div v-html="detail.data.storeInfo.description" v-if="detail.data.storeInfo" class="detail-introduce"></div>

        <!-- 加入购物车显示界面 -->
        <van-action-sheet v-model:show="show" :safe-area-inset-bottom="true" z-index="1">
            <div class="content">
                <div class="content-item">
                    <van-image :src="detail.data.storeInfo.slider_image[0]" class="content-item-img"></van-image>
                    <div class="content-item-right">
                        <div class="content-item-right-title">{{ detail.data.storeInfo.store_name }}</div>
                        <span class="content-item-right-price">￥{{ detail.data.storeInfo.ot_price }}</span>
                        <span class="content-item-right-num">库存:{{ detail.data.storeInfo.stock }}{{
                            detail.data.storeInfo.unit_name }}</span>
                    </div>
                </div>
                <div class="content-num">
                    <p class="content-num-p">数量</p>
                    <div class="content-num-span">
                        <p class="content-num-span-item" @click="number--"> - </p>
                        <p class="content-num-span-item">{{ number }}</p>
                        <p class="content-num-span-item" @click="number++"> + </p>
                    </div>

                </div>
            </div>
        </van-action-sheet>

        <div>
            <van-action-bar :safe-area-inset-bottom="true" :placeholder="true" style="position: relative; z-index: 2">
                <van-action-bar-icon icon="chat-o" text="客服" dot />
                <van-action-bar-icon v-if="iconBoolean" @click="addCollects" icon="like-o" text="收藏" />
                <van-action-bar-icon v-else icon="like" @click="cancelCollects" color="red" text="收藏" />
                <van-action-bar-icon icon="cart-o" text="购物车" @click="changePathCart" :badge="cartCount" />
                <van-action-bar-button type="warning" @click="changeShow" text="加入购物车" />
                <van-action-bar-button type="danger" text="立即购买" />
            </van-action-bar>
        </div>
    </div>
</template>

<!-- 
    1. 完善 收藏功能
    2. 实现 加入购物车的功能
    3. 分类页面实现

    预留: 我的页面 + 搜索页面 + 购物车页面(数据,我会教大家如何获取)


    下午内容: 
            购物车数据的获取
            分类页面的实现




 -->

<style scoped>
.detail-swipe {
    height: 375px;
    /* background: skyblue; */
}

.custom-indicator {
    position: absolute;
    right: 5px;
    bottom: 5px;
    padding: 2px 5px;
    font-size: 12px;
    background: rgba(0, 0, 0, 0.1);
}

.detail-swipe-imge {
    width: 375px;
    height: 375px;
}

.detail-product {
    position: relative;
}

.detail-product-price {
    width: 345px;
    height: 40px;
    box-sizing: border-box;
    margin: 0px 15px;
    padding: 12.5px 0px 0px;
    color: red;
}

.detail-product-price>span {
    display: inline-block;
    width: 88px;
    height: 26px;
    color: red;
    font-size: 24px;
    font-weight: 700;
}

.detail-product.vipPrice {
    width: 65px;
    height: 10.5px;
    color: black;
    font-size: 14px;
    margin-left: 6.5px;
}

.detail-product-img {
    width: 23px;
    height: 10.5px;
    margin-left: 3.5px;
}

.detail-product-share {
    position: absolute;
    right: 11px;
    top: 16px;
    color: #787373;
    /* border: 1px solid #787373; */
    padding: 2px;
}

.detail-product-title {
    width: 345px;
    height: 62px;
    color: black;
    font-size: 16px;
    font-weight: 700;
    margin: 5px 15px 0;
    line-height: 19px;
}

.detail-product-text {
    width: 345px;
    margin: 8px auto 0;
    padding-bottom: 12.5px;
    display: flex;
    /* 俩端贴边,中间平分间隙 */
    justify-content: space-between;
    color: #706e6e;
    font-size: 12px;
}

.detail-comment {
    width: 360px;
    height: 43px;
    margin-left: 15px;
    padding-right: 15px;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 14px;
    color: #282828;
}

.detail-introduce {
    width: 100vw;
    overflow: hidden;
}

.content {
    padding: 16px 16px 133px;
}

.content-item {
    display: flex;
}

.content-item-img {
    width: 75px;
    height: 75px;
}

.content-item-right {
    width: 205px;
    height: 61px;
    margin-left: 15px;
}

.content-item-right-title {
    font-size: 16px;
    margin-top: 10px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.content-item-right-price {
    position: relative;
    top: 30px;
    color: #fc4141;
    font-size: 18px;
}

.content-item-right-num {
    position: relative;
    top: 30px;
    left: 10px;
    font-size: 12px;
    color: #999999;

}

.content-num {
    position: relative;
    top: 40px;
    font-size: 15px;
    color: #999999;
}

.content-num-span {
    width: 126px;
    height: 27px;
    font-size: 22.5px;
    text-align: center;
    display: flex;
    position: relative;
    top: 10px;
}
.content-num-span-item{
    width: 33%;
    border: 1px solid #a4a4a4;
}
.content-num-span :nth-child(2) {
    color: black;
    font-size: 15px;
    display: flex;
    text-align: center;
    flex-direction: column;
    position: relative;
    line-height: 27px;
}
</style>
<style>
.detail-introduce p img {
    width: 100%;
}
</style>
