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
  },
  {
    name: "inventoryEdit",
    path: "/inventoryEdit",
    component: asyncComponent("erp/inventory/inventoryEdit"),
    meta: {
      sign: "inventoryList"
    }
  }
];
