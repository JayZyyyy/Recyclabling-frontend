import { createRouter, createWebHistory} from 'vue-router'
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
    component: ()=> import('../views/Login.vue')
  },
  { 
    path: '/home',
    name: 'home',
    component: Home
  },
  { 
    path: '/user/:id',
    name: 'user',
    component: ()=> import('../views/User.vue'),
    children: [
      {
        path: 'home',
        component: () => import('../views/UserChild/Home.vue'),
      },
      {
        path: 'recycleList',
        component: () => import('../views/UserChild/RecycleList.vue')
      },
    ],
  },
]
const router = createRouter({  
    history: createWebHistory(),  
    routes
})

export default router
