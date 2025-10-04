import {defineStore} from "pinia";
import {Cart, ProductCard} from "@/types/common.ts";
import {type NotificationClearMethods, push} from "notivue";
import ObjectChecker from "@/utils/ObjectChecker.ts";
import CollectionUtils from "@/utils/CollectionUtils.ts";
import {SHIPPING_TAXES} from "@/utils/constants";

export const useCartStore = defineStore("cart-store", {
  state: () => ({
    cart: <Cart[]>[]
  }),
  actions: {
    loadCart() {
      const cart = localStorage.getItem("store")
      if (cart)
        this.$patch(JSON.parse(cart))
    },
    pushToCart(product: ProductCard) {
      this.cart.push({
        product,
        quantity: 1
      });
      push.success({
        message: "Product added successfully",
      })
      localStorage.setItem("store", JSON.stringify(this.$state));
    }, addToCart(product: ProductCard): void {
      const productInCart = CollectionUtils.findInArrayWithKey(product, this.cart, "product");
      if (!productInCart)
        this.pushToCart(product);
      else
        this.increaseQuantity(product);
    }, decreaseQuantity(product: ProductCard): NotificationClearMethods | undefined {
      const productInCart = CollectionUtils.findInArrayWithKey(product, this.cart, "product")
      if (ObjectChecker.isEmptyOrNullish(productInCart))
        return (push.warning({title: `product with id:${product._id} not found`}))
      productInCart.quantity--;
      push.success({message: "Product quantity decreased"})
    }, deleteProductFromCart(cartItem: Cart): void {
      CollectionUtils.removeFromArrayWithKey(cartItem.product, this.cart, "product")
      push.info({
        message: "Product deleted successfully"
      })
      localStorage.setItem("store", JSON.stringify(this.$state));
    }, clearCart(): void {
      this.cart = [];
    }, increaseQuantity(product: ProductCard): void {
      const productInCart = CollectionUtils.findInArrayWithKey(product, this.cart, "product")
      if (!productInCart)
        return this.pushToCart(product);
      if (productInCart.quantity >= this.getProductMaxItems(product))
        return;
      productInCart.quantity++;
      push.success({message: "Product quantity increased"})
      localStorage.setItem("store", JSON.stringify(this.$state));
    }
  },
  getters: {
    getCartLength(): number {
      return this.cart.length;
    }, getProductQuantity() {
      return (product?: ProductCard) => {
        return CollectionUtils.findInArrayWithKey(product, this.cart, "product")?.quantity ?? 0
      };
    },
    getProductMaxItems() {
      // API: implement max items of product
      return (product: ProductCard) => product.stock ?? 0;
    },
    getTotalPrice(): number {
      return this.cart.reduce((total, cartItem) => total + cartItem.product.price * cartItem.quantity, 0) ?? 0;
    }, getTotalPriceAfterShipping(): number {
      if (this.isCartEmpty)
        return 0;
      else
        return this.getTotalPrice - SHIPPING_TAXES;
    },
    getCartItemTotalPrice() {
      return (cartItem: Cart) => cartItem.product.price * cartItem.quantity;
    },
    isCartEmpty(state): boolean {
      return state.cart.length === 0;
    }
  }
})