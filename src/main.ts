//引入createApp用于创建应用
import {createApp} from "vue";
//引用App根组件
import App from "./App.vue";
//引入pinia
import {createPinia} from "pinia";
//引入路由器
import router from "./router";
//创建一个应用
const app = createApp(App);
//创建一个pinia
const pinia = createPinia()
//安装pinia
app.use(pinia)
//使用路由器
app.use(router);
//挂载整个应用到App
app.mount("#app");