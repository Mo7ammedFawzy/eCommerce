import {ProductCard} from "@/types/common.ts";

export interface GetProductsMeta {
  totalPages: number,
  currentPage: number,
  count: number,
  limit: number,
  totalItems: number
};

export interface GetProductsResponse {
  products: ProductCard[],
  meta: GetProductsMeta
}


export interface GetProductResponse {
  product: ProductCard
}

export interface GetResult<T> {
  status: string,
  message: string,
  data: T
}