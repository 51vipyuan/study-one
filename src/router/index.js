import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'

// 引入一级组件
import Default from "../views/default/Default";


//引入组件
const Home = ()=> import('./../views/home/Home.vue');
const Category = ()=> import('./../views/category/Category.vue');
const Cart = ()=> import('./../views/cart/Cart.vue');
const Mine = ()=> import('./../views/mine/Mine.vue');

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/default'
  },
  {
    path: '/default',
    name: 'default',
    component: Default,
    children: [
      {
        path: '/default',
        redirect: '/default/home',
      },
      {
        path: 'home',
        name: 'home',
        component: Home
      },
      {
        path: 'category',
        name: 'category',
        component: Category
      },
      {
        path: 'cart',
        name: 'cart',
        component: Cart
      },{
        path: 'mine',
        name: 'mine',
        component: Mine
      }
    ]
  }/*,
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/!* webpackChunkName: "about" *!/ '../views/About.vue')
  }*/

]

const router = new VueRouter({
  routes
})

export default router
