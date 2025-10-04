import {MaybeRefOrGetter, useFetch, UseFetchReturn} from "@vueuse/core";
import {API_COUNTRIES_URL, BASE_URL} from "@/utils/constants";
import {ProductParams} from "@/types/common.ts";
import {computed, toValue} from "vue";
import ObjectChecker from "@/utils/ObjectChecker.ts";
import CollectionUtils from "@/utils/CollectionUtils.ts";
import {GetProductResponse, GetProductsResponse, GetResult} from "@/types/api";

export const getProducts = (params?: MaybeRefOrGetter<ProductParams>): UseFetchReturn<GetResult<GetProductsResponse>> => {
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
  return useFetch(url, {refetch: true}).json();
}

export const getProduct = (id: MaybeRefOrGetter): UseFetchReturn<GetResult<GetProductResponse>> => {
  const url = computed(() => BASE_URL + "/products/" + toValue(id));
  return useFetch(url, {
    refetch: true
  }).json<GetResult<GetProductResponse>>();
}

export const getCountries = () => {
  return useFetch(API_COUNTRIES_URL, ).json();
}