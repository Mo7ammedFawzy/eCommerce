export default defineNuxtRouteMiddleware(() => {
  const userStore = useUserStore()
  if (!userStore.initUser)
    return;
  else if (userStore.isAuthenticated)
    return navigateTo('/profile/general')
  else
    return;
})
