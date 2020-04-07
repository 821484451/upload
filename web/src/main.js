import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import './assets/less/common.less'
import axios from 'axios';


Vue.config.productionTip = false;


// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // 请求如果报未登录，统一跳转路由
  if (response.data.status === 403) {
    router.push({
      path: '/login'
    })
  }
  return response;
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error);
});

Vue.prototype.$axios = axios;



new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
