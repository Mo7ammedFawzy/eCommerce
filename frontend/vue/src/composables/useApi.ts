import {MaybeRefOrGetter, useFetch, UseFetchReturn} from "@vueuse/core";
import {BASE_URL} from "@/utils/constants";
import {IProductCard, ProductParams} from "@/types";
import {computed, toValue} from "vue";
import ObjectChecker from "@/utils/ObjectChecker.ts";
import CommonUtils from "@/utils/CommonUtils.ts";



export const getProducts = (params?: MaybeRefOrGetter<ProductParams>): UseFetchReturn<IProductCard[]> => {
  const url = computed(() => {
    console.log("watch")
    const base = BASE_URL + "/products";
    const paramsToValue: ProductParams = toValue(params);
    CommonUtils.deleteEmptyValues(paramsToValue);
    if (ObjectChecker.isEmptyObject(paramsToValue))
      return base;
    let queryFilter: string = "?";
    const strings: any = Object.keys(paramsToValue);
    for (const paramKey of strings) {
      if (paramsToValue[paramKey])
        queryFilter += paramKey + "=" + paramsToValue[paramKey];
      if (!ObjectChecker.isLastElement(paramKey, strings) && queryFilter.length > 1)
        queryFilter += "&"
    }
    return base + queryFilter;
  });
  return useFetch(url, {refetch: true}).json<IProductCard[]>();
}
export const getProduct = (id: MaybeRefOrGetter): UseFetchReturn<IProductCard> => {
  const url = computed(() => BASE_URL + "/products/" + toValue(id));
  return useFetch(url, {
    refetch: true
  }).json<IProductCard>();
}
