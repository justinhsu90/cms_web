import asyncComponent from "@/common/until/asyncComponent";
export default [
  {
    name: "batchJob",
    path: "/batchJob",
    component: asyncComponent("batchJob/index")
  }
];
