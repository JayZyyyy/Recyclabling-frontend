import axios from 'axios'
import { useUserStore } from '../store/user'
import { ElMessage } from 'element-plus';
import qs from 'qs'

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

export const updateRecycleItemWithoutPic = ({id, name, introduce}) => {
  let formData = new FormData();
  formData.append("name", name); 
  formData.append("introduce", introduce); 
  return axios.post(`/api/recycleList/update1/${id}`, formData,{
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

export const uploadCommodity = ({name, introduce, fileList, category, count, price, own}) => {
  let formData = new FormData();
  formData.append("picture", fileList[0].raw);
  formData.append("name", name);
  formData.append("introduce", introduce);
  formData.append("category", category);
  formData.append("count", count);
  formData.append("price", price);
  formData.append("own", own);
  return axios.post('/api/commodity/upload', formData,{
    headers: 'multipart/form-data'
  }).then(response => {
      return response?.data
  })
}

export const getKeywordCommodity = (keyword, id) => {
  const params = {
    id: id,
    keyword: keyword
  }
  const queryString = qs.stringify(params);
  return axios.get(`/api/commodity/search?${queryString}`).then(response => {
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

export const updateCommodityWithoutPic = ({id, name, introduce, category, count, price}) => {
  let formData = new FormData();
  formData.append("name", name); 
  formData.append("introduce", introduce); 
  formData.append("category", category); 
  formData.append("count", count);
  formData.append("price", price);
  return axios.post(`/api/commodity/modify1/${id}`, formData,{
    headers: 'multipart/form-data'
  }).then(response => {
      return response?.data
  })
}


//cart 
export const getCartList = (id) => {
  return axios.get(`/api/cart/cartList/${id}`).then(response => {
      return response?.data
  })
}


export const getSoldOutList = (id) => {
  return axios.get(`/api/cart/cartSoldOutList/${id}`).then(response => {
      return response?.data
  })
}

export const getBuyList = (id) => {
  return axios.get(`/api/cart/cartBuyList/${id}`).then(response => {
      return response?.data
  })
}



export const addItem = ({commodityId, userId, num}) => {
  let formData = new FormData();
  formData.append("commodityId", commodityId); 
  formData.append("userId", userId); 
  formData.append("num", num);
  return axios.post(`/api/cart/addItem`, formData,{
    headers: 'multipart/form-data'
  }).then(response => {
      return response?.data
  })
}

export const updateCart = (userId, commodityId, num) => {
  let formData = new FormData();
  formData.append("commodityId", commodityId); 
  formData.append("num", num);
  return axios.post(`/api/cart/update/${userId}`, formData,{
    headers: 'multipart/form-data'
  }).then(response => {
      return response?.data
  })
}


export const deleteItem = (userId, commodityId) => {
  let formData = new FormData();
  formData.append("commodityId", commodityId); 
  return axios.post(`/api/cart/delete/${userId}`, formData,{
    headers: 'multipart/form-data'
  }).then(response => {
      return response?.data
  })
}

export const checkoutCart = (userId, cartArr) => {
  let formData = new FormData();
  formData.append("cartArr", JSON.stringify(cartArr)); 
  return axios.post(`/api/cart/checkout/${userId}`, formData,{
    headers: 'multipart/form-data'
  }).then(response => {
      return response?.data
  })
}

// moment
export const addMoment = ({userId, title, content, fileList}) => {
  let formData = new FormData();
  formData.append("userId", userId); 
  formData.append("title", title); 
  formData.append("content", content); 
  formData.append("picture", fileList[0].raw); 
  return axios.post(`/api/moment/addMoment`, formData,{
    headers: 'multipart/form-data'
  }).then(response => {
      return response?.data
  })
}

export const getMomentList = () => {
  return axios.get(`/api/moment`).then(response => {
      return response?.data
  })
}

export const getMomentListById = (userId) => {
  return axios.get(`/api/moment/list/${userId}`).then(response => {
      return response?.data
  })
}

export const deleteMoment = (momentId) => {
  return axios.post(`/api/moment/delete/${momentId}`,{
    headers: 'multipart/form-data'
  }).then(response => {
      return response?.data
  })
}


//comment
export const getCommentList = (id) => {
  return axios.get(`/api/comment/${id}`).then(response => {
      return response?.data
  })
}
export const addComment = ({userId, content, momentId}) => {
  let formData = new FormData();
  formData.append("userId", userId); 
  formData.append("momentId", momentId); 
  formData.append("content", content); 
  return axios.post(`/api/comment/addComment`, formData,{
    headers: 'multipart/form-data'
  }).then(response => {
      return response?.data
  })
}
