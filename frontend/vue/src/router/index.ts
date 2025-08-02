import {createRouter, createWebHistory, type RouteRecordRaw,} from "vue-router"
import RouterNames from "@/router/routerNames.ts";

export const routes: RouteRecordRaw[] = [
    {
        name: RouterNames.HOME,
        path: "/",
        component: () => import("@/views/HomePage.vue")
    },
    {
        name: RouterNames.CART,
        path: '/cart',
        component: () => import('@/views/CartPage.vue'),
    },
    {
        name: RouterNames.CHECKOUT,
        path: '/checkout',
        component: () => import('@/views/CheckoutPage.vue'),
    },
    {
        name: RouterNames.SEARCH,
        path: '/search',
        component: () => import('@/views/SearchPage.vue'),
    },
    {
        name: RouterNames.DASHBOARD,
        path: '/dashboard',
        component: () => import('@/views/DashboardPage.vue'),
    },
    {
        path: '/products',
        children: [
            {
                name: RouterNames.PRODUCTS,
                path: '',
                component: () => import('@/views/products/ProductsPage.vue'),
            },
            {
                name: RouterNames.PRODUCT_PAGE,
                path: ':id',
                component: () => import('@/views/products/ProductPage.vue'),
                props: true
            },
        ],
    },
    {
        name: RouterNames.AUTH,
        path: '/auth',
        children: [
            {
                name: RouterNames.AUTH_LOGIN,
                path: 'login',
                component: () => import('@/views/auth/login.vue'),
            },
            {
                name: RouterNames.AUTH_REGISTER,
                path: 'register',
                component: () => import('@/views/auth/register.vue'),
            },
        ],
    },
    {
        name: RouterNames.PROFILE,
        path: '/profile',
        component: () => import('@/views/profile/ProfilePage.vue'),
        children: [
            {
                name: RouterNames.PROFILE_INDEX,
                path: '',
                component: () => import('@/views/profile/ProfilePage.vue'),
            },
            {
                name: RouterNames.PROFILE_GENERAL,
                path: 'general',
                component: () => import('@/views/profile/GeneralPage.vue'),
            },
            {
                name: RouterNames.PROFILE_ORDERS,
                path: 'orders',
                component: () => import('@/views/profile/orders/OrdersPage.vue'),
                children: [
                    {
                        name: RouterNames.PROFILE_ORDERS_ID,
                        path: ':id',
                        component: () => import('@/views/profile/orders/OrderPage.vue'),
                    },
                ],
            },
        ],
    },
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
})

export default router;
