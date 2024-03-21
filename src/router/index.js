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
    path: '/SearchPage',
    name: 'searchPage',
    component: ()=> import('../views/SearchPage.vue')
  },
  { 
    path: '/MomentPage',
    name: 'momentPage',
    component: ()=> import('../views/MomentPage.vue')
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
      {
        path: 'commodity',
        component: () => import('../views/UserChild/Commodity.vue'),
        beforeEnter: (to, from, next) => {
          to.meta.data = { inUser: true};
          next();
        },
      },
      {
        path: 'cart',
        component: () => import('../views/UserChild/Cart.vue'),
        beforeEnter: (to, from, next) => {
          to.meta.data = { inUser: true};
          next();
        },
      },
      {
        path: 'soldOut',
        component: () => import('../views/UserChild/SoldOut.vue'),
      },
      {
        path: 'buy',
        component: () => import('../views/UserChild/Buy.vue'),
      },
      {
        path: 'moment',
        component: () => import('../views/UserChild/Moment.vue'),
        beforeEnter: (to, from, next) => {
          to.meta.data = { inUser: true};
          next();
        },
      },
    ],
  },
]
const router = createRouter({  
    history: createWebHistory(),  
    routes
})

export default router
