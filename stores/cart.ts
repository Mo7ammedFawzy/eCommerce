import { defineStore } from "pinia"
import { MAX_ITEMS } from "~/constants"
import type { API_Product, ICart } from "~/types"

export const useCartStore = defineStore('cart-store', {
 state: () => ({
  cart: [] as ICart[]
 }),
 actions: {
  addToCart(product: API_Product) {
   console.log('add to cart')
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
  decreaseQuantity(product: API_Product) {
   // check first if the product is in cart
   const isProductExist = this.cart.find((el: ICart) => el.product.id === product.id)
   if (!isProductExist) return;

   // exist
   if (isProductExist.quantity <= 1) return;
   // canDecrease
   isProductExist.quantity--
  },
  increaseQuantity(product: API_Product) {
   // check first if the product is in cart
   const isProductExist = this.cart.find((el: ICart) => el.product.id === product.id)
   if (!isProductExist) return;

   // exist
   if (isProductExist.quantity >= MAX_ITEMS) return;
   // canIncrease
   isProductExist.quantity++
  },
  deleteProductFromCart(product: API_Product) {

   const isProductExist = this.cart.find((el: ICart) => el.product.id === product.id)

   if (!isProductExist) return; //already removed
   // canRemove
   this.cart = this.cart.filter((el) => el.product.id !== isProductExist.product.id)
  }
 },
 getters: {
  getProductQuantity: (state) => (product: API_Product) => state.cart.find((el) => el.product.id === product.id)?.quantity ?? 0,
  getCartLength: (state) => state.cart.length ?? 0,
  isCartEmpty: (state) => state.cart.length === 0
 }
})