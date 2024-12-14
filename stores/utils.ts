import { defineStore } from "pinia"
export const useMyUtilsStore = defineStore({
  id: "myUtilsStore",
  state: () => ({
    baseAPIURL: "https://fakestoreapi.com"
  }),
  actions: {
    addToCart() {
      this.baseAPIURL
    }
  }
})
// import { defineStore } from 'pinia'

// export const useMyUtilsStore = defineStore({
//   id: 'myUtilsStore',
//   state: () => ({ }),
//   actions: {}
// })
