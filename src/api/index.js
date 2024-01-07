import axios from 'axios'

export const registerUser = (userData) => {
  return axios.post('/api/user', userData).then(response => {
      return response?.data
  })
}

export const login = (userData) => {
  return axios.post('/api/login', userData).then(response => {
      return response?.data
  })
}
