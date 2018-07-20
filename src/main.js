import Vue from 'vue';
import router from '@/router';
import ElementUI from '../static/lib/ele/index';
import axios from 'axios';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App'
import moment from 'moment'
import qs from 'qs'
const Bus = new Vue();
Vue.use(ElementUI);
Vue.config.productionTip = false;
Vue.prototype.axios = axios;
Vue.prototype.moment = moment;
Vue.prototype.Bus = Bus;
Vue.prototype.qs = qs;

//axios的配置
axios.defaults.baseURL = 'http://api.myfbmanage.com:8000/data-server/';
axios.interceptors.request.use((request) => {
  request.data = qs.stringify(request.data);
  return request;
});
axios.interceptors.response.use((response) => {
  return response.data;
});

router.beforeEach((to, form, next) => {
  let token;
  document.cookie.split(';').forEach((v,i)=>{
    let str = v.split('=')[0];
    str = str.trim();
    if(str == "token"){
        token = v.split('=')[1];
     }
   })
  if (to.meta.name == "login") {
    if (!!token) {
     Vue.prototype.token = token;
      next('/nav');
    } else {
      next();
    }
  } else {
    if (!!token) {
      Vue.prototype.token = token;
      next()
    } else {
      next('/login');
    }
  }
})
new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>'
})
