import { defineStore } from 'pinia'
import axiosClient from '../axios'

export const useStore = defineStore('counter', {
  state: () => {
    return {
      user: {
        data: {},
        token: sessionStorage.getItem('TOKEN')
      }
    }
  },
  actions: {
    async register(user) {
      const {data} = await axiosClient.post('/register', user)
      this.user.token = data.token
      this.user.data = data.user
      sessionStorage.setItem('TOKEN', data.token)
    },
    async login(user) {
      const {data} = await axiosClient.post('/login', user)
      this.user.token = data.token
      this.user.data = data.user
      sessionStorage.setItem('TOKEN', data.token)
    },
  },
})
