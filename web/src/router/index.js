import Vue from 'vue'
// import store from '../store'
import VueRouter from 'vue-router'
import HomePage from '../views/home.vue'
import IndexPage from '../views/index.vue'
import LoginPage from '../views/login.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Index',
    meta: {
      requireAuth: true
    },
    component: IndexPage
  },
  {
    path: '/home',
    name: 'Home',
    meta: {
      requireAuth: true
    },
    component: HomePage
  },
  {
    path: '/login',
    name: 'Login',
    meta: {
      requireAuth: false
    },
    component: LoginPage
  }
];
let baseUrl;
if (process.env.NODE_ENV == 'production'){
  baseUrl = "/study"; 
}else{
  baseUrl = ""; 
}

const router = new VueRouter({
  mode: 'history',
  base: baseUrl,
  // base: process.env.BASE_URL,
  routes
});





export default router
