import axios from "./axios";
//首页请求的接口
const getHome = () => {
    return axios({
        method: "get",
        url: "http://47.115.51.185/api/index"
    })
}
const getDetail = (ids) => {
    return axios({
        method: "get",
        url: "http://47.115.51.185/api/product/detail/" + ids,
    })
}
// 获取用户的数据

// const getUserMessage = () => {
//     return axios({
//         method: "get",
//         url: "/api/user",
//     });
// };
//添加收藏
const addCollect = (ids) => {
    return axios({
        method: "post",
        url: "/api/collect/add",
        data: {
            category: "product",
            id: ids,
        }
    })
};
//获取用户所有收藏
const getCollsect = () => {
    return axios({
        method: "get",
        url: "/api/collect/user?page=1&limit=20",
    });
};
//取消收藏
const cancelCollect = (ids) => {
    return axios({
        method: "post",
        url: "api/collect/del",
        data: {
            category: "product",
            id: ids,
        }
    })
}
// 加入购物车 http://47.115.51.185/api/cart/add
const addCart = (number, ids) => {
    return axios({
        method: "post",
        url: "/api/cart/add",
        data: {
            cartNum: number,
            new: 0,
            productId: ids,
            uniqueId: "",
        },
    });
};
const changeCartNum = (number, ids) => {
    return axios({
        method: "post",
        url: "/api/cart/num",
        data: {
            id:ids,
            number:number,
        },
    });
}
//购物车数据
const getUserCart = () => {
    return axios({
        method: "get",
        url: "/api/cart/list",
    });
}
//分类界面数据
const getCalssify = () => {
    return axios({
        method: "get",
        url: "/api/category",
    });
};
const changeName = (img,name) => {
    return axios({
        method: "post",
        url: "/api/user/edit",
        data: {
            avatar:img,
            nickname:name,
        },
    });
};
export { getHome, getDetail, addCollect, getCollsect, cancelCollect, addCart, getUserCart, getCalssify, changeCartNum,changeName }