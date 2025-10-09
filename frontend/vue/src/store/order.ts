import {defineStore} from "pinia";
import {validate} from "uuid"
import CommonUtils from "@/utils/CommonUtils.ts";
import {useCartStore} from "@/store/cart.ts";
import {Cart, Order} from "@/types/common.ts";

export const useOrderStore = defineStore('order-store', {
  state: () => ({
    orders: <Order[]>[]
  }),
  actions: {
    saveLocal() {
      localStorage.setItem("order-store", JSON.stringify(this.$state));
    },
    loadOrders() {
      const orderStore = localStorage.getItem("order-store")
      if (orderStore)
        this.$patch(JSON.parse(orderStore))
    },
    async placeOrder(order: Order) {
      this.orders.push(order);
      CommonUtils.navigateTo('/profile/orders')
      useCartStore().clearCart()
      this.saveLocal();
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