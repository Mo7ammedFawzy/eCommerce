import { defineStore } from "pinia";

export const useLoaderStore = defineStore('loader-store', {
 state: () => ({
  canLoad: true
 }),
 actions: {
  toggleLoadingState(value: boolean) {
   this.canLoad = value
  }
 }
})