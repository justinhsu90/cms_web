import VueRouter from "vue-router";
import Vue from "vue";
import nav from "@/common/nav";
import login from "@/common/login";
import asyncComponent from "@/common/until/asyncComponent";
import C from "js-cookie";
let configRouters = [];
const excludeRouters = ["./index.js"];
if (C.get("privilege") == "admin") {
  excludeRouters.push("./dataAnalysis.js");
}
const routers = require.context("./", true, /\.js$/);
routers.keys().forEach(key => {
  if (excludeRouters.includes(key)) return;
  configRouters = configRouters.concat(routers(key).default);
});
Vue.use(VueRouter);
let router = new VueRouter({
  routes: [
    {
      path: "/",
      component: login,
      meta: {
        name: "login"
      }
    },
    {
      path: "/nav",
      component: nav,
      redirect: "/sku",
      children: [
        ...configRouters,
        {
          path: "/try",
          component: asyncComponent("trya/try")
        }
      ]
    },
    {
      path: "*",
      redirect: "/404"
    }
  ]
});

export default router;
