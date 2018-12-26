import router from "@/router";
import C from "js-cookie";
import Vue from "vue";
import nav from "@/common/nav";
import dataAnalysiz from "../router/dataAnalysis";

const routerManage = [
  {
    path: "/nav",
    component: nav,
    redirect: "/sku",
    children: [...dataAnalysiz]
  }
];
router.beforeEach((to, form, next) => {
  let token = C.get("token");
  if (form.meta.name == "login") {
    router.addRoutes(routerManage);
  }
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
