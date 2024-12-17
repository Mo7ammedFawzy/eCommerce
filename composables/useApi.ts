import type { UseFetchOptions } from 'nuxt/app'
import { API_URL, API_COUNTRIES_URL } from '~/constants'
import type { API_Product, ICountry } from '~/types'

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

 const getProduct = () => {
  const productID = useRoute().params.id
  const endpoint = `/${productID}`
  return useFactoryAPI<API_Product>(API_URL + endpoint)
 }

 const getCountries = () => {
  return useFetch(API_COUNTRIES_URL, {
   default: () => ['US', "EGYPT"],
   transform: (countries: ICountry[]) => countries.map(country => country.name.common)
  })
 }

 const getProducts = ({ limit = 7, hasLimit = true }: { limit?: number, hasLimit?: boolean } = {}) => {
  const endpoint = hasLimit ? `?limit=${limit}` : ''
  return useFactoryAPI<API_Product[]>(API_URL + endpoint)
 }

 const getProductsOnQueryChange = () => {
  const route = useRoute()
  const endpoint = computed(() => {
   return route.query.category ? API_URL + `/category/${route.query.category}` : API_URL
  });

  return useFetch<API_Product[]>(endpoint, {
  })
 }

 return { getProduct, getCountries, useFactoryAPI, getProducts, getProductsOnQueryChange }
}














// const test = () => {
//  return useFactoryAPI('https://httpbin.org/delay/5')
// }