import asyncComponent from "@/common/until/asyncComponent";
export default [
  {
    name: "erpSale",
    path: "/erpSale",
    component: asyncComponent("erp/sale/sale"),
    meta: {
      keepAlive: true
    }
  },
  {
    name: "erpSaleAdd",
    path: "/erpSaleAdd",
    component: asyncComponent("erp/sale/saleAdd"),
    meta: {
      sign: "erpSale"
    }
  },
  {
    name: "erpSaleEdit",
    path: "/erpSaleEdit",
    component: asyncComponent("erp/sale/saleEdit"),
    meta: {
      sign: "erpSale"
    }
  }
];
