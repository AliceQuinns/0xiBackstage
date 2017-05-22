import Vue from 'vue'
import axios from 'axios'
import qs from 'qs'
import router from './router/index'
import store from './store/index'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import App from './App'
import './common/sass/index.sass'
let instance = axios.create({
  headers : {
    'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
  },
  withCredentials: true,
});
// 拦截request对数据进行编码
instance.interceptors.request.use((config) => {
  config.data = qs.stringify(config.data);
  return config;
}, (error) => {
  return Promise.reject(error);
});

Vue.use(ElementUI);
Vue.prototype.axios = instance;

Vue.config.productionTip = false;

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
});
