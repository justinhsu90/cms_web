import asyncComponent from "@/common/until/asyncComponent";
export default [
  {
    name: "receivableReport",
    path: "/receivableReport",
    component: asyncComponent("admin_erp/receivableReport/receivableReport"),
    meta: {
      keepAlive: true
    }
  },
  {
    name: "receivableReportAdd",
    path: "/receivableReportAdd",
    component: asyncComponent("admin_erp/receivableReport/receivableReportAdd"),
    meta: {
      sign: "receivableReport"
    }
  },
  {
    name: "receivableReportEdit",
    path: "/receivableReportEdit",
    component: asyncComponent(
      "admin_erp/receivableReport/receivableReportEdit"
    ),
    meta: {
      sign: "receivableReport"
    }
  }
];
