import {ProductCard} from "@/types.ts";
import CommonUtils from "@/utils/CommonUtils.ts";

export default class ProductUtils {
  static toLink(product: ProductCard): string {
    return "/products/" + product.id + "/" + CommonUtils.toSlug(product.title)
  }
}