import {defineStore} from "pinia";
import {validate} from "uuid"
import {orders} from "@/utils/constants/orders.ts";
import CommonUtils from "@/utils/CommonUtils.ts";
import {useCartStore} from "@/store/cart.ts";
import {Order} from "@/types/common.ts";

export const useOrderStore = defineStore('order-store', {
  state: () => ({
    orders: <Order[]>[...orders]
  }),
  actions: {
    async placeOrder(order: Order) {
      this.orders.push(order);
      await CommonUtils.waitFor(1000)
      CommonUtils.navigateTo('/profile/orders')
      await CommonUtils.waitFor(1000)
      useCartStore().clearCart()
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