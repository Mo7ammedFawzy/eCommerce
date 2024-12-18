export default defineNuxtRouteMiddleware((to, from) => {
 // const user = useState('user')
 const userStore = useUserStore()
 if (!userStore.isAuthenticated && userStore.initUser) {
  console.log({ from, to })
  return navigateTo(`/auth/login?redirect=${to.fullPath}`)
 }
 return;
 // if (user.value) return;
})

// to navigate to login page usernoAuthenticated && userInit