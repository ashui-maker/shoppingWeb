import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { useLoginStore } from "../stores/login";
import pinia from "../stores/index";
let logins = useLoginStore(pinia);
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      meta:{
        isTab:true,
      },
      component: HomeView
    },
    {
      path: '/classify',
      name: 'classify',
      meta:{
        isTab:true,
      },
      component: () => import('../views/ClassifyView.vue')
    },
    {
      path: '/cart',
      name: 'cart',
      meta:{
        isTab:true,
      },
      component: () => import('../views/CartView.vue')
    },
    {
      path: '/my',
      name: 'my',
      meta:{
        isTab:true,
      },
      component: () => import('../views/MyView.vue')
    },
    {
      path: '/detail',
      name: 'detail',
      component: () => import('../components/Detail/DetailView.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../components/My/LoginView.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../components/My/RegisterView.vue')
    },
    {
      path: '/collect',
      name: 'collect',
      component: () => import('../components/My/CollectView.vue')
    },
    {
      path: '/setting',
      name: 'setting',
      component: () => import('../components/My/SettingView.vue')
    },
    {
      path: '/search',
      name: 'search',
      component: () => import('../components/SearchView.vue')
    },
    {
      path: '/changepsw',
      name: 'changepsw',
      component: () => import('../components/My/ChangePsw.vue')
    }
  ]
})
router.beforeEach((to, from) => {
  // to: 即将要进入的目标 用一种标准化的方式
  // from: 当前导航正要离开的路由 用一种标准化的方式

  console.log(to, from);

  if (to.path == "/cart" || to.path == "/my") {
      // 调用 useLoginStore里面的tokens方法查看是否含有token

      let myToken = logins.tokens();

      // 当我们从pinia中拿到了token值
      if (!myToken) {
          //当pinia中没有用户的token值, 我们需要让用户先去登录
          router.push("/login");
          return;
      }
  }
});
export default router
