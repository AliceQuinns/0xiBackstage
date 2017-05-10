import Vue from 'vue'
import axios from 'axios'
import router from './router/index'
import store from './store/index'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import App from './App'
import './common/sass/index.sass'
let instance = axios.create({
  // baseURL: 'http://192.168.1.146:8080/',
  headers : {
    'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
  }
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
