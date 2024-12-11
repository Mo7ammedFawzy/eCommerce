import { defineStore } from "pinia"
export const useMyUtilsStore = defineStore({
  id: "myUtilsStore",
  state: () => ({
    baseAPIURL: "https://fakestoreapi.com"
  }),
  actions: {

  }
})
// import { defineStore } from 'pinia'

// export const useMyUtilsStore = defineStore({
//   id: 'myUtilsStore',
//   state: () => ({ }),
//   actions: {}
// })
