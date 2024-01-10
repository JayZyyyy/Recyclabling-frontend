import { defineStore } from 'pinia'

export const useLoginStore = defineStore('login', {
  state: () => {
    return {
      isLogin: true
    }
  },
  getters: {},
  actions: {
    changeToRegister() {
      this.isLogin = false
    },
    changeToLogin() {
      this.isLogin = true
    }
  },
  persist: {
    enabled: true //开启数据持久化
  }
})
