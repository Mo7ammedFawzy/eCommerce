import type { UseFetchOptions } from 'nuxt/app'
import { API_URL, API_COUNTRIES_URL, API_AUTH_URL } from '~/constants'
import type { IProduct, ICountry, ILogin, ILoginError, IUser, UserDetails } from '~/types'

function useFactoryAPI<T>(
 // url: string | (() => string),
 url: string,
 options?: UseFetchOptions<T>,
) {
 return useFetch(url, {
  lazy: true,
  ...options,
  server: false,
  $fetch: useNuxtApp().$api as typeof $fetch
 })
}


export const useAPI = () => {

 const userStore = useUserStore()


 const getProduct = () => {
  const productID = useRoute().params.id
  const endpoint = `/${productID}`
  return useFactoryAPI<IProduct>(API_URL + endpoint)
 }

 const getCountries = () => {
  return useFetch(API_COUNTRIES_URL, {
   default: () => ['US', "EGYPT"],
   transform: (countries: ICountry[]) => countries.map(country => country.name.common)
  })
 }

 const getProducts = ({ limit = 7, hasLimit = true }: { limit?: number, hasLimit?: boolean } = {}) => {
  const endpoint = hasLimit ? `?limit=${limit}` : ''
  return useFactoryAPI<IProduct[]>(API_URL + endpoint)
 }

 const getProductsOnQueryChange = () => {
  const route = useRoute()
  const endpoint = computed(() => {
   return route.query.category ? API_URL + `/category/${route.query.category}` : API_URL
  });

  return useFetch<IProduct[]>(endpoint, {
  })
 }

 const login = (body: ILogin, reset: () => void) => {
  $fetch<IUser>(API_AUTH_URL + "/login", {
   method: "POST",
   body: JSON.stringify(body),
   headers: { 'Content-Type': 'application/json' },
  }).then((res) => {
   // get user 
   userStore.setUser(res)
   // save token to storage
   localStorage.setItem('accessToken', res.accessToken)
   localStorage.setItem('date', new Date().getTime().toString())
   useCookie('accessToken').value = res.accessToken

   const route = useRoute()
   const redirectTo = route.query.redirect as string
   const navTo = redirectTo ?? '/profile/general' as string
   navigateTo(navTo)
  }).catch((err: ILoginError) => {
   if (err.statusCode === 400) {
    return push.error('invalid credentials')
   }
   push.error('something went wrong please try again')

  }).finally(() => {
   reset()
  })
 }

 const getUser = async () => {
  const token = localStorage.getItem('accessToken') ?? '0'
  console.log({ token })
  const response = await $fetch<UserDetails>(API_AUTH_URL + "/me", {
   method: "get",
   headers: {
    'Authorization': `Bearer ${token}`
   }
  })
  const TUser: IUser = {
   accessToken: token,
   refreshToken: token,
   email: response.email,
   firstName: response.firstName,
   gender: response.gender,
   id: response.id,
   image: response.image,
   lastName: response.lastName,
   username: response.username
  }
  // set
  userStore.setUser(TUser)
  return TUser
 }

 return { getProduct, getCountries, useFactoryAPI, getProducts, getProductsOnQueryChange, login, getUser }
}














// const test = () => {
//  return useFactoryAPI('https://httpbin.org/delay/5')
// }