import asyncComponent from "@/common/until/asyncComponent";
export default [
  {
    name: "receivable",
    path: "/receivable",
    component: asyncComponent("erp/purchaseReceivable/receivable"),
    meta: {
      keepAlive: true
    }
  },
  {
    name: "receivableAdd",
    path: "/receivableAdd",
    component: asyncComponent("erp/purchaseReceivable/receivableAdd"),
    meta: {
      sign: "receivable"
    }
  },
  {
    name: "receivableEdit",
    path: "/receivableEdit",
    component: asyncComponent("erp/purchaseReceivable/receivableEdit"),
    meta: {
      sign: "receivable"
    }
  }
];
