import asyncComponent from "@/common/until/asyncComponent";
export default [
  {
    name: "cdiscount",
    path: "/cdiscount",
    component: asyncComponent("amazon/cdiscount/cdiscountList"),
    meta: {
      keepAlive: true
    }
  }
];
