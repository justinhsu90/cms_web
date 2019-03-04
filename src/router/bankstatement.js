import asyncComponent from "@/common/until/asyncComponent";
export default [
  {
    name: "bankstatement",
    path: "/bankstatement",
    component: asyncComponent("admin_erp/bankstatement/bankstatement-list"),
    meta: {
      keepAlive: true
    }
  }
];
