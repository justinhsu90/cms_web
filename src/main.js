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
//找祖辈元素
function findFather(componentName){
  let parent = this.$parent || this.$root;
  let name = parent.$options.componentName || parent.$options.name;
  while (parent && (!name || name !== componentName)) {
      parent = parent.$parent;

      if (parent) {
          name = parent.$options.componentName || parent.$options.name;
      }
  }
  if (parent) {
      return parent;
  }
}
Vue.prototype.$findFather = findFather;
//找孩子

function child(componentName, eventName, params) { 
  this.$children.forEach(child => {
    var name = child.$options.componentName;
    if (name === componentName) {
      child.$emit.apply(child, [eventName].concat(params)); 
    } else {
      broadcast.apply(child, [componentName, eventName].concat([params]));
    }
  });
}
Vue.prototype.$child = child;


//axios的配置
// axios.defaults.baseURL = 'http://118.163.10.109:8000/data-server/';
axios.defaults.baseURL = 'http://60.251.57.138:8000/data-server/';
// axios.defaults.baseURL = 'http://127.0.0.1:8080/data-server/';
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
