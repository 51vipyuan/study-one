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

const Order = ()=> import('./../views/order/Order.vue');
const MyAddress = ()=> import('./../views/order/children/MyAddress.vue');
const AddAddress = ()=> import('./../views/order/children/children/AddAddress.vue');
const EditAddress = ()=> import('./../views/order/children/children/EditAddress.vue');

const OrderDetail = ()=> import('./../views/order/children/OrderDetail.vue');

const UserCenter = ()=> import('./../views/mine/children/UserCenter.vue')


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
        component: Mine,
        children: [
          {
            path: 'userCenter',
            name: 'userCenter',
            component: UserCenter
          }
        ]
      }
    ]
  },
  {
    path: '/order',
    name: 'order',
    component: Order,
    children:[
      {
        path:'myAddress',
        name:"myAddress",
        component: MyAddress,
        children: [
          {
            path: 'addAddress',
            name: 'addAddress',
            component: AddAddress
          },
          {
            path: 'editAddress',
            name: 'editAddress',
            component: EditAddress
          }
        ]
      },
      {
        path: 'orderDetail',
        name: 'orderDetail',
        component: OrderDetail
      }
      
    ]
  }

]

const router = new VueRouter({
  routes
})

export default router
