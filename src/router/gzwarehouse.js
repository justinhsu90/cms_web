import asyncComponent from "@/common/until/asyncComponent";
export default [
  {
    name: "gzwarehouse",
    path: "/gzwarehouseList",
    component: asyncComponent("gzwarehouse/gzwarehouseList")
  },
  {
    name: "gzwarehouseAdd",
    path: "/gzwarehouseAdd/:id",
    component: asyncComponent("gzwarehouse/gzwarehouseAdd"),
    meta: {
      sign: "gzwarehouseList"
    }
  }
];
