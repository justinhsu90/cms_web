import asyncComponent from "@/common/until/asyncComponent";
export default [
  {
    name: "restockCount",
    path: "/restockCount",
    component: asyncComponent("amazon/restockCount/restockCountList")
  }
];
