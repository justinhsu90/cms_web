import asyncComponent from "@/common/until/asyncComponent";
export default [
  {
    name: "bankstatement",
    path: "/bankstatement",
    component: asyncComponent("erp/bankstatement/bankstatement-list"),
    meta: {
      keepAlive: true
    }
  }
];
