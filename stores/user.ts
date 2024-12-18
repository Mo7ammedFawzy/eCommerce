import { defineStore } from "pinia"
import type { IUser } from "~/types"

export const useUserStore = defineStore('user-store', {
 state: () => ({
  user: null as IUser | null,
  initUser: false,
  // user: useLocalStorage('accessToken', 0),
  // nUser: 
 }),

 actions: {
  setUser(user: IUser) {
   this.user = user
  },
  signOut() {
   // clearStorageToken && clear userStore.user=undefined

   this.user = null;
   localStorage.removeItem('accessToken');
   useCookie("accessToken").value = null
   navigateTo("/auth/login")
  },
  setInitUser(value: boolean) {
   this.initUser = value
  }
 },
 getters: {
  getUser: (state) => state.user,
  isAuthenticated: (state): boolean => state.user !== null
 }
})