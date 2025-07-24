import {defineStore} from "pinia"
import type {IUserStore, User} from "~/types"

export const useUserStore = defineStore('user-store', {
  state: (): IUserStore => ({
    user: null,
    token: null,
    hasDashboardAccess: true,
  }),
  getters: {
    isLoggedIn(): boolean {
      return !!this.token;
    }
  },
  actions: {
    setUser(user: User) {
      this.user = user;
    },
    setToken(token: string) {
      this.token = token;
    },
  },

})