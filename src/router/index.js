import VueRouter from "vue-router";
import Vue from "vue";
import nav from "@/common/nav";
let configRouters = [];
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
  }
];
let router = new VueRouter({
  routes: [
    {
      path: "/",
      component: () => import(/* webpackChunkName: 'login' */ "@/common/login"),
      meta: {
        name: "login"
      }
    },
    ...routerManage,
    {
      path: "*",
      redirect: "/404"
    }
  ]
});

export default router;
