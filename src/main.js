import Vue from 'vue';
import router from '@/router';
import ElementUI from 'element-ui';
import axios from 'axios';
import loadsh from 'lodash';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App'
import moment from 'moment'
const Bus = new Vue();
Vue.use(ElementUI);
Vue.config.productionTip = false;
Vue.prototype.axios = axios;
Vue.prototype.loadsh = loadsh;
Vue.prototype.moment = moment;
Vue.prototype.moment = moment;
Vue.prototype.Bus = Bus;
axios.interceptors.request.use((request) => {
  if(request.headers['X-ML-Type']=='application/json'){
    return request;
  }
  let data = ''
  for (let key in request.data) {
    data += encodeURIComponent(key) + '=' + encodeURIComponent(request.data[key]) + '&'
  }
  request.data = data;


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
