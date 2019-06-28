import asyncComponent from "@/common/until/asyncComponent";
export default [
  {
    name: "personalizedOrder",
    path: "/personalizedOrder",
    component: asyncComponent("personalizedOrder/index")
  }
];
