import Vue from "vue";
import router from "@/router";
import ElementUI from "../static/lib/ele/index";
import "element-ui/lib/theme-chalk/index.css";
import "./assets/css/reset.css";
import "./assets/css/fontStyle.css";
import "@/assets/scss/common/index.scss";
import App from "./App";
import moment from "moment";
import axios from "@/common/until/Ajax";
import qs from "qs";
const Bus = new Vue();
Vue.use(ElementUI);
Vue.config.productionTip = false;
window.axios = axios;
Vue.prototype.moment = moment;
Vue.prototype.Bus = Bus;
Vue.prototype.qs = qs;

//找祖辈元素
function findFather(componentName) {
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

function findChild(componentName, eventName, params) {
  this.$children.forEach(child => {
    var name = child.$options.componentName || child.$options.name;
    if (name === componentName) {
      child.$emit.apply(child, [eventName].concat(params));
    } else {
      findChild.apply(child, [componentName, eventName].concat([params]));
    }
  });
}
Vue.prototype.$findChild = findChild;

router.beforeEach((to, form, next) => {
  let token;
  document.cookie.split(";").forEach(v => {
    let str = v.split("=")[0];
    str = str.trim();
    if (str == "token") {
      token = v.split("=")[1];
    }
  });
  if (to.meta.name == "login") {
    if (token) {
      Vue.prototype.token = token;
      next("/sku");
    } else {
      next();
    }
  } else {
    if (token) {
      Vue.prototype.token = token;
      next();
    } else {
      next("/");
    }
  }
});
new Vue({
  el: "#app",
  router,
  components: {
    App
  },
  template: "<App/>"
});
