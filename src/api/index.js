import axios from 'axios'
import { useUserStore } from '../store/user'
import { ElMessage } from 'element-plus';

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


export const getKeywordRecycleList = (keyword = '') => {
  return axios.get(`/api/recycleList/search/${keyword}`).then(response => {
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

export const uploadRecycleItem = ({name, introduce, fileList}) => {
  let formData = new FormData();
  formData.append("picture", fileList[0].raw); 
  formData.append("name", name); 
  formData.append("introduce", introduce); 
  return axios.post('/api/recycleList/upload', formData,{
    headers: 'multipart/form-data'
  }).then(response => {
      return response?.data
  })
}

export const updateRecycleItem = ({id, name, introduce, fileList}) => {
  let formData = new FormData();
  formData.append("picture", fileList[0].raw); 
  formData.append("name", name); 
  formData.append("introduce", introduce); 
  return axios.post(`/api/recycleList/update/${id}`, formData,{
    headers: 'multipart/form-data'
  }).then(response => {
      return response?.data
  })
}



//commodity
export const getCommodityList = () => {
  return axios.get('/api/commodity').then(response => {
      return response?.data
  })
}

export const getCommodityListByUser = (id) => {
  return axios.get(`/api/commodity/user/${id}`).then(response => {
      return response?.data
  })
}

export const uploadCommodity = ({name, introduce, fileList, category, count, price}) => {
  let formData = new FormData();
  formData.append("picture", fileList[0].raw);
  formData.append("name", name);
  formData.append("introduce", introduce);
  formData.append("category", category);
  formData.append("count", count);
  formData.append("price", price);
  return axios.post('/api/commodity/upload', formData,{
    headers: 'multipart/form-data'
  }).then(response => {
      return response?.data
  })
}

export const getKeywordCommodity = (keyword = '') => {
  return axios.get(`/api/commodity/search/${keyword}`).then(response => {
      return response?.data
  })
}


export const getCommodityByCategory = (category = '') => {
  return axios.get(`/api/commodity/category/${category}`).then(response => {
      return response?.data
  })
}

export const updateCommodity = ({id, name, introduce, category, count, price, fileList}) => {
  let formData = new FormData();
  formData.append("picture", fileList[0].raw); 
  formData.append("name", name); 
  formData.append("introduce", introduce); 
  formData.append("category", category); 
  formData.append("count", count);
  formData.append("price", price);
  return axios.post(`/api/commodity/modify/${id}`, formData,{
    headers: 'multipart/form-data'
  }).then(response => {
      return response?.data
  })
}
