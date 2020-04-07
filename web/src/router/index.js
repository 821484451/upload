import Vue from 'vue'
import store from '../store'
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
router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {  // 判断该路由是否需要登录权限
      if (store.state.token) {  // 通过vuex state获取当前的token是否存在
        next();
      }else {
          next({
            path: '/login',
            query: {redirect: to.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
          })
      }
  }
  else {
      next();
  }
})




export default router
