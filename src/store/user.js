import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => {
    return {
      id: '',
      name: '',
      token: '',
      isAdmin: 0
    }
  },
  getters: {},
  actions: {
    storeData(data) {
      this.id = data.id
      this.name = data.name
      this.token = data.token
      this.isAdmin = data?.admin
    },
    resetData() {
      this.id = ''
      this.name = ''
      this.token = ''
      this.isAdmin = 0
    }
  },
  persist: {
    enabled: true //开启数据持久化
  }
})
