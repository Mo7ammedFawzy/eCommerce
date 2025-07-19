import {defineStore} from "pinia"
import {MAX_ITEMS, SHIPPING_TAX} from "~/constants"
import type {Cart, Product} from "~/types"

export const useCartStore = defineStore('cart-store', {
 state: () => ({
  cart: [] as Cart[]
 }),
 actions: {
  addToCart(product: Product) {
   // check first if the product is in cart
   const isProductExist = this.cart.find((el: Cart) => el.product.id === product.id)

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
  decreaseQuantity(product: Product) {
   // check first if the product is in cart
   const isProductExist = this.cart.find((el: Cart) => el.product.id === product.id)
   if (!isProductExist) return;
      if (isProductExist.quantity <= 1)
        return;
      isProductExist.quantity--
    },
    increaseQuantity(product: Product) {
      const isProductExist = this.cart.find((el: Cart) => el.product.id === product.id)
      if (!isProductExist)
        return;
      // exist
      if (isProductExist.quantity >= MAX_ITEMS)
        return;
      // canIncrease
      isProductExist.quantity++
    },
    deleteProductFromCart(product: Product) {

      const isProductExist = this.cart.find((el: Cart) => el.product.id === product.id)

      if (!isProductExist) return;
      // canRemove
      this.cart = this.cart.filter((el) => el.product.id !== isProductExist.product.id)
    },
    emptyCart() {
      if (this.cart.length === 0) return;
      this.cart.length = 0
    }
  },
  getters: {
    getProductQuantity: (state) => (product: Product): number => state.cart.find((el) => el.product.id === product.id)?.quantity ?? 0,
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