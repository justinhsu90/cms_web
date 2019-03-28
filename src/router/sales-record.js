import asyncComponent from "@/common/until/asyncComponent";
export default [
  {
    name: "skuSalesRecord",
    path: "/skuSalesRecord",
    component: asyncComponent("wowcher/sku-sales-record/sales-record-list")
  }
];
