import {defineStore} from "pinia"
import type {User} from "~/types"

export const useUserStore = defineStore('user-store', {
  state: () => ({
    user: <User | null>null,
    initUser: false,
  }),

  actions: {
    setUser(user: User) {
      this.user = user
    },
    signOut() {
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