export default defineNuxtRouteMiddleware((to, from) => {
 // const user = useState('user')
 const userStore = useUserStore()
 if (userStore.isAuthenticated && userStore.initUser) {
  return navigateTo('/profile/general')
 }
 return;
 // if (user.value) return;
})

// to navigate to login page usernoAuthenticated && userInit