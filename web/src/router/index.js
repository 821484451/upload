import Vue from 'vue'
// import store from '../store'
import VueRouter from 'vue-router'
import HomePage from '../views/home.vue'
import IndexPage from '../views/index.vue'
import LoginPage from '../views/login.vue'
import MarkPage from '../views/mark.vue'
import LoverPage from '../views/lover.vue'


Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'Index',
        meta: {
            requireAuth: true,
            showActive: true
        },
        component: IndexPage
    },
    {
        path: '/home',
        name: 'Home',
        meta: {
            requireAuth: true,
            showActive: true
        },
        component: HomePage
    },
    {
        path: '/login',
        name: 'Login',
        meta: {
            requireAuth: false,
            showActive: false
        },
        component: LoginPage
    },
    {
        path: '/markDown',
        name: 'Mark',
        meta: {
            requireAuth: false,
            showActive: true
        },
        component: MarkPage
    },
    {
        path: '/lover',
        name: 'Lover',
        meta: {
            requireAuth: false,
            showActive: true
        },
        component: LoverPage
    },
    {
        path: '/map',
        name: 'Map',
        meta: {
            requireAuth: false,
            showActive: true
        },
        component: import ('../views/map.vue')
    }
];
let baseUrl;
if (process.env.NODE_ENV == 'production') {
    baseUrl = "/study";
} else {
    baseUrl = "";
}



const router = new VueRouter({
    mode: 'history',
    base: baseUrl,
    // base: process.env.BASE_URL,
    routes
});





export default router