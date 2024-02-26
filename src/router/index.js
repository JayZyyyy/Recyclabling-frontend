import { createRouter, createWebHistory} from 'vue-router'
const Home = ()=> import('../views/Home.vue')
const UserHome = import('../views/UserChild/Home.vue')

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
    path: '/RecycleListPage',
    name: 'recycleListPage',
    component: ()=> import('../views/RecycleListPage.vue')
  },
  { 
    path: '/CommodityPage',
    name: 'commodityPage',
    component: ()=> import('../views/CommodityPage.vue')
  },
  { 
    path: '/user/:id',
    name: 'user',
    component: ()=> import('../views/User.vue'),
    redirect: { name: 'userHome' },
    children: [
      {
        path: '/',
        component: UserHome,
      },
      {
        path: 'home',
        name: 'userHome',
        component: UserHome,
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
