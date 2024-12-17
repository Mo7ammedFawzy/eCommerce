export default defineNuxtRouteMiddleware((to, from) => {
 const store = useCartStore()
 // TODO delete this global watch
 watch(store.cart, () => {
  if (store.isCartEmpty) navigateTo('/')
 })
 if (store.isCartEmpty) return navigateTo('/')
})