import {defineStore} from "pinia";
import {Cart, ProductCard} from "@/types";
import {type NotificationClearMethods, push} from "notivue";
import ObjectChecker from "@/utils/ObjectChecker.ts";
import CollectionUtils from "@/utils/CollectionUtils.ts";

export const useCartStore = defineStore("cart-store", {
  state: () => ({
    cart: <Cart[]>[]
  }),
  actions: {
    pushToCart(product: ProductCard) {
      this.cart.push({
        product,
        quantity: 1
      });
      push.success({
        message: "Product added successfully",
      })
    }, addToCart(product: ProductCard): void {
      const productInCart = CollectionUtils.findInArrayWithKey(product, this.cart, "product");
      if (!productInCart)
        this.pushToCart(product);
      else
        this.increaseQuantity(product);
    }, decreaseQuantity(product: ProductCard): NotificationClearMethods | undefined {
      const productInCart = CollectionUtils.findInArrayWithKey(product, this.cart, "product")
      if (ObjectChecker.isEmptyOrNullish(productInCart))
        return (push.warning({title: `product with id:${product.id} not found`}))
      productInCart.quantity--;
      push.success({message: "Product quantity decreased"})
    }, deleteProductFromCart(product: ProductCard): void {
      CollectionUtils.removeFromArrayWithKey(product, this.cart, "product")
      push.info({
        message: "Product deleted successfully"
      })
    }, clearCart(): void {
      this.cart = [];
    }, increaseQuantity(product: ProductCard): void {
      const productInCart = CollectionUtils.findInArrayWithKey(product, this.cart, "product")
      if (!productInCart)
        return this.pushToCart(product);
      productInCart.quantity++;
      push.success({message: "Product quantity increased"})
    }
  },
  getters: {
    getCartLength(): number {
      return this.cart.length;
    }, getProductQuantity() {
      return (product?: ProductCard) => {
        return CollectionUtils.findInArrayWithKey(product, this.cart, "product")?.quantity ?? 0
      };
    }, getTotalPrice(): number {
      return this.cart.reduce((total, cartItem) => total + cartItem.product.price * cartItem.quantity, 0) ?? 0;
      //todo::
    }, getTotalPriceAfterShipping(): number {
      return 0;
    }, isCartEmpty(state): boolean {
      return state.cart.length === 0;
    }
  }
})