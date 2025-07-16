import {createFetch} from "@vueuse/core";
import {BASE_URL} from "@/utils/constants";
import {IProductCard} from "@/types";


export const useMyFetch = createFetch({
  baseUrl: BASE_URL,
})

export async function getAllProducts(): Promise<IProductCard[]> {
  const {data, error} = await useMyFetch("products").json<IProductCard[]>();
  if (error.value) {
    console.error("Failed to fetch products.")
    return [];
  }
  if (!data.value)
    return [];
  return data.value;
}

export function getTopCollectionsProducts() {
}

export function getProductById() {
}
