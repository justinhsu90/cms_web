import router from "@/router";
import C from "js-cookie";
import Vue from "vue";
import nav from "@/common/nav";
// import dataAnalysiz from "../router/dataAnalysis";
import bankstatement from "../router/bankstatement";
const routerManage = [
  {
    path: "/nav",
    component: nav,
    redirect: "/sku",
    children: [...bankstatement]
  }
];
router.beforeEach((to, form, next) => {
  let token = C.get("token");
  if (
    C.get("privilege") == "admin" &&
    C.get("token") &&
    form.meta.name == "login"
  ) {
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
      if (C.get("privilege") != "admin" && to.path == "/bankstatement") {
        next("/404");
        return;
      }
      next();
    } else {
      next("/");
    }
  }
});
