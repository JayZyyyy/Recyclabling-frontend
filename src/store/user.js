import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => {
    return {
      id: '',
      name: '',
      token: ''
    }
  },
  getters: {},
  actions: {
    storeData(data) {
      this.id = data.id
      this.name = data.name
      this.token = data.token
    },
    resetData() {
      this.id = ''
      this.name = ''
      this.token = ''
    }
  },
  persist: {
    enabled: true //开启数据持久化
  }
})
