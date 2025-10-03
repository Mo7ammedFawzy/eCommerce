// Service Layer
import {DeleteResult, RootFilterQuery} from "mongoose";
import {Request} from "express";
import {IProductService} from "./IProductService";
import {IProduct, Product} from "../models/productModel";
import ProductUtils from "../utils/ProductUtils";

class ProductService implements IProductService {

  private constructor() {
  }

  static getInstance() {
    return new ProductService();
  }

  async getAll(): Promise<IProduct[]> {
    return Product.find();
  }

  async getProducts(req: Request): Promise<IProduct[]> {
    const {search, limit = ProductUtils.limit, category, page = 1, sort} = ProductUtils.getProductQuery(req);
    const filter: RootFilterQuery<IProduct> = {};

    if (search)
      filter.$or = [
        {title: {$regex: search, $options: "i"}},
        {description: {$regex: search, $options: "i"}},
        {category: {$regex: search, $options: "i"}},
      ]
    if (category)
      filter.category = category
    //
    const sortOption: any = {};
    if (sort) {
      for (let sortEl of sort.split(",")) {
        const [field, order] = sortEl.split(":")
        if (field)
          sortOption[field] = order == "desc" ? 1 : -1
      }
    }

    return Product.find(filter)
      .limit(Number(limit))
      .skip((Number(page) - 1) * Number(limit))
      .sort(sortOption);
  }

  async getById(id: string): Promise<IProduct | null> {
    return Product.findById(id);
  }

  async create(product: Partial<IProduct>): Promise<IProduct> {
    return Product.create(product);
  }

  async addMany(products: Partial<IProduct[]>): Promise<IProduct[]> {
    return Product.insertMany(products);
  }

  async delete(id: string): Promise<IProduct | null> {
    return Product.findByIdAndDelete(id);
  }

  async deleteAll(): Promise<DeleteResult> {
    return Product.deleteMany();
  }

  async update(id: string, updateData: Partial<IProduct>): Promise<IProduct | null> {
    return Product.findByIdAndUpdate(id, updateData);
  }
}

export const productService = ProductService.getInstance();