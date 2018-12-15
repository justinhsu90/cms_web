import asyncComponent from "@/common/until/asyncComponent";
export default [
  {
    name: "inventory",
    path: "/inventoryList",
    component: asyncComponent("inventory/inventoryList")
  },
  {
    name: "inventoryAdd",
    path: "/inventoryAdd",
    component: asyncComponent("inventory/inventoryAdd"),
    meta: {
      sign: "inventoryList"
    }
  }
];
