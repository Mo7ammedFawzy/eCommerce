export default defineNuxtRouteMiddleware((to, from) => {
 const store = useCartStore()
 console.log('store.isCartEmpty', store.isCartEmpty)
 watch(store.cart, () => {
  if (store.isCartEmpty) navigateTo('/')
 })
 if (store.isCartEmpty) return navigateTo('/')
})