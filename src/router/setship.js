import asyncComponent from "@/common/until/asyncComponent";
export default [
  {
    name: "setship",
    path: "/setship",
    component: asyncComponent(
      "setDefaultShippingMethod/setDefaultShippingMethodList"
    )
  }
];
