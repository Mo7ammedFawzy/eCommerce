import { defineStore } from "pinia";
import type { IOrder } from "~/types";

export const useOrderStore = defineStore('order-store', () => {

 const orders = ref<IOrder[]>([])

 const cartStore = useCartStore()
 const placeOrder = async (order: IOrder) => {
  await new Promise((resolve, reject) => {
   try {
    orders.value.push(order);
    console.log('order-placed')
    resolve('order-has-placed');
   } catch (err) {
    reject(err);
   }
  }).then(() => {
   cartStore.emptyCart(); //delete items from cart
   navigateTo(`/orders/${order.id}`)
  }).catch(err => {
   push.error('something wrong has happened☹️')
  })
 }

 return { orders, placeOrder }
})