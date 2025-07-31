import {createFetch, useFetch, UseFetchReturn} from "@vueuse/core";
import {BASE_URL} from "@/utils/constants";
import {IProductCard} from "@/types";


export const useMyFetch = createFetch({
  baseUrl: BASE_URL,
})

export const getAllProducts = (): UseFetchReturn<IProductCard[]> => {
  return useFetch(BASE_URL + "products").json<IProductCard[]>();
}
export const getProduct = (id: string): UseFetchReturn<IProductCard> => {
  return useFetch(BASE_URL + "products/" + id).json<IProductCard>();
}
