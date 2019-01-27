import asyncComponent from "@/common/until/asyncComponent";
export default [
  {
    name: "menuorder",
    path: "/menuorder",
    component: asyncComponent("menu-order/order-view")
  }
];
