import axios from 'axios'
import { useUserStore } from '../store/user'

const userStore = useUserStore()

axios.interceptors.request.use((config) => {
  // config 是 axios 配置对象
  // 获取token
  let token = userStore.token;
  // 添加token
  //Bearer为token类型，根据自己的类型更改
  token && (config.headers.Authorization = 'Bearer ' + token);
  return config;
}, (error) => {
  // 请求出错
  return Promise.reject(error);
});

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

export const getRecycleList = () => {
  return axios.get('/api/recycleList').then(response => {
      return response?.data
  })
}


export const uploadImage = (userData) => {
  let formData = new FormData();
  formData.append("picture", userData); 
  console.log(formData)
  return axios.post('/api/upload/picture', formData,{
    headers: 'multipart/form-data'
  }).then(response => {
      return response?.data
  })
}

