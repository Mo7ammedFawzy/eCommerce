import {createRouter, createWebHistory, type RouteRecordRaw,} from "vue-router"
import {RouterNames} from "@/router/routerNames.ts";
import {GScrollTo} from "@/composables/useAnimations.ts";

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
    name: RouterNames.PRODUCTS,
    path: '/products',
    component: () => import('@/views/products/ProductsPage.vue'),
  },
  {
    name: RouterNames.PRODUCT,
    path: '/products/:id/:title',
    component: () => import('@/views/products/ProductPage.vue'),
    props: true
  },
  {
    name: RouterNames.AUTH_LOGIN,
    path: '/auth/login',
    component: () => import('@/views/auth/login.vue'),
  },
  {
    name: RouterNames.AUTH_REGISTER,
    path: '/auth/register',
    component: () => import('@/views/auth/register.vue'),
  },
  {
    name: RouterNames.PROFILE,
    path: '/profile',
    component: () => import('@/views/profile/ProfilePage.vue'),
  },
  {
    name: RouterNames.PROFILE_GENERAL,
    path: '/profile/general',
    component: () => import('@/views/profile/GeneralPage.vue'),
  },
  {
    name: RouterNames.PROFILE_ORDERS,
    path: '/profile/orders',
    component: () => import('@/views/profile/orders/OrdersPage.vue'),
  },
  {
    name: RouterNames.PROFILE_ORDERS_ID,
    path: '/profile/orders/:id',
    component: () => import('@/views/profile/orders/OrderPage.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})


router.afterEach((to, from) => {
  if (window.scrollY < 10)
    return;
  if (to.name == from.name)
    return;
  GScrollTo(0);
})

export default router;
