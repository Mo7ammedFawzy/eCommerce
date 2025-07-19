import {defineStore} from "pinia";
import type {Cart, Order} from "~/types";
import JSONOrders from "~/constants/orders"
import {validate} from "uuid"

export const useOrderStore = defineStore('order-store', {
  state: () => ({
    orders: <Order[]>[...JSONOrders]
  }),
  actions: {
    async placeOrder(order: Order) {
      this.orders.push(order);
      await delay(1000)
      navigateTo('/profile/orders')
      await delay(1000)
      useCartStore().emptyCart()
    }
  },
  getters: {
    getCartItemsLengthInOrder: () => (order: Order): number => order.items.length ?? 0,
    isOrdersEmpty: (state) => state.orders.length === 0,
    getOrder: (state) => (orderID: Order['id']) => state.orders.find((order) => order.id === orderID),
    howManyUnitInOrder: (state) => (orderID: Order['id']): number => state.orders.find(order => order.id === orderID)?.items.reduce((total, curr) => total + curr.quantity, 0) ?? 0,
    getOrderCartItems: (state) => (orderID: Order['id']): Cart[] => state.orders.find(order => order.id === orderID)?.items ?? [],
    isOrderValid: (state) => (orderID: Order['id']): boolean => validate(orderID) && state.orders.some(order => order.id === orderID)
  }
})