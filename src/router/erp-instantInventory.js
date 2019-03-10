import asyncComponent from "@/common/until/asyncComponent";
export default [
  {
    name: "erpInstantInventory",
    path: "/erpInstantInventory",
    component: asyncComponent("erp/instantInventory/instantInventoryList")
  }
];
