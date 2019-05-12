import asyncComponent from "@/common/until/asyncComponent";
export default [
  {
    name: "shipoutscan",
    path: "/shipoutscan",
    component: asyncComponent("shipoutscan/shipoutscan-list"),
    meta: {
      keepAlive: true
    }
  }
];
