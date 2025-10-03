import {IProduct, Product} from "../models/productModel";
import {Request} from "express";
import {IProductQuery, IProductQueryKeys} from "../services/IProductService";

export default class ProductUtils {
  public static limit = 10;

  static isValidProduct(p: IProduct): boolean {
    return Boolean(p.title && p.price && p.category && p.thumbnail && p.images?.length && p.stock);
  }

  static isNotValidProduct(p: IProduct): boolean {
    return !this.isValidProduct(p);
  }

  static async getTotalPages(req: Request) {
    const productCount = await Product.countDocuments();
    const limit = this.getProductQuery(req).limit
    return Math.ceil(productCount / Number(limit))
  }

  static getProductQuery(req: Request): IProductQuery {
    const query = req.query as Record<IProductQueryKeys, string | undefined>;
    return {
      ...query,
      limit: Number(query.limit ?? this.limit),
      page: Number(query.page ?? 1)
    }
  }
}