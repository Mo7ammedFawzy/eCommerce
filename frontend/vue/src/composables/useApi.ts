import {MaybeRefOrGetter, useFetch, UseFetchReturn} from "@vueuse/core";
import {BASE_URL} from "@/utils/constants";
import {ProductCard, ProductParams} from "@/types.ts";
import {computed, toValue} from "vue";
import ObjectChecker from "@/utils/ObjectChecker.ts";
import CollectionUtils from "@/utils/CollectionUtils.ts";


export const getProducts = (params?: MaybeRefOrGetter<ProductParams>): UseFetchReturn<ProductCard[]> => {
  const base = BASE_URL + "/products";
  const url = computed(() => {
    const paramsToValue: ProductParams | undefined = toValue(params);
    if (ObjectChecker.isObject(paramsToValue))
      CollectionUtils.deleteEmptyValues(paramsToValue);
    if (ObjectChecker.isEmptyOrNullish(paramsToValue))
      return base;
    let queryFilter: string = "?";
    const strings = Object.keys(paramsToValue) as (keyof ProductParams)[];
    for (const paramKey of strings) {
      if (paramsToValue[paramKey])
        queryFilter += paramKey + "=" + paramsToValue[paramKey];
      if (!ObjectChecker.isLastElement(paramKey, strings) && queryFilter.length > 1)
        queryFilter += "&"
    }
    return base + queryFilter;
  });
  return useFetch(url, {refetch: true}).json<ProductCard[]>();
}
export const getProduct = (id: MaybeRefOrGetter): UseFetchReturn<ProductCard> => {
  const url = computed(() => BASE_URL + "/products/" + toValue(id));
  return useFetch(url, {
    refetch: true
  }).json<ProductCard>();
}
