// import './assets/main.css'
import './assets/reset.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
//导入vant
import Vant from "vant"
import "vant/lib/index.css"
const app = createApp(App)
//将vant作为插件插入项目中
app.use(Vant)
app.use(createPinia())
app.use(router)

app.mount('#app')

