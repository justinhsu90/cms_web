import Vue from "vue";
import ElementUI from "../../static/lib/ele/index";
import "element-ui/lib/theme-chalk/index.css";
import "../assets/css/reset.css";
import "../assets/css/fontStyle.css";
import "@/assets/scss/common/index.scss";
import moment from "moment";
import axios from "@/common/until/Ajax";
import qs from "qs";
const Bus = new Vue();
Vue.use(ElementUI);
Vue.config.productionTip = false;

//太坑 因为后边改的
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
