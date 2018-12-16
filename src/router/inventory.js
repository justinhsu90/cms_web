import asyncComponent from "@/common/until/asyncComponent";
export default [
  {
    name: "inventory",
    path: "/inventoryList",
    component: asyncComponent("erp/inventory/inventoryList")
  },
  {
    name: "inventoryAdd",
    path: "/inventoryAdd",
    component: asyncComponent("erp/inventory/inventoryAdd"),
    meta: {
      sign: "inventoryList"
    }
  }
];
