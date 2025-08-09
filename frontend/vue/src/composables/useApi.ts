import {createFetch, useFetch, UseFetchReturn} from "@vueuse/core";
import {BASE_URL} from "@/utils/constants";
import {IProductCard} from "@/types";
import {useRoute} from "vue-router";
import {computed} from "vue";

export const useMyFetch = createFetch({
  baseUrl: BASE_URL,
})

export const getAllProducts = (): UseFetchReturn<IProductCard[]> => {
  //if im in products page
  const route = useRoute();
  const category = computed(() => route.query.category)

  const url = computed(() => {
    const base = BASE_URL + "/products";
    if (category.value)
      return base + "?category=" + category.value;
    else
      return base;
  });
  return useFetch(url, {refetch: true}).json<IProductCard[]>();
}
export const getProduct = (id: string): UseFetchReturn<IProductCard> => {
  return useFetch(BASE_URL + "/products/" + id).json<IProductCard>();
}
