import { defineStore } from "pinia"
import { MAX_ITEMS, SHIPPING_TAX } from "~/constants"
import type { IProduct, ICart } from "~/types"

export const useCartStore = defineStore('cart-store', {
 state: () => ({
  cart: [] as ICart[]
 }),
 actions: {
  addToCart(product: IProduct) {
   // check first if the product is in cart
   const isProductExist = this.cart.find((el: ICart) => el.product.id === product.id)

   if (isProductExist) {
    if (isProductExist.quantity < MAX_ITEMS) {
     isProductExist.quantity++
     push.success({
      message: "Quantity Added",
     })
    } else {
     push.warning("Reached limit")
    }
   } else {
    this.cart.push({ product, quantity: 1 })
    // add notification
    push.success('product has been added to cart')
   }
  },
  decreaseQuantity(product: IProduct) {
   // check first if the product is in cart
   const isProductExist = this.cart.find((el: ICart) => el.product.id === product.id)
   if (!isProductExist) return;

   // exist
   if (isProductExist.quantity <= 1) return;
   // canDecrease
   isProductExist.quantity--
  },
  increaseQuantity(product: IProduct) {
   // check first if the product is in cart
   const isProductExist = this.cart.find((el: ICart) => el.product.id === product.id)
   if (!isProductExist) return;

   // exist
   if (isProductExist.quantity >= MAX_ITEMS) return;
   // canIncrease
   isProductExist.quantity++
  },
  deleteProductFromCart(product: IProduct) {

   const isProductExist = this.cart.find((el: ICart) => el.product.id === product.id)

   if (!isProductExist) return; //already removed
   // canRemove
   this.cart = this.cart.filter((el) => el.product.id !== isProductExist.product.id)
  },
  emptyCart() {
   if (this.cart.length === 0) return;
   this.cart.length = 0
  }
 },
 getters: {
  getProductQuantity: (state) => (product: IProduct): number => state.cart.find((el) => el.product.id === product.id)?.quantity ?? 0,
  getCartLength: (state): number => state.cart.length ?? 0,
  isCartEmpty: (state): boolean => state.cart.length === 0,
  // withDiscount
  getTotalPrice: (state): string => formatNumber(state.cart.reduce((total, curr) => total + Number(PriceAfterDiscount(curr.product.price)) * curr.quantity, 0)), //0 is initial value
  getTotalPricePlus: (state): string => formatNumber(state.cart.map(el => Number(PriceAfterDiscount(el.product.price)) * el.quantity).reduce((prev, curr) => prev + curr, 0)),
  getTotalPriceAfterShipping(state): string {
   return formatNumber(state.cart.map(el => Number(PriceAfterDiscount(el.product.price)) * el.quantity).reduce((prev, curr) => prev + curr, 0) + SHIPPING_TAX)
  }
 }
})