import {ProductCard} from "@/types/common.ts";
import CommonUtils from "@/utils/CommonUtils.ts";
import ObjectChecker from "@/utils/ObjectChecker.ts";

export default class ProductUtils {
  static PAGE_LIMIT: number = 8;
  static toLink(product: ProductCard): string {
    return "/products/" + product._id + "/" + CommonUtils.toSlug(product.title)
  }

  static canShowDiscount(product: ProductCard) {
    if (ObjectChecker.isEmptyOrNull(product.discount))
      return false;
    else
      return product.discount > 0;
  }

  static toDiscount(product: ProductCard): string {
    if (ObjectChecker.isNotEmptyOrNull(product.discount) && this.canShowDiscount(product))
      return product.discount + "%";
    else
      return '';
  }

  static toMoney(price: number): string {
    return new Intl.NumberFormat("en-us", {
      style: "currency",
      currency: "USD"
    }).format(price);
  }
}