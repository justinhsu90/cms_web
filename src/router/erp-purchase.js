import asyncComponent from "@/common/until/asyncComponent";
export default [
  {
    name: "erpPurchase",
    path: "/erpPurchase",
    component: asyncComponent("erp/purchase/purchase"),
    meta: {
      keepAlive: true
    }
  },
  {
    name: "erpPurchaseAdd",
    path: "/erpPurchaseAdd",
    component: asyncComponent("erp/purchase/purchaseAdd"),
    meta: {
      sign: "erpPurchase"
    }
  },
  {
    name: "erpPurchaseEdit",
    path: "/erpPurchaseEdit",
    component: asyncComponent("erp/purchase/purchaseEdit"),
    meta: {
      sign: "erpPurchase"
    }
  }
];
