import {Request, Response} from "express"
import {productService} from "../services/productService";
import {ApiResponse} from "../utils/ApiResponseKlass";
import {CommonUtils} from "../utils/CommonUtils";
import {ObjectChecker} from "../utils/ObjectCheckerKlass";
import {IProduct} from "../models/productModel";
import ProductUtils from "../utils/ProductUtils";
import {GetProductResponse} from "../services/IProductService";

class ProductController {
  private constructor() {
  }

  static getInstance() {
    return new ProductController();
  }

  async getProducts(req: Request, res: Response) {
    const products = await productService.getProducts(req);
    const productQuery = ProductUtils.getProductQuery(req);
    const paginationResult: GetProductResponse = {
      meta: {
        totalPages: (await ProductUtils.getTotalPages(req)),
        currentPage: productQuery.page,
        count: products.length,
      },
      products
    }
    ApiResponse.addResponse(res).success(paginationResult);
  }

  async getProductById(req: Request, res: Response) {
    const id = CommonUtils.getIdFromParams(req);
    const product = await productService.getById(id);
    const apiResponse = ApiResponse.addResponse(res);
    if (ObjectChecker.isEmptyOrNull(product))
      return apiResponse.notFound("Product is not found")
    apiResponse.success(product)
  }

  async createProduct(req: Request, res: Response) {
    const requiredFields: (keyof IProduct)[] = ["title", "price", "stock", "images", "thumbnail"];
    const body = req.body as IProduct;
    const apiResponse = ApiResponse.addResponse(res);
    if (ObjectChecker.isAnyEmptyOrNull(...requiredFields))
      return apiResponse.requiredFields(...requiredFields.filter(field => !body[field]));
    const createdProduct = await productService.create(req.body);
    apiResponse.created(createdProduct);
  }

  async addManyProducts(req: Request, res: Response) {
    let mockProducts = req.body as IProduct[];
    const inValidProducts = []
    const apiResponse = ApiResponse.addResponse(res);
    for (const mockProduct of mockProducts) {
      if (ProductUtils.isValidProduct(mockProduct))
        continue
      inValidProducts.push(mockProduct);
      mockProducts = mockProducts.filter(p => p !== mockProduct)
    }
    const addedProducts = await productService.addMany(mockProducts);
    apiResponse.created(addedProducts);
  }

  async updateProduct(req: Request, res: Response) {

  }

  async deleteProduct(req: Request, res: Response) {

  }
}

export const productController = ProductController.getInstance();