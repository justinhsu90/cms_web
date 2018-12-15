import asyncComponent from "@/common/until/asyncComponent";
export default [
  {
    component: asyncComponent("dataAnalysis/dataAnalysis"),
    path: "/dataAnalysis",
    meta: {
      keepAlive: true
    }
  }
];
