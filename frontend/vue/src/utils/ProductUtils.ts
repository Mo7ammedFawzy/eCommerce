import {IProductCard} from "@/types";
import CommonUtils from "@/utils/CommonUtils.ts";

export default class ProductUtils {
  static toLink(product: IProductCard): string {
    return "/products/" + product.id + "/" + CommonUtils.toSlug(product.title)
  }
}