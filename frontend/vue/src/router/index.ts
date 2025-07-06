import {createRouter, createWebHistory, type RouteRecordRaw,} from "vue-router"

export const routes: RouteRecordRaw[] = [
    {
        name: "home",
        path: "/",
        component: () => import("@/views/HomePage.vue")
    },
    {
        name: 'cart',
        path: '/cart',
        component: () => import('@/views/CartPage.vue'),
    },
    {
        name: 'checkout',
        path: '/checkout',
        component: () => import('@/views/CheckoutPage.vue'),
    },
    {
        name: 'search',
        path: '/search',
        component: () => import('@/views/SearchPage.vue'),
    },
    {
        name: 'dashboard',
        path: '/dashboard',
        component: () => import('@/views/DashboardPage.vue'),
    },
    {
        name: 'products',
        path: '/products',
        component: () => import('@/views/products/ProductsPage.vue'),
        children: [
            {
                name: 'products-id',
                path: ':id',
                component: () => import('@/views/products/ProductPage.vue'),
            },
        ],
    },
    {
        name: 'auth',
        path: '/auth',
        children: [
            {
                name: 'auth-login',
                path: 'login',
                component: () => import('@/views/auth/login.vue'),
            },
            {
                name: 'auth-register',
                path: 'register',
                component: () => import('@/views/auth/register.vue'),
            },
        ],
    },
    {
        name: 'profile',
        path: '/profile',
        component: () => import('@/views/profile/ProfilePage.vue'),
        children: [
            {
                name: 'profile-index',
                path: '',
                component: () => import('@/views/profile/ProfilePage.vue'),
            },
            {
                name: 'profile-general',
                path: 'general',
                component: () => import('@/views/profile/GeneralPage.vue'),
            },
            {
                name: 'profile-orders',
                path: 'orders',
                component: () => import('@/views/profile/orders/OrdersPage.vue'),
                children: [
                    {
                        name: 'profile-orders-id',
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
