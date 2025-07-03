import { defineStore } from "pinia";
import type { ICart, IOrder } from "~/types";
import JSONOrders from "~/constants/orders.json"
import { validate } from "uuid"
export const useOrderStore = defineStore('order-store', {
 state: () => ({
  orders: [...JSONOrders] as IOrder[]
 }),
 actions: {
  async placeOrder(order: IOrder) {
   this.orders.push(order);
   // TODO decrease the delay
   await delay(1000)
   // then delete
   navigateTo('/profile/orders')
   await delay(1000)
   useCartStore().emptyCart()
  }
 },
 getters: {
  getCartItemsLengthInOrder: (state) => (order: IOrder): number => order.items.length ?? 0,
  isOrdersEmpty: (state) => state.orders.length === 0,
  getOrder: (state) => (orderID: IOrder['id']) => state.orders.find((order) => order.id === orderID),
  // first find order then calc units
  howManyUnitInOrder: (state) => (orderID: IOrder['id']): number => state.orders.find(order => order.id === orderID)?.items.reduce((total, curr) => total + curr.quantity, 0) ?? 0,
  getOrderCartItems: (state) => (orderID: IOrder['id']): ICart[] => state.orders.find(order => order.id === orderID)?.items ?? [],
  isOrderValid: (state) => (orderID: IOrder['id']): boolean => validate(orderID) && state.orders.some(order => order.id === orderID)
 }
})