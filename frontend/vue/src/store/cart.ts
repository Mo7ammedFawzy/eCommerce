import {defineStore} from "pinia";
import {Cart, CartActions, CartGetters, IProductCard} from "@/types";
import {push} from "notivue";
import CommonUtils from "@/utils/CommonUtils.ts";

export const useCartStore = defineStore("cart-store", {
  state: () => ({
    cart: <Cart[]>[]
  }),
  actions: <CartActions>{
    pushToCart(product: IProductCard) {
      this.cart.push({
        product,
        quantity: 1
      });
      push.success({
        message: "product added to cart",
      })
    }, addToCart(product: IProductCard): void {
      const productInCart = CommonUtils.findInArrayWithKey(product, this.cart, "product");
      if (!productInCart)
        this.pushToCart(product);
      else
        this.increaseQuantity(product);
    }, decreaseQuantity(product: IProductCard): void {
      const productInCart = CommonUtils.findInArrayWithKey(product, this.cart, "product")
      if (!productInCart)
        return (push.warning({title: `product with id:${product.id} not found`}))
      productInCart.quantity--;
      push.success({message: "product quantity decreased"})
    }, deleteProductFromCart(product: IProductCard): void {
      CommonUtils.removeFromArrayWithKey(product, this.cart, "product")
    }, clearCart(): void {
      this.cart = [];
    }, increaseQuantity(product: IProductCard): void {
      const productInCart = CommonUtils.findInArrayWithKey(product, this.cart, "product")
      if (!productInCart)
        return (push.warning({title: `product with id:${product.id} not found`}))
      productInCart.quantity++;
      push.success({message: "product quantity added"})
    }
  },
  getters: <CartGetters>{
    getCartLength(state): number {
      return this.cart.length;
    }, getProductQuantity(state): number {
      return (product?: IProductCard) => CommonUtils.findInArrayWithKey(product, this.cart, "product")?.quantity ?? 0;
    }, getTotalPrice(state): number {
      return this.cart.reduce((total, cartItem) => total + cartItem.product.price * cartItem.quantity, 0) ?? 0;
      //todo::
    }, getTotalPriceAfterShipping(state): number {
      return 0;
    }, isCartEmpty(state): boolean {
      return state.cart.length === 0;
    }
  }
})