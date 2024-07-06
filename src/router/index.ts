//创建一个路由器，并暴露出去

//第一步：引入createRouter
import {createRouter,createWebHistory} from "vue-router";
//引入可能要呈现的组件
import ManageUsers from '@/Views/01_ManageUsers.vue'
import ManageReport from '@/Views/02_ManageReport.vue'
import ManageAnnouncement from '@/Views/03_ManageAnnouncement.vue'
import DataAll from '@/Views/04_DataAll.vue'
import DataUsers from '@/Views/05_DataUsers.vue'
import DataOrder from '@/Views/06_DataOrder.vue'
import DataProduct from '@/Views/07_DataGood.vue'

//第二步：创建路由器
const router = createRouter({
    history: createWebHistory(),
    routes:[
        {
            path:"/",
            component:ManageUsers
        },
        {
            path:"/manageReport",
            component:ManageReport
        },
        {
            path:"/manageAnnouncement",
            component:ManageAnnouncement
        },
        {
            path:"/dataAll",
            component:DataAll
        },
        {
            path:"/dataUsers",
            component:DataUsers
        },
        {
            path:"/dataOrder",
            component:DataOrder
        },
        {
            path:"/dataProduct",
            component:DataProduct
        }
    ]
})

//暴露出去
export default router