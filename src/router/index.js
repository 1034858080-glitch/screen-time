import { createRouter, createWebHashHistory } from 'vue-router'

// 配置路由
const routes = [
    {
        path: '/',
        name: 'home',
        component: () => import('../views/Home.vue')   // 首页
    },
    {
        path: '/apple',
        name: 'apple',
        component: () => import('../views/ScreenTime.vue') // 二级页
    },
    {
        path: '/xiaomi',
        name: 'xiaomi',
        component: () => import('../views/XiaoMi.vue') // 二级页
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router
