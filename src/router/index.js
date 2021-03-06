import VueRouter from "vue-router";
import Vue from "vue";
import nav from "@/common/nav";
import C from "js-cookie";
import dataAnalysiz from "../router/dataAnalysis";
let configRouters = [];
// "./dataAnalysis.js"
const excludeRouters = ["./index.js"];
const routers = require.context("./", true, /\.js$/);
routers.keys().forEach(key => {
  if (excludeRouters.includes(key)) return;
  configRouters = configRouters.concat(routers(key).default);
});
Vue.use(VueRouter);
export const routerManage = [
  {
    path: "/nav",
    component: nav,
    redirect: "/sku",
    children: [...configRouters]
  },
  {
    path: "*",
    redirect: "/404"
  }
];
if (C.get("privilege") == "admin" && C.get("token")) {
  routerManage[0].children.push(...dataAnalysiz);
}
let router = new VueRouter({
  routes: [
    {
      path: "/",
      component: () => import(/* webpackChunkName: 'login' */ "@/common/login"),
      meta: {
        name: "login"
      }
    },
    ...routerManage
  ]
});

export default router;
