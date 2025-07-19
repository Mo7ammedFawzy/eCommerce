export default defineNuxtPlugin(async () => {
  const userStore = useUserStore()
  if (userStore.user) return;

  const {getUser} = useAPI()

  try {
    await getUser()
  } catch (err) {
    console.log({err})
  }
  userStore.setInitUser(true)
})