import asyncComponent from "@/common/until/asyncComponent";
export default [
  {
    name: "erptakestock",
    path: "/erptakestock",
    component: asyncComponent("erp/takestock/takestockList"),
    meta: {
      keepAlive: true
    }
  }
];
