export default defineNuxtRouteMiddleware((to, from) => {
 const store = useCartStore()
 // TODO delete this global watch
 if (store.isCartEmpty) return navigateTo('/')
})