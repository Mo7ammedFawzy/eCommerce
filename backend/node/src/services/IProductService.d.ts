import {Request} from "express";
import {BaseService} from "./BaseService";
import {IProduct} from "../models/productModel";

export interface IProductService extends BaseService<IProduct> {
  create(product: Partial<IProduct>): Promise<IProduct>;

  addMany(products: Partial<IProduct[]>): Promise<IProduct[]>;

  getProducts(req: Request): Promise<IProduct[]>
}

export type IProductQueryKeys = "search" | "category" | "page" | "limit" | "sort";

export type IProductQuery = {
  search?: string,
  category?: string,
  page: number,
  limit: number,
  sort?: string
}

export interface GetProductResponse {
  products: IProduct[],
  meta: {
    totalPages: number,
    currentPage: number,
    count: number,
  }
}