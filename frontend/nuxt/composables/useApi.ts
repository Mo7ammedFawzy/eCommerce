import type {UseFetchOptions} from 'nuxt/app'
import {API_AUTH_URL, API_COUNTRIES_URL, API_URL} from '~/constants'
import type {Country, Login, LoginError, Product, User, UserDetails} from '~/types'

function useFactoryAPI<T>(
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

  const route = useRoute()
  const userStore = useUserStore()

  const getProduct = () => {
    return useFactoryAPI<Product>(API_URL + `/${route.params.id}`)
  }

  const getCountries = () => {
    return useFetch(API_COUNTRIES_URL, {
      default: () => ['US', "EGYPT"],
      transform: (countries: Country[]) => countries.map(country => country.name.common)
    })
  }

  const getProducts = ({limit = 7, hasLimit = true}: { limit?: number, hasLimit?: boolean } = {}) => {
    const endpoint = hasLimit ? `?limit=${limit}` : ''
    return useFactoryAPI<Product[]>(API_URL + endpoint)
  }

  const getProductsOnQueryChange = () => {
    const endpoint = computed(() => {
      return route.query.category ? API_URL + `/category/${route.query.category}` : API_URL
    });

    return useFetch<Product[]>(endpoint, {})
  }

  const login = (body: Login, reset: () => void) => {
    $fetch<User>(API_AUTH_URL + "/login", {
      method: "POST",
      body: JSON.stringify(body),
      headers: {'Content-Type': 'application/json'},
    }).then((res) => {
      userStore.setUser(res)
      localStorage.setItem('accessToken', res.accessToken)
      localStorage.setItem('date', new Date().getTime().toString())
      useCookie('accessToken').value = res.accessToken

      const redirectTo = <string>(route.query.redirect)
      navigateTo(redirectTo ?? '/profile/general')
    }).catch((err: LoginError) => {
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
    const response = await $fetch<UserDetails>(API_AUTH_URL + "/me", {
      method: "get",
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    const user: User = {
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
    userStore.setUser(user)
    return user
  }

  return {getProduct, getCountries, getProducts, getProductsOnQueryChange, login, getUser}
}