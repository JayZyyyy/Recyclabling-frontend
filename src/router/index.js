import { createRouter, createWebHistory} from 'vue-router'
const Login = ()=> import('../views/Login.vue')
const Home = ()=> import('../views/Home.vue')


const routes = [
  { 
    path: '/',
    name: '',
    component: Home
  },
  { 
    path: '/login',
    name: 'login',
    component: Login
  },
  { 
    path: '/home',
    name: 'home',
    component: Home
  },
]
const router = createRouter({  
    history: createWebHistory(),  
    routes
})

export default router
