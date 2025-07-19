export default defineNuxtRouteMiddleware((to) => {
  const userStore = useUserStore()
  if (!userStore.initUser)
    return;
  else if (!userStore.isAuthenticated)
    return navigateTo(`/auth/login?redirect=${to.fullPath}`)
  else
    return;
})
