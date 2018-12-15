import asyncComponent from "@/common/until/asyncComponent";
export default [
  {
    name: "upcList",
    path: "/upc",
    component: asyncComponent("upc/upcList"),
    meta: {
      keepAlive: true
    }
  },
  {
    name: "upcAdd",
    path: "/upcAdd",
    component: asyncComponent("upc/upcAdd"),
    meta: {
      sign: "upc"
    }
  },
  {
    name: "upcEdit",
    path: "/upcEdit",
    component: asyncComponent("upc/upcEdit"),
    meta: {
      sign: "upc"
    }
  }
];
