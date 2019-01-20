import asyncComponent from "@/common/until/asyncComponent";
export default [
  {
    name: "package-shipping",
    path: "/package-shipping",
    component: asyncComponent("package-shipping/package-shipping-list"),
    meta: {
      keepAlive: true
    }
  }
];
