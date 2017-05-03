import Vue from 'vue'
import axios from 'axios'
import router from './router/index'
import store from './store/index'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import App from './App'
import './common/sass/index.sass'

Vue.use(ElementUI);
Vue.prototype.axios = axios;

Vue.config.productionTip = false;

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
});
